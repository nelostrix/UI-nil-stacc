"use client";

import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import Image from "next/image";

/* ═══════════════════════════════════════
   PARTICLES — floating energy dots
   ═══════════════════════════════════════ */
function Particles() {
    const [particles, setParticles] = useState<
        {
            id: number;
            x: number;
            y: number;
            size: number;
            delay: number;
            color: string;
        }[]
    >([]);

    useEffect(() => {
        const colors = ["#FF3D00", "#00D4FF", "#C8FF00", "#8B5CF6"];
        const p = Array.from({ length: 30 }, (_, i) => ({
            id: i,
            x: Math.random() * 100,
            y: Math.random() * 100,
            size: Math.random() * 3 + 1,
            delay: Math.random() * 8,
            color: colors[Math.floor(Math.random() * colors.length)],
        }));
        setParticles(p);
    }, []);

    return (
        <div className="fixed inset-0 pointer-events-none z-0">
            {particles.map((p) => (
                <div
                    key={p.id}
                    className="absolute rounded-full animate-float"
                    style={{
                        left: `${p.x}%`,
                        top: `${p.y}%`,
                        width: p.size,
                        height: p.size,
                        background: p.color,
                        opacity: 0.15,
                        animationDelay: `${p.delay}s`,
                        animationDuration: `${4 + Math.random() * 4}s`,
                    }}
                />
            ))}
        </div>
    );
}

/* ═══════════════════════════════════════
   NAV
   ═══════════════════════════════════════ */
function Nav() {
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handler = () => setScrolled(window.scrollY > 50);
        window.addEventListener("scroll", handler);
        return () => window.removeEventListener("scroll", handler);
    }, []);

    return (
        <nav
            className={`fixed top-0 w-full z-50 transition-all duration-500 ${scrolled ? "backdrop-blur-xl bg-[var(--color-void)]/90 border-b border-white/5" : ""}`}
        >
            <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
                <Link href="/" className="flex items-center gap-3 group">
                    <div className="relative">
                        <Image
                            src="/logo.png"
                            alt="Nelo"
                            width={40}
                            height={40}
                            className="rounded-xl group-hover:brightness-125 transition-all"
                        />
                        <div className="absolute inset-0 rounded-xl bg-[var(--color-ember)]/0 group-hover:bg-[var(--color-ember)]/10 transition-all" />
                    </div>
                    <span className="font-[var(--font-display)] text-2xl tracking-wider">
                        NELO
                    </span>
                </Link>

                <div className="hidden md:flex items-center gap-1">
                    {[
                        { href: "/products", label: "PRODUCTS" },
                        { href: "/downloads", label: "DOWNLOADS" },
                        { href: "/usecases", label: "USE CASES" },
                    ].map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            className="px-4 py-2 text-xs font-semibold tracking-[0.2em] text-[var(--color-mist)] hover:text-[var(--color-ember)] transition-colors relative group"
                        >
                            {link.label}
                            <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-[2px] bg-[var(--color-ember)] group-hover:w-full transition-all duration-300" />
                        </Link>
                    ))}
                    <Link
                        href="/downloads"
                        className="ml-4 bg-[var(--color-ember)] text-[var(--color-void)] px-5 py-2.5 text-xs font-bold tracking-[0.15em] hover:brightness-110 hover:scale-105 transition-all animate-pulse-glow"
                        style={{
                            clipPath:
                                "polygon(8px 0, 100% 0, calc(100% - 8px) 100%, 0 100%)",
                        }}
                    >
                        GET STARTED
                    </Link>
                </div>
            </div>
        </nav>
    );
}

/* ═══════════════════════════════════════
   HERO
   ═══════════════════════════════════════ */
