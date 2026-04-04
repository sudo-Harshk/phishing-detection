import type { ParsedLinkMetadata } from "../../lib/urlMetadata";

function Row({ label, value }: { label: string; value: string }) {
    return (
        <div className="flex flex-col gap-0.5 sm:flex-row sm:items-baseline sm:gap-3">
            <span className="text-xs text-slate-500 font-medium shrink-0 min-w-[7rem]">{label}</span>
            <span className="text-xs text-slate-800 font-medium break-all">{value}</span>
        </div>
    );
}

interface LinkMetadataBlockProps {
    meta: ParsedLinkMetadata;
}

export default function LinkMetadataBlock({ meta }: LinkMetadataBlockProps) {
    const paramsPreview =
        meta.searchParamKeys.length > 0
            ? meta.searchParamKeys.join(", ") + (meta.searchParamsCount > meta.searchParamKeys.length ? "…" : "")
            : "—";

    return (
        <div className="rounded-xl border border-gray-100 bg-slate-50/80 p-4 space-y-3">
            <p className="text-xs font-semibold text-slate-700 uppercase tracking-wide">Link metadata</p>
            <p className="text-xs text-slate-500 -mt-1">
                Parsed locally (structure only). Compare the host to who the sender claims to represent.
            </p>
            <div className="space-y-2.5 pt-1">
                <Row label="Full URL" value={meta.normalizedUrl} />
                <Row label="Scheme" value={meta.protocol} />
                <Row label="Host" value={meta.hostname} />
                <Row label="Port" value={meta.port} />
                <Row label="Path" value={meta.pathname || "/"} />
                <Row
                    label="Query"
                    value={
                        meta.searchParamsCount === 0
                            ? "—"
                            : `${meta.searchParamsCount} param(s): ${paramsPreview}`
                    }
                />
            </div>
            {meta.heuristics.length > 0 && (
                <div className="pt-2 border-t border-gray-200/80">
                    <p className="text-xs font-medium text-slate-600 mb-1.5">Signals to review</p>
                    <ul className="list-disc list-inside text-xs text-slate-600 space-y-1">
                        {meta.heuristics.map((h) => (
                            <li key={h}>{h}</li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
}
