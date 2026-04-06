import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import PanelHeader from "../common/PanelHeader";
import ResultStatusIndicator from "../analysis/ResultStatusIndicator";
import PhishingProbabilityBar from "../analysis/PhishingProbabilityBar";
import MetadataRow from "../analysis/MetadataRow";
import AnalysisSkeleton from "../analysis/AnalysisSkeleton";
import UrlIntelCard from "../analysis/UrlIntelCard";
import { type DomainInfo } from "../analysis/DomainIntelBlock";
import type { ParsedLinkMetadata } from "../../lib/urlMetadata";

export type { DomainInfo };

export type AnalysisResult = {
    label: string;
    phishing_probability: number;
    risk_level: "Low" | "Moderate" | "High";
    latency_ms: number;
};

export type AnalysisMode = "email" | "url";

interface AnalysisResultPanelProps {
    result: AnalysisResult | null;
    isLoading: boolean;
    error: string | null;
    mode?: AnalysisMode;
    linkMetadata?: ParsedLinkMetadata | null;
    domainInfo?: DomainInfo | null;
}

const ease = [0.25, 0.1, 0.25, 1] as const;

export default function AnalysisResultPanel({
    result,
    isLoading,
    error,
    mode = "email",
    linkMetadata = null,
    domainInfo = null,
}: AnalysisResultPanelProps) {
    const reduceMotion = useReducedMotion();
    const isUrl = mode === "url";

    const subtitle = isLoading
        ? isUrl ? "Checking link..." : "Analyzing..."
        : isUrl ? "Link security assessment" : "Email security assessment";

    const emptyHint = isUrl ? "Enter a URL and run a check" : "Run an analysis to view results";
    const errorTitle = isUrl ? "Unable to analyze link" : "Unable to analyze email";

    const showIntelCard = isUrl && linkMetadata;

    const swap = reduceMotion ? { duration: 0.01 } : { duration: 0.28, ease };
    const enter = reduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 };
    const exit = reduceMotion ? { opacity: 0, y: 0 } : { opacity: 0, y: -6 };
    const contentKey = isLoading ? "loading" : error ? "error" : result ? "result" : "empty";
    const itemEase = reduceMotion ? { duration: 0 } : { duration: 0.32, ease };

    return (
        <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 h-full flex flex-col">
            <motion.div
                layout="position"
                transition={reduceMotion ? { duration: 0 } : { duration: 0.25, ease }}
            >
                <PanelHeader title="Analysis Result" subtitle={subtitle} />
            </motion.div>

            <div className="flex-1 flex flex-col justify-between min-h-[200px]">
                <AnimatePresence mode="wait" initial={false}>

                    {contentKey === "loading" && (
                        <motion.div
                            key="loading"
                            role="status"
                            aria-live="polite"
                            initial={enter}
                            animate={{ opacity: 1, y: 0 }}
                            exit={exit}
                            transition={swap}
                            className="space-y-4"
                        >
                            {showIntelCard && linkMetadata && (
                                <motion.div
                                    initial={reduceMotion ? false : { opacity: 0, y: 8 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={reduceMotion ? { duration: 0 } : { duration: 0.3, ease }}
                                >
                                    <UrlIntelCard meta={linkMetadata} domainInfo={null} />
                                </motion.div>
                            )}
                            <AnalysisSkeleton mode={mode} />
                        </motion.div>
                    )}

                    {contentKey === "error" && (
                        <motion.div
                            key="error"
                            role="alert"
                            initial={enter}
                            animate={{ opacity: 1, y: 0 }}
                            exit={exit}
                            transition={swap}
                            className="flex-1 flex flex-col justify-center gap-4"
                        >
                            {showIntelCard && linkMetadata && (
                                <motion.div
                                    initial={reduceMotion ? false : { opacity: 0, y: 8 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={reduceMotion ? { duration: 0 } : { duration: 0.3, ease }}
                                >
                                    <UrlIntelCard meta={linkMetadata} domainInfo={null} />
                                </motion.div>
                            )}
                            <div className="text-center">
                                <p className="text-slate-600 text-sm font-medium">{errorTitle}</p>
                                <p className="text-slate-500 text-xs mt-1">{error}</p>
                            </div>
                        </motion.div>
                    )}

                    {contentKey === "empty" && (
                        <motion.div
                            key="empty"
                            initial={enter}
                            animate={{ opacity: 1, y: 0 }}
                            exit={exit}
                            transition={swap}
                            className="flex-1 flex items-center justify-center rounded-lg bg-gray-50 border border-gray-100"
                        >
                            <p className="text-slate-500 text-sm font-medium px-4 text-center">{emptyHint}</p>
                        </motion.div>
                    )}

                    {contentKey === "result" && result && (
                        <motion.div
                            key="result"
                            initial={enter}
                            animate={{ opacity: 1, y: 0 }}
                            exit={exit}
                            transition={swap}
                            className="space-y-4"
                        >
                            {/* URL intel card: structure + domain details in one block */}
                            {showIntelCard && linkMetadata && (
                                <motion.div
                                    initial={reduceMotion ? false : { opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={reduceMotion ? { duration: 0 } : { ...itemEase, delay: 0.02 }}
                                >
                                    <UrlIntelCard meta={linkMetadata} domainInfo={domainInfo} />
                                </motion.div>
                            )}

                            {/* Risk verdict + probability */}
                            <motion.div
                                className="space-y-4"
                                initial={reduceMotion ? false : { opacity: 0, y: 12 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={
                                    reduceMotion
                                        ? { duration: 0 }
                                        : { ...itemEase, delay: showIntelCard ? 0.1 : 0.04 }
                                }
                            >
                                <ResultStatusIndicator riskLevel={result.risk_level} mode={mode} />
                                <PhishingProbabilityBar probability={result.phishing_probability * 100} mode={mode} />
                            </motion.div>

                            {/* Footer row */}
                            <motion.div
                                className="pt-4 mt-auto"
                                initial={reduceMotion ? false : { opacity: 0, y: 8 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={
                                    reduceMotion
                                        ? { duration: 0 }
                                        : { ...itemEase, delay: showIntelCard ? 0.18 : 0.12 }
                                }
                            >
                                <div className="border-t border-gray-100/60 mb-4" />
                                <MetadataRow label={result.label} latencyMs={result.latency_ms} />
                            </motion.div>
                        </motion.div>
                    )}

                </AnimatePresence>
            </div>
        </div>
    );
}
