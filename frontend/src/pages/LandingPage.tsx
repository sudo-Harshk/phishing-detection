import { Link } from "react-router-dom";

/**
 * Academic landing page for the phishing detection system.
 * Simple, clean, examiner-friendly.
 */
export default function LandingPage() {
    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
            <div className="max-w-3xl w-full py-16">
                {/* Hero Section */}
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold text-gray-900 mb-4 tracking-tight">
                        Phishing Email Detection System
                    </h1>
                    <p className="text-lg text-gray-600">
                        Character-level deep learning–based phishing detection for academic research
                    </p>
                </div>

                {/* System Description */}
                <div className="text-center mb-10">
                    <p className="text-gray-600 leading-relaxed max-w-2xl mx-auto">
                        This system analyzes email content using trained deep learning models to assess phishing risk.
                        It outputs a probability score and risk classification to support cybersecurity research and demonstrations.
                    </p>
                </div>

                {/* Key Capabilities */}
                <div className="flex justify-center mb-12">
                    <ul className="text-left text-gray-700 space-y-3">
                        <li className="flex items-center gap-3">
                            <span className="w-1.5 h-1.5 bg-gray-400 rounded-full" />
                            Character-level text analysis
                        </li>
                        <li className="flex items-center gap-3">
                            <span className="w-1.5 h-1.5 bg-gray-400 rounded-full" />
                            Real-time phishing risk estimation
                        </li>
                        <li className="flex items-center gap-3">
                            <span className="w-1.5 h-1.5 bg-gray-400 rounded-full" />
                            Probability-based confidence output
                        </li>
                    </ul>
                </div>

                {/* Primary CTA */}
                <div className="text-center">
                    <Link
                        to="/demo"
                        className="btn-primary inline-flex items-center gap-2"
                    >
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                        </svg>
                        Try the Demo
                    </Link>
                </div>

                {/* Disclaimer */}
                <div className="text-center mt-8">
                    <p className="text-xs text-gray-400">
                        Academic research demonstration · Not for production use
                    </p>
                </div>
            </div>
        </div>
    );
}
