/**
 * Task 8: Loading Skeleton
 * Matches the shape/size of the final result card to prevent layout jump.
 */
export default function LoadingSkeleton() {
    return (
        <div className="rounded-xl border border-gray-100 bg-white p-6 shadow-lg">
            {/* Risk badge skeleton */}
            <div className="skeleton h-12 w-40 mb-6" />

            {/* Probability gauge skeleton */}
            <div className="space-y-2 mb-6">
                <div className="flex justify-between">
                    <div className="skeleton h-4 w-32" />
                    <div className="skeleton h-4 w-12" />
                </div>
                <div className="skeleton h-3 w-full rounded-full" />
                <div className="flex justify-between">
                    <div className="skeleton h-3 w-10" />
                    <div className="skeleton h-3 w-16" />
                    <div className="skeleton h-3 w-16" />
                </div>
            </div>

            {/* Divider skeleton */}
            <div className="skeleton h-px w-full my-5" />

            {/* Metadata rows skeleton */}
            <div className="space-y-3">
                <div className="flex justify-between">
                    <div className="skeleton h-4 w-20" />
                    <div className="skeleton h-4 w-24" />
                </div>
                <div className="flex justify-between">
                    <div className="skeleton h-4 w-16" />
                    <div className="skeleton h-4 w-16" />
                </div>
                <div className="flex justify-between">
                    <div className="skeleton h-4 w-24" />
                    <div className="skeleton h-4 w-20" />
                </div>
            </div>
        </div>
    );
}
