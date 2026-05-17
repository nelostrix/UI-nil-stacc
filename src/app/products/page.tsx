"use client";

import Link from "next/link";
import Image from "next/image";

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
                        className="px-4 py-2 text-xs font-semibold tracking-[0.2em] text-[var(--color-ivory)]"
                    >
                        PRODUCTS
                    </Link>
                    <Link
                        href="/downloads"
                        className="px-4 py-2 text-xs font-semibold tracking-[0.2em] text-[var(--color-mist)] hover:text-[var(--color-ember)] transition-colors"
                    >
                        DOWNLOADS
                    </Link>
                    <Link
                        href="/usecases"
                        className="px-4 py-2 text-xs font-semibold tracking-[0.2em] text-[var(--color-mist)] hover:text-[var(--color-ember)] transition-colors"
                    >
                        USE CASES
                    </Link>
                    <Link
                        href="/downloads"
                        className="ml-4 bg-[var(--color-ember)] text-[var(--color-void)] px-5 py-2.5 text-xs font-bold tracking-[0.15em]"
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

function ProductHero({
    id,
    name,
    japanese,
    tag,
    tagColor,
    description,
    version,
    status,
}: {
    id: string;
    name: string;
    japanese: string;
    tag: string;
    tagColor: string;
    description: string;
    version: string;
    status: string;
}) {
    return (
        <div className="flex items-center gap-3 mb-2">
            <div
                className="w-3 h-3 rounded-full"
                style={{ background: tagColor }}
            />
            <span
                className="text-[9px] font-bold tracking-[0.25em] px-3 py-1 border uppercase"
                style={{ color: tagColor, borderColor: tagColor + "30" }}
            >
                {tag}
            </span>
            <span className="text-[9px] font-[var(--font-mono)] text-[var(--color-smoke)] tracking-wider">
                {version}
            </span>
            <span
                className="text-[9px] font-[var(--font-mono)] tracking-wider"
                style={{ color: "var(--color-volt)" }}
            >
                {status}
            </span>
        </div>
    );
}

