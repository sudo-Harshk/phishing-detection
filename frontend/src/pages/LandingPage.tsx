import { useState, useEffect } from "react";
import NeuralNetworkAnimatedBeam from "../components/NeuralNetworkAnimatedBeam";
import SystemArchitectureSvg from "@/assets/System.svg?url";

const NAV_LINKS = [
    { label: "Overview", href: "#overview" },
    { label: "Architecture", href: "#architecture" },
    { label: "Features", href: "#features" },
    { label: "Demo", href: "#demo" },
];

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
        <div className="min-h-screen bg-white text-[#1d1d1f] font-sans tracking-tight">
            <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100 transition-all duration-300">
                <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4 lg:px-8">
                    <span className="text-[0.9375rem] font-semibold text-[#1d1d1f] select-none truncate pr-4">
                        <span className="hidden sm:inline">Character-Level Phishing Detection System</span>
                        <span className="sm:hidden">Phishing Detection</span>
                    </span>

                    <ul className="hidden md:flex items-center gap-8">
                        {NAV_LINKS.map((link) => (
                            <li key={link.label}>
                                <a
                                    href={link.href}
                                    className={`text-sm font-medium transition-colors duration-200 ${activeSection === link.href.substring(1)
                                        ? "text-[#1d1d1f] border-b-[1.5px] border-[#1d1d1f] pb-0.5"
                                        : "text-gray-500 hover:text-[#1d1d1f]"
                                        }`}
                                >
                                    {link.label}
                                </a>
                            </li>
                        ))}
                    </ul>

                    <button
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        className="md:hidden p-2 -mr-2 text-slate-500 hover:text-slate-900 transition-colors"
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
                    <div className="md:hidden border-t border-slate-200/60 bg-white/95 backdrop-blur-lg">
                        <ul className="flex flex-col px-6 py-4 gap-3">
                            {NAV_LINKS.map((link) => (
                                <li key={link.label}>
                                    <a
                                        href={link.href}
                                        onClick={() => setMobileMenuOpen(false)}
                                        className={`block text-sm py-2 font-medium transition-colors duration-200 ${activeSection === link.href.substring(1)
                                            ? "text-[#1d1d1f]"
                                            : "text-gray-600 hover:text-[#1d1d1f]"
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

            <main className="max-w-7xl mx-auto px-6 lg:px-8 pt-20 pb-24 md:pt-28 md:pb-32">
                <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-20">
                    <div className="flex-1 max-w-xl">
                        <p className="text-sm text-slate-500 tracking-wide mb-4">
                            Headline
                        </p>

                        <h1 className="text-5xl md:text-6xl font-bold tracking-tighter leading-tight text-[#1d1d1f] mb-6">
                            Detect Phishing Emails&nbsp;with Deep Learning
                        </h1>
                        <p className="text-lg text-slate-600 leading-relaxed max-w-lg mb-10">
                            A research platform that analyzes email text using advanced neural
                            networks to identify phishing attacks in real time.
                        </p>

                        <div className="flex flex-wrap items-center gap-4">
                            <a
                                href="http://localhost:5173/analyze"
                                className="inline-flex items-center gap-2 px-7 py-3 bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 text-white text-sm font-medium rounded-full shadow-lg shadow-indigo-500/25 hover:shadow-xl hover:shadow-indigo-500/30 transition-all duration-200 hover:-translate-y-0.5"
                            >
                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.59 14.37a6 6 0 01-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 006.16-12.12A14.98 14.98 0 009.631 8.41m5.96 5.96a14.926 14.926 0 01-5.841 2.58m-.119-8.54a6 6 0 00-7.381 5.84h4.8m2.581-5.84a14.927 14.927 0 00-2.58 5.841m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 01-2.448-2.448 14.9 14.9 0 01.06-.312m-2.24 2.39a4.493 4.493 0 00-1.757 4.306 4.493 4.493 0 004.306-1.758M16.5 9a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
                                </svg>
                                Launch Email Analyzer
                            </a>

                            <a
                                href="#architecture"
                                className="inline-flex items-center gap-2 px-7 py-3 text-sm font-medium text-slate-700 border border-slate-300 hover:border-slate-400 rounded-full hover:bg-white transition-all duration-200 hover:-translate-y-0.5"
                            >
                                Explore Architecture
                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75" />
                                </svg>
                            </a>
                        </div>
                    </div>

                    <div className="flex-1 w-full max-w-lg lg:max-w-none">
                        <NeuralNetworkAnimatedBeam />
                    </div>
                </div>
            </main>

            <section id="overview" className="max-w-5xl mx-auto px-6 lg:px-8 py-24 border-t border-gray-100">
                <div className="text-center mb-16">
                    <p className="text-sm font-medium text-gray-500 mb-2 uppercase tracking-wider">
                        Research Overview
                    </p>
                    <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-[#1d1d1f] mb-4">
                        Research Objective
                    </h2>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                        The system analyzes raw email content and predicts whether the message is
                        legitimate or a phishing attempt.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-green-50/50 border border-green-100 rounded-2xl p-6 flex flex-col items-center text-center">
                        <div className="w-12 h-12 bg-green-100/50 rounded-full flex items-center justify-center mb-4">
                            <svg className="w-6 h-6 text-green-600" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </div>
                        <h3 className="font-semibold text-green-900 text-lg mb-2">Clean</h3>
                        <p className="text-sm text-green-800">Message identified as legitimate.</p>
                    </div>

                    <div className="bg-amber-50/50 border border-amber-100 rounded-2xl p-6 flex flex-col items-center text-center">
                        <div className="w-12 h-12 bg-amber-100/50 rounded-full flex items-center justify-center mb-4">
                            <svg className="w-6 h-6 text-amber-600" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2.25m0 2.625h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </div>
                        <h3 className="font-semibold text-amber-900 text-lg mb-2">Suspicious</h3>
                        <p className="text-sm text-amber-800">Contains potential phishing indicators.</p>
                    </div>

                    <div className="bg-rose-50/50 border border-rose-100 rounded-2xl p-6 flex flex-col items-center text-center">
                        <div className="w-12 h-12 bg-rose-100/50 rounded-full flex items-center justify-center mb-4">
                            <svg className="w-6 h-6 text-rose-600" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
                            </svg>
                        </div>
                        <h3 className="font-semibold text-rose-900 text-lg mb-2">Phishing</h3>
                        <p className="text-sm text-rose-800">High probability of a malicious attack.</p>
                    </div>
                </div>
            </section>

            <section id="architecture" className="max-w-4xl mx-auto px-6 lg:px-8 py-24">
                <h2 className="text-3xl font-semibold tracking-tight text-[#1d1d1f] mb-8 text-center bg-white">
                    System Architecture
                </h2>
                <div className="rounded-2xl border border-gray-200 overflow-hidden bg-white shadow-sm w-full">
                    <img
                        src={SystemArchitectureSvg}
                        alt="Character-Level Phishing Detection System Architecture"
                        className="w-full h-auto object-contain bg-[#f8f9fb]"
                    />
                </div>
            </section>

            <section id="features" className="max-w-5xl mx-auto px-6 lg:px-8 py-24 border-t border-gray-100">
                <h2 className="text-3xl font-semibold tracking-tight text-[#1d1d1f] mb-10 text-center">
                    Core Features
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-white border border-gray-200 rounded-2xl p-6 flex flex-col sm:flex-row items-start gap-4 shadow-sm hover:shadow-md transition-shadow duration-200">
                        <div className="flex-shrink-0 w-10 h-10 rounded-full bg-indigo-50 flex items-center justify-center">
                            <svg className="w-5 h-5 text-indigo-600" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                            </svg>
                        </div>
                        <div>
                            <h3 className="font-semibold text-[#1d1d1f] mb-1">Character-Level Analysis</h3>
                            <p className="text-sm text-gray-600">
                                Detects subtle phishing patterns by analyzing email text character by character.
                            </p>
                        </div>
                    </div>

                    <div className="bg-white border border-gray-200 rounded-2xl p-6 flex flex-col sm:flex-row items-start gap-4 shadow-sm hover:shadow-md transition-shadow duration-200">
                        <div className="flex-shrink-0 w-10 h-10 rounded-full bg-violet-50 flex items-center justify-center">
                            <svg className="w-5 h-5 text-violet-600" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 00-2.455 2.456z" />
                            </svg>
                        </div>
                        <div>
                            <h3 className="font-semibold text-[#1d1d1f] mb-1">Transformer Model Detection</h3>
                            <p className="text-sm text-gray-600">
                                Uses a transformer model to understand contextual meaning.
                            </p>
                        </div>
                    </div>

                    <div className="bg-white border border-gray-200 rounded-2xl p-6 flex flex-col sm:flex-row items-start gap-4 shadow-sm hover:shadow-md transition-shadow duration-200">
                        <div className="flex-shrink-0 w-10 h-10 rounded-full bg-emerald-50 flex items-center justify-center">
                            <svg className="w-5 h-5 text-emerald-600" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
                            </svg>
                        </div>
                        <div>
                            <h3 className="font-semibold text-[#1d1d1f] mb-1">Real-Time Analysis</h3>
                            <p className="text-sm text-gray-600">
                                Processes emails quickly for live demonstrations.
                            </p>
                        </div>
                    </div>

                    <div className="bg-white border border-gray-200 rounded-2xl p-6 flex flex-col sm:flex-row items-start gap-4 shadow-sm hover:shadow-md transition-shadow duration-200">
                        <div className="flex-shrink-0 w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center">
                            <svg className="w-5 h-5 text-blue-600" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5" />
                            </svg>
                        </div>
                        <div>
                            <h3 className="font-semibold text-[#1d1d1f] mb-1">Research Platform</h3>
                            <p className="text-sm text-gray-600">
                                Designed to demonstrate machine learning phishing detection for academic evaluation.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            <section id="demo" className="max-w-3xl mx-auto px-6 lg:px-8 py-24 text-center">
                <p className="text-sm font-medium text-gray-500 mb-2 uppercase tracking-wider">
                    Demo
                </p>
                <h2 className="text-3xl font-semibold tracking-tight text-gray-900 mb-4">
                    Try the Email Detection Demo
                </h2>
                <p className="text-base text-gray-600 mb-8">
                    Paste an email message and let the deep learning models analyze it for phishing indicators.
                </p>
                <a
                    href="http://localhost:5173/analyze"
                    className="inline-block px-8 py-3 font-medium bg-blue-600 hover:bg-blue-700 text-white rounded-full transition-colors duration-200 shadow-sm"
                >
                    Launch Analyzer
                </a>
            </section>

            <footer className="w-full border-t border-gray-200 py-10 mt-10">
                <div className="flex flex-col items-center gap-2">
                    <p className="text-sm text-gray-900 font-medium text-center">
                        MTech Final Year Research Project | Cybersecurity and Machine Learning
                    </p>
                    <div className="flex gap-4 text-xs text-gray-500 mt-2">
                        <a href="https://github.com/sudo-Harshk" className="hover:text-gray-900 transition-colors" target="_blank" rel="noopener noreferrer">
                            GitHub
                        </a>
                        <a href="#" className="hover:text-gray-900 transition-colors">
                            Research Paper
                        </a>
                        <a href="#" className="hover:text-gray-900 transition-colors">
                            Documentation
                        </a>
                    </div>
                </div>
            </footer>
        </div>
    );
}
