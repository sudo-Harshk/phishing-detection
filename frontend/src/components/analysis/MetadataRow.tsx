interface MetadataRowProps {
    label: string;
    latencyMs: number;
}

export default function MetadataRow({ label, latencyMs }: MetadataRowProps) {
    return (
        <div className="flex flex-wrap gap-4">
            <div className="inline-flex items-center gap-1.5">
                <span className="text-xs text-slate-500 font-medium">Classification</span>
                <span className="text-xs text-slate-700 font-medium">{label}</span>
            </div>

            <div className="inline-flex items-center gap-1.5">
                <span className="text-xs text-slate-500 font-medium">Latency</span>
                <span className="text-xs text-slate-700 font-medium tabular-nums">~{(latencyMs / 1000).toFixed(1)}s</span>
            </div>
        </div>
    );
}
