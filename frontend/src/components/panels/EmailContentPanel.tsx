import PanelHeader from "../common/PanelHeader";

interface EmailContentPanelProps {
    text: string;
    onTextChange: (text: string) => void;
    onAnalyze: () => void;
    onClear: () => void;
    isLoading: boolean;
}

export default function EmailContentPanel({
    text,
    onTextChange,
    onAnalyze,
    onClear,
    isLoading
}: EmailContentPanelProps) {
    const canAnalyze = text.trim().length > 0 && !isLoading;

    return (
        <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100">
            <PanelHeader
                title="Email Content"
                subtitle="Paste the full email body to analyze for phishing indicators."
            />

            <textarea
                rows={12}
                value={text}
                onChange={(e) => onTextChange(e.target.value)}
                placeholder="Dear Customer, Your account has been suspended..."
                className={`w-full border border-gray-200 rounded-lg p-4 text-sm text-slate-700 resize-none focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-gray-50/50 placeholder:text-slate-500 transition-opacity duration-200 ${isLoading ? 'opacity-60 cursor-not-allowed' : ''}`}
                style={{ minHeight: "280px" }}
                disabled={isLoading}
                readOnly={isLoading}
            />

            <div className="flex items-center gap-4 mt-5">
                <button
                    onClick={onAnalyze}
                    disabled={!canAnalyze}
                    className={`inline-flex items-center gap-2 px-8 py-3.5 bg-indigo-600 text-white text-sm font-semibold rounded-full transition-all duration-200 motion-reduce:hover:translate-y-0 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 ${canAnalyze
                            ? 'hover:bg-indigo-700 hover:-translate-y-0.5 cursor-pointer shadow-lg shadow-indigo-500/25'
                            : 'opacity-50 cursor-not-allowed'
                        }`}
                >
                    {isLoading ? "Analyzing..." : "Analyze Email"}
                </button>
                {text.trim() && !isLoading && (
                    <button
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
