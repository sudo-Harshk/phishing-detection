import PanelHeader from "../common/PanelHeader";
import ResultStatusIndicator from "../analysis/ResultStatusIndicator";
import PhishingProbabilityBar from "../analysis/PhishingProbabilityBar";
import MetadataRow from "../analysis/MetadataRow";
import AnalysisSkeleton from "../analysis/AnalysisSkeleton";

export type AnalysisResult = {
    label: string;
    phishing_probability: number;
    risk_level: "Low" | "Moderate" | "High";
    latency_ms: number;
};

interface AnalysisResultPanelProps {
    result: AnalysisResult | null;
    isLoading: boolean;
    error: string | null;
}

export default function AnalysisResultPanel({ result, isLoading, error }: AnalysisResultPanelProps) {
    return (
        <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 h-full flex flex-col">
            <PanelHeader
                title="Analysis Result"
                subtitle={isLoading ? "Analyzing..." : "Email security assessment"}
            />

            <div className="flex-1 flex flex-col justify-between">
                {isLoading && (
                    <div className="transition-opacity duration-200 ease-out">
                        <AnalysisSkeleton />
                    </div>
                )}

                {error && !isLoading && (
                    <div className="flex-1 flex items-center justify-center transition-opacity duration-200 ease-out">
                        <div className="text-center">
                            <p className="text-slate-600 text-sm font-medium">
                                Unable to analyze email
                            </p>
                            <p className="text-slate-500 text-xs mt-1">
                                Please try again.
                            </p>
                        </div>
                    </div>
                )}

                {!result && !isLoading && !error && (
                    <div className="flex-1 flex items-center justify-center rounded-lg bg-gray-50 border border-gray-100 transition-opacity duration-200 ease-out">
                        <p className="text-slate-500 text-sm font-medium">
                            Run an analysis to view results
                        </p>
                    </div>
                )}

                {result && !isLoading && !error && (
                    <div className="transition-opacity duration-200 ease-out opacity-100">
                        <div className="space-y-5">
                            <ResultStatusIndicator
                                riskLevel={result.risk_level}
                            />

                            <PhishingProbabilityBar
                                probability={result.phishing_probability * 100}
                            />
                        </div>

                        <div className="pt-5 mt-auto">
                            <div className="border-t border-gray-100/60 mb-5" />

                            <MetadataRow
                                label={result.label}
                                latencyMs={result.latency_ms}
                            />
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