function Hero() {
    return (
        <section className="min-h-screen flex items-center relative overflow-hidden crosshair-bg">
            {/* Energy orbs */}
            <div className="absolute top-[20%] left-[10%] w-[500px] h-[500px] bg-[var(--color-ember)]/[0.06] rounded-full blur-[150px] animate-float" />
            <div
                className="absolute bottom-[10%] right-[10%] w-[400px] h-[400px] bg-[var(--color-electric)]/[0.04] rounded-full blur-[120px] animate-float"
                style={{ animationDelay: "2s" }}
            />
            <div
                className="absolute top-[50%] right-[30%] w-[300px] h-[300px] bg-[var(--color-plasma)]/[0.03] rounded-full blur-[100px] animate-float"
                style={{ animationDelay: "4s" }}
            />

            {/* Japanese decoration */}
            <div
                className="absolute right-8 top-1/3 writing-mode-vertical text-[var(--color-ember)]/[0.06] text-sm tracking-[1em] font-light hidden lg:block"
                style={{ writingMode: "vertical-rl" }}
            >
                ネロ・ロボティクス
            </div>

            {/* Speed lines */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                {[...Array(5)].map((_, i) => (
                    <div
                        key={i}
                        className="absolute h-[1px] bg-gradient-to-r from-transparent via-[var(--color-ember)]/20 to-transparent"
                        style={{
                            top: `${20 + i * 15}%`,
                            left: "-10%",
                            right: "-10%",
                            animation: `speedLine ${2 + i * 0.5}s ease-out ${i * 0.3}s infinite`,
                            transformOrigin: "left center",
                        }}
                    />
                ))}
            </div>

            <div className="max-w-7xl mx-auto px-6 pt-20 grid lg:grid-cols-[1.2fr_0.8fr] gap-12 items-center relative z-10">
                <div>
                    {/* Badge */}
                    <div
                        className="animate-fade-up"
                        style={{ animationDelay: "0.2s", opacity: 0 }}
                    >
                        <span className="inline-flex items-center gap-2 bg-[var(--color-ember)]/10 border border-[var(--color-ember)]/20 text-[var(--color-ember)] text-[10px] font-bold tracking-[0.2em] uppercase px-4 py-2">
                            <span className="w-2 h-2 bg-[var(--color-ember)] rounded-full animate-pulse" />
                            NOW AVAILABLE — V0.1.0
                        </span>
                    </div>

                    {/* Main headline */}
                    <h1
                        className="mt-8 animate-fade-up"
                        style={{ animationDelay: "0.4s", opacity: 0 }}
                    >
                        <span className="font-[var(--font-display)] text-7xl md:text-8xl lg:text-[7rem] leading-[0.9] tracking-wider block">
                            BUILD
                        </span>
                        <span className="font-[var(--font-display)] text-7xl md:text-8xl lg:text-[7rem] leading-[0.9] tracking-wider block">
                            ROBOTS
                        </span>
                        <span
                            className="font-[var(--font-display)] text-7xl md:text-8xl lg:text-[7rem] leading-[0.9] tracking-wider block text-glow"
                            style={{ color: "var(--color-ember)" }}
                        >
                            THAT THINK
                            <span className="font-[var(--font-accent)] text-[var(--color-volt)]">
                                .
                            </span>
                        </span>
                    </h1>

                    <p
                        className="text-[var(--color-mist)] text-lg mt-8 max-w-lg leading-relaxed animate-fade-up"
                        style={{ animationDelay: "0.6s", opacity: 0 }}
                    >
                        The complete robotics intelligence stack. Simulate with
                        real physics. Deploy to any hardware. AI agents that
                        evolve with every run.
                    </p>

                    {/* CTAs */}
                    <div
                        className="flex flex-wrap gap-4 mt-10 animate-fade-up"
                        style={{ animationDelay: "0.8s", opacity: 0 }}
                    >
                        <Link
                            href="/downloads"
                            className="group relative bg-[var(--color-ember)] text-[var(--color-void)] px-8 py-4 font-bold text-sm tracking-[0.15em] hover:brightness-110 transition-all overflow-hidden"
                            style={{
                                clipPath:
                                    "polygon(12px 0, 100% 0, calc(100% - 12px) 100%, 0 100%)",
                            }}
                        >
                            <span className="relative z-10">GET STARTED →</span>
                            <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 skew-x-12" />
                        </Link>
                        <Link
                            href="/products"
                            className="border border-white/10 px-8 py-4 text-sm tracking-[0.1em] hover:border-[var(--color-ember)]/30 hover:bg-white/[0.02] transition-all"
                            style={{
                                clipPath:
                                    "polygon(12px 0, 100% 0, calc(100% - 12px) 100%, 0 100%)",
                            }}
                        >
                            EXPLORE PRODUCTS
                        </Link>
                    </div>
                </div>

                {/* Logo reveal */}
                <div className="relative hidden lg:flex items-center justify-center">
                    <div
                        className="relative w-[350px] h-[350px] animate-power-up"
                        style={{ animationDelay: "0.5s", opacity: 0 }}
                    >
                        {/* Orbital ring */}
                        <div className="absolute inset-[-20px] border border-[var(--color-ember)]/10 rounded-full animate-orbit" />
                        <div
                            className="absolute inset-[-50px] border border-dashed border-[var(--color-electric)]/5 rounded-full animate-orbit"
                            style={{
                                animationDirection: "reverse",
                                animationDuration: "30s",
                            }}
                        />

                        {/* Logo */}
                        <div className="absolute inset-0 flex items-center justify-center">
                            <Image
                                src="/logo.png"
                                alt="Nelo Robotics"
                                width={250}
                                height={250}
                                className="drop-shadow-[0_0_60px_rgba(255,61,0,0.15)]"
                            />
                        </div>

                        {/* Corner brackets */}
                        <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-[var(--color-ember)]/30" />
                        <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-[var(--color-ember)]/30" />
                        <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-[var(--color-ember)]/30" />
                        <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-[var(--color-ember)]/30" />

                        {/* Status text */}
                        <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 font-[var(--font-mono)] text-[10px] text-[var(--color-smoke)] tracking-wider">
                            SYS.STATUS:{" "}
                            <span className="text-[var(--color-volt)]">
                                ONLINE
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Scroll indicator */}
            <div
                className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-fade-up"
                style={{ animationDelay: "1.2s", opacity: 0 }}
            >
                <span className="text-[10px] tracking-[0.3em] text-[var(--color-smoke)]">
                    SCROLL
                </span>
                <div className="w-[1px] h-8 bg-gradient-to-b from-[var(--color-ember)] to-transparent animate-pulse" />
            </div>
        </section>
    );
}

