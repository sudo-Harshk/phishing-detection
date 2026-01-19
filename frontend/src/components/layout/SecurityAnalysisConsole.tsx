import { useState } from "react";
import MainLayout from "./MainLayout";
import EmailContentPanel from "../panels/EmailContentPanel";
import AnalysisResultPanel, { type AnalysisResult } from "../panels/AnalysisResultPanel";
import FooterNotice from "../footer/FooterNotice";
import { API_BASE_URL } from "../../config/api";

export default function SecurityAnalysisConsole() {
    // State management - minimal as per Phase 4 rules
    const [text, setText] = useState("");
    const [result, setResult] = useState<AnalysisResult | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // Analyze handler
    const handleAnalyze = async () => {
        setIsLoading(true);
        setError(null);
        setResult(null);

        try {
            const res = await fetch(`${API_BASE_URL}/api/predict`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ text }),
            });

            if (!res.ok) {
                throw new Error("API error");
            }

            const data = await res.json();
            setResult({
                label: data.label,
                phishing_probability: data.phishing_probability,
                risk_level: data.risk_level,
                latency_ms: data.latency_ms,
            });
        } catch {
            setError("Unable to analyze email");
        } finally {
            setIsLoading(false);
        }
    };

    // Clear handler
    const handleClear = () => {
        setText("");
        setResult(null);
        setError(null);
    };

    return (
        <div className="min-h-screen flex flex-col" style={{ background: "linear-gradient(180deg, #f1f5f9 0%, #ffffff 100%)" }}>
            {/* Header */}
            <header className="border-b border-gray-200 bg-white/80 backdrop-blur-sm">
                <div className="max-w-6xl mx-auto px-6 py-5">
                    <h1 className="text-lg font-semibold text-gray-900 tracking-tight">
                        Phishing Detection
                    </h1>
                    <p className="text-xs text-gray-500 mt-0.5">
                        Email Security Analysis Console
                    </p>
                </div>
            </header>

            {/* Main Content */}
            <main className="flex-1 max-w-6xl mx-auto px-6 py-10 w-full">
                <MainLayout>
                    <EmailContentPanel
                        text={text}
                        onTextChange={setText}
                        onAnalyze={handleAnalyze}
                        onClear={handleClear}
                        isLoading={isLoading}
                    />
                    <AnalysisResultPanel
                        result={result}
                        isLoading={isLoading}
                        error={error}
                    />
                </MainLayout>
            </main>

            {/* Footer */}
            <FooterNotice />
        </div>
    );
}
