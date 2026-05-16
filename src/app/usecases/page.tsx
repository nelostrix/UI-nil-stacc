"use client";

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
                        className="hover:text-[var(--color-ivory)] transition-colors"
                    >
                        Downloads
                    </Link>
                    <Link
                        href="/usecases"
                        className="text-[var(--color-ivory)]"
                    >
                        Use Cases
                    </Link>
                    <Link
                        href="/downloads"
                        className="bg-[var(--color-ember)] text-[var(--color-ink)] px-4 py-2 rounded-full text-sm font-medium"
                    >
                        Get Started
                    </Link>
                </div>
            </div>
        </nav>
    );
}

function RobotIcon({ type }: { type: string }) {
    const icons: Record<string, JSX.Element> = {
        arm: (
            <svg viewBox="0 0 80 80" className="w-full h-full">
                <g
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                >
                    <rect x="30" y="55" width="20" height="15" rx="3" />
                    <line x1="40" y1="55" x2="40" y2="40" />
                    <line x1="40" y1="40" x2="55" y2="25" />
                    <line x1="55" y1="25" x2="65" y2="15" />
                    <circle cx="40" cy="40" r="3" fill="currentColor" />
                    <circle cx="55" cy="25" r="3" fill="currentColor" />
                    <circle cx="65" cy="15" r="2" fill="currentColor" />
                    <line x1="63" y1="13" x2="68" y2="10" />
                    <line x1="63" y1="17" x2="68" y2="20" />
                </g>
            </svg>
        ),
        rover: (
            <svg viewBox="0 0 80 80" className="w-full h-full">
                <g
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                >
                    <rect x="15" y="30" width="50" height="25" rx="5" />
                    <circle cx="25" cy="60" r="7" />
                    <circle cx="55" cy="60" r="7" />
                    <line x1="30" y1="30" x2="35" y2="18" />
                    <circle cx="35" cy="15" r="4" />
                    <rect
                        x="20"
                        y="35"
                        width="8"
                        height="5"
                        rx="1"
                        opacity="0.5"
                    />
                    <rect
                        x="52"
                        y="35"
                        width="8"
                        height="5"
                        rx="1"
                        opacity="0.5"
                    />
                </g>
            </svg>
        ),
        drone: (
            <svg viewBox="0 0 80 80" className="w-full h-full">
                <g
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                >
                    <rect x="30" y="35" width="20" height="12" rx="3" />
                    <line x1="30" y1="40" x2="15" y2="32" />
                    <line x1="50" y1="40" x2="65" y2="32" />
                    <line x1="30" y1="42" x2="15" y2="50" />
                    <line x1="50" y1="42" x2="65" y2="50" />
                    <circle cx="15" cy="32" r="8" strokeDasharray="3 2" />
                    <circle cx="65" cy="32" r="8" strokeDasharray="3 2" />
                    <circle cx="15" cy="50" r="8" strokeDasharray="3 2" />
                    <circle cx="65" cy="50" r="8" strokeDasharray="3 2" />
                </g>
            </svg>
        ),
        humanoid: (
            <svg viewBox="0 0 80 80" className="w-full h-full">
                <g
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                >
                    <circle cx="40" cy="15" r="8" />
                    <circle cx="37" cy="13" r="2" fill="currentColor" />
                    <circle cx="43" cy="13" r="2" fill="currentColor" />
                    <line x1="40" y1="23" x2="40" y2="48" />
                    <rect x="32" y="28" width="16" height="20" rx="4" />
                    <line x1="32" y1="33" x2="18" y2="42" />
                    <line x1="48" y1="33" x2="62" y2="42" />
                    <line x1="36" y1="48" x2="30" y2="68" />
                    <line x1="44" y1="48" x2="50" y2="68" />
                </g>
            </svg>
        ),
        warehouse: (
            <svg viewBox="0 0 80 80" className="w-full h-full">
                <g
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                >
                    <rect x="10" y="50" width="60" height="20" rx="3" />
                    <circle cx="22" cy="73" r="5" />
                    <circle cx="58" cy="73" r="5" />
                    <rect
                        x="20"
                        y="20"
                        width="40"
                        height="30"
                        rx="2"
                        strokeDasharray="4 2"
                    />
                    <rect
                        x="25"
                        y="25"
                        width="12"
                        height="10"
                        rx="1"
                        opacity="0.5"
                    />
                    <rect
                        x="42"
                        y="25"
                        width="12"
                        height="10"
                        rx="1"
                        opacity="0.5"
                    />
                    <line x1="40" y1="55" x2="40" y2="65" />
                </g>
            </svg>
        ),
        lab: (
            <svg viewBox="0 0 80 80" className="w-full h-full">
                <g
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                >
                    <rect x="25" y="10" width="30" height="40" rx="5" />
                    <circle cx="35" cy="25" r="4" fill="currentColor" />
                    <circle cx="45" cy="25" r="4" fill="currentColor" />
                    <line x1="35" y1="35" x2="45" y2="35" />
                    <line x1="25" y1="50" x2="15" y2="65" />
                    <line x1="55" y1="50" x2="65" y2="65" />
                    <rect
                        x="20"
                        y="55"
                        width="40"
                        height="3"
                        rx="1"
                        opacity="0.3"
                    />
                    <line x1="40" y1="10" x2="40" y2="3" />
                    <circle cx="40" cy="3" r="2" fill="currentColor" />
                </g>
            </svg>
        ),
    };
    return icons[type] || null;
}

