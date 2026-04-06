import type { ParsedLinkMetadata } from "../../lib/urlMetadata";
import type { DomainInfo } from "./DomainIntelBlock";

/* ─── tiny helpers ─────────────────────────────────────────────── */

function Chip({ children, muted }: { children: React.ReactNode; muted?: boolean }) {
    return (
        <span
            className={`inline-flex items-center px-2 py-0.5 rounded-md text-xs font-mono font-medium border ${
                muted
                    ? "bg-slate-100 text-slate-500 border-slate-200"
                    : "bg-white text-slate-700 border-slate-200 shadow-sm"
            }`}
        >
            {children}
        </span>
    );
}

function SchemeBadge({ scheme }: { scheme: string }) {
    const safe = scheme === "https";
    return (
        <span
            className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-xs font-mono font-semibold border ${
                safe
                    ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                    : "bg-red-50 text-red-700 border-red-200"
            }`}
        >
            <span
                className={`w-1.5 h-1.5 rounded-full ${safe ? "bg-emerald-500" : "bg-red-500"}`}
            />
            {scheme}
        </span>
    );
}

function Cell({ label, value }: { label: string; value: string }) {
    return (
        <div className="space-y-0.5">
            <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">{label}</p>
            <p className="text-xs font-medium text-slate-700 break-all leading-snug">{value}</p>
        </div>
    );
}

function EngineVerdictBar({
    malicious, suspicious, total,
}: {
    malicious: number; suspicious: number; total: number;
}) {
    const clean = total - malicious - suspicious;
    const flagged = malicious + suspicious;
    const flaggedPct = total > 0 ? (flagged / total) * 100 : 0;
    const malPct = total > 0 ? (malicious / total) * 100 : 0;
    const susPct = total > 0 ? (suspicious / total) * 100 : 0;
    const cleanPct = total > 0 ? (clean / total) * 100 : 0;

    const verdict =
        malicious > 0
            ? { label: `${flagged} of ${total} engines flagged this`, color: "text-red-600" }
            : suspicious > 0
            ? { label: `${suspicious} of ${total} engines marked suspicious`, color: "text-amber-600" }
            : { label: `${total} engines — no threats detected`, color: "text-emerald-600" };

    return (
        <div className="space-y-2">
            <div className="flex items-center justify-between">
                <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">Security Scan</p>
                <span className={`text-xs font-semibold ${verdict.color}`}>{verdict.label}</span>
            </div>
            <div className="flex h-2 rounded-full overflow-hidden bg-slate-100">
                {malicious > 0 && (
                    <div className="bg-red-400 transition-all" style={{ width: `${malPct}%` }} />
                )}
                {suspicious > 0 && (
                    <div className="bg-amber-400 transition-all" style={{ width: `${susPct}%` }} />
                )}
                {clean > 0 && (
                    <div className="bg-emerald-400 transition-all" style={{ width: `${cleanPct}%` }} />
                )}
            </div>
            <div className="flex gap-3 text-[10px] font-medium">
                {malicious > 0 && <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-sm bg-red-400 inline-block" />{malicious} malicious</span>}
                {suspicious > 0 && <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-sm bg-amber-400 inline-block" />{suspicious} suspicious</span>}
                {clean > 0 && <span className="flex items-center gap-1 text-slate-400"><span className="w-2 h-2 rounded-sm bg-emerald-400 inline-block" />{clean} clean</span>}
            </div>
        </div>
    );
}

/* ─── main component ─────────────────────────────────────────────── */

interface UrlIntelCardProps {
    meta: ParsedLinkMetadata;
    domainInfo?: DomainInfo | null;
}

export default function UrlIntelCard({ meta, domainInfo }: UrlIntelCardProps) {
    const isNonStandardPort =
        (meta.protocol === "https" && meta.port !== "443") ||
        (meta.protocol === "http" && meta.port !== "80");

    const paramsText =
        meta.searchParamsCount > 0
            ? `${meta.searchParamsCount} param${meta.searchParamsCount > 1 ? "s" : ""}: ${meta.searchParamKeys.join(", ")}${meta.searchParamsCount > meta.searchParamKeys.length ? "…" : ""}`
            : null;

    const domainCells: { label: string; value: string }[] = [];
    if (domainInfo) {
        if (domainInfo.registrar) domainCells.push({ label: "Registrar", value: domainInfo.registrar });
        if (domainInfo.created) domainCells.push({ label: "Registered", value: domainInfo.created });
        if (domainInfo.country) domainCells.push({ label: "Country", value: domainInfo.country });
        if (domainInfo.categories.length > 0)
            domainCells.push({ label: "Categories", value: domainInfo.categories.join(", ") });
        if (domainInfo.reputation !== null && domainInfo.reputation !== 0)
            domainCells.push({
                label: "Reputation",
                value: domainInfo.reputation > 0
                    ? `+${domainInfo.reputation}`
                    : `${domainInfo.reputation}`,
            });
    }

    return (
        <div className="rounded-xl border border-gray-200 shadow-sm overflow-hidden text-sm">

            {/* ── URL section ───────────────────────────────────────── */}
            <div className="px-4 pt-4 pb-3 bg-white">
                <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-400 mb-2.5">
                    URL Structure
                </p>

                {/* Full URL */}
                <p className="text-xs font-mono text-slate-600 break-all mb-3 leading-relaxed">
                    {meta.normalizedUrl}
                </p>

                {/* Chips row */}
                <div className="flex flex-wrap gap-1.5 items-center">
                    <SchemeBadge scheme={meta.protocol} />
                    <Chip>{meta.hostname}</Chip>
                    {isNonStandardPort && <Chip muted>:{meta.port}</Chip>}
                    {meta.pathname && meta.pathname !== "/" && (
                        <Chip muted>{meta.pathname}</Chip>
                    )}
                    {paramsText && <Chip muted>?{paramsText}</Chip>}
                </div>
            </div>

            {/* ── Heuristic warnings ────────────────────────────────── */}
            {meta.heuristics.length > 0 && (
                <div className="px-4 py-3 bg-amber-50 border-t border-amber-100">
                    <p className="text-[10px] font-semibold uppercase tracking-wider text-amber-600 mb-2">
                        Signals to review
                    </p>
                    <ul className="space-y-1">
                        {meta.heuristics.map((h) => (
                            <li key={h} className="flex items-start gap-1.5 text-xs text-amber-800">
                                <span className="mt-0.5 shrink-0">⚠</span>
                                <span>{h}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            )}

            {/* ── Domain section ────────────────────────────────────── */}
            {domainInfo && (
                <div className="px-4 py-3 border-t border-gray-100 bg-slate-50/60">
                    <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-400 mb-3">
                        Domain Details
                    </p>

                    {domainCells.length > 0 && (
                        <div className="grid grid-cols-2 gap-x-4 gap-y-3 mb-4">
                            {domainCells.map(({ label, value }) => (
                                <Cell key={label} label={label} value={value} />
                            ))}
                        </div>
                    )}

                    {domainInfo.engines_total > 0 && (
                        <EngineVerdictBar
                            malicious={domainInfo.engines_malicious}
                            suspicious={domainInfo.engines_suspicious}
                            total={domainInfo.engines_total}
                        />
                    )}
                </div>
            )}
        </div>
    );
}