/* ═══════════════════════════════════════
   MANIFESTO
   ═══════════════════════════════════════ */
function Manifesto() {
    return (
        <section className="py-32 px-6 relative scanline">
            <div className="max-w-5xl mx-auto relative">
                <div className="absolute -left-4 top-0 bottom-0 w-[2px] bg-gradient-to-b from-[var(--color-ember)]/40 via-[var(--color-ember)]/10 to-transparent" />

                <p className="font-[var(--font-display)] text-4xl md:text-6xl lg:text-7xl leading-[1.1] tracking-wide pl-8">
                    <span className="text-[var(--color-smoke)]">WE BUILD </span>
                    <span className="text-[var(--color-ivory)]">
                        THE INTELLIGENCE LAYER{" "}
                    </span>
                    <span className="text-[var(--color-smoke)]">FOR </span>
                    <span className="text-[var(--color-ember)] text-glow">
                        AUTONOMOUS{" "}
                    </span>
                    <span className="text-[var(--color-smoke)]">SYSTEMS</span>
                    <span className="text-[var(--color-volt)]">.</span>
                </p>

                <div className="mt-8 pl-8 font-[var(--font-mono)] text-xs text-[var(--color-smoke)] tracking-wider">
                    // FROM SIMULATION → HARDWARE → INTELLIGENCE → EVOLUTION
                </div>
            </div>
        </section>
    );
}

/* ═══════════════════════════════════════
   PRODUCT CARDS
   ═══════════════════════════════════════ */
