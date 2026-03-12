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
            <a href="#overview" className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-6 focus:z-[100] focus:px-4 focus:py-2 focus:bg-[#0078d4] focus:text-white focus:rounded-md focus:outline-none focus:ring-2 focus:ring-[#0078d4]">
                Skip to content
            </a>
            <nav className="lp-navbar-bg fixed top-0 left-0 right-0 z-50 bg-white backdrop-blur-md border-b border-gray-100 transition-all duration-300">
                <div className={`${SECTION_MAX_WIDTH} mx-auto flex items-center justify-between px-6 py-4 lg:px-8`}>
                    <span className="text-[0.9375rem] font-semibold text-[#262626] select-none truncate pr-4">
                        <span className="hidden sm:inline">Character-Level Phishing Detection System</span>
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
                                        className={`text-sm font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[#0078d4] focus:ring-offset-2 focus:rounded ${activeSection === link.href.substring(1)
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
                        className="md:hidden p-2 -mr-2 text-[#616161] hover:text-[#262626] transition-colors focus:outline-none focus:ring-2 focus:ring-[#0078d4] focus:ring-offset-2 rounded"
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

            <section className="relative w-full overflow-hidden">
                <div className="lp-hero-bg absolute inset-0 -z-10 pointer-events-none" aria-hidden />
                <main className={`relative ${SECTION_MAX_WIDTH} mx-auto px-6 lg:px-8 pt-20 pb-16 md:pt-28 md:pb-20`}>
                <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-20">
                    <div className="flex-1 max-w-xl space-y-4">
                        <p className="lp-label text-sm font-medium tracking-wide uppercase">
                            AI-Powered Security Research
                        </p>

                        <h1 className="text-5xl md:text-6xl font-medium tracking-tight leading-tight text-[#262626]">
                            Detect Phishing Emails&nbsp;with Deep Learning
                        </h1>
                        <p className="lp-body-lg text-lg leading-relaxed max-w-lg">
                            A research platform that analyzes email text using advanced neural
                            networks to identify phishing attacks in real time.
                        </p>

                        <div className="flex flex-wrap items-center gap-4 pt-2">
                            <Link
                                to="/analyze"
                                className="lp-btn-primary inline-flex items-center gap-2"
                            >
                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" aria-hidden>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.59 14.37a6 6 0 01-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 006.16-12.12A14.98 14.98 0 009.631 8.41m5.96 5.96a14.926 14.926 0 01-5.841 2.58m-.119-8.54a6 6 0 00-7.381 5.84h4.8m2.581-5.84a14.927 14.927 0 00-2.58 5.841m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 01-2.448-2.448 14.9 14.9 0 01.06-.312m-2.24 2.39a4.493 4.493 0 00-1.757 4.306 4.493 4.493 0 004.306-1.758M16.5 9a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
                                </svg>
                                Launch Email Analyzer
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

            <section id="overview" className="lp-overview-bg w-full border-t border-gray-100">
                <div className={`${SECTION_MAX_WIDTH} mx-auto px-6 lg:px-8 py-16`}>
                <div className="text-center mb-16">
                    <p className="lp-label mb-2">
                        Research Overview
                    </p>
                    <h2 className="text-3xl md:text-4xl font-medium tracking-tight text-[#262626] mb-4">
                        Research Objective
                    </h2>
                    <p className="lp-body-lg max-w-2xl mx-auto">
                        The system analyzes raw email content and predicts whether the message is
                        legitimate or a phishing attempt.
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
                        <p className="text-sm text-green-800">Message identified as legitimate.</p>
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

            <section id="architecture" className="lp-architecture-bg w-full border-t border-gray-100">
                <div className={`${SECTION_MAX_WIDTH} mx-auto px-6 lg:px-8 py-16`}>
                <div className="text-center mb-10">
                    <p className="text-sm font-medium text-slate-600 mb-2 uppercase tracking-wider">
                        How It Works
                    </p>
                    <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-[#1d1d1f] mb-4">
                        System Architecture
                    </h2>
                    <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                        Email content flows from input through the backend API to deep learning models,
                        with results displayed in the web interface.
                    </p>
                </div>
                <div className="rounded-2xl border border-gray-200 overflow-hidden bg-white shadow-sm w-full">
                    <img
                        src={SystemArchitectureSvg}
                        alt="Character-Level Phishing Detection System Architecture"
                        className="w-full h-auto object-contain"
                    />
                </div>
                </div>
            </section>

            <section id="features" className="lp-features-bg w-full border-t border-gray-100">
                <div className={`${SECTION_MAX_WIDTH} mx-auto px-6 lg:px-8 py-16`}>
                <div className="text-center mb-10">
                    <p className="lp-label mb-2">
                        Capabilities
                    </p>
                    <h2 className="text-3xl md:text-4xl font-medium tracking-tight text-[#262626] mb-4">
                        Core Features
                    </h2>
                    <p className="lp-body-lg max-w-2xl mx-auto">
                        Key capabilities that power the character-level phishing detection system.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="lp-card-features border border-gray-200 rounded-[var(--lp-radius-lg)] p-6 flex flex-col sm:flex-row items-start gap-4 hover:shadow-md hover:-translate-y-0.5 motion-reduce:hover:translate-y-0 transition-all duration-200">
                        <div className="flex-shrink-0 w-10 h-10 rounded-full bg-[#e6f2fb] flex items-center justify-center">
                            <svg className="w-5 h-5 text-[#0078d4]" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                            </svg>
                        </div>
                        <div>
                            <h3 className="font-semibold text-[#262626] mb-1">Character-Level Analysis</h3>
                            <p className="lp-body text-sm">
                                Detects subtle phishing patterns by analyzing email text character by character.
                            </p>
                        </div>
                    </div>

                    <div className="lp-card-features border border-gray-200 rounded-[var(--lp-radius-lg)] p-6 flex flex-col sm:flex-row items-start gap-4 hover:shadow-md hover:-translate-y-0.5 motion-reduce:hover:translate-y-0 transition-all duration-200">
                        <div className="flex-shrink-0 w-10 h-10 rounded-full bg-[#e8e7ea] flex items-center justify-center">
                            <svg className="w-5 h-5 text-[#5d5bd4]" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 00-2.455 2.456z" />
                            </svg>
                        </div>
                        <div>
                            <h3 className="font-semibold text-[#262626] mb-1">Transformer Model Detection</h3>
                            <p className="lp-body text-sm">
                                Uses a transformer model to understand contextual meaning.
                            </p>
                        </div>
                    </div>

                    <div className="lp-card-features border border-gray-200 rounded-[var(--lp-radius-lg)] p-6 flex flex-col sm:flex-row items-start gap-4 hover:shadow-md hover:-translate-y-0.5 motion-reduce:hover:translate-y-0 transition-all duration-200">
                        <div className="flex-shrink-0 w-10 h-10 rounded-full bg-emerald-50 flex items-center justify-center">
                            <svg className="w-5 h-5 text-emerald-600" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
                            </svg>
                        </div>
                        <div>
                            <h3 className="font-semibold text-[#262626] mb-1">Real-Time Analysis</h3>
                            <p className="lp-body text-sm">
                                Processes emails quickly for live demonstrations.
                            </p>
                        </div>
                    </div>

                    <div className="lp-card-features border border-gray-200 rounded-[var(--lp-radius-lg)] p-6 flex flex-col sm:flex-row items-start gap-4 hover:shadow-md hover:-translate-y-0.5 motion-reduce:hover:translate-y-0 transition-all duration-200">
                        <div className="flex-shrink-0 w-10 h-10 rounded-full bg-[#e6f2fb] flex items-center justify-center">
                            <svg className="w-5 h-5 text-[#0067b8]" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5" />
                            </svg>
                        </div>
                        <div>
                            <h3 className="font-semibold text-[#262626] mb-1">Research Platform</h3>
                            <p className="lp-body text-sm">
                                Designed to demonstrate machine learning phishing detection for academic evaluation.
                            </p>
                        </div>
                    </div>
                </div>
                </div>
            </section>

            <section id="demo" className="lp-demo-bg w-full border-t border-gray-100">
                <div className={`${SECTION_MAX_WIDTH} mx-auto px-6 lg:px-8 py-16 text-center`}>
                <div className="mb-8">
                    <p className="lp-label mb-2">
                        Try It Now
                    </p>
                    <h2 className="text-3xl md:text-4xl font-medium tracking-tight text-[#262626] mb-4">
                        Try the Email Detection Demo
                    </h2>
                    <p className="lp-body-lg max-w-xl mx-auto">
                        Paste an email message and let the deep learning models analyze it for phishing indicators.
                    </p>
                </div>
                <Link
                    to="/analyze"
                    className="lp-btn-primary inline-flex items-center gap-2"
                >
                    Launch Analyzer
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" aria-hidden>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                    </svg>
                </Link>
                </div>
            </section>

            <footer className="lp-footer-bg w-full border-t border-gray-200 py-10 bg-white">
                <div className={`flex flex-col items-center gap-3 ${SECTION_MAX_WIDTH} mx-auto px-6`}>
                    <p className="text-sm text-[#262626] font-medium text-center">
                        MTech Final Year Research Project | Cybersecurity and Machine Learning
                    </p>
                    <div className="flex gap-6 text-xs text-[#616161]">
                        <a href="https://github.com/sudo-Harshk" className="lp-link hover:text-[#106ebe] transition-colors focus:outline-none focus:ring-2 focus:ring-[#0078d4] focus:ring-offset-2 rounded px-1" target="_blank" rel="noopener noreferrer">
                            GitHub
                        </a>
                        <a href="#overview" className="lp-link hover:text-[#106ebe] transition-colors focus:outline-none focus:ring-2 focus:ring-[#0078d4] focus:ring-offset-2 rounded px-1">
                            Overview
                        </a>
                        <a href="#architecture" className="lp-link hover:text-[#106ebe] transition-colors focus:outline-none focus:ring-2 focus:ring-[#0078d4] focus:ring-offset-2 rounded px-1">
                            Architecture
                        </a>
                        <Link to="/analyze" className="lp-link hover:text-[#106ebe] transition-colors focus:outline-none focus:ring-2 focus:ring-[#0078d4] focus:ring-offset-2 rounded px-1">
                            Demo
                        </Link>
                    </div>
                </div>
            </footer>
        </div>
    );
}
