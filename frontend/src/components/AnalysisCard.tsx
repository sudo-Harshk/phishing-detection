import type { ReactNode } from "react";
import { motion } from "framer-motion";

interface AnalysisCardProps {
    children: ReactNode;
    className?: string;
}

/**
 * Task 5: Analysis Card Surface
 * Floating card container with rounded corners, soft shadows, and subtle gradient.
 */
export default function AnalysisCard({ children, className = "" }: AnalysisCardProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 12 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className={`
        relative overflow-hidden
        rounded-xl
        bg-gradient-to-br from-white to-gray-50
        border border-gray-100
        shadow-xl
        p-6
        ${className}
      `}
            style={{
                boxShadow: "0 20px 40px -12px rgba(0, 0, 0, 0.12), 0 8px 20px -8px rgba(0, 0, 0, 0.08)",
            }}
        >
            {/* Subtle gradient overlay for depth */}
            <div
                className="absolute inset-0 pointer-events-none"
                style={{
                    background: "linear-gradient(135deg, rgba(255,255,255,0.4) 0%, transparent 50%)",
                }}
            />
            <div className="relative z-10">
                {children}
            </div>
        </motion.div>
    );
}
