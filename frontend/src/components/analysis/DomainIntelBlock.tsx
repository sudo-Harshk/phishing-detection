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

function Row({ label, value }: { label: string; value: string }) {
    return (
        <div className="flex flex-col gap-0.5 sm:flex-row sm:items-baseline sm:gap-3">
            <span className="text-xs text-slate-500 font-medium shrink-0 min-w-[7rem]">{label}</span>
            <span className="text-xs text-slate-800 font-medium break-all">{value}</span>
        </div>
    );
}

function EngineBar({ malicious, suspicious, harmless, total }: {
    malicious: number; suspicious: number; harmless: number; total: number;
}) {
    if (total === 0) return <span className="text-xs text-slate-500">No data</span>;

    const clean = total - malicious - suspicious;
    const malPct = (malicious / total) * 100;
    const susPct = (suspicious / total) * 100;
    const cleanPct = (clean / total) * 100;

    return (
        <div className="space-y-1 w-full">
            <div className="flex h-2 rounded-full overflow-hidden gap-px">
                {malicious > 0 && (
                    <div className="bg-red-400 rounded-l-full" style={{ width: `${malPct}%` }} />
                )}
                {suspicious > 0 && (
                    <div className="bg-amber-400" style={{ width: `${susPct}%` }} />
                )}
                {clean > 0 && (
                    <div
                        className="bg-emerald-400 rounded-r-full"
                        style={{ width: `${cleanPct}%`, borderRadius: malicious === 0 && suspicious === 0 ? undefined : undefined }}
                    />
                )}
            </div>
            <div className="flex gap-3 text-xs">
                {malicious > 0 && (
                    <span className="text-red-600 font-medium">{malicious} malicious</span>
                )}
                {suspicious > 0 && (
                    <span className="text-amber-600 font-medium">{suspicious} suspicious</span>
                )}
                <span className="text-slate-500">{total} engines total</span>
            </div>
        </div>
    );
}

interface DomainIntelBlockProps {
    info: DomainInfo;
}

export default function DomainIntelBlock({ info }: DomainIntelBlockProps) {
    const reputationLabel =
        info.reputation === null
            ? null
            : info.reputation > 0
            ? `+${info.reputation} (trusted)`
            : info.reputation < 0
            ? `${info.reputation} (flagged)`
            : "0 (neutral)";

    return (
        <div className="rounded-xl border border-gray-100 bg-slate-50/80 p-4 space-y-3">
            <p className="text-xs font-semibold text-slate-700 uppercase tracking-wide">Domain Intelligence</p>
            <p className="text-xs text-slate-500 -mt-1">Sourced from VirusTotal — reflects community and engine data.</p>

            <div className="space-y-2.5 pt-1">
                <Row label="Host" value={info.registrar ? `Registered via ${info.registrar}` : "—"} />
                <Row label="Country" value={info.country ?? "—"} />
                <Row label="Registered" value={info.created ?? "—"} />
                {info.categories.length > 0 && (
                    <Row label="Categories" value={info.categories.join(", ")} />
                )}
                {reputationLabel && (
                    <Row label="Reputation" value={reputationLabel} />
                )}
            </div>

            {info.engines_total > 0 && (
                <div className="pt-2 border-t border-gray-200/80 space-y-2">
                    <p className="text-xs font-medium text-slate-600">Engine verdicts</p>
                    <EngineBar
                        malicious={info.engines_malicious}
                        suspicious={info.engines_suspicious}
                        harmless={info.engines_harmless}
                        total={info.engines_total}
                    />
                </div>
            )}
        </div>
    );
}
