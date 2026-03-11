import { useState } from "react";
import { Link } from "react-router-dom";
import MainLayout from "./MainLayout";
import EmailContentPanel from "../panels/EmailContentPanel";
import AnalysisResultPanel, { type AnalysisResult } from "../panels/AnalysisResultPanel";
import FooterNotice from "../footer/FooterNotice";
import { API_BASE_URL } from "../../config/api";

const SECTION_MAX_WIDTH = "max-w-6xl";

export default function SecurityAnalysisConsole() {
    const [text, setText] = useState("");
    const [result, setResult] = useState<AnalysisResult | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

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

    const handleClear = () => {
        setText("");
        setResult(null);
        setError(null);
    };

    return (
        <div className="min-h-screen flex flex-col bg-white text-[#1d1d1f] font-sans tracking-tight" style={{ background: "linear-gradient(180deg, #f8fafc 0%, #ffffff 100%)" }}>
            <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-6 focus:z-[100] focus:px-4 focus:py-2 focus:bg-indigo-600 focus:text-white focus:rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500">
                Skip to content
            </a>
            <header className="border-b border-gray-100 bg-white/80 backdrop-blur-md">
                <div className={`${SECTION_MAX_WIDTH} mx-auto px-6 py-5 lg:px-8`}>
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-xl font-semibold text-[#1d1d1f] tracking-tight">
                                Phishing Detection
                            </h1>
                            <p className="text-sm text-slate-600 mt-0.5">
                                Email Security Analysis Console
                            </p>
                        </div>
                        <Link
                            to="/"
                            className="text-sm font-medium text-slate-600 hover:text-[#1d1d1f] transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 rounded px-3 py-1.5"
                        >
                            ← Back to Overview
                        </Link>
                    </div>
                </div>
            </header>

            <main id="main-content" className={`flex-1 ${SECTION_MAX_WIDTH} mx-auto px-6 py-10 w-full lg:px-8`}>
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

            <div className={`${SECTION_MAX_WIDTH} mx-auto w-full px-6 lg:px-8`}>
                <FooterNotice />
            </div>
        </div>
    );
}
