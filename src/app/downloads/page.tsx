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
    Monitor,
    Play,
    Server,
    Flame,
} from "lucide-react";
import Nav from "@/components/Nav";

type SuiteType = "studio" | "cli";
type OSType = "linux" | "windows" | "macos";

const RELEASES = {
    version: "v1.0.0",
    releaseDate: "August 2026",
    studio: {
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
                arch: "x64 (NSIS Native Window)",
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
    },
    cli: {
        pip: "pip install --upgrade nelo-cli",
        aur: "yay -S nelo-cli",
        brew: "brew install nelo-cli",
        winget: "winget install nelo-cli",
        curlOneLiner: "curl -fsSL https://get.nelo-robotics.com/cli.sh | bash",
        psOneLiner: "irm https://get.nelo-robotics.com/cli.ps1 | iex",
        features: [
            { cmd: "nelo sim --urdf robot.xml --hz 1000", desc: "Run headless 1000Hz MuJoCo simulation & RNEA dynamics compensation" },
            { cmd: "nelo agent evolve --domain manipulation", desc: "Trigger 10-phase causal cognitive loop & synthesize procedural skills" },
            { cmd: "nelo fk --joints 0,0.5,-0.3,0,0.2,0", desc: "Compute 6-DOF spatial forward kinematics & joint gravity torques in 0.018ms" },
            { cmd: "nelo cad export --part link_1 --format step", desc: "Export OpenCASCADE B-Rep solid model to ISO-10303-242 (STEP AP242)" },
            { cmd: "nelo models list", desc: "Inspect and manage in-device Ollama reasoning models" },
        ],
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

    // Main Selection State: Studio vs CLI
    const [activeSuite, setActiveSuite] = useState<SuiteType>("studio");

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

    // Auto-Download State
    const [autoDownloadInfo, setAutoDownloadInfo] = useState<{
        triggered: boolean;
        fileName: string;
        downloadUrl: string;
        size: string;
        osName: string;
    } | null>(null);

    // Function to trigger file download
    const startFileDownload = (url: string, name: string) => {
        if (!url) return;
        const link = document.createElement("a");
        link.href = url;
        link.download = name;
        link.target = "_blank";
        link.rel = "noopener noreferrer";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    // Auto-detect user OS & automatically initiate download on load
    useEffect(() => {
        if (typeof window === "undefined") return;
        const ua = window.navigator.userAgent.toLowerCase();
        let targetUrl = "";
        let fileName = "";
        let fileSize = "";
        let osDetected: OSType = "linux";
        let osLabel = "Linux";

        if (ua.includes("win")) {
            osDetected = "windows";
            osLabel = "Windows 10 / 11 (64-bit)";
            targetUrl = RELEASES.studio.windows.exe.downloadUrl;
            fileName = RELEASES.studio.windows.exe.fileName;
            fileSize = RELEASES.studio.windows.exe.size;
        } else if (ua.includes("mac")) {
            osDetected = "macos";
            osLabel = "macOS (Apple Silicon & Intel)";
            targetUrl = RELEASES.studio.macos.dmg.downloadUrl;
            fileName = RELEASES.studio.macos.dmg.fileName;
            fileSize = RELEASES.studio.macos.dmg.size;
        } else {
            osDetected = "linux";
            osLabel = "Linux (Debian / AppImage)";
            targetUrl = RELEASES.studio.linux.deb.downloadUrl;
            fileName = RELEASES.studio.linux.deb.fileName;
            fileSize = RELEASES.studio.linux.deb.size;
        }

        setDetectedOS(osDetected);
        setActiveTab(osDetected);
        setAutoDownloadInfo({
            triggered: true,
            fileName,
            downloadUrl: targetUrl,
            size: fileSize,
            osName: osLabel,
        });

        // Automatically start download after a brief 500ms delay
        const timer = setTimeout(() => {
            if (targetUrl) {
                startFileDownload(targetUrl, fileName);
            }
        }, 500);

        return () => clearTimeout(timer);
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
        <div className="relative min-h-screen bg-[var(--color-void)] text-[var(--color-ivory)] overflow-hidden font-sans">
            {/* Ambient Background Energy */}
            <div className="absolute top-[10%] left-[5%] w-[500px] h-[500px] bg-[var(--color-ember)]/[0.04] rounded-full blur-[160px] pointer-events-none" />
            <div className="absolute bottom-[20%] right-[10%] w-[600px] h-[600px] bg-[var(--color-electric)]/[0.03] rounded-full blur-[180px] pointer-events-none" />

            {/* ═══════════════════════════════════════════════════════════════ */}
            {/* HERO HEADER & TOP-LEVEL SUITE SELECTOR                          */}
            {/* ═══════════════════════════════════════════════════════════════ */}
            <section className="pt-32 pb-8 px-6 relative z-10 border-b border-white/5">
                <div className="max-w-6xl mx-auto">
                    <div className="flex flex-wrap items-center gap-3">
                        <span className="text-[10px] font-bold tracking-[0.25em] text-[var(--color-volt)] border border-[var(--color-volt)]/30 bg-[var(--color-volt)]/5 px-3.5 py-1.5 uppercase font-mono">
                            OFFICIAL RELEASES — {RELEASES.version}
                        </span>
                        <span className="text-[10px] font-mono text-[var(--color-mist)]">
                            UPDATED {RELEASES.releaseDate.toUpperCase()}
                        </span>
                    </div>

                    <h1 className="font-[var(--font-display)] text-5xl sm:text-7xl md:text-8xl tracking-wider mt-6 leading-none">
                        GET{" "}
                        <span className="text-[var(--color-ember)] text-glow">
                            NELO SUITE
                        </span>
                    </h1>

                    <p className="text-[var(--color-mist)] text-base sm:text-lg mt-4 max-w-3xl leading-relaxed">
                        Choose between the visual <strong className="text-white">NELO Studio Desktop IDE</strong> (standalone window with 3D MuJoCo Physics, CAD Studio, and Monaco Editor) or the ultra-fast <strong className="text-white">NELO CLI &amp; Python SDK</strong> for headless servers, Docker, and robot on-board hardware.
                    </p>

                    {/* TOP-LEVEL SUITE SELECTOR TABS */}
                    <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl">
                        {/* 1. NELO STUDIO */}
                        <button
                            onClick={() => setActiveSuite("studio")}
                            className={`p-4 border text-left transition-all cursor-pointer relative ${
                                activeSuite === "studio"
                                    ? "bg-[var(--color-ash)] border-[var(--color-ember)]/80 shadow-lg shadow-[var(--color-ember)]/5"
                                    : "bg-[var(--color-ash)]/40 border-white/10 hover:border-white/20"
                            }`}
                            style={{ clipPath: "polygon(0 0, calc(100% - 12px) 0, 100% 12px, 100% 100%, 12px 100%, 0 calc(100% - 12px))" }}
                        >
                            <div className="flex items-center gap-3">
                                <Monitor className={`w-5 h-5 ${activeSuite === "studio" ? "text-[var(--color-ember)]" : "text-[var(--color-mist)]"}`} />
                                <div>
                                    <div className="text-sm font-bold tracking-wider text-white flex items-center gap-2">
                                        <span>1. NELO STUDIO</span>
                                        <span className="text-[9px] px-1.5 py-0.5 rounded bg-[var(--color-ember)]/20 text-[var(--color-ember)] border border-[var(--color-ember)]/40 font-mono">
                                            GUI DESKTOP
                                        </span>
                                    </div>
                                    <p className="text-[11px] text-[var(--color-mist)] mt-0.5">
                                        Native window application (No browser). Visual 3D simulation &amp; CAD.
                                    </p>
                                </div>
                            </div>
                        </button>

                        {/* 2. NELO CLI */}
                        <button
                            onClick={() => setActiveSuite("cli")}
                            className={`p-4 border text-left transition-all cursor-pointer relative ${
                                activeSuite === "cli"
                                    ? "bg-[var(--color-ash)] border-[var(--color-volt)]/80 shadow-lg shadow-[var(--color-volt)]/5"
                                    : "bg-[var(--color-ash)]/40 border-white/10 hover:border-white/20"
                            }`}
                            style={{ clipPath: "polygon(0 0, calc(100% - 12px) 0, 100% 12px, 100% 100%, 12px 100%, 0 calc(100% - 12px))" }}
                        >
                            <div className="flex items-center gap-3">
                                <Terminal className={`w-5 h-5 ${activeSuite === "cli" ? "text-[var(--color-volt)]" : "text-[var(--color-mist)]"}`} />
                                <div>
                                    <div className="text-sm font-bold tracking-wider text-white flex items-center gap-2">
                                        <span>2. NELO CLI &amp; SDK</span>
                                        <span className="text-[9px] px-1.5 py-0.5 rounded bg-[var(--color-volt)]/20 text-[var(--color-volt)] border border-[var(--color-volt)]/40 font-mono">
                                            HEADLESS
                                        </span>
                                    </div>
                                    <p className="text-[11px] text-[var(--color-mist)] mt-0.5">
                                        Terminal command-line &amp; Python SDK for CI/CD, Jetson &amp; servers.
                                    </p>
                                </div>
                            </div>
                        </button>
                    </div>
                </div>
            </section>

            {/* ═══════════════════════════════════════════════════════════════ */}
            {/* VIEW 1: NELO STUDIO DESKTOP (NATIVE WINDOW)                     */}
            {/* ═══════════════════════════════════════════════════════════════ */}
            {activeSuite === "studio" && (
                <section className="py-12 px-6 relative z-10 animate-fade-up">
                    <div className="max-w-6xl mx-auto space-y-8">
                        {/* ⚡ AUTOMATIC DOWNLOAD NOTIFICATION BANNER */}
                        {autoDownloadInfo && autoDownloadInfo.triggered && (
                            <div className="p-5 bg-gradient-to-r from-[var(--color-ash)] via-[var(--color-ash)] to-[var(--color-ash)] border border-[var(--color-volt)]/40 relative overflow-hidden"
                                style={{ clipPath: "polygon(10px 0, 100% 0, calc(100% - 10px) 100%, 0 100%)" }}
                            >
                                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                                    <div className="flex items-center gap-3.5">
                                        <div className="w-10 h-10 rounded-lg bg-[var(--color-volt)]/15 border border-[var(--color-volt)]/40 flex items-center justify-center shrink-0">
                                            <Zap className="w-5 h-5 text-[var(--color-volt)] animate-pulse" />
                                        </div>
                                        <div>
                                            <div className="flex items-center gap-2">
                                                <span className="text-[10px] font-bold font-mono tracking-widest px-2 py-0.5 rounded bg-[var(--color-volt)]/20 text-[var(--color-volt)] border border-[var(--color-volt)]/40 uppercase">
                                                    AUTOMATIC DOWNLOAD TRIGGERED
                                                </span>
                                                <span className="text-xs font-mono text-[var(--color-mist)] hidden sm:inline">
                                                    for {autoDownloadInfo.osName}
                                                </span>
                                            </div>
                                            <div className="text-sm font-bold text-white mt-1">
                                                Your package ({autoDownloadInfo.fileName} • {autoDownloadInfo.size}) has started downloading automatically!
                                            </div>
                                            <div className="text-[11px] text-[var(--color-smoke)] mt-0.5">
                                                If your browser blocked the automatic download, click the manual button below.
                                            </div>
                                        </div>
                                    </div>

                                    <button
                                        onClick={() => startFileDownload(autoDownloadInfo.downloadUrl, autoDownloadInfo.fileName)}
                                        className="px-5 py-2.5 bg-[var(--color-volt)] hover:brightness-110 text-[var(--color-void)] font-bold text-xs tracking-wider flex items-center justify-center gap-2 cursor-pointer transition-all shrink-0 self-start md:self-center"
                                        style={{ clipPath: "polygon(6px 0, 100% 0, calc(100% - 6px) 100%, 0 100%)" }}
                                    >
                                        <Download className="w-4 h-4" />
                                        <span>RESTART DOWNLOAD</span>
                                    </button>
                                </div>
                            </div>
                        )}

                        {/* OS Selection Bar */}
                        <div className="flex flex-wrap items-center justify-between gap-4 p-4 bg-[var(--color-ash)] border border-white/10"
                            style={{ clipPath: "polygon(0 0, calc(100% - 12px) 0, 100% 12px, 100% 100%, 12px 100%, 0 calc(100% - 12px))" }}
                        >
                            <div className="flex items-center gap-3">
                                <Laptop className="w-5 h-5 text-[var(--color-ember)]" />
                                <div>
                                    <div className="text-xs font-bold tracking-wider text-white">
                                        TARGET PLATFORM: <span className="text-[var(--color-volt)] uppercase font-mono">{activeTab}</span>
                                    </div>
                                    <div className="text-[11px] text-[var(--color-smoke)]">
                                        Standalone native window with embedded Python 3.11, NIL Daemon (8765) &amp; STACC 1000Hz (8766).
                                    </div>
                                </div>
                            </div>

                            <div className="flex items-center gap-2">
                                {(["linux", "windows", "macos"] as OSType[]).map((os) => (
                                    <button
                                        key={os}
                                        onClick={() => setActiveTab(os)}
                                        className={`px-3.5 py-1.5 text-xs font-bold tracking-wider transition-all cursor-pointer uppercase ${
                                            activeTab === os
                                                ? "bg-[var(--color-ember)] text-[var(--color-void)]"
                                                : "bg-white/5 text-[var(--color-mist)] hover:text-white"
                                        }`}
                                    >
                                        {os}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* LINUX PACKAGES */}
                        {activeTab === "linux" && (
                            <div className="space-y-6">
                                {/* Arch Linux AUR */}
                                <div className="bg-[var(--color-ash)] border border-white/10 p-6 relative overflow-hidden"
                                    style={{ clipPath: "polygon(12px 0, 100% 0, calc(100% - 12px) 100%, 0 100%)" }}
                                >
                                    <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-4">
                                        <div className="flex items-center gap-3">
                                            <span className="w-3 h-3 rounded-full bg-[var(--color-electric)] animate-pulse" />
                                            <h3 className="font-[var(--font-display)] text-2xl tracking-wider">
                                                {RELEASES.studio.linux.aur.title}
                                            </h3>
                                            <span className="text-[9px] px-2 py-0.5 font-bold tracking-widest bg-[var(--color-electric)]/10 text-[var(--color-electric)] border border-[var(--color-electric)]/30 font-mono">
                                                {RELEASES.studio.linux.aur.badge}
                                            </span>
                                        </div>
                                    </div>

                                    <div className="mt-4 space-y-3 font-mono text-xs">
                                        <div className="bg-[var(--color-void)] border border-white/10 p-3.5 flex items-center justify-between gap-4">
                                            <div className="flex items-center gap-2 overflow-x-auto text-[var(--color-ivory)]">
                                                <span className="text-[var(--color-volt)]">$</span>
                                                <code>{RELEASES.studio.linux.aur.installCmd}</code>
                                            </div>
                                            <button
                                                onClick={() => copyToClipboard(RELEASES.studio.linux.aur.installCmd)}
                                                className="px-3 py-1 bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-sans tracking-wider text-[var(--color-mist)] hover:text-white flex items-center gap-1.5 cursor-pointer shrink-0 transition-colors"
                                            >
                                                {copiedText === RELEASES.studio.linux.aur.installCmd ? <Check className="w-3.5 h-3.5 text-[var(--color-volt)]" /> : <Copy className="w-3.5 h-3.5" />}
                                                <span>{copiedText === RELEASES.studio.linux.aur.installCmd ? "COPIED" : "COPY"}</span>
                                            </button>
                                        </div>
                                    </div>
                                </div>

                                {/* Debian (.deb) & Universal (.AppImage) & Tarball */}
                                <div className="grid md:grid-cols-3 gap-5">
                                    {/* DEB */}
                                    <div className="bg-[var(--color-ash)] border border-white/10 p-5 flex flex-col justify-between space-y-4">
                                        <div>
                                            <div className="flex items-center justify-between mb-2">
                                                <span className="text-[10px] font-bold tracking-widest text-[var(--color-ember)] uppercase font-mono">Ubuntu / Debian</span>
                                                <span className="text-[10px] font-mono text-[var(--color-smoke)]">{RELEASES.studio.linux.deb.size}</span>
                                            </div>
                                            <h4 className="font-[var(--font-display)] text-xl tracking-wider">{RELEASES.studio.linux.deb.title}</h4>
                                            <p className="text-xs text-[var(--color-mist)] mt-1 font-mono">{RELEASES.studio.linux.deb.fileName}</p>
                                        </div>

                                        <div className="space-y-2">
                                            <a
                                                href={RELEASES.studio.linux.deb.downloadUrl}
                                                className="w-full py-3 bg-[var(--color-ember)] hover:brightness-110 text-[var(--color-void)] font-bold text-xs tracking-wider flex items-center justify-center gap-2 cursor-pointer transition-all"
                                                style={{ clipPath: "polygon(6px 0, 100% 0, calc(100% - 6px) 100%, 0 100%)" }}
                                            >
                                                <Download className="w-4 h-4" />
                                                <span>DOWNLOAD .DEB</span>
                                            </a>
                                            <button
                                                onClick={() => copyToClipboard(RELEASES.studio.linux.deb.installCmd)}
                                                className="w-full py-2 bg-white/5 hover:bg-white/10 border border-white/10 text-[11px] font-mono text-[var(--color-mist)] hover:text-white flex items-center justify-center gap-1.5 cursor-pointer transition-colors"
                                            >
                                                {copiedText === RELEASES.studio.linux.deb.installCmd ? <Check className="w-3 h-3 text-[var(--color-volt)]" /> : <Copy className="w-3 h-3" />}
                                                <span>Copy APT Command</span>
                                            </button>
                                        </div>
                                    </div>

                                    {/* APPIMAGE */}
                                    <div className="bg-[var(--color-ash)] border border-white/10 p-5 flex flex-col justify-between space-y-4">
                                        <div>
                                            <div className="flex items-center justify-between mb-2">
                                                <span className="text-[10px] font-bold tracking-widest text-[var(--color-volt)] uppercase font-mono">All Linux Distros</span>
                                                <span className="text-[10px] font-mono text-[var(--color-smoke)]">{RELEASES.studio.linux.appimage.size}</span>
                                            </div>
                                            <h4 className="font-[var(--font-display)] text-xl tracking-wider">{RELEASES.studio.linux.appimage.title}</h4>
                                            <p className="text-xs text-[var(--color-mist)] mt-1 font-mono">{RELEASES.studio.linux.appimage.fileName}</p>
                                        </div>

                                        <div className="space-y-2">
                                            <a
                                                href={RELEASES.studio.linux.appimage.downloadUrl}
                                                className="w-full py-3 bg-white/10 hover:bg-white/20 text-white font-bold text-xs tracking-wider flex items-center justify-center gap-2 cursor-pointer transition-all border border-white/20"
                                                style={{ clipPath: "polygon(6px 0, 100% 0, calc(100% - 6px) 100%, 0 100%)" }}
                                            >
                                                <Download className="w-4 h-4" />
                                                <span>DOWNLOAD .APPIMAGE</span>
                                            </a>
                                            <button
                                                onClick={() => copyToClipboard(RELEASES.studio.linux.appimage.installCmd)}
                                                className="w-full py-2 bg-white/5 hover:bg-white/10 border border-white/10 text-[11px] font-mono text-[var(--color-mist)] hover:text-white flex items-center justify-center gap-1.5 cursor-pointer transition-colors"
                                            >
                                                {copiedText === RELEASES.studio.linux.appimage.installCmd ? <Check className="w-3 h-3 text-[var(--color-volt)]" /> : <Copy className="w-3 h-3" />}
                                                <span>Copy Run Command</span>
                                            </button>
                                        </div>
                                    </div>

                                    {/* TARBALL */}
                                    <div className="bg-[var(--color-ash)] border border-white/10 p-5 flex flex-col justify-between space-y-4">
                                        <div>
                                            <div className="flex items-center justify-between mb-2">
                                                <span className="text-[10px] font-bold tracking-widest text-[var(--color-plasma)] uppercase font-mono">Standalone Tarball</span>
                                                <span className="text-[10px] font-mono text-[var(--color-smoke)]">{RELEASES.studio.linux.tarball.size}</span>
                                            </div>
                                            <h4 className="font-[var(--font-display)] text-xl tracking-wider">{RELEASES.studio.linux.tarball.title}</h4>
                                            <p className="text-xs text-[var(--color-mist)] mt-1 font-mono">{RELEASES.studio.linux.tarball.fileName}</p>
                                        </div>

                                        <div className="space-y-2">
                                            <a
                                                href={RELEASES.studio.linux.tarball.downloadUrl}
                                                className="w-full py-3 bg-white/5 hover:bg-white/10 text-[var(--color-ivory)] font-bold text-xs tracking-wider flex items-center justify-center gap-2 cursor-pointer transition-all border border-white/10"
                                                style={{ clipPath: "polygon(6px 0, 100% 0, calc(100% - 6px) 100%, 0 100%)" }}
                                            >
                                                <Download className="w-4 h-4" />
                                                <span>DOWNLOAD .TAR.GZ</span>
                                            </a>
                                            <button
                                                onClick={() => copyToClipboard(RELEASES.studio.linux.tarball.installCmd)}
                                                className="w-full py-2 bg-white/5 hover:bg-white/10 border border-white/10 text-[11px] font-mono text-[var(--color-mist)] hover:text-white flex items-center justify-center gap-1.5 cursor-pointer transition-colors"
                                            >
                                                {copiedText === RELEASES.studio.linux.tarball.installCmd ? <Check className="w-3 h-3 text-[var(--color-volt)]" /> : <Copy className="w-3 h-3" />}
                                                <span>Copy Extract Script</span>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* WINDOWS PACKAGES */}
                        {activeTab === "windows" && (
                            <div className="space-y-6">
                                <div className="grid md:grid-cols-2 gap-6">
                                    {/* Setup Exe */}
                                    <div className="bg-[var(--color-ash)] border border-white/10 p-6 flex flex-col justify-between space-y-4"
                                        style={{ clipPath: "polygon(12px 0, 100% 0, calc(100% - 12px) 100%, 0 100%)" }}
                                    >
                                        <div>
                                            <div className="flex items-center justify-between mb-2">
                                                <span className="text-[10px] font-bold tracking-widest text-[var(--color-electric)] uppercase font-mono">RECOMMENDED INSTALLER</span>
                                                <span className="text-[10px] font-mono text-[var(--color-smoke)]">{RELEASES.studio.windows.exe.size}</span>
                                            </div>
                                            <h3 className="font-[var(--font-display)] text-2xl tracking-wider">{RELEASES.studio.windows.exe.title}</h3>
                                            <p className="text-xs text-[var(--color-mist)] mt-2">
                                                Installs NELO Studio with desktop shortcuts, hardware acceleration, and embedded background sidecars.
                                            </p>
                                        </div>

                                        <a
                                            href={RELEASES.studio.windows.exe.downloadUrl}
                                            className="py-3.5 bg-[var(--color-electric)] hover:brightness-110 text-[var(--color-void)] font-bold text-xs tracking-wider flex items-center justify-center gap-2 cursor-pointer transition-all"
                                            style={{ clipPath: "polygon(8px 0, 100% 0, calc(100% - 8px) 100%, 0 100%)" }}
                                        >
                                            <Download className="w-4 h-4" />
                                            <span>DOWNLOAD WINDOWS INSTALLER (.EXE)</span>
                                        </a>
                                    </div>

                                    {/* Portable Zip */}
                                    <div className="bg-[var(--color-ash)] border border-white/10 p-6 flex flex-col justify-between space-y-4"
                                        style={{ clipPath: "polygon(12px 0, 100% 0, calc(100% - 12px) 100%, 0 100%)" }}
                                    >
                                        <div>
                                            <div className="flex items-center justify-between mb-2">
                                                <span className="text-[10px] font-bold tracking-widest text-[var(--color-mist)] uppercase font-mono">STANDALONE PORTABLE</span>
                                                <span className="text-[10px] font-mono text-[var(--color-smoke)]">{RELEASES.studio.windows.portable.size}</span>
                                            </div>
                                            <h3 className="font-[var(--font-display)] text-2xl tracking-wider">{RELEASES.studio.windows.portable.title}</h3>
                                            <p className="text-xs text-[var(--color-mist)] mt-2">
                                                Extract and run from USB drive or directory without administrator privileges.
                                            </p>
                                        </div>

                                        <a
                                            href={RELEASES.studio.windows.portable.downloadUrl}
                                            className="py-3.5 bg-white/10 hover:bg-white/20 text-white font-bold text-xs tracking-wider flex items-center justify-center gap-2 cursor-pointer transition-all border border-white/20"
                                            style={{ clipPath: "polygon(8px 0, 100% 0, calc(100% - 8px) 100%, 0 100%)" }}
                                        >
                                            <Download className="w-4 h-4" />
                                            <span>DOWNLOAD PORTABLE ZIP (.ZIP)</span>
                                        </a>
                                    </div>
                                </div>

                                <div className="bg-[var(--color-void)] border border-white/10 p-3.5 flex items-center justify-between gap-4 font-mono text-xs">
                                    <div className="flex items-center gap-2 overflow-x-auto text-[var(--color-ivory)]">
                                        <span className="text-[var(--color-electric)]">PS&gt;</span>
                                        <code>{RELEASES.studio.windows.winget}</code>
                                    </div>
                                    <button
                                        onClick={() => copyToClipboard(RELEASES.studio.windows.winget)}
                                        className="px-3 py-1 bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-sans tracking-wider text-[var(--color-mist)] hover:text-white flex items-center gap-1.5 cursor-pointer shrink-0 transition-colors"
                                    >
                                        {copiedText === RELEASES.studio.windows.winget ? <Check className="w-3.5 h-3.5 text-[var(--color-volt)]" /> : <Copy className="w-3.5 h-3.5" />}
                                        <span>{copiedText === RELEASES.studio.windows.winget ? "COPIED" : "COPY WINGET"}</span>
                                    </button>
                                </div>
                            </div>
                        )}

                        {/* MACOS PACKAGES */}
                        {activeTab === "macos" && (
                            <div className="space-y-6">
                                <div className="bg-[var(--color-ash)] border border-white/10 p-6 flex flex-col md:flex-row items-center justify-between gap-6"
                                    style={{ clipPath: "polygon(12px 0, 100% 0, calc(100% - 12px) 100%, 0 100%)" }}
                                >
                                    <div className="space-y-2">
                                        <div className="flex items-center gap-2">
                                            <span className="text-[10px] font-bold tracking-widest text-[var(--color-plasma)] uppercase font-mono">UNIVERSAL APPLICATION BUNDLE</span>
                                            <span className="text-[10px] font-mono text-[var(--color-smoke)]">{RELEASES.studio.macos.dmg.size}</span>
                                        </div>
                                        <h3 className="font-[var(--font-display)] text-2xl tracking-wider">{RELEASES.studio.macos.dmg.title}</h3>
                                        <p className="text-xs text-[var(--color-mist)] max-w-xl">
                                            Drag-and-drop installer into Applications folder with native Metal GPU acceleration.
                                        </p>
                                    </div>

                                    <a
                                        href={RELEASES.studio.macos.dmg.downloadUrl}
                                        className="px-8 py-4 bg-[var(--color-plasma)] hover:brightness-110 text-[var(--color-void)] font-bold text-xs tracking-wider flex items-center justify-center gap-2 cursor-pointer shrink-0 transition-all"
                                        style={{ clipPath: "polygon(8px 0, 100% 0, calc(100% - 8px) 100%, 0 100%)" }}
                                    >
                                        <Download className="w-4 h-4" />
                                        <span>DOWNLOAD UNIVERSAL DMG (.DMG)</span>
                                    </a>
                                </div>

                                <div className="bg-[var(--color-void)] border border-white/10 p-3.5 flex items-center justify-between gap-4 font-mono text-xs">
                                    <div className="flex items-center gap-2 overflow-x-auto text-[var(--color-ivory)]">
                                        <span className="text-[var(--color-plasma)]">$</span>
                                        <code>{RELEASES.studio.macos.brew}</code>
                                    </div>
                                    <button
                                        onClick={() => copyToClipboard(RELEASES.studio.macos.brew)}
                                        className="px-3.5 py-1.5 bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-sans tracking-wider text-[var(--color-mist)] hover:text-white flex items-center gap-1.5 cursor-pointer shrink-0 transition-colors"
                                    >
                                        {copiedText === RELEASES.studio.macos.brew ? <Check className="w-3.5 h-3.5 text-[var(--color-volt)]" /> : <Copy className="w-3.5 h-3.5" />}
                                        <span>{copiedText === RELEASES.studio.macos.brew ? "COPIED" : "COPY BREW"}</span>
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </section>
            )}

            {/* ═══════════════════════════════════════════════════════════════ */}
            {/* VIEW 2: NELO CLI & PYTHON SDK (HEADLESS)                        */}
            {/* ═══════════════════════════════════════════════════════════════ */}
            {activeSuite === "cli" && (
                <section className="py-12 px-6 relative z-10 animate-fade-up">
                    <div className="max-w-6xl mx-auto space-y-8">
                        <div>
                            <span className="text-[10px] font-bold tracking-[0.25em] text-[var(--color-volt)] uppercase font-mono">
                                HEADLESS POWERHOUSE &amp; PYTHON SDK
                            </span>
                            <h2 className="font-[var(--font-display)] text-4xl sm:text-5xl tracking-wider mt-2">
                                INSTALL NELO-CLI
                            </h2>
                            <p className="text-xs sm:text-sm text-[var(--color-mist)] mt-1 max-w-3xl">
                                Execute 1000Hz physics steps, trigger NIL causal evolutionary cycles, compute spatial kinematics, and export CAD geometries directly from terminal scripts, Docker, or edge hardware.
                            </p>
                        </div>

                        {/* Primary Installation Grid */}
                        <div className="grid md:grid-cols-2 gap-5 font-mono text-xs">
                            {/* Python Pip */}
                            <div className="bg-[var(--color-ash)] border border-white/10 p-5 space-y-3">
                                <div className="flex items-center justify-between font-sans">
                                    <span className="text-xs font-bold text-white uppercase">Python Package (PyPI)</span>
                                    <span className="text-[10px] text-[var(--color-volt)] font-mono">pip3 / venv</span>
                                </div>
                                <div className="bg-[var(--color-void)] border border-white/10 p-3 flex items-center justify-between gap-3">
                                    <div className="text-[var(--color-ivory)] overflow-x-auto">
                                        <span className="text-[var(--color-volt)]">$</span> {RELEASES.cli.pip}
                                    </div>
                                    <button
                                        onClick={() => copyToClipboard(RELEASES.cli.pip)}
                                        className="px-2.5 py-1 bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-sans tracking-wider text-[var(--color-mist)] hover:text-white flex items-center gap-1 cursor-pointer shrink-0"
                                    >
                                        {copiedText === RELEASES.cli.pip ? <Check className="w-3 h-3 text-[var(--color-volt)]" /> : <Copy className="w-3 h-3" />}
                                        <span>COPY</span>
                                    </button>
                                </div>
                            </div>

                            {/* Linux 1-Liner Script */}
                            <div className="bg-[var(--color-ash)] border border-white/10 p-5 space-y-3">
                                <div className="flex items-center justify-between font-sans">
                                    <span className="text-xs font-bold text-white uppercase">Linux / macOS Curl Script</span>
                                    <span className="text-[10px] text-[var(--color-electric)] font-mono">bash</span>
                                </div>
                                <div className="bg-[var(--color-void)] border border-white/10 p-3 flex items-center justify-between gap-3">
                                    <div className="text-[var(--color-ivory)] overflow-x-auto truncate">
                                        <span className="text-[var(--color-electric)]">$</span> {RELEASES.cli.curlOneLiner}
                                    </div>
                                    <button
                                        onClick={() => copyToClipboard(RELEASES.cli.curlOneLiner)}
                                        className="px-2.5 py-1 bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-sans tracking-wider text-[var(--color-mist)] hover:text-white flex items-center gap-1 cursor-pointer shrink-0"
                                    >
                                        {copiedText === RELEASES.cli.curlOneLiner ? <Check className="w-3 h-3 text-[var(--color-volt)]" /> : <Copy className="w-3 h-3" />}
                                        <span>COPY</span>
                                    </button>
                                </div>
                            </div>

                            {/* Arch Linux AUR */}
                            <div className="bg-[var(--color-ash)] border border-white/10 p-5 space-y-3">
                                <div className="flex items-center justify-between font-sans">
                                    <span className="text-xs font-bold text-white uppercase">Arch Linux / AUR</span>
                                    <span className="text-[10px] text-[var(--color-plasma)] font-mono">yay / paru</span>
                                </div>
                                <div className="bg-[var(--color-void)] border border-white/10 p-3 flex items-center justify-between gap-3">
                                    <div className="text-[var(--color-ivory)] overflow-x-auto">
                                        <span className="text-[var(--color-plasma)]">$</span> {RELEASES.cli.aur}
                                    </div>
                                    <button
                                        onClick={() => copyToClipboard(RELEASES.cli.aur)}
                                        className="px-2.5 py-1 bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-sans tracking-wider text-[var(--color-mist)] hover:text-white flex items-center gap-1 cursor-pointer shrink-0"
                                    >
                                        {copiedText === RELEASES.cli.aur ? <Check className="w-3 h-3 text-[var(--color-volt)]" /> : <Copy className="w-3 h-3" />}
                                        <span>COPY</span>
                                    </button>
                                </div>
                            </div>

                            {/* macOS Homebrew */}
                            <div className="bg-[var(--color-ash)] border border-white/10 p-5 space-y-3">
                                <div className="flex items-center justify-between font-sans">
                                    <span className="text-xs font-bold text-white uppercase">macOS Homebrew</span>
                                    <span className="text-[10px] text-[var(--color-ember)] font-mono">brew</span>
                                </div>
                                <div className="bg-[var(--color-void)] border border-white/10 p-3 flex items-center justify-between gap-3">
                                    <div className="text-[var(--color-ivory)] overflow-x-auto">
                                        <span className="text-[var(--color-ember)]">$</span> {RELEASES.cli.brew}
                                    </div>
                                    <button
                                        onClick={() => copyToClipboard(RELEASES.cli.brew)}
                                        className="px-2.5 py-1 bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-sans tracking-wider text-[var(--color-mist)] hover:text-white flex items-center gap-1 cursor-pointer shrink-0"
                                    >
                                        {copiedText === RELEASES.cli.brew ? <Check className="w-3 h-3 text-[var(--color-volt)]" /> : <Copy className="w-3 h-3" />}
                                        <span>COPY</span>
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Interactive CLI Commands Reference */}
                        <div className="bg-[var(--color-ash)] border border-white/10 p-6 space-y-4">
                            <h3 className="font-[var(--font-display)] text-2xl tracking-wider flex items-center gap-2">
                                <Terminal className="w-5 h-5 text-[var(--color-volt)]" />
                                CLI COMMAND EXAMPLES
                            </h3>

                            <div className="space-y-3">
                                {RELEASES.cli.features.map((feat, idx) => (
                                    <div key={idx} className="bg-[var(--color-void)] border border-white/10 p-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 font-mono text-xs">
                                        <div className="space-y-1">
                                            <div className="text-[var(--color-volt)] font-bold">{feat.cmd}</div>
                                            <div className="text-[11px] text-[var(--color-mist)] font-sans">{feat.desc}</div>
                                        </div>
                                        <button
                                            onClick={() => copyToClipboard(feat.cmd)}
                                            className="px-3 py-1 bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-sans tracking-wider text-[var(--color-mist)] hover:text-white flex items-center gap-1.5 cursor-pointer shrink-0 self-start sm:self-center transition-colors"
                                        >
                                            {copiedText === feat.cmd ? <Check className="w-3.5 h-3.5 text-[var(--color-volt)]" /> : <Copy className="w-3.5 h-3.5" />}
                                            <span>COPY</span>
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>
            )}

            {/* ═══════════════════════════════════════════════════════════════ */}
            {/* EMBEDDED DAEMON ARCHITECTURE BREAKDOWN                          */}
            {/* ═══════════════════════════════════════════════════════════════ */}
            <section className="py-16 px-6 border-t border-white/5 bg-[var(--color-ash)]/40 relative z-10">
                <div className="max-w-6xl mx-auto">
                    <div className="text-center max-w-2xl mx-auto mb-12">
                        <span className="text-[10px] font-bold tracking-[0.25em] text-[var(--color-ember)] uppercase font-mono">
                            ZERO SETUP ARCHITECTURE
                        </span>
                        <h2 className="font-[var(--font-display)] text-4xl sm:text-5xl tracking-wider mt-2">
                            HOW THE EMBEDDED ENGINE WORKS
                        </h2>
                        <p className="text-xs text-[var(--color-mist)] mt-2">
                            When you run NELO Studio or NELO-CLI, it automatically spins up isolated real-time micro-daemons in the background.
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
                                <div className="text-[var(--color-ivory)] font-bold">{RELEASES.studio.linux.deb.fileName}:</div>
                                <div className="bg-white/5 p-2 rounded break-all text-[11px] text-[var(--color-volt)]">{RELEASES.studio.linux.deb.sha256}</div>
                            </div>
                            <div className="space-y-1">
                                <div className="text-[var(--color-ivory)] font-bold">{RELEASES.studio.linux.appimage.fileName}:</div>
                                <div className="bg-white/5 p-2 rounded break-all text-[11px] text-[var(--color-volt)]">{RELEASES.studio.linux.appimage.sha256}</div>
                            </div>
                            <div className="space-y-1">
                                <div className="text-[var(--color-ivory)] font-bold">{RELEASES.studio.windows.exe.fileName}:</div>
                                <div className="bg-white/5 p-2 rounded break-all text-[11px] text-[var(--color-electric)]">{RELEASES.studio.windows.exe.sha256}</div>
                            </div>
                            <div className="space-y-1">
                                <div className="text-[var(--color-ivory)] font-bold">{RELEASES.studio.macos.dmg.fileName}:</div>
                                <div className="bg-white/5 p-2 rounded break-all text-[11px] text-[var(--color-plasma)]">{RELEASES.studio.macos.dmg.sha256}</div>
                            </div>
                        </div>
                    )}
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
