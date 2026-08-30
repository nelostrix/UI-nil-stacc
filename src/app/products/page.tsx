"use client";

import Link from "next/link";
import Image from "next/image";
import {
    Monitor,
    Terminal,
    Cpu,
    Zap,
    Boxes,
    Layers,
    Shield,
    Check,
    Download,
    ExternalLink,
    Laptop,
    Sparkles,
    CheckCircle2,
    Code2,
    Server,
    HardDrive,
    Flame,
} from "lucide-react";
import Nav from "@/components/Nav";

export default function Products() {
    return (
        <div className="relative min-h-screen bg-[var(--color-void)] text-[var(--color-ivory)] overflow-hidden font-sans">
            <Nav />

            {/* Ambient Background Energy */}
            <div className="absolute top-[12%] left-[5%] w-[550px] h-[550px] bg-[var(--color-ember)]/[0.04] rounded-full blur-[170px] pointer-events-none" />
            <div className="absolute top-[45%] right-[5%] w-[600px] h-[600px] bg-[var(--color-electric)]/[0.03] rounded-full blur-[190px] pointer-events-none" />
            <div className="absolute bottom-[15%] left-[10%] w-[500px] h-[500px] bg-[var(--color-plasma)]/[0.03] rounded-full blur-[160px] pointer-events-none" />

            {/* ═══════════════════════════════════════════════════════════════ */}
            {/* HERO SECTION                                                    */}
            {/* ═══════════════════════════════════════════════════════════════ */}
            <section className="pt-36 pb-16 px-6 relative z-10 border-b border-white/5">
                <div className="max-w-6xl mx-auto">
                    <div className="flex flex-wrap items-center gap-3">
                        <span className="text-[10px] font-bold tracking-[0.25em] text-[var(--color-volt)] border border-[var(--color-volt)]/30 bg-[var(--color-volt)]/5 px-3.5 py-1.5 uppercase font-mono">
                            OFFICIAL PRODUCT LINEUP
                        </span>
                        <span className="text-[10px] font-mono text-[var(--color-mist)]">
                            POWERED BY NIL &amp; STACC ENGINES
                        </span>
                    </div>

                    <h1 className="font-[var(--font-display)] text-6xl sm:text-7xl md:text-8xl tracking-wider mt-6 leading-none">
                        OUR{" "}
                        <span className="text-[var(--color-ember)] text-glow">
                            PRODUCTS
                        </span>
                    </h1>

                    <p className="text-[var(--color-mist)] text-base sm:text-lg mt-4 max-w-3xl leading-relaxed">
                        Two distinct powerhouse developer platforms — <strong className="text-white">NELO Studio</strong> (the native visual robotics IDE) and <strong className="text-white">NELO CLI</strong> (the ultra-fast headless toolkit &amp; Python SDK). Both are backed by our foundational deep-tech engines: <span className="text-[var(--color-plasma)] font-semibold">NIL Causal AI</span> and <span className="text-[var(--color-electric)] font-semibold">STACC 1000Hz Physics</span>.
                    </p>

                    {/* Quick Jump */}
                    <div className="flex flex-wrap gap-4 mt-8">
                        <a
                            href="#nelo-studio"
                            className="flex items-center gap-2.5 text-xs font-bold tracking-wider px-5 py-2.5 bg-[var(--color-ash)] border border-[var(--color-ember)]/40 text-white hover:border-[var(--color-ember)] transition-all"
                            style={{ clipPath: "polygon(6px 0, 100% 0, calc(100% - 6px) 100%, 0 100%)" }}
                        >
                            <Monitor className="w-4 h-4 text-[var(--color-ember)]" />
                            <span>1. NELO STUDIO (DESKTOP IDE)</span>
                        </a>

                        <a
                            href="#nelo-cli"
                            className="flex items-center gap-2.5 text-xs font-bold tracking-wider px-5 py-2.5 bg-[var(--color-ash)] border border-[var(--color-volt)]/40 text-white hover:border-[var(--color-volt)] transition-all"
                            style={{ clipPath: "polygon(6px 0, 100% 0, calc(100% - 6px) 100%, 0 100%)" }}
                        >
                            <Terminal className="w-4 h-4 text-[var(--color-volt)]" />
                            <span>2. NELO CLI &amp; PYTHON SDK</span>
                        </a>

                        <a
                            href="#twin-engines"
                            className="flex items-center gap-2.5 text-xs font-bold tracking-wider px-5 py-2.5 bg-white/5 border border-white/10 text-[var(--color-mist)] hover:text-white transition-all"
                            style={{ clipPath: "polygon(6px 0, 100% 0, calc(100% - 6px) 100%, 0 100%)" }}
                        >
                            <Cpu className="w-4 h-4 text-[var(--color-electric)]" />
                            <span>UNDERLYING NIL &amp; STACC ENGINES</span>
                        </a>
                    </div>
                </div>
            </section>

            {/* ═══════════════════════════════════════════════════════════════ */}
            {/* PRODUCT 1: NELO STUDIO (GUI DESKTOP IDE)                        */}
            {/* ═══════════════════════════════════════════════════════════════ */}
            <section id="nelo-studio" className="py-24 px-6 border-b border-white/5 relative z-10">
                <div className="max-w-6xl mx-auto">
                    <div className="flex flex-wrap items-center gap-3 mb-4">
                        <div className="w-2.5 h-2.5 rounded-full bg-[var(--color-ember)] animate-pulse" />
                        <span className="text-[10px] font-bold tracking-[0.25em] px-3 py-1 bg-[var(--color-ember)]/10 text-[var(--color-ember)] border border-[var(--color-ember)]/30 font-mono uppercase">
                            FLAGSHIP GUI DESKTOP SUITE
                        </span>
                        <span className="text-[10px] font-mono text-[var(--color-smoke)]">v1.0.0</span>
                        <span className="text-[10px] font-mono text-[var(--color-volt)]">● NATIVE STANDALONE WINDOW</span>
                    </div>

                    <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-8">
                        <div>
                            <h2 className="font-[var(--font-display)] text-6xl sm:text-7xl md:text-8xl tracking-wider leading-none">
                                NELO STUDIO
                            </h2>
                            <p className="text-[var(--color-mist)] text-base sm:text-lg max-w-3xl mt-4 leading-relaxed">
                                The ultimate AI-native robotics engineering operating system. Runs as a <strong className="text-white">100% standalone native desktop application</strong> with integrated 3D MuJoCo Physics, Parametric CAD Studio, Monaco Code Editor, and the NIL Agent assistant. Zero browser dependency.
                            </p>
                        </div>

                        <div className="flex flex-wrap items-center gap-4 shrink-0">
                            <Link
                                href="/downloads"
                                className="bg-[var(--color-ember)] hover:brightness-110 text-[var(--color-void)] px-8 py-4 font-bold text-xs tracking-wider flex items-center gap-2 cursor-pointer transition-all"
                                style={{ clipPath: "polygon(8px 0, 100% 0, calc(100% - 8px) 100%, 0 100%)" }}
                            >
                                <Download className="w-4 h-4" />
                                <span>GET NELO STUDIO</span>
                            </Link>

                            <div className="p-3 bg-[var(--color-ash)] border border-white/10 font-mono text-xs text-[var(--color-smoke)]">
                                <span className="text-[var(--color-ember)] font-bold text-lg">₹9,999</span>
                                <span className="text-[10px] text-[var(--color-mist)]"> /YEAR</span>
                            </div>
                        </div>
                    </div>

                    {/* Features Grid */}
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
                        <div className="bg-[var(--color-ash)] border border-white/10 p-6 space-y-3"
                            style={{ clipPath: "polygon(8px 0, 100% 0, calc(100% - 8px) 100%, 0 100%)" }}
                        >
                            <div className="flex items-center gap-2.5 text-[var(--color-electric)]">
                                <Cpu className="w-5 h-5" />
                                <h3 className="font-[var(--font-display)] text-xl tracking-wider text-white">3D MuJoCo Simulation</h3>
                            </div>
                            <p className="text-xs text-[var(--color-mist)] leading-relaxed">
                                Real-time interactive physics viewport backed by the STACC 1000Hz PGS solver. Visualizes collisions, joint limits, contact manifolds, and sensor raycasts.
                            </p>
                        </div>

                        <div className="bg-[var(--color-ash)] border border-white/10 p-6 space-y-3"
                            style={{ clipPath: "polygon(8px 0, 100% 0, calc(100% - 8px) 100%, 0 100%)" }}
                        >
                            <div className="flex items-center gap-2.5 text-[var(--color-plasma)]">
                                <Boxes className="w-5 h-5" />
                                <h3 className="font-[var(--font-display)] text-xl tracking-wider text-white">3D Parametric CAD Studio</h3>
                            </div>
                            <p className="text-xs text-[var(--color-mist)] leading-relaxed">
                                Dedicated CAD workbench powered by OpenCASCADE B-Rep solid modeling. Synthesize structural brackets, motor flanges, and export to ISO-10303-242 (STEP AP242).
                            </p>
                        </div>

                        <div className="bg-[var(--color-ash)] border border-white/10 p-6 space-y-3"
                            style={{ clipPath: "polygon(8px 0, 100% 0, calc(100% - 8px) 100%, 0 100%)" }}
                        >
                            <div className="flex items-center gap-2.5 text-[var(--color-volt)]">
                                <Code2 className="w-5 h-5" />
                                <h3 className="font-[var(--font-display)] text-xl tracking-wider text-white">Monaco Code Editor</h3>
                            </div>
                            <p className="text-xs text-[var(--color-mist)] leading-relaxed">
                                Full VSCode Monaco development environment with syntax highlighting, live auto-completion for STACC robotics APIs, real-time kinematics calculator, and Linux shell terminal.
                            </p>
                        </div>

                        <div className="bg-[var(--color-ash)] border border-white/10 p-6 space-y-3"
                            style={{ clipPath: "polygon(8px 0, 100% 0, calc(100% - 8px) 100%, 0 100%)" }}
                        >
                            <div className="flex items-center gap-2.5 text-[var(--color-ember)]">
                                <Zap className="w-5 h-5" />
                                <h3 className="font-[var(--font-display)] text-xl tracking-wider text-white">Embedded NIL AI Dock</h3>
                            </div>
                            <p className="text-xs text-[var(--color-mist)] leading-relaxed">
                                Autonomous agent paired directly with your editor. Automatically analyzes code, plans trajectories, triggers 10-phase self-evolution cycles, and mutates robot control logic.
                            </p>
                        </div>

                        <div className="bg-[var(--color-ash)] border border-white/10 p-6 space-y-3"
                            style={{ clipPath: "polygon(8px 0, 100% 0, calc(100% - 8px) 100%, 0 100%)" }}
                        >
                            <div className="flex items-center gap-2.5 text-[var(--color-smoke)]">
                                <Server className="w-5 h-5 text-[var(--color-volt)]" />
                                <h3 className="font-[var(--font-display)] text-xl tracking-wider text-white">Zero-Setup Micro-Daemons</h3>
                            </div>
                            <p className="text-xs text-[var(--color-mist)] leading-relaxed">
                                The desktop bundle automatically spins up the NIL Cognitive AI Daemon (Port 8765) and the STACC Robotics Engine (Port 8766) in the background with zero external configuration.
                            </p>
                        </div>

                        <div className="bg-[var(--color-ash)] border border-white/10 p-6 space-y-3"
                            style={{ clipPath: "polygon(8px 0, 100% 0, calc(100% - 8px) 100%, 0 100%)" }}
                        >
                            <div className="flex items-center gap-2.5 text-[var(--color-mist)]">
                                <Laptop className="w-5 h-5 text-[var(--color-plasma)]" />
                                <h3 className="font-[var(--font-display)] text-xl tracking-wider text-white">Cross-Platform Binaries</h3>
                            </div>
                            <p className="text-xs text-[var(--color-mist)] leading-relaxed">
                                Distribute seamlessly via Windows NSIS (`.exe`, `winget`), Arch Linux AUR (`yay -S nelo-studio-bin`), Debian (`.deb`), Universal AppImage, and macOS Universal DMG (`brew`).
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* ═══════════════════════════════════════════════════════════════ */}
            {/* PRODUCT 2: NELO CLI (HEADLESS TERMINAL & PYTHON SDK)            */}
            {/* ═══════════════════════════════════════════════════════════════ */}
            <section id="nelo-cli" className="py-24 px-6 border-b border-white/5 relative z-10">
                <div className="max-w-6xl mx-auto">
                    <div className="flex flex-wrap items-center gap-3 mb-4">
                        <div className="w-2.5 h-2.5 rounded-full bg-[var(--color-volt)] animate-pulse" />
                        <span className="text-[10px] font-bold tracking-[0.25em] px-3 py-1 bg-[var(--color-volt)]/10 text-[var(--color-volt)] border border-[var(--color-volt)]/30 font-mono uppercase">
                            HEADLESS TERMINAL &amp; PYTHON SDK
                        </span>
                        <span className="text-[10px] font-mono text-[var(--color-smoke)]">v1.0.0</span>
                        <span className="text-[10px] font-mono text-[var(--color-electric)]">● SERVERS • CLUSTERS • EDGE</span>
                    </div>

                    <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-8">
                        <div>
                            <h2 className="font-[var(--font-display)] text-6xl sm:text-7xl md:text-8xl tracking-wider leading-none">
                                NELO CLI
                            </h2>
                            <p className="text-[var(--color-mist)] text-base sm:text-lg max-w-3xl mt-4 leading-relaxed">
                                The high-performance command-line interface and Python SDK built for headless compute clusters, Docker containers, CI/CD automated test pipelines, and robot on-board computers (NVIDIA Jetson, Raspberry Pi).
                            </p>
                        </div>

                        <div className="flex flex-wrap items-center gap-4 shrink-0">
                            <Link
                                href="/downloads?product=cli"
                                className="bg-[var(--color-volt)] hover:brightness-110 text-[var(--color-void)] px-8 py-4 font-bold text-xs tracking-wider flex items-center gap-2 cursor-pointer transition-all"
                                style={{ clipPath: "polygon(8px 0, 100% 0, calc(100% - 8px) 100%, 0 100%)" }}
                            >
                                <Terminal className="w-4 h-4" />
                                <span>INSTALL NELO-CLI</span>
                            </Link>

                            <div className="p-3 bg-[var(--color-ash)] border border-white/10 font-mono text-xs text-[var(--color-smoke)]">
                                <span className="text-[var(--color-volt)] font-bold text-lg">₹4,999</span>
                                <span className="text-[10px] text-[var(--color-mist)]"> /YEAR</span>
                            </div>
                        </div>
                    </div>

                    {/* Features Grid */}
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
                        <div className="bg-[var(--color-ash)] border border-white/10 p-6 space-y-3"
                            style={{ clipPath: "polygon(8px 0, 100% 0, calc(100% - 8px) 100%, 0 100%)" }}
                        >
                            <div className="flex items-center gap-2.5 text-[var(--color-volt)]">
                                <Terminal className="w-5 h-5" />
                                <h3 className="font-[var(--font-display)] text-xl tracking-wider text-white">Headless 1000Hz Sim</h3>
                            </div>
                            <p className="text-xs text-[var(--color-mist)] leading-relaxed">
                                Execute headless MuJoCo physics steps at 1000Hz with zero graphics overhead. Perfect for mass reinforcement learning batch rollouts and CI regression suites.
                            </p>
                        </div>

                        <div className="bg-[var(--color-ash)] border border-white/10 p-6 space-y-3"
                            style={{ clipPath: "polygon(8px 0, 100% 0, calc(100% - 8px) 100%, 0 100%)" }}
                        >
                            <div className="flex items-center gap-2.5 text-[var(--color-electric)]">
                                <Cpu className="w-5 h-5" />
                                <h3 className="font-[var(--font-display)] text-xl tracking-wider text-white">Spatial Kinematics &amp; RNEA</h3>
                            </div>
                            <p className="text-xs text-[var(--color-mist)] leading-relaxed">
                                Compute 6-DOF direct spatial forward kinematics and analytical Recursive Newton-Euler inverse dynamics gravity torques in 0.018ms.
                            </p>
                        </div>

                        <div className="bg-[var(--color-ash)] border border-white/10 p-6 space-y-3"
                            style={{ clipPath: "polygon(8px 0, 100% 0, calc(100% - 8px) 100%, 0 100%)" }}
                        >
                            <div className="flex items-center gap-2.5 text-[var(--color-plasma)]">
                                <Zap className="w-5 h-5" />
                                <h3 className="font-[var(--font-display)] text-xl tracking-wider text-white">NIL Evolution Triggers</h3>
                            </div>
                            <p className="text-xs text-[var(--color-mist)] leading-relaxed">
                                Programmatically invoke the 10-phase self-evolution pipeline (`nelo agent evolve`) to analyze experience traces and synthesize compiled procedural skills.
                            </p>
                        </div>

                        <div className="bg-[var(--color-ash)] border border-white/10 p-6 space-y-3"
                            style={{ clipPath: "polygon(8px 0, 100% 0, calc(100% - 8px) 100%, 0 100%)" }}
                        >
                            <div className="flex items-center gap-2.5 text-[var(--color-ember)]">
                                <Boxes className="w-5 h-5" />
                                <h3 className="font-[var(--font-display)] text-xl tracking-wider text-white">Headless CAD &amp; STEP Export</h3>
                            </div>
                            <p className="text-xs text-[var(--color-mist)] leading-relaxed">
                                Generate parametric OpenCASCADE geometry scripts and convert robot meshes to industry-standard STEP AP242 format in automated build pipelines.
                            </p>
                        </div>

                        <div className="bg-[var(--color-ash)] border border-white/10 p-6 space-y-3"
                            style={{ clipPath: "polygon(8px 0, 100% 0, calc(100% - 8px) 100%, 0 100%)" }}
                        >
                            <div className="flex items-center gap-2.5 text-[var(--color-smoke)]">
                                <HardDrive className="w-5 h-5 text-[var(--color-volt)]" />
                                <h3 className="font-[var(--font-display)] text-xl tracking-wider text-white">In-Device Model Manager</h3>
                            </div>
                            <p className="text-xs text-[var(--color-mist)] leading-relaxed">
                                Pull, quantize, and orchestrate local Ollama models (`nelo models pull qwen2.5-coder:7b`) for 100% air-gapped in-device reasoning.
                            </p>
                        </div>

                        <div className="bg-[var(--color-ash)] border border-white/10 p-6 space-y-3"
                            style={{ clipPath: "polygon(8px 0, 100% 0, calc(100% - 8px) 100%, 0 100%)" }}
                        >
                            <div className="flex items-center gap-2.5 text-[var(--color-mist)]">
                                <Server className="w-5 h-5 text-[var(--color-electric)]" />
                                <h3 className="font-[var(--font-display)] text-xl tracking-wider text-white">Docker &amp; Edge Hardware HAL</h3>
                            </div>
                            <p className="text-xs text-[var(--color-mist)] leading-relaxed">
                                Deploy directly into containerized production environments and interact with GPIO, I2C, SPI, CAN, and Serial buses on 17 robotics hardware boards.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* ═══════════════════════════════════════════════════════════════ */}
            {/* TWIN ENGINES: NIL & STACC (FOUNDATIONAL FEATURES)               */}
            {/* ═══════════════════════════════════════════════════════════════ */}
            <section id="twin-engines" className="py-24 px-6 border-b border-white/5 bg-[var(--color-ash)]/30 relative z-10">
                <div className="max-w-6xl mx-auto">
                    <div className="text-center max-w-2xl mx-auto mb-16">
                        <span className="text-[10px] font-bold tracking-[0.25em] text-[var(--color-ember)] uppercase font-mono">
                            FOUNDATIONAL DEEP-TECH ENGINES
                        </span>
                        <h2 className="font-[var(--font-display)] text-4xl sm:text-6xl tracking-wider mt-2">
                            THE TWIN ENGINES INSIDE EVERY NELO PRODUCT
                        </h2>
                        <p className="text-xs sm:text-sm text-[var(--color-mist)] mt-3 leading-relaxed">
                            Rather than standalone products, <strong className="text-[var(--color-plasma)]">NIL</strong> and <strong className="text-[var(--color-electric)]">STACC</strong> are the two proprietary core engines powering all intelligence, physics, and control in both NELO Studio and NELO CLI.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8">
                        {/* ENGINE 1: NIL */}
                        <div className="bg-[var(--color-void)] border border-[var(--color-plasma)]/30 p-8 space-y-6 relative overflow-hidden"
                            style={{ clipPath: "polygon(12px 0, 100% 0, calc(100% - 12px) 100%, 0 100%)" }}
                        >
                            <div className="flex items-center justify-between border-b border-white/10 pb-4">
                                <div className="flex items-center gap-3">
                                    <span className="w-3 h-3 rounded-full bg-[var(--color-plasma)]" />
                                    <h3 className="font-[var(--font-display)] text-3xl tracking-wider text-white">NIL ENGINE</h3>
                                </div>
                                <span className="text-[9px] px-2.5 py-1 bg-[var(--color-plasma)]/15 text-[var(--color-plasma)] border border-[var(--color-plasma)]/30 font-mono uppercase">
                                    AI &amp; COGNITIVE REASONING
                                </span>
                            </div>

                            <p className="text-xs sm:text-sm text-[var(--color-mist)] leading-relaxed">
                                The self-evolving cognitive brain. Houses the 10-phase execution loop, persistent memory graph, dynamic movement primitives (DMPs), and automatic skill synthesizer.
                            </p>

                            <div className="space-y-3 font-mono text-xs">
                                <div className="flex items-start gap-2.5 text-[var(--color-ivory)]">
                                    <span className="text-[var(--color-plasma)] font-bold">✓</span>
                                    <span><strong>10-Phase Cognitive Loop:</strong> Causal reasoning, textual gradient descent, and multi-signal drift gating.</span>
                                </div>
                                <div className="flex items-start gap-2.5 text-[var(--color-ivory)]">
                                    <span className="text-[var(--color-plasma)] font-bold">✓</span>
                                    <span><strong>7-Tier Persistent Memory:</strong> SQLite experience traces, semantic graph, and compiled procedural callables.</span>
                                </div>
                                <div className="flex items-start gap-2.5 text-[var(--color-ivory)]">
                                    <span className="text-[var(--color-plasma)] font-bold">✓</span>
                                    <span><strong>In-Device Inference:</strong> Automatic provider routing across local Ollama (Llama, Qwen) and cloud APIs (Gemini, Claude, GPT).</span>
                                </div>
                            </div>
                        </div>

                        {/* ENGINE 2: STACC */}
                        <div className="bg-[var(--color-void)] border border-[var(--color-electric)]/30 p-8 space-y-6 relative overflow-hidden"
                            style={{ clipPath: "polygon(12px 0, 100% 0, calc(100% - 12px) 100%, 0 100%)" }}
                        >
                            <div className="flex items-center justify-between border-b border-white/10 pb-4">
                                <div className="flex items-center gap-3">
                                    <span className="w-3 h-3 rounded-full bg-[var(--color-electric)]" />
                                    <h3 className="font-[var(--font-display)] text-3xl tracking-wider text-white">STACC ENGINE</h3>
                                </div>
                                <span className="text-[9px] px-2.5 py-1 bg-[var(--color-electric)]/15 text-[var(--color-electric)] border border-[var(--color-electric)]/30 font-mono uppercase">
                                    1000Hz ROBOTICS &amp; PHYSICS
                                </span>
                            </div>

                            <p className="text-xs sm:text-sm text-[var(--color-mist)] leading-relaxed">
                                The high-frequency physics and real-time execution engine. Manages MuJoCo 3.2.0 multi-body dynamics, RNEA kinematics, and POSIX shared memory buses.
                            </p>

                            <div className="space-y-3 font-mono text-xs">
                                <div className="flex items-start gap-2.5 text-[var(--color-ivory)]">
                                    <span className="text-[var(--color-electric)] font-bold">✓</span>
                                    <span><strong>MuJoCo 3.2.0 PGS Solver:</strong> Projected Gauss-Seidel multi-body dynamics at 1000Hz real-time frequency.</span>
                                </div>
                                <div className="flex items-start gap-2.5 text-[var(--color-ivory)]">
                                    <span className="text-[var(--color-electric)] font-bold">✓</span>
                                    <span><strong>Analytical Dynamics:</strong> Spatial direct forward kinematics and RNEA gravity compensation in 0.018ms.</span>
                                </div>
                                <div className="flex items-start gap-2.5 text-[var(--color-ivory)]">
                                    <span className="text-[var(--color-electric)] font-bold">✓</span>
                                    <span><strong>Zero-Copy POSIX IPC:</strong> Ringbuffered shared memory telemetry bus for high-bandwidth sensor &amp; actuator control.</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ═══════════════════════════════════════════════════════════════ */}
            {/* COMPARISON TABLE: STUDIO VS CLI                                 */}
            {/* ═══════════════════════════════════════════════════════════════ */}
            <section className="py-24 px-6 border-b border-white/5 relative z-10">
                <div className="max-w-4xl mx-auto">
                    <h2 className="font-[var(--font-display)] text-4xl sm:text-5xl tracking-wider text-center mb-12">
                        COMPARE PLATFORMS
                    </h2>

                    <div className="overflow-x-auto bg-[var(--color-ash)] border border-white/10 p-6"
                        style={{ clipPath: "polygon(12px 0, 100% 0, calc(100% - 12px) 100%, 0 100%)" }}
                    >
                        <table className="w-full text-xs font-mono">
                            <thead>
                                <tr className="border-b border-white/10 text-left">
                                    <th className="py-4 pr-4 text-[var(--color-smoke)] tracking-[0.2em] font-bold font-sans">
                                        FEATURE / CAPABILITY
                                    </th>
                                    <th className="py-4 px-4 text-center text-[var(--color-ember)] font-sans">
                                        <span className="font-[var(--font-display)] text-lg tracking-wider block">
                                            NELO STUDIO
                                        </span>
                                        <span className="text-[9px] text-[var(--color-smoke)] font-mono">GUI DESKTOP IDE</span>
                                    </th>
                                    <th className="py-4 px-4 text-center text-[var(--color-volt)] font-sans">
                                        <span className="font-[var(--font-display)] text-lg tracking-wider block">
                                            NELO CLI
                                        </span>
                                        <span className="text-[9px] text-[var(--color-smoke)] font-mono">HEADLESS &amp; SDK</span>
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="text-[var(--color-mist)]">
                                {[
                                    ["Standalone Native Window (Zero Browser)", true, false],
                                    ["Interactive 3D MuJoCo Physics Viewport", true, false],
                                    ["Visual 3D Parametric CAD Studio", true, false],
                                    ["Monaco Code Editor with Code Completion", true, false],
                                    ["Interactive NIL AI Assistant Dock", true, false],
                                    ["Headless 1000Hz Physics Simulation Step", true, true],
                                    ["Analytical Spatial Kinematics (0.018ms)", true, true],
                                    ["RNEA Dynamic Gravity Torque Compensation", true, true],
                                    ["10-Phase NIL Cognitive Evolutionary Cycles", true, true],
                                    ["STEP AP242 & B-Rep Mesh Exporters", true, true],
                                    ["Local Ollama In-Device Model Manager", true, true],
                                    ["Linux Shell Terminal & POSIX Bus", true, true],
                                    ["Docker Container & Cluster CI/CD Support", false, true],
                                    ["Edge Hardware HAL (Jetson, RPi, STM32)", false, true],
                                    ["Embedded STACC 1000Hz Engine Inside", true, true],
                                    ["Embedded NIL Causal AI Engine Inside", true, true],
                                ].map(([feature, studio, cli], idx) => (
                                    <tr key={idx} className="border-b border-white/5 hover:bg-white/[0.02] transition-colors">
                                        <td className="py-3 pr-4 text-xs font-sans text-white">
                                            {feature as string}
                                        </td>
                                        <td className="py-3 px-4 text-center">
                                            {studio ? (
                                                <span className="text-[var(--color-ember)] font-bold">✓</span>
                                            ) : (
                                                <span className="text-[var(--color-smoke)]">—</span>
                                            )}
                                        </td>
                                        <td className="py-3 px-4 text-center">
                                            {cli ? (
                                                <span className="text-[var(--color-volt)] font-bold">✓</span>
                                            ) : (
                                                <span className="text-[var(--color-smoke)]">—</span>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                                <tr className="border-t-2 border-white/10 font-bold font-sans">
                                    <td className="py-4 pr-4 text-sm text-white">
                                        Annual License
                                    </td>
                                    <td className="py-4 px-4 text-center font-[var(--font-display)] text-2xl text-[var(--color-ember)]">
                                        ₹9,999 <span className="text-xs font-mono text-[var(--color-smoke)] font-normal">/yr</span>
                                    </td>
                                    <td className="py-4 px-4 text-center font-[var(--font-display)] text-2xl text-[var(--color-volt)]">
                                        ₹4,999 <span className="text-xs font-mono text-[var(--color-smoke)] font-normal">/yr</span>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </section>

            {/* ═══════════════════════════════════════════════════════════════ */}
            {/* CTA                                                             */}
            {/* ═══════════════════════════════════════════════════════════════ */}
            <section className="py-24 px-6 relative z-10">
                <div className="max-w-4xl mx-auto text-center space-y-6">
                    <h2 className="font-[var(--font-display)] text-5xl sm:text-6xl tracking-wider">
                        READY TO BUILD{" "}
                        <span className="text-[var(--color-ember)] text-glow">
                            AUTONOMOUS ROBOTICS?
                        </span>
                    </h2>
                    <p className="text-xs sm:text-sm text-[var(--color-mist)] max-w-xl mx-auto">
                        Download the native NELO Studio desktop IDE or install the high-speed NELO CLI package in seconds.
                    </p>

                    <div className="flex flex-wrap justify-center gap-4 pt-4">
                        <Link
                            href="/downloads"
                            className="bg-[var(--color-ember)] hover:brightness-110 text-[var(--color-void)] px-8 py-4 font-bold text-xs tracking-wider flex items-center gap-2 cursor-pointer transition-all"
                            style={{ clipPath: "polygon(8px 0, 100% 0, calc(100% - 8px) 100%, 0 100%)" }}
                        >
                            <Download className="w-4 h-4" />
                            <span>DOWNLOAD NELO STUDIO →</span>
                        </Link>

                        <Link
                            href="/downloads?product=cli"
                            className="bg-[var(--color-ash)] hover:bg-white/10 text-white border border-white/10 px-8 py-4 font-bold text-xs tracking-wider flex items-center gap-2 cursor-pointer transition-all"
                            style={{ clipPath: "polygon(8px 0, 100% 0, calc(100% - 8px) 100%, 0 100%)" }}
                        >
                            <Terminal className="w-4 h-4 text-[var(--color-volt)]" />
                            <span>INSTALL NELO CLI →</span>
                        </Link>
                    </div>
                </div>
            </section>

            {/* ═══════════════════════════════════════════════════════════════ */}
            {/* FOOTER                                                          */}
            {/* ═══════════════════════════════════════════════════════════════ */}
            <footer className="border-t border-white/5 py-12 px-6 relative z-10">
                <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
                    <div className="flex items-center gap-3">
                        <Image src="/logo.png" alt="Nelo" width={24} height={24} className="rounded-lg" />
                        <span className="font-[var(--font-display)] text-sm tracking-[0.2em]">
                            NELO ROBOTICS PVT LTD
                        </span>
                    </div>
                    <div className="flex items-center gap-8 text-xs text-[var(--color-smoke)] tracking-wider">
                        <Link href="/" className="hover:text-[var(--color-ember)] transition-colors">HOME</Link>
                        <Link href="/products" className="hover:text-[var(--color-ember)] transition-colors">PRODUCTS</Link>
                        <Link href="/downloads" className="hover:text-[var(--color-ember)] transition-colors">DOWNLOADS</Link>
                        <Link href="/usecases" className="hover:text-[var(--color-ember)] transition-colors">USE CASES</Link>
                        <span>© 2026</span>
                    </div>
                </div>
            </footer>
        </div>
    );
}