export default function UseCases() {
    const cases = [
        {
            icon: "arm",
            title: "Manufacturing & Assembly",
            subtitle: "Pick-and-place, welding, quality inspection",
            description:
                "Define a 6-DOF arm in stacc, simulate pick-and-place sequences in MuJoCo, train with reinforcement learning, deploy to real hardware. NIL agents learn optimal grasp strategies from 10 demonstrations instead of 10,000.",
            metrics: [
                "10x faster setup",
                "90% fewer demos needed",
                "Sub-mm precision",
            ],
            color: "var(--color-ocean)",
            products: ["stacc", "nil-stacc"],
        },
        {
            icon: "rover",
            title: "Autonomous Navigation",
            subtitle: "Warehouses, outdoor terrain, Mars",
            description:
                "LiDAR + SLAM + A* path planning in stacc, with NIL agents that learn optimal routes over time. Navigate warehouse floors, construction sites, or planetary surfaces. Self-improving obstacle avoidance.",
            metrics: ["14 sensor types", "5 path planners", "Real-time SLAM"],
            color: "var(--color-ember)",
            products: ["stacc", "nil-stacc"],
        },
        {
            icon: "drone",
            title: "Aerial Robotics",
            subtitle: "Inspection, mapping, delivery",
            description:
                "Flight controller with motor mixing for any multirotor. CPG-based gait generation. Simulate in MuJoCo before flying. HAL supports ESP32 and STM32 flight controllers out of the box.",
            metrics: [
                "Any multirotor config",
                "Attitude control",
                "8 gait patterns",
            ],
            color: "var(--color-volt)",
            products: ["stacc"],
        },
        {
            icon: "humanoid",
            title: "Humanoid Research",
            subtitle: "Walking, manipulation, human interaction",
            description:
                "Universal robot topology handles any kinematic tree — 2-joint arm to 50-joint humanoid. Branching structures, free-floating bases, any morphology. Gym wrapper for RL training with Stable Baselines3.",
            metrics: ["Any topology", "Gym compatible", "Behavior trees"],
            color: "var(--color-purple)",
            products: ["stacc"],
        },
        {
            icon: "warehouse",
            title: "Smart Warehousing",
            subtitle: "Fleet coordination, inventory management",
            description:
                "Pre-built warehouse_agent domain in nil-stacc. Multiple AGVs coordinated by NIL agents that optimize pick routes, avoid congestion, and learn from shift patterns. Integrates with existing WMS.",
            metrics: [
                "Fleet management",
                "Route optimization",
                "Self-improving",
            ],
            color: "var(--color-ember)",
            products: ["nil-stacc"],
        },
        {
            icon: "lab",
            title: "Research & Education",
            subtitle: "Universities, labs, competitions",
            description:
                "From first-year undergrads building line followers to PhD students running SLAM experiments. 116 tests, comprehensive docs, and the fastest path from idea to working robot.",
            metrics: ["116 tests passing", "6 templates", "Full documentation"],
            color: "var(--color-ocean)",
            products: ["stacc"],
        },
    ];

    return (
        <main>
            <Nav />

            <section className="pt-32 pb-16 px-6">
                <div className="max-w-5xl mx-auto">
                    <span className="bg-[var(--color-volt)] text-[var(--color-ink)] text-[10px] font-semibold tracking-widest uppercase px-3 py-1 rounded-full">
                        Use Cases
                    </span>
                    <h1 className="font-[var(--font-display)] text-6xl md:text-8xl tracking-tight mt-6">
                        Built for
                        <br />
                        <span className="italic text-[var(--color-smoke)]">
                            real robots.
                        </span>
                    </h1>
                    <p className="text-[var(--color-mist)] text-xl mt-6 max-w-2xl">
                        From warehouse AGVs to Mars rovers. From research labs
                        to factory floors.
                    </p>
                </div>
            </section>

            <section className="py-16 px-6">
                <div className="max-w-5xl mx-auto space-y-6">
                    {cases.map((c, i) => (
                        <div
                            key={c.title}
                            className="group bg-[var(--color-ash)] border border-white/5 rounded-3xl p-8 md:p-10 hover:border-white/10 transition-all duration-500 animate-fade-up relative overflow-hidden"
                            style={{
                                animationDelay: `${i * 0.1}s`,
                                opacity: 0,
                            }}
                        >
                            <div
                                className="absolute -top-10 -right-10 w-40 h-40 rounded-full blur-[80px] opacity-0 group-hover:opacity-10 transition-opacity duration-700"
                                style={{ background: c.color }}
                            />

                            <div className="grid md:grid-cols-[auto_1fr] gap-8">
                                {/* Robot illustration */}
                                <div
                                    className="w-24 h-24 text-[var(--color-mist)] opacity-30 group-hover:opacity-60 transition-opacity"
                                    style={{ color: c.color }}
                                >
                                    <RobotIcon type={c.icon} />
                                </div>

                                <div>
                                    <div className="flex flex-wrap items-center gap-3 mb-3">
                                        <h3 className="font-[var(--font-display)] text-2xl md:text-3xl">
                                            {c.title}
                                        </h3>
                                        {c.products.map((p) => (
                                            <span
                                                key={p}
                                                className="text-[9px] font-semibold tracking-widest uppercase px-2 py-0.5 rounded-full border border-white/10 text-[var(--color-smoke)]"
                                            >
                                                {p}
                                            </span>
                                        ))}
                                    </div>
                                    <p className="text-[var(--color-ember)] text-sm mb-3">
                                        {c.subtitle}
                                    </p>
                                    <p className="text-[var(--color-smoke)] text-sm leading-relaxed mb-6 max-w-2xl">
                                        {c.description}
                                    </p>

                                    <div className="flex flex-wrap gap-4">
                                        {c.metrics.map((m) => (
                                            <span
                                                key={m}
                                                className="text-xs text-[var(--color-mist)] bg-[var(--color-ink)] px-3 py-1.5 rounded-full border border-white/5"
                                            >
                                                {m}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            <section className="py-24 px-6 border-t border-white/5">
                <div className="max-w-3xl mx-auto text-center">
                    <h2 className="font-[var(--font-display)] text-4xl md:text-5xl tracking-tight mb-6">
                        What will <span className="italic">you</span> build?
                    </h2>
                    <p className="text-[var(--color-mist)] mb-10">
                        stacc supports any robot topology. If you can imagine
                        it, you can simulate it.
                    </p>
                    <Link
                        href="/downloads"
                        className="bg-[var(--color-ember)] text-[var(--color-ink)] px-8 py-4 rounded-full font-semibold text-lg hover:brightness-110 hover:scale-105 transition-all inline-block"
                    >
                        Start Building →
                    </Link>
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