function ProductCard({
    id,
    name,
    japanese,
    tag,
    tagColor,
    description,
    features,
    architecture,
    install,
    price,
    version,
}: {
    id: string;
    name: string;
    japanese: string;
    tag: string;
    tagColor: string;
    description: string;
    features: string[];
    architecture: { layer: string; items: string }[];
    install: string;
    price: string;
    version: string;
}) {
    return (
        <section
            id={id}
            className="py-24 px-6 border-t border-white/5 relative overflow-hidden"
        >
            {/* Background glow */}
            <div
                className="absolute top-0 right-0 w-[400px] h-[400px] rounded-full blur-[150px] opacity-[0.03]"
                style={{ background: tagColor }}
            />

            <div className="max-w-6xl mx-auto">
                <ProductHero
                    id={id}
                    name={name}
                    japanese={japanese}
                    tag={tag}
                    tagColor={tagColor}
                    description={description}
                    version={version}
                    status="● STABLE"
                />

                <div className="flex items-end gap-4 mt-4 mb-2">
                    <h2 className="font-[var(--font-display)] text-7xl md:text-9xl tracking-wider leading-none">
                        {name}
                    </h2>
                    <span className="text-lg text-white/10 mb-3 font-light">
                        {japanese}
                    </span>
                </div>

                <p className="text-[var(--color-mist)] text-lg max-w-2xl mb-12 leading-relaxed">
                    {description}
                </p>

                {/* Action buttons */}
                <div className="flex flex-wrap gap-4 mb-16">
                    <Link
                        href={`/downloads?product=${id}`}
                        className="bg-[var(--color-ember)] text-[var(--color-void)] px-8 py-4 font-bold text-sm tracking-[0.15em] hover:brightness-110 transition-all group relative overflow-hidden"
                        style={{
                            clipPath:
                                "polygon(10px 0, 100% 0, calc(100% - 10px) 100%, 0 100%)",
                        }}
                    >
                        <span className="relative z-10">
                            DOWNLOAD {name.toUpperCase()} →
                        </span>
                        <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 skew-x-12" />
                    </Link>
                    <div
                        className="flex items-center gap-3 border border-white/10 px-6 py-3"
                        style={{
                            clipPath:
                                "polygon(10px 0, 100% 0, calc(100% - 10px) 100%, 0 100%)",
                        }}
                    >
                        <span
                            className="font-[var(--font-display)] text-2xl tracking-wider"
                            style={{ color: tagColor }}
                        >
                            {price}
                        </span>
                        <span className="text-[var(--color-smoke)] text-xs tracking-wider">
                            /YEAR
                        </span>
                    </div>
                </div>

                <div className="grid md:grid-cols-2 gap-12">
                    {/* Features */}
                    <div>
                        <h3 className="text-[10px] font-bold tracking-[0.3em] text-[var(--color-smoke)] mb-6 flex items-center gap-3">
                            <span
                                className="w-8 h-[1px]"
                                style={{ background: tagColor }}
                            />
                            CAPABILITIES
                        </h3>
                        <div className="space-y-3">
                            {features.map((f, i) => (
                                <div
                                    key={f}
                                    className="flex items-start gap-3 animate-fade-up"
                                    style={{
                                        animationDelay: `${i * 0.05}s`,
                                        opacity: 0,
                                    }}
                                >
                                    <span
                                        className="mt-2 w-1.5 h-1.5 rounded-full flex-shrink-0"
                                        style={{ background: tagColor }}
                                    />
                                    <span className="text-[var(--color-pearl)] text-sm">
                                        {f}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Architecture */}
                    <div>
                        <h3 className="text-[10px] font-bold tracking-[0.3em] text-[var(--color-smoke)] mb-6 flex items-center gap-3">
                            <span
                                className="w-8 h-[1px]"
                                style={{ background: tagColor }}
                            />
                            ARCHITECTURE
                        </h3>
                        <div className="space-y-4">
                            {architecture.map((a, i) => (
                                <div
                                    key={a.layer}
                                    className="border-l-2 pl-4 animate-fade-up"
                                    style={{
                                        borderColor: tagColor + "40",
                                        animationDelay: `${i * 0.1}s`,
                                        opacity: 0,
                                    }}
                                >
                                    <div className="text-sm font-semibold text-[var(--color-ivory)]">
                                        {a.layer}
                                    </div>
                                    <div className="text-xs text-[var(--color-smoke)] mt-1 leading-relaxed">
                                        {a.items}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Install command */}
                <div
                    className="mt-12 bg-[var(--color-ash)] border border-white/5 p-5"
                    style={{
                        clipPath:
                            "polygon(0 0, calc(100% - 12px) 0, 100% 12px, 100% 100%, 12px 100%, 0 calc(100% - 12px))",
                    }}
                >
                    <div className="flex items-center justify-between">
                        <div>
                            <div className="text-[9px] font-bold tracking-[0.3em] text-[var(--color-smoke)] mb-2">
                                QUICK INSTALL
                            </div>
                            <code className="font-[var(--font-mono)] text-sm text-[var(--color-mist)]">
                                <span className="text-[var(--color-ember)]">
                                    $
                                </span>{" "}
                                {install}
                            </code>
                        </div>
                        <button
                            onClick={() => {
                                navigator.clipboard.writeText(install);
                            }}
                            className="text-xs tracking-wider text-[var(--color-smoke)] hover:text-[var(--color-ember)] transition-colors px-4 py-2 border border-white/5"
                        >
                            COPY
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default function Products() {
    return (
        <main>
            <Nav />

            {/* Header */}
            <section className="pt-32 pb-8 px-6">
                <div className="max-w-6xl mx-auto">
                    <span className="text-[9px] font-bold tracking-[0.3em] text-[var(--color-ember)] border border-[var(--color-ember)]/20 bg-[var(--color-ember)]/5 px-4 py-2">
                        THREE PRODUCTS
                    </span>
                    <h1 className="font-[var(--font-display)] text-7xl md:text-9xl tracking-wider mt-6">
                        PRODUCTS
                    </h1>
                    <p className="text-[var(--color-mist)] text-lg mt-4 max-w-2xl">
                        Use them independently or together. Each is powerful
                        alone — unstoppable combined.
                    </p>

                    {/* Quick jump */}
                    <div className="flex gap-4 mt-8">
                        {[
                            {
                                href: "#stacc",
                                name: "STACC",
                                color: "var(--color-electric)",
                            },
                            {
                                href: "#nil",
                                name: "NIL",
                                color: "var(--color-plasma)",
                            },
                            {
                                href: "#nil-stacc",
                                name: "NIL×STACC",
                                color: "var(--color-ember)",
                            },
                        ].map((p) => (
                            <a
                                key={p.name}
                                href={p.href}
                                className="flex items-center gap-2 text-xs font-bold tracking-[0.2em] px-4 py-2 border border-white/5 hover:border-white/20 transition-all card-hover"
                                style={{
                                    clipPath:
                                        "polygon(6px 0, 100% 0, calc(100% - 6px) 100%, 0 100%)",
                                }}
                            >
                                <span
                                    className="w-2 h-2 rounded-full"
                                    style={{ background: p.color }}
                                />
                                {p.name}
                            </a>
                        ))}
                    </div>
                </div>
            </section>

            {/* ═══ STACC ═══ */}
            <ProductCard
                id="stacc"
                name="STACC"
                japanese="スタック"
                tag="ROBOTICS PLATFORM"
                tagColor="var(--color-electric)"
                description="The universal robotics development platform. Define any robot, simulate with MuJoCo physics, deploy to any hardware. Like CUDA — but for robotics."
                price="₹4,999"
                version="v0.1.0"
                features={[
                    "MuJoCo 3D physics simulation with real-time viewer",
                    "Universal robot topology — serial chains, trees, humanoids, any morphology",
                    "URDF/SDF parser — load thousands of existing robot models",
                    "14 sensor types wired to MuJoCo (LiDAR, camera, depth, IMU, GPS...)",
                    "A*, RRT*, Dijkstra, Potential Fields path planning",
                    "EKF-SLAM + Particle Filter with ICP scan matching",
                    "Computer vision — OpenCV, ONNX, ArUco markers, optical flow",
                    "Quintic, minimum-jerk, trapezoidal trajectory generation",
                    "Gymnasium-compatible RL wrapper for Stable Baselines3",
                    "HAL for 17 microcontroller boards (RPi, Arduino, ESP32, STM32, Jetson...)",
                    "Behavior trees for autonomous task planning",
                    "8 gait patterns + CPG + flight controller for drones",
                    "5 gripper types including dexterous hand",
                    "NLP command parsing — control robots with natural language",
                ]}
                architecture={[
                    {
                        layer: "Simulation",
                        items: "MuJoCo backend, MJCF builder, 3D viewer, Gym wrapper, world/terrain, recording/replay",
                    },
                    {
                        layer: "Perception",
                        items: "EKF-SLAM, particle filter, ICP, occupancy mapping, 14 sensors, full vision pipeline",
                    },
                    {
                        layer: "Planning",
                        items: "A*, RRT*, Dijkstra, potential fields, behavior trees, trajectory generation, NLP",
                    },
                    {
                        layer: "Control",
                        items: "PID, cascaded PID, gait generation, gripper control, trajectory executor",
                    },
                    {
                        layer: "Hardware",
                        items: "GPIO, I2C, SPI, serial, PWM, 17 board definitions, SSH deploy, firmware upload",
                    },
                ]}
                install="bash install.sh --key YOUR_KEY --package stacc"
            />

            {/* ═══ NIL ═══ */}
            <ProductCard
                id="nil"
                name="NIL"
                japanese="ニル"
                tag="AGENT SDK"
                tagColor="var(--color-plasma)"
                description="Self-evolving AI agents that get smarter every time they run. Persistent memory, skill extraction, drift detection, cost optimization. The brain."
                price="₹7,999"
                version="v0.1.0"
                features={[
                    "Persistent memory across sessions via SQLite",
                    "Automatic skill extraction from successful patterns",
                    "Drift detection — alerts when strategies stop working",
                    "Strategy mutation — evolves better approaches autonomously",
                    "Smart model routing — use cheaper models when safe",
                    "Chain compression — eliminate redundant reasoning steps",
                    "Per-run cost tracking — token and cost accounting",
                    "Works with Claude, GPT, Llama, Gemini, or any LLM",
                    "Zero infrastructure — runs on any laptop, stores everything locally",
                    "Structured experience traces — not just logs, machine-readable data",
                ]}
                architecture={[
                    {
                        layer: "Agent Kernel",
                        items: "Runner loop, structured tracer, tool manager, outcome tracking",
                    },
                    {
                        layer: "Memory",
                        items: "SQLite store, experience queries, skill registry, strategy versioning",
                    },
                    {
                        layer: "Evolution",
                        items: "Pattern analyzer, skill extractor, strategy mutator, evaluator, drift detector",
                    },
                    {
                        layer: "Optimization",
                        items: "Model router, chain compressor, response cache, budget controller",
                    },
                    {
                        layer: "Providers",
                        items: "Anthropic (Claude), OpenAI (GPT), Google (Gemini), local (Llama), stub (testing)",
                    },
                ]}
                install="bash install.sh --key YOUR_KEY --package nil-sdk"
            />

            {/* ═══ NIL×STACC ═══ */}
            <ProductCard
                id="nil-stacc"
                name="NIL×STACC"
                japanese="フュージョン"
                tag="FULL STACK"
                tagColor="var(--color-ember)"
                description="The complete robotics intelligence stack. Self-improving NIL agents controlling stacc robots. Brain meets body. Gets smarter with every task."
                price="₹14,999"
                version="v0.1.0"
                features={[
                    "Auto-generates NIL tools from any stacc robot's capabilities",
                    "Natural language robot control — 'pick up the red block'",
                    "Agents learn optimal strategies from every interaction",
                    "Pre-built domains: warehouse, inspection, research, assembly",
                    "Sim-to-real pipeline — train in MuJoCo, deploy to hardware",
                    "Fleet management for coordinating multiple robots",
                    "Safety governor constrains agent actions within safe bounds",
                    "Telemetry and usage analytics across all robots",
                    "RobotAgent class — one line to create a self-improving robot",
                    "Bridge layer auto-wraps sensors, grippers, planners as agent tools",
                ]}
                architecture={[
                    {
                        layer: "Bridge",
                        items: "Auto tool generation from robot capabilities, data serializers, version compatibility",
                    },
                    {
                        layer: "Domains",
                        items: "Warehouse ops, autonomous inspection, research lab, assembly line, exploration",
                    },
                    {
                        layer: "Exclusive",
                        items: "Sim-based training, digital twin sync, fleet coordination, safety constraints, telemetry",
                    },
                    {
                        layer: "Distribution",
                        items: "Package installer, version manager, health checker, feedback collector, update system",
                    },
                ]}
                install="bash install.sh --key YOUR_KEY --package nil-stacc"
            />

            {/* Compare table */}
            <section className="py-24 px-6 border-t border-white/5">
                <div className="max-w-4xl mx-auto">
                    <h2 className="font-[var(--font-display)] text-4xl tracking-wider text-center mb-12">
                        COMPARE
                    </h2>

                    <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead>
                                <tr className="border-b border-white/5">
                                    <th className="text-left py-4 pr-4 text-[var(--color-smoke)] text-xs tracking-[0.2em] font-normal">
                                        FEATURE
                                    </th>
                                    <th
                                        className="py-4 px-4 text-center"
                                        style={{
                                            color: "var(--color-electric)",
                                        }}
                                    >
                                        <span className="font-[var(--font-display)] text-lg tracking-wider">
                                            STACC
                                        </span>
                                    </th>
                                    <th
                                        className="py-4 px-4 text-center"
                                        style={{ color: "var(--color-plasma)" }}
                                    >
                                        <span className="font-[var(--font-display)] text-lg tracking-wider">
                                            NIL
                                        </span>
                                    </th>
                                    <th
                                        className="py-4 px-4 text-center"
                                        style={{ color: "var(--color-ember)" }}
                                    >
                                        <span className="font-[var(--font-display)] text-lg tracking-wider">
                                            NIL×STACC
                                        </span>
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="text-[var(--color-mist)]">
                                {[
                                    ["MuJoCo simulation", true, false, true],
                                    ["URDF/SDF parser", true, false, true],
                                    ["14 sensor types", true, false, true],
                                    [
                                        "Path planning (A*, RRT*)",
                                        true,
                                        false,
                                        true,
                                    ],
                                    ["SLAM", true, false, true],
                                    ["HAL — 17 boards", true, false, true],
                                    ["Gym RL wrapper", true, false, true],
                                    ["Self-evolving agents", false, true, true],
                                    ["Persistent memory", false, true, true],
                                    ["Skill extraction", false, true, true],
                                    ["Drift detection", false, true, true],
                                    ["Cost optimization", false, true, true],
                                    [
                                        "Auto tool generation",
                                        false,
                                        false,
                                        true,
                                    ],
                                    ["Pre-built domains", false, false, true],
                                    ["Fleet management", false, false, true],
                                    ["Safety governor", false, false, true],
                                ].map(([feature, s, n, ns]) => (
                                    <tr
                                        key={feature as string}
                                        className="border-b border-white/5"
                                    >
                                        <td className="py-3 pr-4 text-sm">
                                            {feature as string}
                                        </td>
                                        <td className="py-3 px-4 text-center">
                                            {s ? (
                                                <span className="text-[var(--color-volt)]">
                                                    ✓
                                                </span>
                                            ) : (
                                                <span className="text-[var(--color-smoke)]">
                                                    —
                                                </span>
                                            )}
                                        </td>
                                        <td className="py-3 px-4 text-center">
                                            {n ? (
                                                <span className="text-[var(--color-volt)]">
                                                    ✓
                                                </span>
                                            ) : (
                                                <span className="text-[var(--color-smoke)]">
                                                    —
                                                </span>
                                            )}
                                        </td>
                                        <td className="py-3 px-4 text-center">
                                            {ns ? (
                                                <span className="text-[var(--color-volt)]">
                                                    ✓
                                                </span>
                                            ) : (
                                                <span className="text-[var(--color-smoke)]">
                                                    —
                                                </span>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                                <tr className="border-t-2 border-white/10">
                                    <td className="py-4 pr-4 font-semibold">
                                        Price
                                    </td>
                                    <td
                                        className="py-4 px-4 text-center font-[var(--font-display)] text-xl tracking-wider"
                                        style={{
                                            color: "var(--color-electric)",
                                        }}
                                    >
                                        ₹4,999
                                    </td>
                                    <td
                                        className="py-4 px-4 text-center font-[var(--font-display)] text-xl tracking-wider"
                                        style={{ color: "var(--color-plasma)" }}
                                    >
                                        ₹7,999
                                    </td>
                                    <td
                                        className="py-4 px-4 text-center font-[var(--font-display)] text-xl tracking-wider"
                                        style={{ color: "var(--color-ember)" }}
                                    >
                                        ₹14,999
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-24 px-6 border-t border-white/5">
                <div className="max-w-3xl mx-auto text-center">
                    <h2 className="font-[var(--font-display)] text-5xl md:text-6xl tracking-wider mb-6">
                        CHOOSE YOUR
                        <span className="text-[var(--color-ember)] text-glow block mt-2">
                            WEAPON
                        </span>
                    </h2>
                    <div className="flex flex-wrap justify-center gap-4 mt-10">
                        <Link
                            href="/downloads?product=stacc"
                            className="px-8 py-4 font-bold text-sm tracking-[0.15em] border border-[var(--color-electric)]/30 hover:bg-[var(--color-electric)]/5 transition-all"
                            style={{
                                clipPath:
                                    "polygon(10px 0, 100% 0, calc(100% - 10px) 100%, 0 100%)",
                                color: "var(--color-electric)",
                            }}
                        >
                            GET STACC
                        </Link>
                        <Link
                            href="/downloads?product=nil-sdk"
                            className="px-8 py-4 font-bold text-sm tracking-[0.15em] border border-[var(--color-plasma)]/30 hover:bg-[var(--color-plasma)]/5 transition-all"
                            style={{
                                clipPath:
                                    "polygon(10px 0, 100% 0, calc(100% - 10px) 100%, 0 100%)",
                                color: "var(--color-plasma)",
                            }}
                        >
                            GET NIL
                        </Link>
                        <Link
                            href="/downloads?product=nil-stacc"
                            className="px-8 py-4 font-bold text-sm tracking-[0.15em] bg-[var(--color-ember)] text-[var(--color-void)] hover:brightness-110 transition-all"
                            style={{
                                clipPath:
                                    "polygon(10px 0, 100% 0, calc(100% - 10px) 100%, 0 100%)",
                            }}
                        >
                            GET NIL×STACC →
                        </Link>
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
                        <span>© 2026</span>
                    </div>
                </div>
            </footer>
        </main>
    );
}
