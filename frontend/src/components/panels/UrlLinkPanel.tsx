import PanelHeader from "../common/PanelHeader";

interface UrlLinkPanelProps {
    url: string;
    onUrlChange: (url: string) => void;
    onAnalyze: () => void;
    onClear: () => void;
    isLoading: boolean;
}

export default function UrlLinkPanel({
    url,
    onUrlChange,
    onAnalyze,
    onClear,
    isLoading,
}: UrlLinkPanelProps) {
    const canAnalyze = url.trim().length > 0 && !isLoading;

    return (
        <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
            <PanelHeader
                title="Link / URL"
                subtitle="Paste a full URL. We parse its structure in the browser, then run the same model on the link text."
            />

            <input
                type="text"
                value={url}
                onChange={(e) => onUrlChange(e.target.value)}
                placeholder="https://www.example.com/login?ref=email"
                className={`w-full border border-gray-200 rounded-lg px-4 py-3 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-gray-50/50 placeholder:text-slate-500 transition-opacity duration-200 ${isLoading ? "opacity-60 cursor-not-allowed" : ""}`}
                disabled={isLoading}
                readOnly={isLoading}
                autoComplete="off"
                spellCheck={false}
            />

            <p className="text-xs text-slate-500 mt-2">
                If you omit the scheme, <span className="font-medium">https://</span> is added before parsing.
            </p>

            <div className="flex items-center gap-4 mt-5">
                <button
                    type="button"
                    onClick={onAnalyze}
                    disabled={!canAnalyze}
                    className={`inline-flex items-center gap-2 px-8 py-3.5 bg-indigo-600 text-white text-sm font-semibold rounded-full transition-all duration-200 motion-reduce:hover:translate-y-0 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 ${canAnalyze
                        ? "hover:bg-indigo-700 hover:-translate-y-0.5 cursor-pointer shadow-lg shadow-indigo-500/25"
                        : "opacity-50 cursor-not-allowed"
                        }`}
                >
                    {isLoading ? "Checking link..." : "Check URL"}
                </button>
                {url.trim() && !isLoading && (
                    <button
                        type="button"
                        onClick={onClear}
                        className="inline-flex items-center gap-2 px-8 py-3.5 text-sm font-medium text-slate-600 border border-slate-300 hover:border-slate-400 rounded-full hover:bg-slate-50 transition-all duration-200 motion-reduce:hover:translate-y-0 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    >
                        Clear
                    </button>
                )}
            </div>
        </div>
    );
}
