export type DomainInfo = {
    registrar: string | null;
    country: string | null;
    created: string | null;
    categories: string[];
    reputation: number | null;
    engines_malicious: number;
    engines_suspicious: number;
    engines_harmless: number;
    engines_total: number;
};
