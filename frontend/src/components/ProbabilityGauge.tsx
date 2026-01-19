import { useState, useEffect, useRef } from "react";

interface ProbabilityGaugeProps {
    probability: number; // 0-1 value
    className?: string;
}

/**
 * Probability Gauge with smooth interpolation
 * Bar smoothly settles from previous value to new value
 * Uses requestAnimationFrame for frame-synced smoothness
 */
export default function ProbabilityGauge({ probability, className = "" }: ProbabilityGaugeProps) {
    const [displayedProb, setDisplayedProb] = useState(0);
    const targetProbRef = useRef(probability);

    // Clamp probability between 0 and 1
    const targetProb = Math.max(0, Math.min(1, probability));
    targetProbRef.current = targetProb;

    // Interpolation effect
    useEffect(() => {
        let rafId: number;

        const animate = () => {
            setDisplayedProb(prev => {
                const target = targetProbRef.current;
                const delta = target - prev;

                // Snap to target when close enough
                if (Math.abs(delta) < 0.001) {
                    return target;
                }

                // Smooth interpolation with 0.12 factor (ease-out feel)
                const next = prev + delta * 0.12;

                // Clamp result
                return Math.max(0, Math.min(1, next));
            });

            rafId = requestAnimationFrame(animate);
        };

        rafId = requestAnimationFrame(animate);

        return () => cancelAnimationFrame(rafId);
    }, [targetProb]);

    // Display values
    const displayPercentage = Math.round(displayedProb * 100);
    const actualPercentage = Math.round(targetProb * 100);

    // Determine color based on ACTUAL target percentage (not displayed)
    const getColor = () => {
        if (actualPercentage <= 30) return { bar: "bg-emerald-500", text: "text-emerald-600" };
        if (actualPercentage <= 70) return { bar: "bg-amber-500", text: "text-amber-600" };
        return { bar: "bg-red-500", text: "text-red-600" };
    };

    const colors = getColor();

    return (
        <div className={`space-y-2 ${className}`}>
            <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-600">
                    Phishing Probability
                </span>
                {/* Numeric label shows actual value immediately */}
                <span className={`font-mono text-sm font-semibold ${colors.text}`}>
                    {actualPercentage}%
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

                {/* Interpolated fill - NO CSS transition */}
                <div
                    className={`absolute inset-y-0 left-0 ${colors.bar} rounded-full`}
                    style={{
                        width: `${displayPercentage}%`,
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
