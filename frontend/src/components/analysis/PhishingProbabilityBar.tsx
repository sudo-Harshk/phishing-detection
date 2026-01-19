interface PhishingProbabilityBarProps {
    probability: number; // 0-100
}

export default function PhishingProbabilityBar({ probability }: PhishingProbabilityBarProps) {
    // Determine which section is active based on probability
    const getSectionOpacity = (section: 'safe' | 'suspicious' | 'dangerous') => {
        if (probability < 40) {
            return section === 'safe' ? 'opacity-100' : 'opacity-30';
        } else if (probability < 70) {
            return section === 'suspicious' ? 'opacity-100' : 'opacity-30';
        } else {
            return section === 'dangerous' ? 'opacity-100' : 'opacity-30';
        }
    };

    // Determine percentage text color
    const getTextColor = () => {
        if (probability < 40) return "text-emerald-600";
        if (probability < 70) return "text-amber-600";
        return "text-red-600";
    };

    // Ensure bar visibility for edge cases
    const getBarWidth = () => {
        if (probability === 0) return "2%"; // Minimum visible width
        if (probability >= 100) return "100%";
        return `${probability}%`;
    };

    // Get active section color for the indicator line
    const getActiveColor = () => {
        if (probability < 40) return "bg-emerald-500";
        if (probability < 70) return "bg-amber-500";
        return "bg-red-500";
    };

    return (
        <div className="space-y-2">
            {/* Title Row */}
            <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-gray-600">Phishing Probability</span>
                <span className={`text-sm font-bold tabular-nums transition-colors duration-300 ${getTextColor()}`}>
                    {probability.toFixed(1)}%
                </span>
            </div>

            {/* Segmented Bar - Fixed position, highlights active section */}
            <div className="relative">
                {/* Background segments */}
                <div className="flex h-3 rounded-full overflow-hidden gap-0.5">
                    {/* Safe Section (0-40%) */}
                    <div
                        className={`flex-1 bg-emerald-400 rounded-l-full transition-opacity duration-400 ease-out ${getSectionOpacity('safe')}`}
                    />
                    {/* Suspicious Section (40-70%) */}
                    <div
                        className={`flex-1 bg-amber-400 transition-opacity duration-400 ease-out ${getSectionOpacity('suspicious')}`}
                    />
                    {/* Dangerous Section (70-100%) */}
                    <div
                        className={`flex-1 bg-red-400 rounded-r-full transition-opacity duration-400 ease-out ${getSectionOpacity('dangerous')}`}
                    />
                </div>

                {/* Probability indicator line - animates smoothly */}
                <div
                    className={`absolute top-0 h-3 w-1 ${getActiveColor()} rounded-full shadow-sm transition-all duration-500 ease-out`}
                    style={{
                        left: `calc(${getBarWidth()} - 2px)`,
                        boxShadow: '0 0 4px rgba(0,0,0,0.2)'
                    }}
                />
            </div>

            {/* Scale Labels */}
            <div className="flex justify-between text-xs font-medium">
                <span className={`transition-colors duration-300 ${probability < 40 ? 'text-emerald-600' : 'text-gray-400'}`}>
                    SAFE
                </span>
                <span className={`transition-colors duration-300 ${probability >= 40 && probability < 70 ? 'text-amber-600' : 'text-gray-400'}`}>
                    SUSPICIOUS
                </span>
                <span className={`transition-colors duration-300 ${probability >= 70 ? 'text-red-600' : 'text-gray-400'}`}>
                    DANGEROUS
                </span>
            </div>
        </div>
    );
}
