import { motion } from "framer-motion";

interface ProbabilityGaugeProps {
    probability: number; // 0-1 value
    className?: string;
}

/**
 * Task 7: Probability Gauge
 * Horizontal progress bar with semantic color segments.
 * 0-30% Green, 31-70% Amber, 71-100% Red
 */
export default function ProbabilityGauge({ probability, className = "" }: ProbabilityGaugeProps) {
    const percentage = Math.round(probability * 100);

    // Determine color based on percentage
    const getColor = () => {
        if (percentage <= 30) return { bar: "bg-emerald-500", text: "text-emerald-600" };
        if (percentage <= 70) return { bar: "bg-amber-500", text: "text-amber-600" };
        return { bar: "bg-red-500", text: "text-red-600" };
    };

    const colors = getColor();

    return (
        <div className={`space-y-2 ${className}`}>
            <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-600">
                    Phishing Probability
                </span>
                <span className={`font-mono text-sm font-semibold ${colors.text}`}>
                    {percentage}%
                </span>
            </div>

            {/* Gauge Track */}
            <div className="relative h-3 bg-gray-100 rounded-full overflow-hidden">
                {/* Segment markers */}
                <div className="absolute inset-0 flex">
                    <div className="w-[30%] border-r border-gray-200/50" />
                    <div className="w-[40%] border-r border-gray-200/50" />
                    <div className="w-[30%]" />
                </div>

                {/* Animated fill */}
                <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${percentage}%` }}
                    transition={{ duration: 0.5, ease: "easeOut", delay: 0.1 }}
                    className={`absolute inset-y-0 left-0 ${colors.bar} rounded-full`}
                    style={{
                        boxShadow: "inset 0 1px 0 rgba(255,255,255,0.3)",
                    }}
                />
            </div>

            {/* Segment labels */}
            <div className="flex text-xs text-gray-400 font-medium">
                <span className="w-[30%] text-left">Safe</span>
                <span className="w-[40%] text-center">Suspicious</span>
                <span className="w-[30%] text-right">Dangerous</span>
            </div>
        </div>
    );
}
