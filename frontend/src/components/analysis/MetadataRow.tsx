interface MetadataRowProps {
    label: string;
    latencyMs: number;
}

export default function MetadataRow({ label, latencyMs }: MetadataRowProps) {
    return (
        <div className="flex flex-wrap gap-4">
            {/* Classification Badge */}
            <div className="inline-flex items-center gap-1.5">
                <span className="text-xs text-gray-400 font-medium">Classification</span>
                <span className="text-xs text-gray-600 font-medium">{label}</span>
            </div>

            {/* Latency Badge */}
            <div className="inline-flex items-center gap-1.5">
                <span className="text-xs text-gray-400 font-medium">Latency</span>
                <span className="text-xs text-gray-600 font-medium">~{(latencyMs / 1000).toFixed(1)}s</span>
            </div>
        </div>
    );
}
