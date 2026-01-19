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
        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
            <PanelHeader
                title="Email Content"
                subtitle="Paste the full email body to analyze for phishing indicators."
            />

            <textarea
                rows={12}
                value={text}
                onChange={(e) => onTextChange(e.target.value)}
                placeholder="Dear Customer, Your account has been suspended..."
                className={`w-full border border-gray-200 rounded-lg p-4 text-sm text-gray-700 resize-none focus:outline-none focus:ring-2 focus:ring-gray-300 focus:border-transparent bg-gray-50/50 placeholder:text-gray-400 transition-opacity duration-200 ${isLoading ? 'opacity-60 cursor-not-allowed' : ''}`}
                style={{ minHeight: "280px" }}
                disabled={isLoading}
                readOnly={isLoading}
            />

            <div className="flex items-center gap-4 mt-5">
                <button
                    onClick={onAnalyze}
                    disabled={!canAnalyze}
                    className={`px-5 py-2.5 bg-gray-900 text-white text-sm font-medium rounded-lg transition-all duration-200 ${canAnalyze
                            ? 'hover:bg-gray-800 cursor-pointer'
                            : 'opacity-50 cursor-not-allowed'
                        }`}
                >
                    {isLoading ? "Analyzing..." : "Analyze Email"}
                </button>
                {text.trim() && !isLoading && (
                    <button
                        onClick={onClear}
                        className="px-4 py-2.5 text-gray-500 hover:text-gray-700 text-sm font-medium transition-colors duration-200"
                    >
                        Clear
                    </button>
                )}
            </div>
        </div>
    );
}