function Products() {
    const products = [
        {
            name: "STACC",
            sub: "ロボティクス",
            tag: "ROBOTICS PLATFORM",
            desc: "Universal robotics development platform. MuJoCo physics, 14 sensors, SLAM, path planning. Define any robot, simulate, deploy.",
            color: "var(--color-electric)",
            stats: ["30+ Modules", "17 Boards", "116 Tests"],
            href: "/products#stacc",
        },
        {
            name: "NIL",
            sub: "インテリジェンス",
            tag: "AGENT SDK",
            desc: "Self-evolving AI agents. Persistent memory, skill extraction, drift detection. Gets smarter every run.",
            color: "var(--color-plasma)",
            stats: ["∞ Memory", "Auto Skills", "Any LLM"],
            href: "/products#nil",
        },
        {
            name: "NIL×STACC",
            sub: "フュージョン",
            tag: "FULL STACK",
            desc: "The complete robotics intelligence stack. Self-improving agents controlling real robots. Brain meets body.",
            color: "var(--color-ember)",
            stats: ["Auto Tools", "Domains", "Evolving"],
            href: "/products#nil-stacc",
        },
    ];

    return (
        <section className="py-32 px-6">
            <div className="max-w-7xl mx-auto">
                <div className="flex items-center gap-4 mb-16">
                    <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent to-white/5" />
                    <span className="font-[var(--font-display)] text-sm tracking-[0.3em] text-[var(--color-smoke)]">
                        PRODUCTS
                    </span>
                    <div className="h-[1px] flex-1 bg-gradient-to-l from-transparent to-white/5" />
                </div>

                <div className="grid md:grid-cols-3 gap-5">
                    {products.map((p, i) => (
                        <Link
                            key={p.name}
                            href={p.href}
                            className="group bg-[var(--color-ash)] border border-white/5 relative overflow-hidden card-hover animate-fade-up"
                            style={{
                                animationDelay: `${i * 0.15}s`,
                                opacity: 0,
                                clipPath:
                                    "polygon(0 0, calc(100% - 20px) 0, 100% 20px, 100% 100%, 20px 100%, 0 calc(100% - 20px))",
                            }}
                        >
                            {/* Top accent line */}
                            <div
                                className="h-[2px] w-full"
                                style={{
                                    background: `linear-gradient(90deg, transparent, ${p.color}, transparent)`,
                                }}
                            />

                            <div className="p-8">
                                {/* Tag */}
                                <span
                                    className="text-[9px] font-bold tracking-[0.25em] px-3 py-1 border"
                                    style={{
                                        color: p.color,
                                        borderColor: p.color + "30",
                                    }}
                                >
                                    {p.tag}
                                </span>

                                {/* Name */}
                                <div className="mt-6 flex items-end gap-3">
                                    <h3 className="font-[var(--font-display)] text-5xl tracking-wider group-hover:tracking-[0.15em] transition-all duration-500">
                                        {p.name}
                                    </h3>
                                    <span className="text-xs text-white/10 mb-2">
                                        {p.sub}
                                    </span>
                                </div>

                                <p className="text-[var(--color-smoke)] text-sm mt-4 leading-relaxed">
                                    {p.desc}
                                </p>

                                {/* Stats */}
                                <div className="flex gap-4 mt-8">
                                    {p.stats.map((s) => (
                                        <span
                                            key={s}
                                            className="text-[10px] font-bold tracking-wider text-[var(--color-mist)] bg-[var(--color-void)] px-3 py-1.5 border border-white/5"
                                        >
                                            {s}
                                        </span>
                                    ))}
                                </div>

                                {/* Arrow */}
                                <div
                                    className="mt-8 flex items-center gap-2 text-xs tracking-wider opacity-0 group-hover:opacity-100 transition-all translate-x-[-10px] group-hover:translate-x-0"
                                    style={{ color: p.color }}
                                >
                                    EXPLORE <span>→</span>
                                </div>
                            </div>

                            {/* Hover glow */}
                            <div
                                className="absolute -bottom-20 -right-20 w-40 h-40 rounded-full blur-[80px] opacity-0 group-hover:opacity-20 transition-opacity duration-700"
                                style={{ background: p.color }}
                            />
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
}

/* ═══════════════════════════════════════
   STATS
   ═══════════════════════════════════════ */
function Stats() {
    const stats = [
        { value: "30+", label: "MODULES", color: "var(--color-ember)" },
        { value: "116", label: "TESTS", color: "var(--color-volt)" },
        { value: "17", label: "BOARDS", color: "var(--color-electric)" },
        { value: "14", label: "SENSORS", color: "var(--color-plasma)" },
    ];

    return (
        <section className="py-24 px-6 border-y border-white/5">
            <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
                {stats.map((s, i) => (
                    <div
                        key={s.label}
                        className="text-center animate-fade-up"
                        style={{ animationDelay: `${i * 0.1}s`, opacity: 0 }}
                    >
                        <div
                            className="font-[var(--font-display)] text-6xl md:text-8xl tracking-wider"
                            style={{ color: s.color }}
                        >
                            {s.value}
                        </div>
                        <div className="text-[10px] font-bold tracking-[0.3em] text-[var(--color-smoke)] mt-2">
                            {s.label}
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}

/* ═══════════════════════════════════════
   TERMINAL
   ═══════════════════════════════════════ */
function Terminal() {
    return (
        <section className="py-32 px-6">
            <div className="max-w-3xl mx-auto">
                <div className="text-center mb-12">
                    <span className="font-[var(--font-display)] text-4xl md:text-5xl tracking-wider">
                        ONE COMMAND
                    </span>
                    <span className="font-[var(--font-accent)] text-[var(--color-ember)] text-3xl ml-3">
                        .
                    </span>
                </div>

                <div
                    className="bg-[var(--color-ash)] border border-white/5 overflow-hidden animate-border-glow"
                    style={{
                        clipPath:
                            "polygon(0 0, calc(100% - 16px) 0, 100% 16px, 100% 100%, 16px 100%, 0 calc(100% - 16px))",
                    }}
                >
                    <div className="flex items-center gap-2 px-5 py-3 bg-[var(--color-steel)] border-b border-white/5">
                        <div className="w-3 h-3 rounded-full bg-[var(--color-ember)]" />
                        <div className="w-3 h-3 rounded-full bg-[var(--color-volt)]" />
                        <div className="w-3 h-3 rounded-full bg-[var(--color-electric)]" />
                        <span className="text-[10px] text-[var(--color-smoke)] ml-3 tracking-wider font-[var(--font-mono)]">
                            NELO_TERMINAL
                        </span>
                    </div>
                    <pre className="p-6 font-[var(--font-mono)] text-sm leading-loose overflow-x-auto">
                        <code>
                            <span className="text-[var(--color-ember)]">$</span>{" "}
                            <span className="text-[var(--color-mist)]">
                                bash install.sh --key
                            </span>{" "}
                            <span className="text-[var(--color-volt)]">
                                NELO-XXXXX
                            </span>{" "}
                            <span className="text-[var(--color-mist)]">
                                --package
                            </span>{" "}
                            <span className="text-[var(--color-electric)]">
                                nil-stacc
                            </span>
                            {"\n\n"}
                            <span className="text-[var(--color-smoke)]">
                                {"  "}███████╗████████╗ █████╗ ██████╗ ██████╗
                            </span>
                            {"\n"}
                            <span className="text-[var(--color-smoke)]">
                                {"  "}██╔════╝╚══██╔══╝██╔══██╗██╔════╝██╔════╝
                            </span>
                            {"\n"}
                            <span className="text-[var(--color-smoke)]">
                                {"  "}███████╗ ██║ ███████║██║ ██║
                            </span>
                            {"\n\n"}
                            <span className="text-[var(--color-volt)]">
                                {"  "}✓
                            </span>{" "}
                            <span className="text-[var(--color-mist)]">
                                License validated
                            </span>
                            {"\n"}
                            <span className="text-[var(--color-volt)]">
                                {"  "}✓
                            </span>{" "}
                            <span className="text-[var(--color-mist)]">
                                Packages downloaded
                            </span>
                            {"\n"}
                            <span className="text-[var(--color-volt)]">
                                {"  "}✓
                            </span>{" "}
                            <span className="text-[var(--color-mist)]">
                                Installation complete
                            </span>
                            {"\n\n"}
                            <span className="text-[var(--color-ember)]">
                                $
                            </span>{" "}
                            <span className="text-[var(--color-electric)]">
                                import
                            </span>{" "}
                            <span className="text-[var(--color-ivory)]">
                                stacc
                            </span>
                            {"\n"}
                            <span className="text-[var(--color-ember)]">
                                $
                            </span>{" "}
                            <span className="text-[var(--color-ivory)]">
                                robot = stacc.load_urdf(
                            </span>
                            <span className="text-[var(--color-flame)]">
                                &quot;panda.urdf&quot;
                            </span>
                            <span className="text-[var(--color-ivory)]">)</span>
                            {"\n"}
                            <span className="text-[var(--color-ember)]">
                                $
                            </span>{" "}
                            <span className="text-[var(--color-ivory)]">
                                stacc.simulate(robot, render=
                            </span>
                            <span className="text-[var(--color-volt)]">
                                True
                            </span>
                            <span className="text-[var(--color-ivory)]">)</span>
                        </code>
                    </pre>
                </div>

                <p className="text-center text-[var(--color-smoke)] text-xs mt-4 tracking-wider">
                    ANIME TERMINAL ANIMATION INCLUDED · LINUX · MACOS · WINDOWS
                    WSL
                </p>
            </div>
        </section>
    );
}

/* ═══════════════════════════════════════
   CTA
   ═══════════════════════════════════════ */
function CTA() {
    return (
        <section className="py-32 px-6 relative overflow-hidden speed-lines">
            <div className="absolute inset-0 bg-gradient-to-b from-[var(--color-ember)]/[0.03] to-transparent" />

            <div className="max-w-4xl mx-auto text-center relative z-10">
                <h2 className="font-[var(--font-display)] text-6xl md:text-8xl tracking-wider">
                    READY TO
                    <span className="text-[var(--color-ember)] text-glow block mt-2">
                        BUILD?
                    </span>
                </h2>
                <p className="text-[var(--color-mist)] mt-6 text-lg">
                    From simulation to real hardware. One platform. Any robot.
                </p>
                <Link
                    href="/downloads"
                    className="inline-block mt-10 bg-[var(--color-ember)] text-[var(--color-void)] px-10 py-5 font-bold text-sm tracking-[0.2em] hover:brightness-110 hover:scale-105 transition-all animate-pulse-glow"
                    style={{
                        clipPath:
                            "polygon(12px 0, 100% 0, calc(100% - 12px) 100%, 0 100%)",
                    }}
                >
                    GET YOUR LICENSE KEY →
                </Link>
            </div>
        </section>
    );
}

/* ═══════════════════════════════════════
   FOOTER
   ═══════════════════════════════════════ */
function Footer() {
    return (
        <footer className="border-t border-white/5 py-12 px-6">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="flex items-center gap-3">
                    <Image
                        src="/logo.png"
                        alt="Nelo"
                        width={28}
                        height={28}
                        className="rounded-lg"
                    />
                    <span className="font-[var(--font-display)] text-sm tracking-[0.2em]">
                        NELO ROBOTICS PVT LTD
                    </span>
                </div>
                <div className="flex items-center gap-8 text-xs text-[var(--color-smoke)] tracking-wider">
                    <Link
                        href="/products"
                        className="hover:text-[var(--color-ember)] transition-colors"
                    >
                        PRODUCTS
                    </Link>
                    <Link
                        href="/downloads"
                        className="hover:text-[var(--color-ember)] transition-colors"
                    >
                        DOWNLOADS
                    </Link>
                    <Link
                        href="/usecases"
                        className="hover:text-[var(--color-ember)] transition-colors"
                    >
                        USE CASES
                    </Link>
                    <a
                        href="mailto:contact@nelo-robotics.com"
                        className="hover:text-[var(--color-ember)] transition-colors"
                    >
                        CONTACT
                    </a>
                </div>
                <div className="font-[var(--font-mono)] text-[10px] text-[var(--color-smoke)] tracking-wider">
                    LUCKNOW, IN · © 2026
                </div>
            </div>
        </footer>
    );
}

/* ═══════════════════════════════════════
   PAGE
   ═══════════════════════════════════════ */
export default function Home() {
    return (
        <main>
            <Particles />
            <Nav />
            <Hero />
            <Manifesto />
            <Products />
            <Stats />
            <Terminal />
            <CTA />
            <Footer />
        </main>
    );
}
