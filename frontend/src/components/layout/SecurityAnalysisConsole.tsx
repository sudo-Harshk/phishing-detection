import { useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { Link } from "react-router-dom";
import MainLayout from "./MainLayout";
import EmailContentPanel from "../panels/EmailContentPanel";
import UrlLinkPanel from "../panels/UrlLinkPanel";
import AnalysisResultPanel, { type AnalysisResult, type AnalysisMode } from "../panels/AnalysisResultPanel";
import FooterNotice from "../footer/FooterNotice";
import { API_BASE_URL } from "../../config/api";
import { parseLinkMetadata, type ParsedLinkMetadata } from "../../lib/urlMetadata";

const SECTION_MAX_WIDTH = "max-w-6xl";

type ConsoleTab = "email" | "url";

export default function SecurityAnalysisConsole() {
    const reduceMotion = useReducedMotion();
    const [activeTab, setActiveTab] = useState<ConsoleTab>("email");

    const [emailText, setEmailText] = useState("");
    const [urlInput, setUrlInput] = useState("");

    const [result, setResult] = useState<AnalysisResult | null>(null);
    const [linkMeta, setLinkMeta] = useState<ParsedLinkMetadata | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const switchTab = (tab: ConsoleTab) => {
        setActiveTab(tab);
        setResult(null);
        setError(null);
        setLinkMeta(null);
        setIsLoading(false);
    };

    const predict = async (text: string): Promise<void> => {
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
    };

    const handleAnalyzeEmail = async () => {
        setIsLoading(true);
        setError(null);
        setResult(null);
        setLinkMeta(null);

        try {
            await predict(emailText);
        } catch {
            setError("Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    const handleAnalyzeUrl = async () => {
        setError(null);
        setResult(null);

        const meta = parseLinkMetadata(urlInput);
        if (!meta) {
            setLinkMeta(null);
            setError("Enter a valid URL (for example https://example.com/path).");
            return;
        }

        setLinkMeta(meta);
        setIsLoading(true);

        try {
            await predict(meta.normalizedUrl);
        } catch {
            setError("Could not reach the analysis service. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    const handleClearEmail = () => {
        setEmailText("");
        setResult(null);
        setError(null);
        setLinkMeta(null);
    };

    const handleClearUrl = () => {
        setUrlInput("");
        setResult(null);
        setError(null);
        setLinkMeta(null);
    };

    const tabSpring = reduceMotion
        ? { duration: 0.01 }
        : { type: "spring" as const, stiffness: 520, damping: 36, mass: 0.7 };

    const panelTransition = reduceMotion
        ? { duration: 0.01 }
        : { duration: 0.22, ease: [0.25, 0.1, 0.25, 1] as const };

    const tabButtonBase =
        "relative z-0 px-5 py-2 text-sm font-semibold rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2";

    const resultMode: AnalysisMode = activeTab === "url" ? "url" : "email";

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
                <div className="inline-flex p-1 rounded-full bg-slate-100/90 border border-gray-100 mb-8">
                    <button type="button" className={tabButtonBase} onClick={() => switchTab("email")}>
                        {activeTab === "email" && (
                            <motion.span
                                layoutId="console-tab-pill"
                                className="absolute inset-0 rounded-full bg-white shadow-sm border border-gray-100"
                                transition={tabSpring}
                            />
                        )}
                        <span
                            className={`relative z-10 ${activeTab === "email" ? "text-indigo-700" : "text-slate-600 hover:text-slate-900"}`}
                        >
                            Email content
                        </span>
                    </button>
                    <button type="button" className={tabButtonBase} onClick={() => switchTab("url")}>
                        {activeTab === "url" && (
                            <motion.span
                                layoutId="console-tab-pill"
                                className="absolute inset-0 rounded-full bg-white shadow-sm border border-gray-100"
                                transition={tabSpring}
                            />
                        )}
                        <span
                            className={`relative z-10 ${activeTab === "url" ? "text-indigo-700" : "text-slate-600 hover:text-slate-900"}`}
                        >
                            URL check
                        </span>
                    </button>
                </div>

                <MainLayout>
                    <motion.div
                        className="min-w-0"
                        initial={reduceMotion ? false : { opacity: 0, y: 14 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={
                            reduceMotion
                                ? { duration: 0 }
                                : { duration: 0.4, ease: [0.25, 0.1, 0.25, 1], delay: 0.02 }
                        }
                    >
                        <AnimatePresence mode="wait" initial={false}>
                            {activeTab === "email" ? (
                                <motion.div
                                    key="email"
                                    role="presentation"
                                    initial={reduceMotion ? false : { opacity: 0, x: -14 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={reduceMotion ? undefined : { opacity: 0, x: 10 }}
                                    transition={panelTransition}
                                >
                                    <EmailContentPanel
                                        text={emailText}
                                        onTextChange={setEmailText}
                                        onAnalyze={handleAnalyzeEmail}
                                        onClear={handleClearEmail}
                                        isLoading={isLoading}
                                    />
                                </motion.div>
                            ) : (
                                <motion.div
                                    key="url"
                                    role="presentation"
                                    initial={reduceMotion ? false : { opacity: 0, x: 14 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={reduceMotion ? undefined : { opacity: 0, x: -10 }}
                                    transition={panelTransition}
                                >
                                    <UrlLinkPanel
                                        url={urlInput}
                                        onUrlChange={setUrlInput}
                                        onAnalyze={handleAnalyzeUrl}
                                        onClear={handleClearUrl}
                                        isLoading={isLoading}
                                    />
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </motion.div>
                    <motion.div
                        key={activeTab}
                        className="min-w-0"
                        initial={reduceMotion ? false : { opacity: 0, y: 14 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={
                            reduceMotion
                                ? { duration: 0 }
                                : { duration: 0.4, ease: [0.25, 0.1, 0.25, 1], delay: 0.08 }
                        }
                    >
                        <AnalysisResultPanel
                            result={result}
                            isLoading={isLoading}
                            error={error}
                            mode={resultMode}
                            linkMetadata={activeTab === "url" ? linkMeta : null}
                        />
                    </motion.div>
                </MainLayout>
            </main>

            <div className={`${SECTION_MAX_WIDTH} mx-auto w-full px-6 lg:px-8`}>
                <FooterNotice />
            </div>
        </div>
    );
}
