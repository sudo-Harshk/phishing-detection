import { motion } from "framer-motion";

type RiskLevel = "Low" | "Moderate" | "High";

interface RiskBadgeProps {
    level: RiskLevel;
    className?: string;
}

/**
 * Task 6: Hero Risk Indicator
 * Visually dominant, color-coded risk badge with icon.
 * Recognizable at a glance.
 */
export default function RiskBadge({ level, className = "" }: RiskBadgeProps) {
    const config = {
        Low: {
            bg: "bg-emerald-50",
            border: "border-emerald-200",
            text: "text-emerald-700",
            icon: (
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
            ),
            label: "Low Risk",
            pulseClass: "",
        },
        Moderate: {
            bg: "bg-amber-50",
            border: "border-amber-200",
            text: "text-amber-700",
            icon: (
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
            ),
            label: "Moderate Risk",
            pulseClass: "",
        },
        High: {
            bg: "bg-red-50",
            border: "border-red-200",
            text: "text-red-700",
            icon: (
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
            ),
            label: "High Risk",
            pulseClass: "animate-pulse-risk",
        },
    };

    const c = config[level];

    return (
        <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className={`
        inline-flex items-center gap-3
        px-5 py-3
        rounded-xl
        border-2
        ${c.bg} ${c.border} ${c.text}
        ${c.pulseClass}
        ${className}
      `}
        >
            <span className="flex-shrink-0">{c.icon}</span>
            <span className="font-semibold text-lg tracking-tight">{c.label}</span>
        </motion.div>
    );
}
