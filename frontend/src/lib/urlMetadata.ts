export type ParsedLinkMetadata = {
    normalizedUrl: string;
    protocol: string;
    hostname: string;
    port: string;
    pathname: string;
    origin: string;
    searchParamsCount: number;
    searchParamKeys: string[];
    hasUserInfo: boolean;
    isHttps: boolean;
    hostIsIp: boolean;
    subdomainDepth: number;
    heuristics: string[];
};

function looksLikeIpv4(host: string): boolean {
    return /^(?:\d{1,3}\.){3}\d{1,3}$/.test(host);
}

function looksLikeIpv6(host: string): boolean {
    return host.includes(":") && (host.startsWith("[") || /^[0-9a-f:]+$/i.test(host));
}

export function normalizeUrlInput(raw: string): string {
    const t = raw.trim();
    if (!t) return "";
    if (!/^[a-zA-Z][a-zA-Z\d+.-]*:/.test(t)) {
        return `https://${t}`;
    }
    return t;
}

export function parseLinkMetadata(raw: string): ParsedLinkMetadata | null {
    const normalizedUrl = normalizeUrlInput(raw);
    if (!normalizedUrl) return null;

    let url: URL;
    try {
        url = new URL(normalizedUrl);
    } catch {
        return null;
    }

    if (!url.hostname) return null;

    const hostIsIp = looksLikeIpv4(url.hostname) || looksLikeIpv6(url.hostname);
    const parts = url.hostname.split(".").filter(Boolean);
    const subdomainDepth = Math.max(0, parts.length - 2);

    const keys = [...new URLSearchParams(url.search).keys()];
    const hasUserInfo = Boolean(url.username || url.password);
    const isHttps = url.protocol === "https:";

    const heuristics: string[] = [];
    if (!isHttps) heuristics.push("Uses HTTP — traffic is not encrypted in transit");
    if (hostIsIp) heuristics.push("Host is a raw IP address — less common for legitimate brands");
    if (hasUserInfo) heuristics.push("URL contains embedded credentials (user:pass@) — often suspicious");
    if (subdomainDepth >= 4) heuristics.push("Many subdomain levels — sometimes used in phishing chains");
    if (url.hostname.length > 80) heuristics.push("Unusually long hostname — review carefully");
    if (keys.length > 8) heuristics.push("Many query parameters — can hide the real destination");

    return {
        normalizedUrl: url.href,
        protocol: url.protocol.replace(/:$/, ""),
        hostname: url.hostname,
        port: url.port || (url.protocol === "https:" ? "443" : url.protocol === "http:" ? "80" : ""),
        pathname: url.pathname || "/",
        origin: url.origin,
        searchParamsCount: keys.length,
        searchParamKeys: keys.slice(0, 12),
        hasUserInfo,
        isHttps,
        hostIsIp,
        subdomainDepth,
        heuristics,
    };
}
