"use client";

import Link from "next/link";
import Nav from "@/components/Nav";

function ProductSection({
    id,
    name,
    tagColor,
    color,
    description,
    features,
    architecture,
    install,
}: {
    id: string;
    name: string;
    tagColor: string;
    color: string;
    description: string;
    features: string[];
    architecture: { layer: string; items: string }[];
    install: string;
}) {
    return (
        <section id={id} className="py-24 px-6 border-t border-white/5">
            <div className="max-w-5xl mx-auto">
                <div className="flex items-center gap-4 mb-8">
                    <div
                        className="w-4 h-4 rounded-full"
                        style={{ background: color }}
                    />
                    <span
                        className={`text-[10px] font-semibold tracking-widest uppercase px-3 py-1 rounded-full`}
                        style={{ background: color + "20", color }}
                    >
                        {tagColor}
                    </span>
                </div>

                <h2 className="font-[var(--font-display)] text-6xl md:text-8xl tracking-tight mb-6">
                    {name}
                </h2>
                <p className="text-[var(--color-mist)] text-xl max-w-2xl mb-16 leading-relaxed">
                    {description}
                </p>

                <div className="grid md:grid-cols-2 gap-12 mb-16">
                    <div>
                        <h3 className="text-sm font-semibold tracking-widest uppercase text-[var(--color-smoke)] mb-6">
                            Capabilities
                        </h3>
                        <div className="space-y-4">
                            {features.map((f) => (
                                <div key={f} className="flex items-start gap-3">
                                    <span
                                        className="mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0"
                                        style={{ background: color }}
                                    />
                                    <span className="text-[var(--color-ivory)]">
                                        {f}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div>
                        <h3 className="text-sm font-semibold tracking-widest uppercase text-[var(--color-smoke)] mb-6">
                            Architecture
                        </h3>
                        <div className="space-y-4">
                            {architecture.map((a) => (
                                <div
                                    key={a.layer}
                                    className="border-l-2 pl-4"
                                    style={{ borderColor: color + "40" }}
                                >
                                    <div className="text-sm font-semibold text-[var(--color-ivory)]">
                                        {a.layer}
                                    </div>
                                    <div className="text-xs text-[var(--color-smoke)] mt-1">
                                        {a.items}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="bg-[var(--color-ash)] border border-white/5 rounded-2xl p-6">
                    <div className="text-xs text-[var(--color-smoke)] mb-2 tracking-widest uppercase">
                        Install
                    </div>
                    <code className="font-[var(--font-mono)] text-sm text-[var(--color-mist)]">
                        $ {install}
                    </code>
                </div>
            </div>
        </section>
    );
}

export default function Products() {
    return (
        <main>
            <Nav />
            <section className="pt-32 pb-16 px-6">
                <div className="max-w-5xl mx-auto">
                    <h1 className="font-[var(--font-display)] text-6xl md:text-8xl tracking-tight">
                        Three products.
                        <br />
                        <span className="italic text-[var(--color-smoke)]">
                            One vision.
                        </span>
                    </h1>
                    <p className="text-[var(--color-mist)] text-xl mt-6 max-w-2xl">
                        Use them independently or together. Each is powerful
                        alone — unstoppable combined.
                    </p>
                </div>
            </section>

            <ProductSection
                id="stacc"
                name="stacc"
                tagColor="Robotics Platform"
                color="var(--color-ocean)"
                description="The universal robotics development platform. Define any robot, simulate with real physics, deploy to any hardware. Like CUDA for robotics."
                features={[
                    "MuJoCo 3D physics simulation with real-time viewer",
                    "Universal robot topology — serial chains, trees, humanoids",
                    "URDF/SDF parser — load any existing robot model",
                    "14 sensor types with live MuJoCo data streaming",
                    "A*, RRT*, Dijkstra, Potential Fields path planning",
                    "EKF-SLAM, Particle Filter, ICP scan matching",
                    "Computer vision — OpenCV, ONNX, ArUco, optical flow",
                    "Quintic, min-jerk, trapezoidal trajectory generation",
                    "Gymnasium-compatible RL environment wrapper",
                    "HAL for 17 microcontroller boards with SSH deploy",
                    "Behavior trees for autonomous task planning",
                    "8 gait patterns + CPG + flight controller",
                    "5 gripper types including dexterous hand",
                    "NLP command parsing with 25+ patterns",
                ]}
                architecture={[
                    {
                        layer: "Simulation",
                        items: "MuJoCo backend, MJCF builder, 3D viewer, Gym wrapper, world/terrain, recording",
                    },
                    {
                        layer: "Perception",
                        items: "EKF-SLAM, particle filter, ICP, occupancy mapping, 14 sensors, vision pipeline",
                    },
                    {
                        layer: "Planning",
                        items: "A*, RRT*, Dijkstra, potential fields, behavior trees, trajectory generation",
                    },
                    {
                        layer: "Control",
                        items: "PID, cascaded PID, NLP commands, gait generation, gripper control",
                    },
                    {
                        layer: "Hardware",
                        items: "GPIO, I2C, SPI, serial, PWM, 17 board definitions, SSH deploy, firmware upload",
                    },
                ]}
                install="bash install.sh --key YOUR_KEY --package stacc"
            />

            <ProductSection
                id="nil"
                name="NIL"
                tagColor="Agent SDK"
                color="var(--color-purple)"
                description="Self-evolving AI agents that get smarter every time they run. Persistent memory, skill extraction, drift detection, and cost optimization."
                features={[
                    "Persistent memory across sessions via SQLite",
                    "Automatic skill extraction from successful patterns",
                    "Drift detection — alerts when strategies stop working",
                    "Smart model routing — cheaper models when safe",
                    "Chain compression — eliminate redundant steps",
                    "Cost tracking — per-run token and cost accounting",
                    "Works with Claude, GPT, Llama, or any LLM",
                    "Zero infrastructure — runs on any laptop",
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
                ]}
                install="bash install.sh --key YOUR_KEY --package nil-sdk"
            />

            <ProductSection
                id="nil-stacc"
                name="NIL × STACC"
                tagColor="Full Stack"
                color="var(--color-ember)"
                description="The complete robotics intelligence stack. stacc robots controlled by self-improving NIL agents. The brain and the body, unified."
                features={[
                    "Auto-generates NIL tools from any stacc robot",
                    "Natural language robot control",
                    "Agents learn from every interaction",
                    "Pre-built domains: warehouse, inspection, research",
                    "Sim-to-real pipeline — train in MuJoCo, deploy to hardware",
                    "Fleet management for multiple robots",
                    "Safety governor constrains agent actions",
                    "Telemetry and usage analytics",
                ]}
                architecture={[
                    {
                        layer: "Bridge",
                        items: "Auto tool generation, serializers, compatibility layer",
                    },
                    {
                        layer: "Domains",
                        items: "Warehouse, inspection, research, assembly, exploration templates",
                    },
                    {
                        layer: "Exclusive",
                        items: "Sim training, digital twin, fleet manager, safety governor, telemetry",
                    },
                    {
                        layer: "Distribution",
                        items: "Installer, version manager, health check, feedback collector",
                    },
                ]}
                install="bash install.sh --key YOUR_KEY --package nil-stacc"
            />

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
                            href="/downloads"
                            className="hover:text-[var(--color-ivory)] transition-colors"
                        >
                            Downloads
                        </Link>
                        <span>© 2026</span>
                    </div>
                </div>
            </footer>
        </main>
    );
}
