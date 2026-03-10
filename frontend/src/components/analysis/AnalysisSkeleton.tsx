export default function AnalysisSkeleton() {
    return (
        <div className="animate-pulse space-y-5">
            <div className="flex items-center gap-4 p-6 bg-gray-100 rounded-xl">
                <div className="flex-shrink-0 w-14 h-14 bg-gray-200 rounded-full" />
                <div className="space-y-2 flex-1">
                    <div className="h-5 bg-gray-200 rounded w-24" />
                    <div className="h-4 bg-gray-200 rounded w-48" />
                </div>
            </div>

            <div className="space-y-2">
                <div className="flex justify-between">
                    <div className="h-4 bg-gray-200 rounded w-28" />
                    <div className="h-4 bg-gray-200 rounded w-12" />
                </div>
                <div className="h-3 bg-gray-200 rounded-full" />
                <div className="flex justify-between">
                    <div className="h-3 bg-gray-200 rounded w-10" />
                    <div className="h-3 bg-gray-200 rounded w-16" />
                    <div className="h-3 bg-gray-200 rounded w-16" />
                </div>
            </div>

            <div className="border-t border-gray-100" />

            <div className="flex gap-4">
                <div className="h-4 bg-gray-200 rounded w-28" />
                <div className="h-4 bg-gray-200 rounded w-20" />
            </div>

            <p className="text-xs text-gray-400 text-center mt-4">
                Analyzing email security…
            </p>
        </div>
    );
}
