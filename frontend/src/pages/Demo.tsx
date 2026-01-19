import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AnalysisCard, RiskBadge, ProbabilityGauge, LoadingSkeleton } from "../components";
import { API_BASE_URL } from "../config/api";

type Result = {
    label: string;
    risk_level: "Low" | "Moderate" | "High";
    phishing_probability: number;
    latency_ms: number;
    model?: string;
};


export default function Demo() {
    const [text, setText] = useState("");
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState<Result | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [hasAnalyzed, setHasAnalyzed] = useState(false);

    // Minimum time to display the loading skeleton (prevents flashing)
    const MIN_LOADING_TIME = 700;

    async function handleAnalyze() {
        const startTime = performance.now();

        setLoading(true);
        setError(null);
        setResult(null);
        setHasAnalyzed(true);

        let resultData: Result | null = null;
        let errorMessage: string | null = null;

        try {
            const res = await fetch(`${API_BASE_URL}/api/predict`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ text }),
            });

            if (!res.ok) throw new Error();
            resultData = await res.json();
        } catch {
            errorMessage = "Unable to connect to backend";
        }

        // Ensure skeleton is visible for at least MIN_LOADING_TIME
        const elapsed = performance.now() - startTime;
        const remaining = MIN_LOADING_TIME - elapsed;

        if (remaining > 0) {
            await new Promise(resolve => setTimeout(resolve, remaining));
        }

        // Now update the UI
        if (resultData) {
            setResult(resultData);
        }
        if (errorMessage) {
            setError(errorMessage);
        }
        setLoading(false);
    }

    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10">
            {/* LEFT PANE: Input */}
            <div className="space-y-5">
                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Email Content
                    </label>
                    <p className="text-sm text-gray-500 mb-3">
                        Paste the full email body to analyze for phishing indicators.
                    </p>
                    <textarea
                        rows={14}
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        placeholder="Dear Customer, Your account has been suspended..."
                        className="input-textarea"
                        style={{ minHeight: "320px" }}
                    />
                </div>

                <div className="flex items-center gap-4">
                    <button
                        onClick={handleAnalyze}
                        disabled={loading || !text.trim()}
                        className="btn-primary"
                    >
                        {loading ? (
                            <>
                                <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                </svg>
                                Analyzing...
                            </>
                        ) : (
                            <>
                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                                </svg>
                                Analyze Email
                            </>
                        )}
                    </button>

                    {text.trim() && (
                        <button
                            onClick={() => {
                                setText("");
                                setResult(null);
                                setError(null);
                                setHasAnalyzed(false);
                            }}
                            className="text-sm text-gray-500 hover:text-gray-700 transition-colors"
                        >
                            Clear
                        </button>
                    )}
                </div>

                {/* Error Message */}
                <AnimatePresence>
                    {error && (
                        <motion.div
                            initial={{ opacity: 0, y: -8 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -8 }}
                            className="flex items-center gap-2 p-3 rounded-lg bg-red-50 border border-red-200 text-red-700 text-sm animate-shake"
                        >
                            <svg className="w-4 h-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            {error}
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {/* RIGHT PANE: Results */}
            <div className="lg:pt-7">
                {/* Empty state */}
                {!hasAnalyzed && !loading && (
                    <div className="h-full flex items-center justify-center rounded-xl border-2 border-dashed border-gray-200 bg-gray-50/50 p-8 min-h-[320px]">
                        <div className="text-center">
                            <div className="mx-auto w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center mb-4">
                                <svg className="w-6 h-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                                </svg>
                            </div>
                            <p className="text-gray-500 text-sm font-medium">
                                Analysis results will appear here
                            </p>
                            <p className="text-gray-400 text-xs mt-1">
                                Paste an email and click Analyze
                            </p>
                        </div>
                    </div>
                )}

                {/* Loading state */}
                {loading && <LoadingSkeleton />}

                {/* Results */}
                <AnimatePresence mode="wait">
                    {result && !loading && (
                        <AnalysisCard>
                            {/* Hero Risk Badge */}
                            <div className="mb-6">
                                <RiskBadge level={result.risk_level} />
                            </div>

                            {/* Probability Gauge */}
                            <ProbabilityGauge
                                probability={result.phishing_probability}
                                className="mb-6"
                            />

                            {/* Divider */}
                            <div className="border-t border-gray-100 my-5" />

                            {/* Metadata */}
                            <div className="space-y-3">
                                <div className="flex items-center justify-between text-sm">
                                    <span className="text-gray-500 font-medium">Classification</span>
                                    <span className="font-semibold text-gray-900">{result.label}</span>
                                </div>
                                <div className="flex items-center justify-between text-sm">
                                    <span className="text-gray-500 font-medium">Inference Latency</span>
                                    <span className="font-mono text-gray-700">{result.latency_ms} ms</span>
                                </div>
                                {result.model && (
                                    <div className="flex items-center justify-between text-sm">
                                        <span className="text-gray-500 font-medium">Model</span>
                                        <span className="font-mono text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                                            {result.model}
                                        </span>
                                    </div>
                                )}
                            </div>
                        </AnalysisCard>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}
