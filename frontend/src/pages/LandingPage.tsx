import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import NeuralNetworkAnimatedBeam from "../components/NeuralNetworkAnimatedBeam";
import SystemArchitectureSvg from "@/assets/System.svg?url";
import "../styles/landing-theme.css";

const NAV_LINKS = [
    { label: "Overview", href: "#overview" },
    { label: "Architecture", href: "#architecture" },
    { label: "Features", href: "#features" },
    { label: "Demo", href: "#demo" },
];

const SECTION_MAX_WIDTH = "max-w-6xl";

export default function LandingPage() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [activeSection, setActiveSection] = useState("");

    useEffect(() => {
        const handleScroll = () => {
            const sections = NAV_LINKS.map(link => link.href.substring(1));
            const scrollPosition = window.scrollY + 100;

            if (window.innerHeight + Math.round(window.scrollY) >= document.body.offsetHeight - 50) {
                setActiveSection(sections[sections.length - 1]);
                return;
            }
            for (const section of [...sections].reverse()) {
                const element = document.getElementById(section);
                if (element && element.offsetTop <= scrollPosition) {
                    setActiveSection(section);
                    return;
                }
            }
            setActiveSection(sections[0]);
        };

        window.addEventListener("scroll", handleScroll);
        handleScroll();
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <div className="landing-page min-h-screen bg-white text-[#262626] font-sans tracking-tight">
            <a href="#overview" className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-6 focus:z-[100] focus:px-4 focus:py-2 focus:bg-indigo-600 focus:text-white focus:rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500">
                Skip to content
            </a>

            {/* ── Navbar ──────────────────────────────────── */}
            <nav className="lp-navbar-bg fixed top-0 left-0 right-0 z-50 bg-white backdrop-blur-md border-b border-gray-100 transition-all duration-300">
                <div className={`${SECTION_MAX_WIDTH} mx-auto flex items-center justify-between px-6 py-4 lg:px-8`}>
                    <span className="text-[0.9375rem] font-semibold text-[#262626] select-none truncate pr-4">
                        <span className="hidden sm:inline">Phishing Detection System</span>
                        <span className="sm:hidden">Phishing Detection</span>
                    </span>

                    <div className="hidden md:flex items-center gap-6">
                        <span className="text-xs text-[#616161] font-medium tabular-nums" aria-live="polite">
                            {NAV_LINKS.findIndex((l) => l.href.substring(1) === activeSection) + 1 || 1} of {NAV_LINKS.length}
                        </span>
                        <ul className="flex items-center gap-8">
                            {NAV_LINKS.map((link) => (
                                <li key={link.label}>
                                    <a
                                        href={link.href}
                                        className={`text-sm font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:rounded ${activeSection === link.href.substring(1)
                                            ? "text-[#262626] border-b-[1.5px] border-[#262626] pb-0.5"
                                            : "text-[#616161] hover:text-[#262626]"
                                            }`}
                                    >
                                        {link.label}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <button
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        className="md:hidden p-2 -mr-2 text-[#616161] hover:text-[#262626] transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 rounded"
                        aria-label="Toggle menu"
                    >
                        {mobileMenuOpen ? (
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        ) : (
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 9h16.5m-16.5 6.75h16.5" />
                            </svg>
                        )}
                    </button>
                </div>

                {mobileMenuOpen && (
                    <div className="md:hidden border-t border-slate-200/60 bg-white backdrop-blur-lg">
                        <p className="px-6 pt-4 pb-2 text-xs text-[#616161] font-medium tabular-nums" aria-live="polite">
                            Section {NAV_LINKS.findIndex((l) => l.href.substring(1) === activeSection) + 1 || 1} of {NAV_LINKS.length}
                        </p>
                        <ul className="flex flex-col px-6 py-2 gap-3">
                            {NAV_LINKS.map((link) => (
                                <li key={link.label}>
                                    <a
                                        href={link.href}
                                        onClick={() => setMobileMenuOpen(false)}
                                        className={`block text-sm py-2 font-medium transition-colors duration-200 ${activeSection === link.href.substring(1)
                                            ? "text-[#262626]"
                                            : "text-[#616161] hover:text-[#262626]"
                                            }`}
                                    >
                                        {link.label}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </nav>

            {/* ── Hero ────────────────────────────────────── */}
            <section className="relative w-full overflow-hidden">
                <div className="lp-hero-bg absolute inset-0 -z-10 pointer-events-none" aria-hidden />
                <main className={`relative ${SECTION_MAX_WIDTH} mx-auto px-6 lg:px-8 pt-20 pb-16 md:pt-28 md:pb-20`}>
                    <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-20">
                        <div className="flex-1 max-w-xl space-y-4">
                            <p className="lp-label text-sm font-medium tracking-wide uppercase">
                                AI-Powered Security Research
                            </p>

                            <h1 className="text-5xl md:text-6xl font-medium tracking-tight leading-tight text-[#262626]">
                                Detect Phishing. Analyse&nbsp;URLs. Stay&nbsp;Protected.
                            </h1>
                            <p className="lp-body-lg text-lg leading-relaxed max-w-lg">
                                A research platform that analyses email content using transformer models
                                and checks URLs against 90+ security engines — in real time.
                            </p>

                            <div className="flex flex-wrap items-center gap-4 pt-2">
                                <Link
                                    to="/analyze"
                                    className="lp-btn-primary inline-flex items-center gap-2"
                                >
                                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" aria-hidden>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.59 14.37a6 6 0 01-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 006.16-12.12A14.98 14.98 0 009.631 8.41m5.96 5.96a14.926 14.926 0 01-5.841 2.58m-.119-8.54a6 6 0 00-7.381 5.84h4.8m2.581-5.84a14.927 14.927 0 00-2.58 5.841m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 01-2.448-2.448 14.9 14.9 0 01.06-.312m-2.24 2.39a4.493 4.493 0 00-1.757 4.306 4.493 4.493 0 004.306-1.758M16.5 9a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
                                    </svg>
                                    Open Security Analyser
                                </Link>

                                <a
                                    href="#architecture"
                                    className="lp-btn-secondary inline-flex items-center gap-2"
                                >
                                    Explore Architecture
                                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75" />
                                    </svg>
                                </a>
                            </div>
                            <p className="lp-small mt-4">No signup required — try it instantly</p>
                        </div>

                        <div className="flex-1 w-full max-w-lg lg:max-w-none">
                            <NeuralNetworkAnimatedBeam />
                        </div>
                    </div>
                </main>
            </section>

            {/* ── Overview ────────────────────────────────── */}
            <section id="overview" className="lp-overview-bg w-full border-t border-gray-100">
                <div className={`${SECTION_MAX_WIDTH} mx-auto px-6 lg:px-8 py-16`}>
                    <div className="text-center mb-16">
                        <p className="lp-label mb-2">Research Overview</p>
                        <h2 className="text-3xl md:text-4xl font-medium tracking-tight text-[#262626] mb-4">
                            Research Objective
                        </h2>
                        <p className="lp-body-lg max-w-2xl mx-auto">
                            The system analyses raw email content and URLs, predicting whether they
                            represent a legitimate communication or a phishing attempt.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="lp-card-overview border border-green-100 rounded-[var(--lp-radius-lg)] p-6 flex flex-col items-center text-center">
                            <div className="w-12 h-12 bg-green-100/50 rounded-full flex items-center justify-center mb-4">
                                <svg className="w-6 h-6 text-green-600" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                            <h3 className="font-semibold text-green-900 text-lg mb-2">Clean</h3>
                            <p className="text-sm text-green-800">Message or URL identified as legitimate.</p>
                        </div>

                        <div className="lp-card-overview border border-amber-100 rounded-[var(--lp-radius-lg)] p-6 flex flex-col items-center text-center">
                            <div className="w-12 h-12 bg-amber-100/50 rounded-full flex items-center justify-center mb-4">
                                <svg className="w-6 h-6 text-amber-600" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2.25m0 2.625h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                            <h3 className="font-semibold text-amber-900 text-lg mb-2">Suspicious</h3>
                            <p className="text-sm text-amber-800">Contains potential phishing indicators.</p>
                        </div>

                        <div className="lp-card-overview border border-rose-100 rounded-[var(--lp-radius-lg)] p-6 flex flex-col items-center text-center">
                            <div className="w-12 h-12 bg-rose-100/50 rounded-full flex items-center justify-center mb-4">
                                <svg className="w-6 h-6 text-rose-600" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
                                </svg>
                            </div>
                            <h3 className="font-semibold text-rose-900 text-lg mb-2">Phishing</h3>
                            <p className="text-sm text-rose-800">High probability of a malicious attack.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* ── Architecture ────────────────────────────── */}
            <section id="architecture" className="lp-architecture-bg w-full border-t border-gray-100">
                <div className={`${SECTION_MAX_WIDTH} mx-auto px-6 lg:px-8 py-16`}>
                    <div className="text-center mb-10">
                        <p className="lp-label mb-2">How It Works</p>
                        <h2 className="text-3xl md:text-4xl font-medium tracking-tight text-[#262626] mb-4">
                            System Architecture
                        </h2>
                        <p className="lp-body-lg max-w-2xl mx-auto">
                            Email content and URLs flow from input through the backend API to deep learning
                            models and threat intelligence engines, with results displayed instantly.
                        </p>
                    </div>
                    <div className="rounded-2xl border border-gray-200 overflow-hidden bg-white shadow-sm w-full">
                        <img
                            src={SystemArchitectureSvg}
                            alt="Phishing Detection System Architecture"
                            className="w-full h-auto object-contain"
                        />
                    </div>
                </div>
            </section>

            {/* ── Features ────────────────────────────────── */}
            <section id="features" className="lp-features-bg w-full border-t border-gray-100">
                <div className={`${SECTION_MAX_WIDTH} mx-auto px-6 lg:px-8 py-16`}>
                    <div className="text-center mb-10">
                        <p className="lp-label mb-2">Capabilities</p>
                        <h2 className="text-3xl md:text-4xl font-medium tracking-tight text-[#262626] mb-4">
                            Core Features
                        </h2>
                        <p className="lp-body-lg max-w-2xl mx-auto">
                            Two analysis modes backed by real threat intelligence and deep learning.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="lp-card-features border border-gray-200 rounded-[var(--lp-radius-lg)] p-6 flex flex-col sm:flex-row items-start gap-4 hover:shadow-md hover:-translate-y-0.5 motion-reduce:hover:translate-y-0 transition-all duration-200">
                            <div className="flex-shrink-0 w-10 h-10 rounded-full bg-indigo-50 flex items-center justify-center">
                                <svg className="w-5 h-5 text-indigo-600" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 9v.906a2.25 2.25 0 01-1.183 1.981l-6.478 3.488M2.25 9v.906a2.25 2.25 0 001.183 1.981l6.478 3.488m8.839 2.51l-4.66-2.51m0 0l-1.023-.55a2.25 2.25 0 00-2.134 0l-1.022.55m0 0l-4.661 2.51m16.5 1.615a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V8.844a2.25 2.25 0 011.183-1.981l7.5-4.04a2.25 2.25 0 012.134 0l7.5 4.04a2.25 2.25 0 011.183 1.98V19.5z" />
                                </svg>
                            </div>
                            <div>
                                <h3 className="font-semibold text-[#262626] mb-1">Email Analysis</h3>
                                <p className="lp-body text-sm">
                                    DistilBERT transformer model classifies email content as Clean, Suspicious, or Phishing with a real-time confidence score.
                                </p>
                            </div>
                        </div>

                        <div className="lp-card-features border border-gray-200 rounded-[var(--lp-radius-lg)] p-6 flex flex-col sm:flex-row items-start gap-4 hover:shadow-md hover:-translate-y-0.5 motion-reduce:hover:translate-y-0 transition-all duration-200">
                            <div className="flex-shrink-0 w-10 h-10 rounded-full bg-indigo-50 flex items-center justify-center">
                                <svg className="w-5 h-5 text-indigo-600" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244" />
                                </svg>
                            </div>
                            <div>
                                <h3 className="font-semibold text-[#262626] mb-1">URL Threat Intelligence</h3>
                                <p className="lp-body text-sm">
                                    Checks URLs against 90+ security engines simultaneously, returning a threat probability score and engine verdict breakdown.
                                </p>
                            </div>
                        </div>

                        <div className="lp-card-features border border-gray-200 rounded-[var(--lp-radius-lg)] p-6 flex flex-col sm:flex-row items-start gap-4 hover:shadow-md hover:-translate-y-0.5 motion-reduce:hover:translate-y-0 transition-all duration-200">
                            <div className="flex-shrink-0 w-10 h-10 rounded-full bg-emerald-50 flex items-center justify-center">
                                <svg className="w-5 h-5 text-emerald-600" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418" />
                                </svg>
                            </div>
                            <div>
                                <h3 className="font-semibold text-[#262626] mb-1">Domain Intelligence</h3>
                                <p className="lp-body text-sm">
                                    Surfaces registrar, registration date, country, and community threat categories for any scanned domain.
                                </p>
                            </div>
                        </div>

                        <div className="lp-card-features border border-gray-200 rounded-[var(--lp-radius-lg)] p-6 flex flex-col sm:flex-row items-start gap-4 hover:shadow-md hover:-translate-y-0.5 motion-reduce:hover:translate-y-0 transition-all duration-200">
                            <div className="flex-shrink-0 w-10 h-10 rounded-full bg-rose-50 flex items-center justify-center">
                                <svg className="w-5 h-5 text-rose-500" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
                                </svg>
                            </div>
                            <div>
                                <h3 className="font-semibold text-[#262626] mb-1">Risk Scoring</h3>
                                <p className="lp-body text-sm">
                                    Every analysis produces a 0–100% threat probability with a Low / Moderate / High risk level and animated visual indicator.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ── Demo CTA ────────────────────────────────── */}
            <section id="demo" className="lp-demo-bg w-full border-t border-gray-100">
                <div className={`${SECTION_MAX_WIDTH} mx-auto px-6 lg:px-8 py-16 text-center`}>
                    <div className="mb-8">
                        <p className="lp-label mb-2">Try It Now</p>
                        <h2 className="text-3xl md:text-4xl font-medium tracking-tight text-[#262626] mb-4">
                            Try the Security Analyser
                        </h2>
                        <p className="lp-body-lg max-w-xl mx-auto">
                            Paste an email message or a URL and let the system analyse it for phishing
                            indicators and threat intelligence — no account needed.
                        </p>
                    </div>
                    <Link
                        to="/analyze"
                        className="lp-btn-primary inline-flex items-center gap-2"
                    >
                        Open Analyser
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" aria-hidden>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                        </svg>
                    </Link>
                </div>
            </section>

            {/* ── Footer ──────────────────────────────────── */}
            <footer className="lp-footer-bg w-full border-t border-gray-200 py-10 bg-white">
                <div className={`flex flex-col items-center gap-3 ${SECTION_MAX_WIDTH} mx-auto px-6`}>
                    <p className="text-sm text-[#262626] font-medium text-center">
                        MTech Final Year Research Project | Cybersecurity and Machine Learning
                    </p>
                    <div className="flex gap-6 text-xs text-[#616161]">
                        <a href="https://github.com/sudo-Harshk" className="lp-link hover:text-indigo-700 transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 rounded px-1" target="_blank" rel="noopener noreferrer">
                            GitHub
                        </a>
                        <a href="#overview" className="lp-link hover:text-indigo-700 transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 rounded px-1">
                            Overview
                        </a>
                        <a href="#architecture" className="lp-link hover:text-indigo-700 transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 rounded px-1">
                            Architecture
                        </a>
                        <Link to="/analyze" className="lp-link hover:text-indigo-700 transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 rounded px-1">
                            Demo
                        </Link>
                    </div>
                </div>
            </footer>
        </div>
    );
}
