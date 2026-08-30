"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Suspense } from "react";
import {
    Download,
    Terminal,
    Copy,
    Check,
    Cpu,
    Boxes,
    Shield,
    Sparkles,
    ChevronDown,
    ExternalLink,
    Laptop,
    CheckCircle2,
    HardDrive,
    Layers,
    Code2,
    Zap,
} from "lucide-react";
import Nav from "@/components/Nav";

type OSType = "linux" | "windows" | "macos";

const RELEASES = {
    version: "v1.0.0",
    releaseDate: "August 2026",
    linux: {
        aur: {
            title: "Arch Linux / Manjaro / EndeavourOS",
            pkgName: "nelo-studio-bin",
            installCmd: "yay -S nelo-studio-bin",
            altCmd: "paru -S nelo-studio-bin",
            badge: "AUR REPO",
        },
        deb: {
            title: "Ubuntu / Debian / Pop!_OS",
            fileName: "nelo-studio_1.0.0_amd64.deb",
            size: "134 MB",
            arch: "x86_64 (.deb)",
            installCmd: "sudo apt install ./nelo-studio_1.0.0_amd64.deb",
            downloadUrl: "https://github.com/nelostrix/NIL/releases/download/v1.0.0/nelo-studio_1.0.0_amd64.deb",
            sha256: "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
        },
        appimage: {
            title: "Universal Linux (All Distros)",
            fileName: "NELO-Studio-1.0.0.AppImage",
            size: "142 MB",
            arch: "x86_64 (AppImage)",
            installCmd: "chmod +x NELO-Studio-1.0.0.AppImage && ./NELO-Studio-1.0.0.AppImage",
            downloadUrl: "https://github.com/nelostrix/NIL/releases/download/v1.0.0/NELO-Studio-1.0.0.AppImage",
            sha256: "7f83b1657ff1fc53b92dc18148a1d65dfc2d4b1fa3d677284addd200126d9069",
        },
        tarball: {
            title: "Standalone Linux Tarball",
            fileName: "nelo-studio-linux-x86_64.tar.gz",
            size: "128 MB",
            arch: "x86_64 (.tar.gz)",
            installCmd: "tar -xzf nelo-studio-linux-x86_64.tar.gz && ./nelo-studio/nelo-studio",
            downloadUrl: "https://github.com/nelostrix/NIL/releases/download/v1.0.0/nelo-studio-linux-x86_64.tar.gz",
            sha256: "1b4f0e985197199feb6329954d6957c6cdab65662cedda0f382923401fa7da7d",
        },
        curlOneLiner: "curl -fsSL https://get.nelo-robotics.com/install.sh | bash",
    },
    windows: {
        exe: {
            title: "Windows 10 / 11 64-bit Installer",
            fileName: "NELO-Studio-Setup-1.0.0.exe",
            size: "148 MB",
            arch: "x64 (NSIS Installer)",
            downloadUrl: "https://github.com/nelostrix/NIL/releases/download/v1.0.0/NELO-Studio-Setup-1.0.0.exe",
            sha256: "6b86b273ff34fce19d6b804eff5a3f5747ada4eaa22f1d49c01e52ddb7875b4b",
        },
        portable: {
            title: "Windows Portable ZIP",
            fileName: "NELO-Studio-1.0.0-win-x64.zip",
            size: "156 MB",
            arch: "x64 (Standalone ZIP)",
            downloadUrl: "https://github.com/nelostrix/NIL/releases/download/v1.0.0/NELO-Studio-1.0.0-win-x64.zip",
            sha256: "d4735e3a265e16eee03f59718b9b5d03019c07d8b6c51f90da3a666eec13ab35",
        },
        winget: "winget install nelo-studio",
        psOneLiner: "irm https://get.nelo-robotics.com/install.ps1 | iex",
    },
    macos: {
        dmg: {
            title: "macOS Universal Disk Image",
            fileName: "NELO-Studio-1.0.0-universal.dmg",
            size: "152 MB",
            arch: "Apple Silicon (M1/M2/M3/M4) & Intel x86_64",
            downloadUrl: "https://github.com/nelostrix/NIL/releases/download/v1.0.0/NELO-Studio-1.0.0-universal.dmg",
            sha256: "4e07408562bedb8b60ce05c1decfe3ad16b72230967de01f640b7e4729b49fce",
        },
        brew: "brew install --cask nelo-studio",
    },
};

const PRODUCTS = {
    stacc: {
        name: "STACC",
        color: "var(--color-electric)",
        price: "₹4,999",
        desc: "Universal robotics 1000Hz physics & control platform",
        package: "stacc",
    },
    "nil-sdk": {
        name: "NIL",
        color: "var(--color-plasma)",
        price: "₹7,999",
        desc: "Self-evolving causal cognitive agent framework",
        package: "nil-sdk",
    },
    "nil-stacc": {
        name: "NIL×STACC",
        color: "var(--color-ember)",
        price: "₹14,999",
        desc: "Complete intelligence & robotics suite",
        package: "nil-stacc",
    },
};

