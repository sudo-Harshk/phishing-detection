interface ResultStatusIndicatorProps {
    riskLevel: "Low" | "Moderate" | "High";
    label: string;
}

const riskConfig = {
    Low: {
        bg: "bg-emerald-100/80",
        border: "border-emerald-200/60",
        iconBg: "bg-emerald-200/70",
        iconColor: "text-emerald-600",
        titleColor: "text-emerald-800",
        subtitleColor: "text-emerald-600/80",
        description: "This email appears to be safe",
    },
    Moderate: {
        bg: "bg-amber-100/80",
        border: "border-amber-200/60",
        iconBg: "bg-amber-200/70",
        iconColor: "text-amber-600",
        titleColor: "text-amber-800",
        subtitleColor: "text-amber-600/80",
        description: "This email shows suspicious patterns",
    },
    High: {
        bg: "bg-red-100/80",
        border: "border-red-200/60",
        iconBg: "bg-red-200/70",
        iconColor: "text-red-600",
        titleColor: "text-red-800",
        subtitleColor: "text-red-600/80",
        description: "This email is likely a phishing attempt",
    },
};

const riskLabels = {
    Low: "Low Risk",
    Moderate: "Medium Risk",
    High: "High Risk",
};

export default function ResultStatusIndicator({ riskLevel, label }: ResultStatusIndicatorProps) {
    const config = riskConfig[riskLevel];

    return (
        <div className={`flex items-center gap-4 p-6 ${config.bg} border ${config.border} rounded-xl`}>
            {/* Shield Check Icon */}
            <div className={`flex-shrink-0 w-14 h-14 ${config.iconBg} rounded-full flex items-center justify-center`}>
                <svg
                    className={`w-7 h-7 ${config.iconColor}`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2.5}
                >
                    {riskLevel === "High" ? (
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                        />
                    ) : (
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                        />
                    )}
                </svg>
            </div>

            {/* Text Content */}
            <div>
                <h3 className={`text-xl font-bold ${config.titleColor} tracking-tight`}>
                    {riskLabels[riskLevel]}
                </h3>
                <p className={`text-sm ${config.subtitleColor} mt-0.5`}>
                    {config.description}
                </p>
            </div>
        </div>
    );
}
