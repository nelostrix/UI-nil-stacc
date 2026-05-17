"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Suspense } from "react";

function Nav() {
    return (
        <nav className="fixed top-0 w-full z-50 backdrop-blur-xl bg-[var(--color-void)]/90 border-b border-white/5">
            <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
                <Link href="/" className="flex items-center gap-3">
                    <Image
                        src="/logo.png"
                        alt="Nelo"
                        width={36}
                        height={36}
                        className="rounded-xl"
                    />
                    <span className="font-[var(--font-display)] text-2xl tracking-wider">
                        NELO
                    </span>
                </Link>
                <div className="hidden md:flex items-center gap-1">
                    <Link
                        href="/products"
                        className="px-4 py-2 text-xs font-semibold tracking-[0.2em] text-[var(--color-mist)] hover:text-[var(--color-ember)] transition-colors"
                    >
                        PRODUCTS
                    </Link>
                    <Link
                        href="/downloads"
                        className="px-4 py-2 text-xs font-semibold tracking-[0.2em] text-[var(--color-ivory)]"
                    >
                        DOWNLOADS
                    </Link>
                    <Link
                        href="/usecases"
                        className="px-4 py-2 text-xs font-semibold tracking-[0.2em] text-[var(--color-mist)] hover:text-[var(--color-ember)] transition-colors"
                    >
                        USE CASES
                    </Link>
                </div>
            </div>
        </nav>
    );
}

const PRODUCTS = {
    stacc: {
        name: "STACC",
        color: "var(--color-electric)",
        price: "₹4,999",
        desc: "Universal robotics platform",
        package: "stacc",
    },
    "nil-sdk": {
        name: "NIL",
        color: "var(--color-plasma)",
        price: "₹7,999",
        desc: "Self-evolving agent SDK",
        package: "nil-sdk",
    },
    "nil-stacc": {
        name: "NIL×STACC",
        color: "var(--color-ember)",
        price: "₹14,999",
        desc: "Complete intelligence stack",
        package: "nil-stacc",
    },
};

