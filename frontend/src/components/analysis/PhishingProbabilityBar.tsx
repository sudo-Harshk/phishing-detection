interface PhishingProbabilityBarProps {
    probability: number;
}

export default function PhishingProbabilityBar({ probability }: PhishingProbabilityBarProps) {
    const getSectionOpacity = (section: 'safe' | 'suspicious' | 'dangerous') => {
        if (probability < 40) {
            return section === 'safe' ? 'opacity-100' : 'opacity-30';
        } else if (probability < 70) {
            return section === 'suspicious' ? 'opacity-100' : 'opacity-30';
        } else {
            return section === 'dangerous' ? 'opacity-100' : 'opacity-30';
        }
    };

    const getTextColor = () => {
        if (probability < 40) return "text-emerald-600";
        if (probability < 70) return "text-amber-600";
        return "text-red-600";
    };

    const getBarWidth = () => {
        if (probability === 0) return "2%";
        if (probability >= 100) return "100%";
        return `${probability}%`;
    };

    const getActiveColor = () => {
        if (probability < 40) return "bg-emerald-500";
        if (probability < 70) return "bg-amber-500";
        return "bg-red-500";
    };

    return (
        <div className="space-y-2">
            <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-slate-600">Phishing Probability</span>
                <span className={`text-sm font-bold tabular-nums transition-colors duration-300 ${getTextColor()}`}>
                    {probability.toFixed(1)}%
                </span>
            </div>

            <div className="relative">
                <div className="flex h-3 rounded-full overflow-hidden gap-0.5">
                    <div
                        className={`flex-1 bg-emerald-400 rounded-l-full transition-opacity duration-400 ease-out ${getSectionOpacity('safe')}`}
                    />
                    <div
                        className={`flex-1 bg-amber-400 transition-opacity duration-400 ease-out ${getSectionOpacity('suspicious')}`}
                    />
                    <div
                        className={`flex-1 bg-red-400 rounded-r-full transition-opacity duration-400 ease-out ${getSectionOpacity('dangerous')}`}
                    />
                </div>

                <div
                    className={`absolute top-0 h-3 w-1 ${getActiveColor()} rounded-full shadow-sm transition-all duration-500 ease-out`}
                    style={{
                        left: `calc(${getBarWidth()} - 2px)`,
                        boxShadow: '0 0 4px rgba(0,0,0,0.2)'
                    }}
                />
            </div>

            <div className="flex justify-between text-xs font-medium">
                <span className={`transition-colors duration-300 ${probability < 40 ? 'text-emerald-600' : 'text-slate-500'}`}>
                    SAFE
                </span>
                <span className={`transition-colors duration-300 ${probability >= 40 && probability < 70 ? 'text-amber-600' : 'text-slate-500'}`}>
                    SUSPICIOUS
                </span>
                <span className={`transition-colors duration-300 ${probability >= 70 ? 'text-red-600' : 'text-slate-500'}`}>
                    DANGEROUS
                </span>
            </div>
        </div>
    );
}
