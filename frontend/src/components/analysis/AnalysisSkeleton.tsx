import { motion, useReducedMotion } from "framer-motion";

export default function AnalysisSkeleton({ mode = "email" }: { mode?: "email" | "url" }) {
    const reduceMotion = useReducedMotion();
    const instant = reduceMotion ? { duration: 0 } : false;
    const row = reduceMotion
        ? {}
        : {
              initial: { opacity: 0, y: 8 },
              animate: { opacity: 1, y: 0 },
          };

    return (
        <motion.div
            className="space-y-5"
            initial={reduceMotion ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={instant || { duration: 0.2 }}
        >
            <motion.div
                className="animate-pulse flex items-center gap-4 p-6 bg-gray-100 rounded-xl"
                {...row}
                transition={instant || { duration: 0.35, ease: [0.25, 0.1, 0.25, 1], delay: 0.02 }}
            >
                <div className="flex-shrink-0 w-14 h-14 bg-gray-200 rounded-full" />
                <div className="space-y-2 flex-1">
                    <div className="h-5 bg-gray-200 rounded w-24" />
                    <div className="h-4 bg-gray-200 rounded w-48" />
                </div>
            </motion.div>

            <motion.div
                className="animate-pulse space-y-2"
                {...row}
                transition={instant || { duration: 0.35, ease: [0.25, 0.1, 0.25, 1], delay: 0.1 }}
            >
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
            </motion.div>

            <motion.div
                className="animate-pulse border-t border-gray-100"
                {...row}
                transition={instant || { duration: 0.35, ease: [0.25, 0.1, 0.25, 1], delay: 0.18 }}
            >
                <div className="flex gap-4 pt-5">
                    <div className="h-4 bg-gray-200 rounded w-28" />
                    <div className="h-4 bg-gray-200 rounded w-20" />
                </div>
            </motion.div>

            <motion.p
                className="text-xs text-slate-500 text-center mt-4"
                initial={reduceMotion ? false : { opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={instant || { duration: 0.3, delay: 0.22 }}
            >
                {mode === "url" ? "Checking link security…" : "Analyzing email security…"}
            </motion.p>
        </motion.div>
    );
}