function DownloadContent() {
    const searchParams = useSearchParams();
    const preselected = searchParams.get("product") || "";

    const [selectedProduct, setSelectedProduct] = useState(
        preselected || "nil-stacc",
    );
    const [licenseKey, setLicenseKey] = useState("");
    const [status, setStatus] = useState<
        "idle" | "validating" | "valid" | "invalid"
    >("idle");
    const [installCmd, setInstallCmd] = useState("");
    const [copied, setCopied] = useState(false);

    useEffect(() => {
        if (preselected && PRODUCTS[preselected as keyof typeof PRODUCTS]) {
            setSelectedProduct(preselected);
        }
    }, [preselected]);

    const validate = async () => {
        if (!licenseKey.trim()) return;
        setStatus("validating");

        try {
            const res = await fetch(
                "https://nelo-license-server.nelorobotics.workers.dev/validate",
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ key: licenseKey.trim() }),
                },
            );
            const data = await res.json();

            if (data.valid) {
                setStatus("valid");
                const cmd = `bash <(curl -s https://get.nelo-robotics.com/install.sh) --key ${licenseKey.trim()} --package ${selectedProduct}`;
                setInstallCmd(cmd);
            } else {
                setStatus("invalid");
            }
        } catch {
            setStatus("invalid");
        }
    };

    const copyCmd = () => {
        navigator.clipboard.writeText(installCmd);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const product =
        PRODUCTS[selectedProduct as keyof typeof PRODUCTS] ||
        PRODUCTS["nil-stacc"];

    return (
        <>
            {/* Header */}
            <section className="pt-32 pb-8 px-6">
                <div className="max-w-4xl mx-auto">
                    <span className="text-[9px] font-bold tracking-[0.3em] text-[var(--color-volt)] border border-[var(--color-volt)]/20 bg-[var(--color-volt)]/5 px-4 py-2">
                        DOWNLOADS
                    </span>
                    <h1 className="font-[var(--font-display)] text-6xl md:text-8xl tracking-wider mt-6">
                        GET YOUR
                        <span className="text-[var(--color-ember)] text-glow block">
                            PACKAGE
                        </span>
                    </h1>
                </div>
            </section>

            {/* Product selector */}
            <section className="py-8 px-6">
                <div className="max-w-4xl mx-auto">
                    <h3 className="text-[10px] font-bold tracking-[0.3em] text-[var(--color-smoke)] mb-4 flex items-center gap-3">
                        <span className="w-8 h-[1px] bg-[var(--color-ember)]" />
                        SELECT PACKAGE
                    </h3>

                    <div className="grid md:grid-cols-3 gap-3">
                        {Object.entries(PRODUCTS).map(([key, p]) => (
                            <button
                                key={key}
                                onClick={() => {
                                    setSelectedProduct(key);
                                    setStatus("idle");
                                    setInstallCmd("");
                                }}
                                className={`text-left p-5 border transition-all card-hover ${
                                    selectedProduct === key
                                        ? "border-white/20 bg-white/[0.03]"
                                        : "border-white/5 hover:border-white/10"
                                }`}
                                style={{
                                    clipPath:
                                        "polygon(8px 0, 100% 0, calc(100% - 8px) 100%, 0 100%)",
                                    borderColor:
                                        selectedProduct === key
                                            ? p.color + "50"
                                            : undefined,
                                }}
                            >
                                <div className="flex items-center gap-3 mb-2">
                                    <div
                                        className="w-2.5 h-2.5 rounded-full"
                                        style={{ background: p.color }}
                                    />
                                    <span className="font-[var(--font-display)] text-xl tracking-wider">
                                        {p.name}
                                    </span>
                                </div>
                                <p className="text-xs text-[var(--color-smoke)]">
                                    {p.desc}
                                </p>
                                <div
                                    className="mt-3 font-[var(--font-display)] text-lg tracking-wider"
                                    style={{ color: p.color }}
                                >
                                    {p.price}
                                    <span className="text-[var(--color-smoke)] text-xs">
                                        /YEAR
                                    </span>
                                </div>
                            </button>
                        ))}
                    </div>
                </div>
            </section>

            {/* License key input */}
            <section className="py-12 px-6">
                <div className="max-w-4xl mx-auto">
                    <h3 className="text-[10px] font-bold tracking-[0.3em] text-[var(--color-smoke)] mb-4 flex items-center gap-3">
                        <span className="w-8 h-[1px] bg-[var(--color-ember)]" />
                        ENTER LICENSE KEY
                    </h3>

                    <div
                        className="bg-[var(--color-ash)] border border-white/5 p-6"
                        style={{
                            clipPath:
                                "polygon(0 0, calc(100% - 16px) 0, 100% 16px, 100% 100%, 16px 100%, 0 calc(100% - 16px))",
                        }}
                    >
                        <div className="flex flex-col md:flex-row gap-4">
                            <input
                                type="text"
                                placeholder="NELO-XXXXX-XXXXX-XXXXX-XXXXX"
                                value={licenseKey}
                                onChange={(e) => {
                                    setLicenseKey(e.target.value.toUpperCase());
                                    setStatus("idle");
                                }}
                                className="flex-1 bg-[var(--color-void)] border border-white/10 px-5 py-4 font-[var(--font-mono)] text-sm tracking-wider text-[var(--color-ivory)] placeholder-[var(--color-smoke)] focus:outline-none focus:border-[var(--color-ember)]/50 transition-colors"
                            />
                            <button
                                onClick={validate}
                                disabled={
                                    !licenseKey.trim() ||
                                    status === "validating"
                                }
                                className="bg-[var(--color-ember)] text-[var(--color-void)] px-8 py-4 font-bold text-sm tracking-[0.15em] hover:brightness-110 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                                style={{
                                    clipPath:
                                        "polygon(8px 0, 100% 0, calc(100% - 8px) 100%, 0 100%)",
                                }}
                            >
                                {status === "validating"
                                    ? "VALIDATING..."
                                    : "VALIDATE →"}
                            </button>
                        </div>

                        {/* Status messages */}
                        {status === "valid" && (
                            <div
                                className="mt-6 animate-fade-up"
                                style={{ opacity: 0, animationDelay: "0.1s" }}
                            >
                                <div className="flex items-center gap-2 text-[var(--color-volt)] text-sm mb-4">
                                    <span className="w-2 h-2 bg-[var(--color-volt)] rounded-full animate-pulse" />
                                    <span className="font-bold tracking-wider">
                                        LICENSE VALID — READY TO INSTALL
                                    </span>
                                </div>

                                <div className="bg-[var(--color-void)] border border-white/5 p-4 flex items-center justify-between gap-4">
                                    <code className="font-[var(--font-mono)] text-xs text-[var(--color-mist)] overflow-x-auto">
                                        <span className="text-[var(--color-ember)]">
                                            $
                                        </span>{" "}
                                        {installCmd}
                                    </code>
                                    <button
                                        onClick={copyCmd}
                                        className="text-xs tracking-wider text-[var(--color-smoke)] hover:text-[var(--color-ember)] transition-colors whitespace-nowrap px-4 py-2 border border-white/5"
                                    >
                                        {copied ? "✓ COPIED" : "COPY"}
                                    </button>
                                </div>

                                <p className="text-xs text-[var(--color-smoke)] mt-3 tracking-wider">
                                    Paste this in your terminal. Works on Linux,
                                    macOS, and Windows WSL. Python 3.9+
                                    required.
                                </p>
                            </div>
                        )}

                        {status === "invalid" && (
                            <div className="mt-4 flex items-center gap-2 text-[var(--color-crimson)] text-sm">
                                <span>✗</span>
                                <span className="font-bold tracking-wider">
                                    INVALID KEY — Check your key or purchase a
                                    new one
                                </span>
                            </div>
                        )}
                    </div>

                    {/* No key yet */}
                    <div className="mt-6 text-center">
                        <p className="text-[var(--color-smoke)] text-sm">
                            Don&apos;t have a key?{" "}
                            <a
                                href="mailto:sales@nelo-robotics.com"
                                className="text-[var(--color-ember)] hover:underline"
                            >
                                Contact sales@nelo-robotics.com
                            </a>
                        </p>
                    </div>
                </div>
            </section>

            {/* How it works */}
            <section className="py-20 px-6 border-t border-white/5">
                <div className="max-w-4xl mx-auto">
                    <h2 className="font-[var(--font-display)] text-4xl tracking-wider text-center mb-16">
                        HOW IT WORKS
                    </h2>

                    <div className="space-y-8">
                        {[
                            {
                                step: "01",
                                title: "PURCHASE A LICENSE",
                                desc: "Choose your package. Receive your license key via email within 60 seconds.",
                                icon: "◆",
                            },
                            {
                                step: "02",
                                title: "VALIDATE YOUR KEY",
                                desc: "Enter your key above. We verify it against our secure license server.",
                                icon: "◆",
                            },
                            {
                                step: "03",
                                title: "RUN THE INSTALL COMMAND",
                                desc: "Paste the command in your terminal. An anime-style animation plays while packages download.",
                                icon: "◆",
                            },
                            {
                                step: "04",
                                title: "START BUILDING",
                                desc: "import stacc — that's it. Load a URDF, simulate in MuJoCo, deploy to hardware.",
                                icon: "◆",
                            },
                        ].map((s, i) => (
                            <div
                                key={s.step}
                                className="flex gap-6 items-start animate-fade-up"
                                style={{
                                    animationDelay: `${i * 0.1}s`,
                                    opacity: 0,
                                }}
                            >
                                <span className="font-[var(--font-display)] text-4xl text-[var(--color-ember)] w-16 flex-shrink-0">
                                    {s.step}
                                </span>
                                <div>
                                    <h3 className="text-sm font-bold tracking-[0.15em] text-[var(--color-ivory)] mb-1">
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
            <section className="py-20 px-6 border-t border-white/5">
                <div className="max-w-4xl mx-auto">
                    <h2 className="font-[var(--font-display)] text-4xl tracking-wider text-center mb-12">
                        REQUIREMENTS
                    </h2>
                    <div className="grid md:grid-cols-3 gap-4">
                        {[
                            {
                                title: "PYTHON",
                                value: "3.9+",
                                detail: "3.10 recommended",
                            },
                            {
                                title: "OS",
                                value: "ANY",
                                detail: "Linux, macOS, Windows WSL",
                            },
                            {
                                title: "GPU",
                                value: "OPTIONAL",
                                detail: "For MuJoCo 3D rendering",
                            },
                        ].map((r) => (
                            <div
                                key={r.title}
                                className="bg-[var(--color-ash)] border border-white/5 p-6 text-center"
                                style={{
                                    clipPath:
                                        "polygon(8px 0, 100% 0, calc(100% - 8px) 100%, 0 100%)",
                                }}
                            >
                                <div className="text-[9px] font-bold tracking-[0.3em] text-[var(--color-smoke)] mb-2">
                                    {r.title}
                                </div>
                                <div className="font-[var(--font-display)] text-4xl tracking-wider text-[var(--color-ivory)]">
                                    {r.value}
                                </div>
                                <div className="text-[10px] text-[var(--color-smoke)] mt-1 tracking-wider">
                                    {r.detail}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <footer className="border-t border-white/5 py-12 px-6">
                <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
                    <div className="flex items-center gap-3">
                        <Image
                            src="/logo.png"
                            alt="Nelo"
                            width={24}
                            height={24}
                            className="rounded-lg"
                        />
                        <span className="font-[var(--font-display)] text-sm tracking-[0.2em]">
                            NELO ROBOTICS PVT LTD
                        </span>
                    </div>
                    <div className="flex items-center gap-8 text-xs text-[var(--color-smoke)] tracking-wider">
                        <Link
                            href="/"
                            className="hover:text-[var(--color-ember)] transition-colors"
                        >
                            HOME
                        </Link>
                        <Link
                            href="/products"
                            className="hover:text-[var(--color-ember)] transition-colors"
                        >
                            PRODUCTS
                        </Link>
                        <span>© 2026</span>
                    </div>
                </div>
            </footer>
        </>
    );
}

export default function Downloads() {
    return (
        <main>
            <Nav />
            <Suspense
                fallback={
                    <div className="pt-40 text-center text-[var(--color-smoke)]">
                        Loading...
                    </div>
                }
            >
                <DownloadContent />
            </Suspense>
        </main>
    );
}
