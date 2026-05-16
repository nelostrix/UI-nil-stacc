"use client";

import { useState } from "react";
import Link from "next/link";

function Nav() {
    return (
        <nav className="fixed top-0 w-full z-50 backdrop-blur-xl bg-[var(--color-ink)]/80 border-b border-white/5">
            <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
                <Link href="/" className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-[var(--color-ember)] rounded-lg flex items-center justify-center">
                        <span className="text-[var(--color-ink)] font-bold text-sm">
                            N
                        </span>
                    </div>
                    <span className="font-[var(--font-display)] text-xl tracking-tight">
                        Nelo
                    </span>
                </Link>
                <div className="hidden md:flex items-center gap-8 text-sm text-[var(--color-mist)]">
                    <Link
                        href="/products"
                        className="hover:text-[var(--color-ivory)] transition-colors"
                    >
                        Products
                    </Link>
                    <Link
                        href="/downloads"
                        className="text-[var(--color-ivory)]"
                    >
                        Downloads
                    </Link>
                    <Link
                        href="/usecases"
                        className="hover:text-[var(--color-ivory)] transition-colors"
                    >
                        Use Cases
                    </Link>
                </div>
            </div>
        </nav>
    );
}

export default function Downloads() {
    const [copied, setCopied] = useState<string | null>(null);

    const copy = (text: string, id: string) => {
        navigator.clipboard.writeText(text);
        setCopied(id);
        setTimeout(() => setCopied(null), 2000);
    };

    const tiers = [
        {
            name: "stacc",
            price: "₹4,999",
            period: "/year",
            description: "Universal robotics platform",
            color: "var(--color-ocean)",
            features: [
                "MuJoCo simulation",
                "URDF/SDF parser",
                "14 sensors",
                "Path planning & SLAM",
                "HAL for 17 boards",
                "Gym RL wrapper",
                "Email support",
            ],
            install: "bash install.sh --key YOUR_KEY --package stacc",
            popular: false,
        },
        {
            name: "NIL × STACC",
            price: "₹14,999",
            period: "/year",
            description: "Complete intelligence stack",
            color: "var(--color-ember)",
            features: [
                "Everything in stacc",
                "NIL agent SDK",
                "Self-evolving agents",
                "Auto tool generation",
                "Pre-built domains",
                "Priority support",
                "Fleet management",
            ],
            install: "bash install.sh --key YOUR_KEY --package nil-stacc",
            popular: true,
        },
        {
            name: "Enterprise",
            price: "Custom",
            period: "",
            description: "Custom solutions for teams",
            color: "var(--color-purple)",
            features: [
                "Everything in Full Stack",
                "On-premise deployment",
                "Custom model training",
                "Dedicated engineer",
                "SLA guarantee",
                "Air-gapped install",
                "Source code access",
            ],
            install: "Contact sales@nelo-robotics.com",
            popular: false,
        },
    ];

    return (
        <main>
            <Nav />

            {/* Header */}
            <section className="pt-32 pb-16 px-6">
                <div className="max-w-5xl mx-auto text-center">
                    <span className="bg-[var(--color-volt)] text-[var(--color-ink)] text-[10px] font-semibold tracking-widest uppercase px-3 py-1 rounded-full">
                        Downloads
                    </span>
                    <h1 className="font-[var(--font-display)] text-6xl md:text-8xl tracking-tight mt-6">
                        Simple, <span className="italic">honest.</span>
                    </h1>
                    <p className="text-[var(--color-mist)] text-lg mt-4">
                        Pay once per year. No hidden fees. Cancel anytime.
                    </p>
                </div>
            </section>

            {/* Pricing cards */}
            <section className="py-16 px-6">
                <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-6">
                    {tiers.map((t, i) => (
                        <div
                            key={t.name}
                            className={`relative bg-[var(--color-ash)] border rounded-3xl p-8 animate-fade-up ${t.popular ? "border-[var(--color-ember)]/50 md:scale-105" : "border-white/5"}`}
                            style={{
                                animationDelay: `${i * 0.15}s`,
                                opacity: 0,
                            }}
                        >
                            {t.popular && (
                                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                                    <span className="bg-[var(--color-ember)] text-[var(--color-ink)] text-[10px] font-semibold tracking-widest uppercase px-3 py-1 rounded-full">
                                        Most Popular
                                    </span>
                                </div>
                            )}

                            <div
                                className="w-3 h-3 rounded-full mb-4"
                                style={{ background: t.color }}
                            />
                            <h3 className="font-[var(--font-display)] text-2xl mb-1">
                                {t.name}
                            </h3>
                            <p className="text-[var(--color-smoke)] text-sm mb-6">
                                {t.description}
                            </p>

                            <div className="mb-8">
                                <span className="font-[var(--font-display)] text-5xl">
                                    {t.price}
                                </span>
                                <span className="text-[var(--color-smoke)] text-sm">
                                    {t.period}
                                </span>
                            </div>

                            <div className="space-y-3 mb-8">
                                {t.features.map((f) => (
                                    <div
                                        key={f}
                                        className="flex items-center gap-2 text-sm text-[var(--color-mist)]"
                                    >
                                        <span className="text-[var(--color-volt)]">
                                            ✓
                                        </span>{" "}
                                        {f}
                                    </div>
                                ))}
                            </div>

                            <button
                                className="block w-full text-center py-3 rounded-full font-medium text-sm transition-all"
                                style={{
                                    background: t.popular
                                        ? t.color
                                        : "transparent",
                                    color: t.popular
                                        ? "var(--color-ink)"
                                        : "var(--color-ivory)",
                                    border: t.popular
                                        ? "none"
                                        : "1px solid rgba(255,255,255,0.1)",
                                }}
                            >
                                {t.price === "Custom"
                                    ? "Contact Sales"
                                    : "Buy License"}
                            </button>
                        </div>
                    ))}
                </div>
            </section>

            {/* Install commands */}
            <section className="py-24 px-6 border-t border-white/5">
                <div className="max-w-3xl mx-auto">
                    <h2 className="font-[var(--font-display)] text-4xl md:text-5xl tracking-tight text-center mb-4">
                        Install with one command.
                    </h2>
                    <p className="text-[var(--color-smoke)] text-center mb-12">
                        Anime terminal animation included. Works on Linux,
                        macOS, and Windows (WSL).
                    </p>

                    <div className="space-y-4">
                        {[
                            {
                                name: "stacc",
                                cmd: "bash <(curl -s https://get.nelo-robotics.com/install.sh) --key YOUR_KEY --package stacc",
                                color: "var(--color-ocean)",
                            },
                            {
                                name: "nil-sdk",
                                cmd: "bash <(curl -s https://get.nelo-robotics.com/install.sh) --key YOUR_KEY --package nil-sdk",
                                color: "var(--color-purple)",
                            },
                            {
                                name: "nil-stacc",
                                cmd: "bash <(curl -s https://get.nelo-robotics.com/install.sh) --key YOUR_KEY --package nil-stacc",
                                color: "var(--color-ember)",
                            },
                        ].map((c) => (
                            <div
                                key={c.name}
                                className="bg-[var(--color-ash)] border border-white/5 rounded-2xl p-5 flex items-center justify-between gap-4 hover:border-white/10 transition-all cursor-pointer"
                                onClick={() => copy(c.cmd, c.name)}
                            >
                                <div className="flex items-center gap-4 min-w-0">
                                    <span
                                        className="text-xs font-semibold tracking-widest uppercase whitespace-nowrap"
                                        style={{ color: c.color }}
                                    >
                                        {c.name}
                                    </span>
                                    <code className="font-[var(--font-mono)] text-xs text-[var(--color-smoke)] truncate">
                                        {c.cmd}
                                    </code>
                                </div>
                                <button className="text-[var(--color-smoke)] hover:text-[var(--color-ivory)] transition-colors whitespace-nowrap text-sm">
                                    {copied === c.name ? "✓ Copied" : "Copy"}
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* How it works */}
            <section className="py-24 px-6 border-t border-white/5">
                <div className="max-w-3xl mx-auto">
                    <h2 className="font-[var(--font-display)] text-4xl tracking-tight text-center mb-16">
                        How it works
                    </h2>
                    <div className="space-y-8">
                        {[
                            {
                                step: "01",
                                title: "Get a license key",
                                desc: "Purchase a plan above. You'll receive a license key via email within 60 seconds.",
                            },
                            {
                                step: "02",
                                title: "Run the install command",
                                desc: "Paste the command in your terminal. An anime-style animation plays while packages download and install.",
                            },
                            {
                                step: "03",
                                title: "Start building",
                                desc: "import stacc — that's it. Load a URDF, simulate in MuJoCo, deploy to hardware. Everything works immediately.",
                            },
                        ].map((s) => (
                            <div key={s.step} className="flex gap-6">
                                <span className="font-[var(--font-display)] text-4xl text-[var(--color-ember)]">
                                    {s.step}
                                </span>
                                <div>
                                    <h3 className="text-lg font-semibold text-[var(--color-ivory)] mb-1">
                                        {s.title}
                                    </h3>
                                    <p className="text-[var(--color-smoke)] text-sm">
                                        {s.desc}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Requirements */}
            <section className="py-24 px-6 border-t border-white/5">
                <div className="max-w-3xl mx-auto">
                    <h2 className="font-[var(--font-display)] text-4xl tracking-tight text-center mb-12">
                        Requirements
                    </h2>
                    <div className="grid md:grid-cols-3 gap-6">
                        {[
                            {
                                title: "Python",
                                value: "3.9+",
                                detail: "3.10 recommended",
                            },
                            {
                                title: "OS",
                                value: "Any",
                                detail: "Linux, macOS, Windows WSL",
                            },
                            {
                                title: "GPU",
                                value: "Optional",
                                detail: "For MuJoCo rendering",
                            },
                        ].map((r) => (
                            <div
                                key={r.title}
                                className="bg-[var(--color-ash)] border border-white/5 rounded-2xl p-6 text-center"
                            >
                                <div className="text-xs text-[var(--color-smoke)] tracking-widest uppercase mb-2">
                                    {r.title}
                                </div>
                                <div className="font-[var(--font-display)] text-3xl text-[var(--color-ivory)] mb-1">
                                    {r.value}
                                </div>
                                <div className="text-xs text-[var(--color-smoke)]">
                                    {r.detail}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <footer className="border-t border-white/5 py-16 px-6">
                <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
                    <span className="font-[var(--font-display)] text-lg">
                        Nelo Robotics Pvt Ltd
                    </span>
                    <div className="flex items-center gap-8 text-sm text-[var(--color-smoke)]">
                        <Link
                            href="/"
                            className="hover:text-[var(--color-ivory)] transition-colors"
                        >
                            Home
                        </Link>
                        <Link
                            href="/products"
                            className="hover:text-[var(--color-ivory)] transition-colors"
                        >
                            Products
                        </Link>
                        <a
                            href="mailto:contact@nelo-robotics.com"
                            className="hover:text-[var(--color-ivory)] transition-colors"
                        >
                            Contact
                        </a>
                        <span>© 2026</span>
                    </div>
                </div>
            </footer>
        </main>
    );
}