function DownloadContent() {
    const searchParams = useSearchParams();
    const preselected = searchParams.get("product") || "";

    // Platform State
    const [detectedOS, setDetectedOS] = useState<OSType>("linux");
    const [activeTab, setActiveTab] = useState<OSType>("linux");

    // Copy Tooltip State
    const [copiedText, setCopiedText] = useState<string | null>(null);

    // Checksums Accordion State
    const [showChecksums, setShowChecksums] = useState<boolean>(false);

    // License Validation State (CLI SDK)
    const [selectedProduct, setSelectedProduct] = useState(
        preselected || "nil-stacc",
    );
    const [licenseKey, setLicenseKey] = useState("");
    const [status, setStatus] = useState<
        "idle" | "validating" | "valid" | "invalid"
    >("idle");
    const [installCmd, setInstallCmd] = useState("");

    // Auto-detect user OS on mount
    useEffect(() => {
        if (typeof window === "undefined") return;
        const ua = window.navigator.userAgent.toLowerCase();
        if (ua.includes("win")) {
            setDetectedOS("windows");
            setActiveTab("windows");
        } else if (ua.includes("mac")) {
            setDetectedOS("macos");
            setActiveTab("macos");
        } else {
            setDetectedOS("linux");
            setActiveTab("linux");
        }
    }, []);

    useEffect(() => {
        if (preselected && PRODUCTS[preselected as keyof typeof PRODUCTS]) {
            setSelectedProduct(preselected);
        }
    }, [preselected]);

    const copyToClipboard = (text: string) => {
        navigator.clipboard.writeText(text);
        setCopiedText(text);
        setTimeout(() => setCopiedText(null), 2500);
    };

    const validateLicense = async () => {
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

    return (
        <div className="relative min-h-screen bg-[var(--color-void)] text-[var(--color-ivory)] overflow-hidden">
            {/* Ambient Background Energy */}
            <div className="absolute top-[10%] left-[5%] w-[500px] h-[500px] bg-[var(--color-ember)]/[0.04] rounded-full blur-[160px] pointer-events-none" />
            <div className="absolute bottom-[20%] right-[10%] w-[600px] h-[600px] bg-[var(--color-electric)]/[0.03] rounded-full blur-[180px] pointer-events-none" />

            {/* ═══════════════════════════════════════════════════════════════ */}
            {/* HERO HEADER                                                     */}
            {/* ═══════════════════════════════════════════════════════════════ */}
            <section className="pt-32 pb-10 px-6 relative z-10 border-b border-white/5">
                <div className="max-w-6xl mx-auto">
                    <div className="flex flex-wrap items-center gap-3">
                        <span className="text-[10px] font-bold tracking-[0.25em] text-[var(--color-volt)] border border-[var(--color-volt)]/30 bg-[var(--color-volt)]/5 px-3.5 py-1.5 uppercase">
                            OFFICIAL RELEASES — {RELEASES.version}
                        </span>
                        <span className="text-[10px] font-mono text-[var(--color-mist)]">
                            UPDATED {RELEASES.releaseDate.toUpperCase()}
                        </span>
                    </div>

                    <h1 className="font-[var(--font-display)] text-5xl sm:text-7xl md:text-8xl tracking-wider mt-6 leading-none">
                        INSTALL{" "}
                        <span className="text-[var(--color-ember)] text-glow">
                            NELO STUDIO
                        </span>
                    </h1>

                    <p className="text-[var(--color-mist)] text-base sm:text-lg mt-6 max-w-2xl leading-relaxed">
                        Complete standalone desktop suite for autonomous robotics engineering.
                        Embedded with the <strong className="text-white">NIL Cognitive Evolution Engine</strong> and the <strong className="text-white">STACC 1000Hz MuJoCo Physics Kernel</strong>.
                        Zero external dependencies required.
                    </p>

                    {/* Quick OS Indicator Banner */}
                    <div className="mt-8 p-4 bg-[var(--color-ash)] border border-white/10 flex flex-wrap items-center justify-between gap-4 max-w-3xl"
                        style={{ clipPath: "polygon(0 0, calc(100% - 12px) 0, 100% 12px, 100% 100%, 12px 100%, 0 calc(100% - 12px))" }}
                    >
                        <div className="flex items-center gap-3">
                            <Laptop className="w-5 h-5 text-[var(--color-ember)]" />
                            <div>
                                <div className="text-xs font-bold tracking-wider text-white">
                                    DETECTED OPERATING SYSTEM:{" "}
                                    <span className="text-[var(--color-volt)] uppercase">{detectedOS}</span>
                                </div>
                                <div className="text-[11px] text-[var(--color-smoke)]">
                                    Native binary packages available with embedded Python 3.11 &amp; MuJoCo PGS solver.
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center gap-2">
                            <button
                                onClick={() => setActiveTab("linux")}
                                className={`px-3 py-1.5 text-xs font-bold tracking-wider transition-all cursor-pointer ${
                                    activeTab === "linux"
                                        ? "bg-[var(--color-ember)] text-[var(--color-void)]"
                                        : "bg-white/5 text-[var(--color-mist)] hover:text-white"
                                }`}
                            >
                                LINUX
                            </button>
                            <button
                                onClick={() => setActiveTab("windows")}
                                className={`px-3 py-1.5 text-xs font-bold tracking-wider transition-all cursor-pointer ${
                                    activeTab === "windows"
                                        ? "bg-[var(--color-ember)] text-[var(--color-void)]"
                                        : "bg-white/5 text-[var(--color-mist)] hover:text-white"
                                }`}
                            >
                                WINDOWS
                            </button>
                            <button
                                onClick={() => setActiveTab("macos")}
                                className={`px-3 py-1.5 text-xs font-bold tracking-wider transition-all cursor-pointer ${
                                    activeTab === "macos"
                                        ? "bg-[var(--color-ember)] text-[var(--color-void)]"
                                        : "bg-white/5 text-[var(--color-mist)] hover:text-white"
                                }`}
                            >
                                MACOS
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            {/* ═══════════════════════════════════════════════════════════════ */}
            {/* PLATFORM NATIVE DOWNLOAD CARDS & TERMINAL COMMANDS             */}
            {/* ═══════════════════════════════════════════════════════════════ */}
            <section className="py-14 px-6 relative z-10">
                <div className="max-w-6xl mx-auto">
                    {/* LINUX DISTRIBUTION OPTIONS */}
                    {activeTab === "linux" && (
                        <div className="space-y-8 animate-fade-up">
                            <div>
                                <h2 className="font-[var(--font-display)] text-3xl tracking-wider flex items-center gap-3">
                                    <HardDrive className="w-6 h-6 text-[var(--color-ember)]" />
                                    LINUX PACKAGES (ARCH, UBUNTU, DEBIAN, APPIMAGE)
                                </h2>
                                <p className="text-xs text-[var(--color-mist)] mt-1">
                                    Install via package manager or download standalone binary with built-in POSIX Shared Memory support.
                                </p>
                            </div>

                            {/* 1. Arch Linux / Manjaro (yay / paru) */}
                            <div className="bg-[var(--color-ash)] border border-white/10 p-6 relative overflow-hidden"
                                style={{ clipPath: "polygon(12px 0, 100% 0, calc(100% - 12px) 100%, 0 100%)" }}
                            >
                                <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-4">
                                    <div className="flex items-center gap-3">
                                        <span className="w-3 h-3 rounded-full bg-[var(--color-electric)] animate-pulse" />
                                        <h3 className="font-[var(--font-display)] text-2xl tracking-wider">
                                            {RELEASES.linux.aur.title}
                                        </h3>
                                        <span className="text-[9px] px-2 py-0.5 font-bold tracking-widest bg-[var(--color-electric)]/10 text-[var(--color-electric)] border border-[var(--color-electric)]/30">
                                            {RELEASES.linux.aur.badge}
                                        </span>
                                    </div>
                                    <span className="text-xs font-mono text-[var(--color-mist)]">
                                        Auto-updates via AUR
                                    </span>
                                </div>

                                <div className="mt-4 space-y-3">
                                    <div className="bg-[var(--color-void)] border border-white/10 p-3.5 flex items-center justify-between gap-4 font-mono text-xs">
                                        <div className="flex items-center gap-2 overflow-x-auto text-[var(--color-ivory)]">
                                            <span className="text-[var(--color-volt)]">$</span>
                                            <code>{RELEASES.linux.aur.installCmd}</code>
                                        </div>
                                        <button
                                            onClick={() => copyToClipboard(RELEASES.linux.aur.installCmd)}
                                            className="px-3 py-1 bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-sans tracking-wider text-[var(--color-mist)] hover:text-white flex items-center gap-1.5 cursor-pointer shrink-0 transition-colors"
                                        >
                                            {copiedText === RELEASES.linux.aur.installCmd ? <Check className="w-3.5 h-3.5 text-[var(--color-volt)]" /> : <Copy className="w-3.5 h-3.5" />}
                                            <span>{copiedText === RELEASES.linux.aur.installCmd ? "COPIED" : "COPY"}</span>
                                        </button>
                                    </div>

                                    <div className="bg-[var(--color-void)] border border-white/10 p-3.5 flex items-center justify-between gap-4 font-mono text-xs">
                                        <div className="flex items-center gap-2 overflow-x-auto text-[var(--color-mist)]">
                                            <span className="text-[var(--color-smoke)]">$</span>
                                            <code>{RELEASES.linux.aur.altCmd}</code>
                                        </div>
                                        <button
                                            onClick={() => copyToClipboard(RELEASES.linux.aur.altCmd)}
                                            className="px-3 py-1 bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-sans tracking-wider text-[var(--color-mist)] hover:text-white flex items-center gap-1.5 cursor-pointer shrink-0 transition-colors"
                                        >
                                            {copiedText === RELEASES.linux.aur.altCmd ? <Check className="w-3.5 h-3.5 text-[var(--color-volt)]" /> : <Copy className="w-3.5 h-3.5" />}
                                            <span>{copiedText === RELEASES.linux.aur.altCmd ? "COPIED" : "COPY"}</span>
                                        </button>
                                    </div>
                                </div>
                            </div>

                            {/* 2. Grid: Debian (.deb) & Universal (.AppImage) & Tarball */}
                            <div className="grid md:grid-cols-3 gap-5">
                                {/* DEB PACKAGE */}
                                <div className="bg-[var(--color-ash)] border border-white/10 p-5 flex flex-col justify-between space-y-4">
                                    <div>
                                        <div className="flex items-center justify-between mb-2">
                                            <span className="text-[10px] font-bold tracking-widest text-[var(--color-ember)] uppercase">Ubuntu / Debian</span>
                                            <span className="text-[10px] font-mono text-[var(--color-smoke)]">{RELEASES.linux.deb.size}</span>
                                        </div>
                                        <h4 className="font-[var(--font-display)] text-xl tracking-wider">{RELEASES.linux.deb.title}</h4>
                                        <p className="text-xs text-[var(--color-mist)] mt-1 font-mono">
                                            {RELEASES.linux.deb.fileName}
                                        </p>
                                    </div>

                                    <div className="space-y-2">
                                        <a
                                            href={RELEASES.linux.deb.downloadUrl}
                                            className="w-full py-3 bg-[var(--color-ember)] hover:brightness-110 text-[var(--color-void)] font-bold text-xs tracking-wider flex items-center justify-center gap-2 cursor-pointer transition-all"
                                            style={{ clipPath: "polygon(6px 0, 100% 0, calc(100% - 6px) 100%, 0 100%)" }}
                                        >
                                            <Download className="w-4 h-4" />
                                            <span>DOWNLOAD .DEB</span>
                                        </a>

                                        <button
                                            onClick={() => copyToClipboard(RELEASES.linux.deb.installCmd)}
                                            className="w-full py-2 bg-white/5 hover:bg-white/10 border border-white/10 text-[11px] font-mono text-[var(--color-mist)] hover:text-white flex items-center justify-center gap-1.5 cursor-pointer transition-colors"
                                        >
                                            {copiedText === RELEASES.linux.deb.installCmd ? <Check className="w-3 h-3 text-[var(--color-volt)]" /> : <Copy className="w-3 h-3" />}
                                            <span>Copy APT Command</span>
                                        </button>
                                    </div>
                                </div>

                                {/* APPIMAGE */}
                                <div className="bg-[var(--color-ash)] border border-white/10 p-5 flex flex-col justify-between space-y-4">
                                    <div>
                                        <div className="flex items-center justify-between mb-2">
                                            <span className="text-[10px] font-bold tracking-widest text-[var(--color-volt)] uppercase">All Linux Distros</span>
                                            <span className="text-[10px] font-mono text-[var(--color-smoke)]">{RELEASES.linux.appimage.size}</span>
                                        </div>
                                        <h4 className="font-[var(--font-display)] text-xl tracking-wider">{RELEASES.linux.appimage.title}</h4>
                                        <p className="text-xs text-[var(--color-mist)] mt-1 font-mono">
                                            {RELEASES.linux.appimage.fileName}
                                        </p>
                                    </div>

                                    <div className="space-y-2">
                                        <a
                                            href={RELEASES.linux.appimage.downloadUrl}
                                            className="w-full py-3 bg-white/10 hover:bg-white/20 text-white font-bold text-xs tracking-wider flex items-center justify-center gap-2 cursor-pointer transition-all border border-white/20"
                                            style={{ clipPath: "polygon(6px 0, 100% 0, calc(100% - 6px) 100%, 0 100%)" }}
                                        >
                                            <Download className="w-4 h-4" />
                                            <span>DOWNLOAD .APPIMAGE</span>
                                        </a>

                                        <button
                                            onClick={() => copyToClipboard(RELEASES.linux.appimage.installCmd)}
                                            className="w-full py-2 bg-white/5 hover:bg-white/10 border border-white/10 text-[11px] font-mono text-[var(--color-mist)] hover:text-white flex items-center justify-center gap-1.5 cursor-pointer transition-colors"
                                        >
                                            {copiedText === RELEASES.linux.appimage.installCmd ? <Check className="w-3 h-3 text-[var(--color-volt)]" /> : <Copy className="w-3 h-3" />}
                                            <span>Copy Run Command</span>
                                        </button>
                                    </div>
                                </div>

                                {/* TARBALL */}
                                <div className="bg-[var(--color-ash)] border border-white/10 p-5 flex flex-col justify-between space-y-4">
                                    <div>
                                        <div className="flex items-center justify-between mb-2">
                                            <span className="text-[10px] font-bold tracking-widest text-[var(--color-plasma)] uppercase">Portable Tarball</span>
                                            <span className="text-[10px] font-mono text-[var(--color-smoke)]">{RELEASES.linux.tarball.size}</span>
                                        </div>
                                        <h4 className="font-[var(--font-display)] text-xl tracking-wider">{RELEASES.linux.tarball.title}</h4>
                                        <p className="text-xs text-[var(--color-mist)] mt-1 font-mono">
                                            {RELEASES.linux.tarball.fileName}
                                        </p>
                                    </div>

                                    <div className="space-y-2">
                                        <a
                                            href={RELEASES.linux.tarball.downloadUrl}
                                            className="w-full py-3 bg-white/5 hover:bg-white/10 text-[var(--color-ivory)] font-bold text-xs tracking-wider flex items-center justify-center gap-2 cursor-pointer transition-all border border-white/10"
                                            style={{ clipPath: "polygon(6px 0, 100% 0, calc(100% - 6px) 100%, 0 100%)" }}
                                        >
                                            <Download className="w-4 h-4" />
                                            <span>DOWNLOAD .TAR.GZ</span>
                                        </a>

                                        <button
                                            onClick={() => copyToClipboard(RELEASES.linux.tarball.installCmd)}
                                            className="w-full py-2 bg-white/5 hover:bg-white/10 border border-white/10 text-[11px] font-mono text-[var(--color-mist)] hover:text-white flex items-center justify-center gap-1.5 cursor-pointer transition-colors"
                                        >
                                            {copiedText === RELEASES.linux.tarball.installCmd ? <Check className="w-3 h-3 text-[var(--color-volt)]" /> : <Copy className="w-3 h-3" />}
                                            <span>Copy Extract Script</span>
                                        </button>
                                    </div>
                                </div>
                            </div>

                            {/* Automated Curl One-Liner */}
                            <div className="p-4 bg-[var(--color-void)] border border-white/10 flex flex-wrap items-center justify-between gap-4 font-mono text-xs">
                                <div className="flex items-center gap-2 overflow-x-auto text-[var(--color-mist)]">
                                    <span className="text-[var(--color-ember)] font-bold">CURL INSTALL SCRIPT:</span>
                                    <code>{RELEASES.linux.curlOneLiner}</code>
                                </div>
                                <button
                                    onClick={() => copyToClipboard(RELEASES.linux.curlOneLiner)}
                                    className="px-3.5 py-1.5 bg-[var(--color-ember)] text-[var(--color-void)] text-xs font-bold font-sans tracking-wider flex items-center gap-1.5 cursor-pointer shrink-0 transition-opacity hover:opacity-90"
                                >
                                    {copiedText === RELEASES.linux.curlOneLiner ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                                    <span>{copiedText === RELEASES.linux.curlOneLiner ? "COPIED" : "COPY INSTALLER"}</span>
                                </button>
                            </div>
                        </div>
                    )}

                    {/* WINDOWS DISTRIBUTION OPTIONS */}
                    {activeTab === "windows" && (
                        <div className="space-y-8 animate-fade-up">
                            <div>
                                <h2 className="font-[var(--font-display)] text-3xl tracking-wider flex items-center gap-3">
                                    <HardDrive className="w-6 h-6 text-[var(--color-electric)]" />
                                    WINDOWS 10 / 11 PACKAGES (64-BIT)
                                </h2>
                                <p className="text-xs text-[var(--color-mist)] mt-1">
                                    Complete NSIS installer with desktop shortcuts and embedded Python sidecar daemons.
                                </p>
                            </div>

                            <div className="grid md:grid-cols-2 gap-6">
                                {/* Windows NSIS Setup Exe */}
                                <div className="bg-[var(--color-ash)] border border-white/10 p-6 flex flex-col justify-between space-y-4"
                                    style={{ clipPath: "polygon(12px 0, 100% 0, calc(100% - 12px) 100%, 0 100%)" }}
                                >
                                    <div>
                                        <div className="flex items-center justify-between mb-2">
                                            <span className="text-[10px] font-bold tracking-widest text-[var(--color-electric)] uppercase">RECOMMENDED INSTALLER</span>
                                            <span className="text-[10px] font-mono text-[var(--color-smoke)]">{RELEASES.windows.exe.size}</span>
                                        </div>
                                        <h3 className="font-[var(--font-display)] text-2xl tracking-wider">{RELEASES.windows.exe.title}</h3>
                                        <p className="text-xs text-[var(--color-mist)] mt-2">
                                            Installs NELO Studio with automatic start menu shortcuts, hardware acceleration, and embedded Python 3.11 environment.
                                        </p>
                                    </div>

                                    <a
                                        href={RELEASES.windows.exe.downloadUrl}
                                        className="py-3.5 bg-[var(--color-electric)] hover:brightness-110 text-[var(--color-void)] font-bold text-xs tracking-wider flex items-center justify-center gap-2 cursor-pointer transition-all"
                                        style={{ clipPath: "polygon(8px 0, 100% 0, calc(100% - 8px) 100%, 0 100%)" }}
                                    >
                                        <Download className="w-4 h-4" />
                                        <span>DOWNLOAD WINDOWS INSTALLER (.EXE)</span>
                                    </a>
                                </div>

                                {/* Windows Portable ZIP */}
                                <div className="bg-[var(--color-ash)] border border-white/10 p-6 flex flex-col justify-between space-y-4"
                                    style={{ clipPath: "polygon(12px 0, 100% 0, calc(100% - 12px) 100%, 0 100%)" }}
                                >
                                    <div>
                                        <div className="flex items-center justify-between mb-2">
                                            <span className="text-[10px] font-bold tracking-widest text-[var(--color-mist)] uppercase">ZERO-INSTALL PORTABLE</span>
                                            <span className="text-[10px] font-mono text-[var(--color-smoke)]">{RELEASES.windows.portable.size}</span>
                                        </div>
                                        <h3 className="font-[var(--font-display)] text-2xl tracking-wider">{RELEASES.windows.portable.title}</h3>
                                        <p className="text-xs text-[var(--color-mist)] mt-2">
                                            Extract and run immediately from USB drive or directory without administrator privileges.
                                        </p>
                                    </div>

                                    <a
                                        href={RELEASES.windows.portable.downloadUrl}
                                        className="py-3.5 bg-white/10 hover:bg-white/20 text-white font-bold text-xs tracking-wider flex items-center justify-center gap-2 cursor-pointer transition-all border border-white/20"
                                        style={{ clipPath: "polygon(8px 0, 100% 0, calc(100% - 8px) 100%, 0 100%)" }}
                                    >
                                        <Download className="w-4 h-4" />
                                        <span>DOWNLOAD PORTABLE ZIP (.ZIP)</span>
                                    </a>
                                </div>
                            </div>

                            {/* Winget & PowerShell commands */}
                            <div className="space-y-3 font-mono text-xs">
                                <div className="bg-[var(--color-void)] border border-white/10 p-3.5 flex items-center justify-between gap-4">
                                    <div className="flex items-center gap-2 overflow-x-auto text-[var(--color-ivory)]">
                                        <span className="text-[var(--color-electric)]">PS&gt;</span>
                                        <code>{RELEASES.windows.winget}</code>
                                    </div>
                                    <button
                                        onClick={() => copyToClipboard(RELEASES.windows.winget)}
                                        className="px-3 py-1 bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-sans tracking-wider text-[var(--color-mist)] hover:text-white flex items-center gap-1.5 cursor-pointer shrink-0 transition-colors"
                                    >
                                        {copiedText === RELEASES.windows.winget ? <Check className="w-3.5 h-3.5 text-[var(--color-volt)]" /> : <Copy className="w-3.5 h-3.5" />}
                                        <span>{copiedText === RELEASES.windows.winget ? "COPIED" : "COPY WINGET"}</span>
                                    </button>
                                </div>

                                <div className="bg-[var(--color-void)] border border-white/10 p-3.5 flex items-center justify-between gap-4">
                                    <div className="flex items-center gap-2 overflow-x-auto text-[var(--color-mist)]">
                                        <span className="text-[var(--color-smoke)]">PS&gt;</span>
                                        <code>{RELEASES.windows.psOneLiner}</code>
                                    </div>
                                    <button
                                        onClick={() => copyToClipboard(RELEASES.windows.psOneLiner)}
                                        className="px-3 py-1 bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-sans tracking-wider text-[var(--color-mist)] hover:text-white flex items-center gap-1.5 cursor-pointer shrink-0 transition-colors"
                                    >
                                        {copiedText === RELEASES.windows.psOneLiner ? <Check className="w-3.5 h-3.5 text-[var(--color-volt)]" /> : <Copy className="w-3.5 h-3.5" />}
                                        <span>{copiedText === RELEASES.windows.psOneLiner ? "COPIED" : "COPY POWERSHELL"}</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* MACOS DISTRIBUTION OPTIONS */}
                    {activeTab === "macos" && (
                        <div className="space-y-8 animate-fade-up">
                            <div>
                                <h2 className="font-[var(--font-display)] text-3xl tracking-wider flex items-center gap-3">
                                    <HardDrive className="w-6 h-6 text-[var(--color-plasma)]" />
                                    MACOS UNIVERSAL PACKAGES (APPLE SILICON &amp; INTEL)
                                </h2>
                                <p className="text-xs text-[var(--color-mist)] mt-1">
                                    Universal DMG bundle compiled natively for M1/M2/M3/M4 Apple Silicon and Intel x86_64 Macs.
                                </p>
                            </div>

                            <div className="bg-[var(--color-ash)] border border-white/10 p-6 flex flex-col md:flex-row items-center justify-between gap-6"
                                style={{ clipPath: "polygon(12px 0, 100% 0, calc(100% - 12px) 100%, 0 100%)" }}
                            >
                                <div className="space-y-2">
                                    <div className="flex items-center gap-2">
                                        <span className="text-[10px] font-bold tracking-widest text-[var(--color-plasma)] uppercase">UNIVERSAL APPLICATION BUNDLE</span>
                                        <span className="text-[10px] font-mono text-[var(--color-smoke)]">{RELEASES.macos.dmg.size}</span>
                                    </div>
                                    <h3 className="font-[var(--font-display)] text-2xl tracking-wider">{RELEASES.macos.dmg.title}</h3>
                                    <p className="text-xs text-[var(--color-mist)] max-w-xl">
                                        Drag-and-drop installer into Applications folder with native Metal hardware acceleration and embedded STACC &amp; NIL daemons.
                                    </p>
                                </div>

                                <a
                                    href={RELEASES.macos.dmg.downloadUrl}
                                    className="px-8 py-4 bg-[var(--color-plasma)] hover:brightness-110 text-[var(--color-void)] font-bold text-xs tracking-wider flex items-center justify-center gap-2 cursor-pointer shrink-0 transition-all"
                                    style={{ clipPath: "polygon(8px 0, 100% 0, calc(100% - 8px) 100%, 0 100%)" }}
                                >
                                    <Download className="w-4 h-4" />
                                    <span>DOWNLOAD UNIVERSAL DMG (.DMG)</span>
                                </a>
                            </div>

                            {/* Homebrew Cask */}
                            <div className="bg-[var(--color-void)] border border-white/10 p-3.5 flex items-center justify-between gap-4 font-mono text-xs">
                                <div className="flex items-center gap-2 overflow-x-auto text-[var(--color-ivory)]">
                                    <span className="text-[var(--color-plasma)]">$</span>
                                    <code>{RELEASES.macos.brew}</code>
                                </div>
                                <button
                                    onClick={() => copyToClipboard(RELEASES.macos.brew)}
                                    className="px-3.5 py-1.5 bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-sans tracking-wider text-[var(--color-mist)] hover:text-white flex items-center gap-1.5 cursor-pointer shrink-0 transition-colors"
                                >
                                    {copiedText === RELEASES.macos.brew ? <Check className="w-3.5 h-3.5 text-[var(--color-volt)]" /> : <Copy className="w-3.5 h-3.5" />}
                                    <span>{copiedText === RELEASES.macos.brew ? "COPIED" : "COPY BREW"}</span>
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </section>

            {/* ═══════════════════════════════════════════════════════════════ */}
            {/* EMBEDDED DAEMON ARCHITECTURE EXPLANATION                        */}
            {/* ═══════════════════════════════════════════════════════════════ */}
            <section className="py-16 px-6 border-t border-white/5 bg-[var(--color-ash)]/40 relative z-10">
                <div className="max-w-6xl mx-auto">
                    <div className="text-center max-w-2xl mx-auto mb-12">
                        <span className="text-[10px] font-bold tracking-[0.25em] text-[var(--color-ember)] uppercase">
                            ZERO SETUP ARCHITECTURE
                        </span>
                        <h2 className="font-[var(--font-display)] text-4xl sm:text-5xl tracking-wider mt-2">
                            HOW THE EMBEDDED ENGINE WORKS
                        </h2>
                        <p className="text-xs text-[var(--color-mist)] mt-2">
                            When you open the desktop app, it automatically spins up isolated real-time micro-daemons in the background.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-6">
                        {/* 1. STACC Daemon */}
                        <div className="bg-[var(--color-void)] border border-white/10 p-6 space-y-3"
                            style={{ clipPath: "polygon(8px 0, 100% 0, calc(100% - 8px) 100%, 0 100%)" }}
                        >
                            <div className="flex items-center justify-between">
                                <Cpu className="w-5 h-5 text-[var(--color-electric)]" />
                                <span className="font-mono text-[10px] text-[var(--color-electric)] bg-[var(--color-electric)]/10 px-2 py-0.5 border border-[var(--color-electric)]/30">
                                    PORT 8766
                                </span>
                            </div>
                            <h3 className="font-[var(--font-display)] text-2xl tracking-wider">STACC 1000Hz RT-Kernel</h3>
                            <p className="text-xs text-[var(--color-mist)] leading-relaxed">
                                Manages MuJoCo 3.2.0 PGS physics steps, analytical RNEA dynamic gravity torques, and zero-copy POSIX shared memory ringbuffers.
                            </p>
                        </div>

                        {/* 2. NIL Cognitive Daemon */}
                        <div className="bg-[var(--color-void)] border border-white/10 p-6 space-y-3"
                            style={{ clipPath: "polygon(8px 0, 100% 0, calc(100% - 8px) 100%, 0 100%)" }}
                        >
                            <div className="flex items-center justify-between">
                                <Zap className="w-5 h-5 text-[var(--color-plasma)]" />
                                <span className="font-mono text-[10px] text-[var(--color-plasma)] bg-[var(--color-plasma)]/10 px-2 py-0.5 border border-[var(--color-plasma)]/30">
                                    PORT 8765
                                </span>
                            </div>
                            <h3 className="font-[var(--font-display)] text-2xl tracking-wider">NIL Causal AI Daemon</h3>
                            <p className="text-xs text-[var(--color-mist)] leading-relaxed">
                                Houses the 10-phase cognitive execution loop, dynamic movement primitives (DMPs), SQLite trace logs, and autonomous tool dispatchers.
                            </p>
                        </div>

                        {/* 3. CAD & Simulation Viewport */}
                        <div className="bg-[var(--color-void)] border border-white/10 p-6 space-y-3"
                            style={{ clipPath: "polygon(8px 0, 100% 0, calc(100% - 8px) 100%, 0 100%)" }}
                        >
                            <div className="flex items-center justify-between">
                                <Boxes className="w-5 h-5 text-[var(--color-volt)]" />
                                <span className="font-mono text-[10px] text-[var(--color-volt)] bg-[var(--color-volt)]/10 px-2 py-0.5 border border-[var(--color-volt)]/30">
                                    LOCAL WORKBENCH
                                </span>
                            </div>
                            <h3 className="font-[var(--font-display)] text-2xl tracking-wider">Monaco &amp; 3D CAD Studio</h3>
                            <p className="text-xs text-[var(--color-mist)] leading-relaxed">
                                Parametric OpenCASCADE B-Rep solid modeler, ISO-10303-242 STEP AP242 exporter, and full VSCode Monaco script editing suite.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* ═══════════════════════════════════════════════════════════════ */}
            {/* CHECKSUMS & SECURITY VERIFICATION                              */}
            {/* ═══════════════════════════════════════════════════════════════ */}
            <section className="py-10 px-6 border-t border-white/5 relative z-10">
                <div className="max-w-6xl mx-auto">
                    <button
                        onClick={() => setShowChecksums(!showChecksums)}
                        className="flex items-center justify-between w-full text-left p-4 bg-[var(--color-ash)] border border-white/10 hover:border-white/20 transition-all cursor-pointer"
                    >
                        <div className="flex items-center gap-2 text-xs font-bold tracking-widest text-[var(--color-ivory)]">
                            <Shield className="w-4 h-4 text-[var(--color-volt)]" />
                            <span>SHA-256 RELEASE CHECKSUMS &amp; VERIFICATION</span>
                        </div>
                        <ChevronDown className={`w-4 h-4 text-[var(--color-mist)] transition-transform ${showChecksums ? "rotate-180" : ""}`} />
                    </button>

                    {showChecksums && (
                        <div className="p-4 bg-[var(--color-void)] border-x border-b border-white/10 space-y-3 font-mono text-xs text-[var(--color-mist)] animate-fade-up">
                            <div className="space-y-1">
                                <div className="text-[var(--color-ivory)] font-bold">{RELEASES.linux.deb.fileName}:</div>
                                <div className="bg-white/5 p-2 rounded break-all text-[11px] text-[var(--color-volt)]">{RELEASES.linux.deb.sha256}</div>
                            </div>
                            <div className="space-y-1">
                                <div className="text-[var(--color-ivory)] font-bold">{RELEASES.linux.appimage.fileName}:</div>
                                <div className="bg-white/5 p-2 rounded break-all text-[11px] text-[var(--color-volt)]">{RELEASES.linux.appimage.sha256}</div>
                            </div>
                            <div className="space-y-1">
                                <div className="text-[var(--color-ivory)] font-bold">{RELEASES.windows.exe.fileName}:</div>
                                <div className="bg-white/5 p-2 rounded break-all text-[11px] text-[var(--color-electric)]">{RELEASES.windows.exe.sha256}</div>
                            </div>
                            <div className="space-y-1">
                                <div className="text-[var(--color-ivory)] font-bold">{RELEASES.macos.dmg.fileName}:</div>
                                <div className="bg-white/5 p-2 rounded break-all text-[11px] text-[var(--color-plasma)]">{RELEASES.macos.dmg.sha256}</div>
                            </div>
                        </div>
                    )}
                </div>
            </section>

            {/* ═══════════════════════════════════════════════════════════════ */}
            {/* PYTHON SDK & CLI LICENSE VALIDATION SECTION                     */}
            {/* ═══════════════════════════════════════════════════════════════ */}
            <section className="py-16 px-6 border-t border-white/5 relative z-10">
                <div className="max-w-4xl mx-auto">
                    <div className="text-center mb-10">
                        <span className="text-[10px] font-bold tracking-[0.25em] text-[var(--color-smoke)] uppercase">
                            DEVELOPER CLI &amp; PYTHON PACKAGES
                        </span>
                        <h2 className="font-[var(--font-display)] text-4xl tracking-wider mt-2">
                            VALIDATE LICENSE &amp; PIP PACKAGES
                        </h2>
                    </div>

                    {/* Product Selector */}
                    <div className="grid md:grid-cols-3 gap-3 mb-6">
                        {Object.entries(PRODUCTS).map(([key, p]) => (
                            <button
                                key={key}
                                onClick={() => {
                                    setSelectedProduct(key);
                                    setStatus("idle");
                                    setInstallCmd("");
                                }}
                                className={`text-left p-4 border transition-all cursor-pointer ${
                                    selectedProduct === key
                                        ? "border-white/20 bg-white/[0.04]"
                                        : "border-white/5 hover:border-white/10"
                                }`}
                                style={{
                                    clipPath: "polygon(8px 0, 100% 0, calc(100% - 8px) 100%, 0 100%)",
                                    borderColor: selectedProduct === key ? p.color + "60" : undefined,
                                }}
                            >
                                <div className="flex items-center gap-2.5 mb-1">
                                    <div className="w-2.5 h-2.5 rounded-full" style={{ background: p.color }} />
                                    <span className="font-[var(--font-display)] text-lg tracking-wider">{p.name}</span>
                                </div>
                                <p className="text-[11px] text-[var(--color-smoke)]">{p.desc}</p>
                            </button>
                        ))}
                    </div>

                    {/* License Input */}
                    <div className="bg-[var(--color-ash)] border border-white/10 p-5 space-y-4"
                        style={{ clipPath: "polygon(0 0, calc(100% - 14px) 0, 100% 14px, 100% 100%, 14px 100%, 0 calc(100% - 14px))" }}
                    >
                        <div className="flex flex-col sm:flex-row gap-3">
                            <input
                                type="text"
                                placeholder="ENTER LICENSE KEY (NELO-XXXXX-XXXXX-XXXXX)"
                                value={licenseKey}
                                onChange={(e) => {
                                    setLicenseKey(e.target.value.toUpperCase());
                                    setStatus("idle");
                                }}
                                className="flex-1 bg-[var(--color-void)] border border-white/10 px-4 py-3 font-mono text-xs tracking-wider text-[var(--color-ivory)] placeholder-[var(--color-smoke)] focus:outline-none focus:border-[var(--color-ember)]/50 transition-colors"
                            />
                            <button
                                onClick={validateLicense}
                                disabled={!licenseKey.trim() || status === "validating"}
                                className="bg-[var(--color-ember)] text-[var(--color-void)] px-6 py-3 font-bold text-xs tracking-[0.15em] hover:brightness-110 transition-all disabled:opacity-40 cursor-pointer"
                                style={{ clipPath: "polygon(6px 0, 100% 0, calc(100% - 6px) 100%, 0 100%)" }}
                            >
                                {status === "validating" ? "VALIDATING..." : "VALIDATE KEY →"}
                            </button>
                        </div>

                        {status === "valid" && (
                            <div className="p-3.5 bg-[var(--color-void)] border border-white/10 flex items-center justify-between gap-4 font-mono text-xs">
                                <div className="flex items-center gap-2 overflow-x-auto text-[var(--color-mist)]">
                                    <span className="text-[var(--color-volt)] font-bold">$</span>
                                    <code>{installCmd}</code>
                                </div>
                                <button
                                    onClick={() => copyToClipboard(installCmd)}
                                    className="px-3 py-1 bg-white/5 hover:bg-white/10 text-xs font-sans tracking-wider text-[var(--color-mist)] hover:text-white flex items-center gap-1.5 cursor-pointer shrink-0 transition-colors"
                                >
                                    {copiedText === installCmd ? <Check className="w-3 h-3 text-[var(--color-volt)]" /> : <Copy className="w-3 h-3" />}
                                    <span>{copiedText === installCmd ? "COPIED" : "COPY"}</span>
                                </button>
                            </div>
                        )}

                        {status === "invalid" && (
                            <div className="text-[var(--color-crimson)] text-xs font-bold tracking-wider flex items-center gap-2">
                                <span>✗</span>
                                <span>INVALID KEY — Check your license or contact support.</span>
                            </div>
                        )}
                    </div>
                </div>
            </section>

            {/* ═══════════════════════════════════════════════════════════════ */}
            {/* FOOTER                                                          */}
            {/* ═══════════════════════════════════════════════════════════════ */}
            <footer className="border-t border-white/5 py-10 px-6 relative z-10">
                <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
                    <div className="flex items-center gap-3">
                        <Image src="/logo.png" alt="Nelo" width={24} height={24} className="rounded-lg" />
                        <span className="font-[var(--font-display)] text-sm tracking-[0.2em]">
                            NELO ROBOTICS PVT LTD
                        </span>
                    </div>
                    <div className="flex items-center gap-6 text-xs text-[var(--color-smoke)] tracking-wider">
                        <Link href="/" className="hover:text-[var(--color-ember)] transition-colors">HOME</Link>
                        <Link href="/products" className="hover:text-[var(--color-ember)] transition-colors">PRODUCTS</Link>
                        <Link href="/usecases" className="hover:text-[var(--color-ember)] transition-colors">USE CASES</Link>
                        <span>© 2026</span>
                    </div>
                </div>
            </footer>
        </div>
    );
}

export default function Downloads() {
    return (
        <main>
            <Nav />
            <Suspense
                fallback={
                    <div className="pt-40 text-center text-[var(--color-smoke)]">
                        Loading packages...
                    </div>
                }
            >
                <DownloadContent />
            </Suspense>
        </main>
    );
}
