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
        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100 h-full flex flex-col">
            <PanelHeader
                title="Analysis Result"
                subtitle={isLoading ? "Analyzing..." : "Email security assessment"}
            />

            {/* Analysis Content - Distribute evenly */}
            <div className="flex-1 flex flex-col justify-between">
                {/* Loading State - Skeleton */}
                {isLoading && (
                    <div className="transition-opacity duration-200 ease-out">
                        <AnalysisSkeleton />
                    </div>
                )}

                {/* Error State */}
                {error && !isLoading && (
                    <div className="flex-1 flex items-center justify-center transition-opacity duration-200 ease-out">
                        <div className="text-center">
                            <p className="text-gray-600 text-sm font-medium">
                                Unable to analyze email
                            </p>
                            <p className="text-gray-400 text-xs mt-1">
                                Please try again.
                            </p>
                        </div>
                    </div>
                )}

                {/* Empty State */}
                {!result && !isLoading && !error && (
                    <div className="flex-1 flex items-center justify-center rounded-lg bg-gray-50 border border-gray-100 transition-opacity duration-200 ease-out">
                        <p className="text-gray-400 text-sm font-medium">
                            Run an analysis to view results
                        </p>
                    </div>
                )}

                {/* Result State - Fades in */}
                {result && !isLoading && !error && (
                    <div className="transition-opacity duration-200 ease-out opacity-100">
                        <div className="space-y-5">
                            {/* Hero: Risk Status */}
                            <ResultStatusIndicator
                                riskLevel={result.risk_level}
                                label={result.label}
                            />

                            {/* Probability Bar */}
                            <PhishingProbabilityBar
                                probability={result.phishing_probability * 100}
                            />
                        </div>

                        {/* Bottom Section */}
                        <div className="pt-5 mt-auto">
                            {/* Softer Divider */}
                            <div className="border-t border-gray-100/60 mb-5" />

                            {/* Metadata */}
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
