"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
    ArrowRight,
    Boxes,
    Check,
    Code2,
    Cpu,
    Download,
    FileCode2,
    Layers,
    Lock,
    Palette,
    Play,
    Ruler,
    Timer,
    Wrench,
} from "lucide-react";
import Nav from "@/components/Nav";

// ─── A small RSS highlighter: comments, strings, numbers with units, keywords, properties ───
function highlightRss(source: string) {
    const token = /(\/\/[^\n]*)|("(?:[^"\\]|\\.)*")|(--[A-Za-z0-9_-]+)|(\b\d+(?:\.\d+)?(?:mm|cm|m\/s|m|kg|g|deg\/s|deg|rad\/s|rad|rpm|Nm|N|hz|khz)?\b)|(\b(?:robot|component|use|var)\b)|([A-Za-z_][\w-]*)(?=\s*:)|([#.][A-Za-z_][\w-]*)/g;
    const out: React.ReactNode[] = [];
    let last = 0;
    let m: RegExpExecArray | null;
    let key = 0;
    while ((m = token.exec(source))) {
        if (m.index > last) out.push(source.slice(last, m.index));
        const [text, comment, str, customProp, num, keyword, prop, selector] = m;
        const color = comment
            ? "text-[var(--color-smoke)] italic"
            : str
              ? "text-[var(--color-volt)]"
              : customProp
                ? "text-[var(--color-plasma)]"
                : num
                  ? "text-[var(--color-electric)]"
                  : keyword
                    ? "text-[var(--color-ember)] font-semibold"
                    : prop
                      ? "text-[var(--color-pearl)]"
                      : selector
                        ? "text-[var(--color-flame)]"
                        : "";
        out.push(
            <span key={key++} className={color}>
                {text}
            </span>,
        );
        last = m.index + text.length;
    }
    if (last < source.length) out.push(source.slice(last));
    return out;
}

function CodeWindow({ title, code, className = "" }: { title: string; code: string; className?: string }) {
    return (
        <div className={`bg-[var(--color-ink)] border border-white/10 overflow-hidden ${className}`}>
            <div className="flex items-center gap-2 px-4 py-2.5 border-b border-white/10 bg-[var(--color-ash)]">
                <div className="w-2.5 h-2.5 rounded-full bg-[var(--color-ember)]" />
                <div className="w-2.5 h-2.5 rounded-full bg-[var(--color-volt)]" />
                <div className="w-2.5 h-2.5 rounded-full bg-[var(--color-electric)]" />
                <span className="text-[10px] text-[var(--color-smoke)] ml-2 tracking-wider font-mono">{title}</span>
            </div>
            <pre className="p-5 font-mono text-[12.5px] leading-relaxed overflow-x-auto text-[var(--color-mist)]">
                <code>{highlightRss(code)}</code>
            </pre>
        </div>
    );
}

const WAREHOUSE_BOT = `robot warehouse_bot {
    chassis {
        shape: differential-drive;
        dimensions: [600mm, 450mm, 250mm];
    }

    sensors {
        lidar front  { model: rplidar-a2; range: 12m; fov: 360deg; }
        camera front { model: realsense-d455; }
    }

    actuators {
        wheel left  { motor: "BLDC-01"; radius: 120mm; }
        wheel right { motor: "BLDC-01"; radius: 120mm; }
    }
}`;

const STYLED = `robot styled_quadruped {
    body { shape: box; material: carbon_fiber; }

    leg front_left  { joints: 3; reach: 350mm; class: lead_leg; }
    leg front_right { joints: 3; reach: 350mm; }

    style {
        --primary: "#22252b";
        --warning: "#ff3b30";

        body           { color: var(--primary); }
        leg            { color: "#333333"; }
        #front_left    { color: var(--warning); }  // id beats type
        .lead_leg      { emission: "yellow"; }
        sensor[type="camera"] { color: "black"; }
        joint          { material: "steel"; }
    }
}`;

const MOTORS = `arm main {
    joints: 6;                  // six-joint serial chain
    reach: 900mm;               // split evenly across segments
    axes: [z, y, y, x, y, x];
    effort: 2.5Nm;              // stall torque
    speed: 300rpm;              // no-load speed
    limits: [-90deg, 45deg];
    damping: 0.1;
}

rotor front_left { thrust: 6N; radius: 64mm; spin: ccw; }`;

const EMBEDDED: Record<"python" | "cpp" | "rust", { file: string; code: string }> = {
    python: {
        file: "scout.py",
        code: `from stacc.rss import rss

ROBOT = rss("""<<<RSS>>>
robot scout {
    chassis { shape: differential-drive; }
    wheel front_left { radius: 60mm; }
}
<<</RSS>>>""")`,
    },
    cpp: {
        file: "arm_reach.cpp",
        code: `/* <<<RSS>>>
robot reach_arm {
    body { shape: box; dimensions: [200mm, 200mm, 80mm]; mass: 5kg; }
    arm main { joints: 3; axes: [z, y, y]; reach: 600mm; material: aluminum; }
}
<<</RSS>>> */

#include "stacc_runtime.hpp"

int main() {
    stacc::Runtime rt;
    rt.load_file(__FILE__);   // the daemon reads the RSS block above
    rt.start();
}`,
    },
    rust: {
        file: "quadruped_crouch.rs",
        code: `// <<<RSS>>>
// robot dog {
//     body { shape: box; dimensions: [500mm, 250mm, 120mm]; }
//     leg front_left { joints: 3; reach: 350mm; }
// }
// <<</RSS>>>

fn main() {
    let mut rt = stacc_runtime::Runtime::new("127.0.0.1", 8766);
    rt.load_file(file!()).expect("load robot");
}`,
    },
};

// One design.rss, used from three languages.
const IMPORTS: Record<"python" | "cpp" | "rust", { file: string; code: string; note: string }> = {
    python: {
        file: "controller.py",
        note: "After import stacc.rss, a .rss file imports like a module. importlib.reload picks up edits.",
        code: `import stacc.rss
from design import robot, joints, classes, components

print(robot.name, len(joints))
for j in classes.lead_leg.joints:      # every joint tagged class: lead_leg
    print(j.name, j.limits)

components["servo_leg"]                # {"joints": 3, "reach": 0.35, ...}`,
    },
    cpp: {
        file: "controller.cpp",
        note: "NELO Studio generates design.rss.hpp from design.rss and regenerates it on every change.",
        code: `#include "stacc_runtime.hpp"
#include "design.rss.hpp"              // generated from design.rss

int main() {
    stacc::Runtime rt;
    rt.load_file("design.rss");
    std::vector<double> cmd(design::joints::count);
    cmd[design::joints::leg_front_left_1_joint] = 0.4;
    for (auto j : design::classes::lead_leg) cmd[j] = 0.2;
}`,
    },
    rust: {
        file: "controller.rs",
        note: "Same names as Rust constants, in design.rss.rs. A misspelled joint is a compile error.",
        code: `#[path = "design.rss.rs"]
mod design;                            // generated from design.rss

fn main() {
    let mut rt = stacc_runtime::Runtime::new("127.0.0.1", 8766);
    rt.load_file("design.rss").expect("load robot");
    let mut cmd = vec![0.0; design::joints::COUNT];
    cmd[design::joints::LEG_FRONT_LEFT_1_JOINT] = 0.4;
    for j in design::classes::LEAD_LEG { cmd[j] = 0.2; }
}`,
    },
};

const OUTPUTS = [
    { name: "Live simulation", detail: "MuJoCo physics in NELO Studio, reloaded as you type", pro: false, icon: Play },
    { name: "URDF", detail: "The ROS standard; colors carried as flat color", pro: false, icon: FileCode2 },
    { name: "SDF / Gazebo", detail: "With real PBR materials (metal, roughness)", pro: false, icon: FileCode2 },
    { name: "MJCF", detail: "MuJoCo's native format, with real material assets", pro: false, icon: FileCode2 },
    { name: "ROS 2 package", detail: "package.xml, CMakeLists, URDF, controllers.yaml, launch file", pro: true, icon: Boxes },
    { name: "Bill of materials", detail: "bom.csv + bom.md: every part, motor and sensor you named", pro: true, icon: Wrench },
];

const SELECTORS = [
    { sel: "leg", what: "Element type", note: "every segment of every leg" },
    { sel: "#front_left", what: "Id", note: "one labeled limb, all its segments" },
    { sel: ".lead_leg", what: "Class", note: "anything declared class: lead_leg;" },
    { sel: 'sensor[type="lidar"]', what: "Attribute", note: "sensors by kind or metadata" },
    { sel: "var(--accent)", what: "Variable", note: "an undeclared one is a compile error" },
];

const LIMBS = [
    { limb: "leg", mount: "Under the body, at the corner its label names", grows: "down" },
    { limb: "wheel", mount: "On the named side, axle along Y", grows: "continuous joint" },
    { limb: "rotor", mount: "On top, at a corner", grows: "thrust actuator" },
    { limb: "arm / head", mount: "On top, offset by left / right / front / rear", grows: "up" },
    { limb: "gripper", mount: "At the tip of the matching arm", grows: "up" },
];

const SHM = [
    { lang: "C++", rate: "938", rtt: "1.06 ms / 1.23 ms" },
    { lang: "Rust", rate: "938", rtt: "1.06 ms / 1.26 ms" },
    { lang: "Python (separate process)", rate: "937", rtt: "1.06 ms / 1.27 ms" },
];

const LIMITS = [
    "Multi-joint limbs are straight serial chains — no closed loops or parallel linkages yet.",
    "Geometry is boxes, cylinders, spheres and meshes — no fillets, holes or CSG (that needs a CAD kernel).",
    "Sensor model names (rplidar-a2, realsense-d455) are kept as metadata; only the kind (lidar, camera, imu) picks a driver.",
    "The bill of materials lists exactly what you wrote — it's a shopping list, not a priced quote.",
];

const clip = "polygon(8px 0, 100% 0, calc(100% - 8px) 100%, 0 100%)";
const cardClip = "polygon(0 0, calc(100% - 12px) 0, 100% 12px, 100% 100%, 12px 100%, 0 calc(100% - 12px))";

export default function RssPage() {
    const [lang, setLang] = useState<keyof typeof EMBEDDED>("python");
    const [importLang, setImportLang] = useState<keyof typeof IMPORTS>("python");

    return (
        <div className="relative min-h-screen bg-[var(--color-void)] text-[var(--color-ivory)] overflow-hidden font-sans">
            <Nav />

            <div className="absolute top-[8%] right-[5%] w-[550px] h-[550px] bg-[var(--color-volt)]/[0.035] rounded-full blur-[170px] pointer-events-none" />
            <div className="absolute top-[40%] left-[3%] w-[600px] h-[600px] bg-[var(--color-ember)]/[0.035] rounded-full blur-[190px] pointer-events-none" />

            {/* ═══ HERO ═══ */}
            <section className="pt-36 pb-16 px-6 relative z-10 border-b border-white/5">
                <div className="max-w-6xl 2xl:max-w-[1600px] mx-auto">
                    <div className="flex flex-wrap items-center gap-3">
                        <Link href="/products" className="text-[10px] font-mono text-[var(--color-mist)] hover:text-white">
                            PRODUCTS /
                        </Link>
                        <span className="text-[10px] font-bold tracking-[0.25em] text-[var(--color-volt)] border border-[var(--color-volt)]/30 bg-[var(--color-volt)]/5 px-3.5 py-1.5 uppercase font-mono">
                            THE LANGUAGE NELO IS BUILT ON
                        </span>
                    </div>

                    <div className="grid lg:grid-cols-2 gap-10 lg:gap-14 items-center mt-6">
                        <div>
                            <h1 className="font-[var(--font-display)] text-7xl sm:text-8xl md:text-9xl tracking-wider leading-[0.85]">
                                <span className="text-[var(--color-ember)] text-glow">RSS</span>
                                <span className="block text-4xl sm:text-5xl md:text-6xl mt-3 text-white">ROBOT STYLE SHEETS</span>
                            </h1>
                            <p className="text-[var(--color-mist)] text-base sm:text-lg mt-6 max-w-xl leading-relaxed">
                                Describe a robot the way you style a web page. A few readable blocks — body, limbs, sensors, look — compile into a real robot you can{" "}
                                <strong className="text-white">simulate live</strong>, export to{" "}
                                <strong className="text-white">URDF, SDF and MJCF</strong>, and turn into a{" "}
                                <strong className="text-white">ROS 2 package</strong>.
                            </p>
                            <div className="flex flex-wrap gap-4 mt-8">
                                <Link
                                    href="/downloads"
                                    className="bg-[var(--color-ember)] hover:brightness-110 text-[var(--color-void)] px-7 py-3.5 font-bold text-xs tracking-wider flex items-center gap-2 transition-all"
                                    style={{ clipPath: clip }}
                                >
                                    <Download className="w-4 h-4" />
                                    <span>WRITE RSS IN NELO STUDIO</span>
                                </Link>
                                <a
                                    href="#outputs"
                                    className="bg-[var(--color-ash)] hover:bg-white/10 text-white border border-white/10 px-7 py-3.5 font-bold text-xs tracking-wider flex items-center gap-2 transition-all"
                                    style={{ clipPath: clip }}
                                >
                                    <span>WHAT ONE FILE GIVES YOU</span>
                                    <ArrowRight className="w-4 h-4" />
                                </a>
                            </div>
                        </div>

                        <CodeWindow title="warehouse_bot.rss" code={WAREHOUSE_BOT} />
                    </div>
                </div>
            </section>

            {/* ═══ THREE IDEAS ═══ */}
            <section className="py-20 px-6 relative z-10 border-b border-white/5">
                <div className="max-w-6xl 2xl:max-w-[1600px] mx-auto grid md:grid-cols-3 gap-6">
                    {[
                        {
                            icon: Layers,
                            color: "var(--color-ember)",
                            title: "Structure, not XML",
                            body: "Say arm main { joints: 6; reach: 900mm; } and get six links and six revolute joints, mounted where an arm belongs. No transforms by hand.",
                        },
                        {
                            icon: Ruler,
                            color: "var(--color-electric)",
                            title: "Units you think in",
                            body: "650mm, 12m, 360deg, 2.5Nm, 300rpm. Lengths, masses and angles are normalized to SI when it compiles, so the file reads like a spec sheet.",
                        },
                        {
                            icon: Palette,
                            color: "var(--color-volt)",
                            title: "Styled like CSS",
                            body: "Selectors, classes, variables and a real cascade for color and materials — and the materials flow into the simulator and Gazebo.",
                        },
                    ].map(({ icon: Icon, color, title, body }) => (
                        <div key={title} className="bg-[var(--color-ash)] border border-white/10 p-6 space-y-3" style={{ clipPath: cardClip }}>
                            <Icon className="w-6 h-6" style={{ color }} />
                            <h3 className="font-[var(--font-display)] text-2xl tracking-wider">{title}</h3>
                            <p className="text-sm text-[var(--color-mist)] leading-relaxed">{body}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* ═══ OUTPUTS ═══ */}
            <section id="outputs" className="py-20 px-6 relative z-10 border-b border-white/5 scroll-mt-20">
                <div className="max-w-6xl 2xl:max-w-[1600px] mx-auto">
                    <span className="text-[10px] font-bold tracking-[0.25em] text-[var(--color-electric)] uppercase font-mono">ONE FILE IN</span>
                    <h2 className="font-[var(--font-display)] text-5xl sm:text-6xl tracking-wider mt-2">EVERY FORMAT OUT</h2>
                    <p className="text-sm text-[var(--color-mist)] mt-2 max-w-2xl">
                        RSS compiles to a real robot model; the standard formats and the simulator are generated from it, so they never drift apart.
                    </p>

                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-10">
                        {OUTPUTS.map(({ name, detail, pro, icon: Icon }) => (
                            <div key={name} className="bg-[var(--color-ash)] border border-white/10 p-5 flex items-start gap-4">
                                <div className="w-10 h-10 shrink-0 flex items-center justify-center bg-white/5 border border-white/10">
                                    <Icon className="w-5 h-5 text-[var(--color-electric)]" />
                                </div>
                                <div className="min-w-0">
                                    <div className="flex items-center gap-2 flex-wrap">
                                        <h3 className="font-bold text-sm tracking-wide text-white">{name}</h3>
                                        {pro && (
                                            <span className="text-[9px] font-mono font-bold tracking-widest px-1.5 py-0.5 bg-[var(--color-ember)]/15 text-[var(--color-ember)] border border-[var(--color-ember)]/40 flex items-center gap-1">
                                                <Lock className="w-2.5 h-2.5" /> PRO
                                            </span>
                                        )}
                                    </div>
                                    <p className="text-xs text-[var(--color-mist)] mt-1 leading-relaxed">{detail}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                    <p className="text-[11px] text-[var(--color-smoke)] mt-4">
                        PRO exports are free for the first 14 days, then part of the $10 early-access license.{" "}
                        <Link href="/downloads" className="underline hover:text-white">
                            Pricing
                        </Link>
                    </p>
                </div>
            </section>

            {/* ═══ STYLING ═══ */}
            <section className="py-20 px-6 relative z-10 border-b border-white/5">
                <div className="max-w-6xl 2xl:max-w-[1600px] mx-auto grid lg:grid-cols-2 gap-10 items-start">
                    <div>
                        <span className="text-[10px] font-bold tracking-[0.25em] text-[var(--color-volt)] uppercase font-mono">SELECTORS · VARIABLES · CASCADE</span>
                        <h2 className="font-[var(--font-display)] text-5xl sm:text-6xl tracking-wider mt-2">IT REALLY IS CSS</h2>
                        <p className="text-sm text-[var(--color-mist)] mt-3 leading-relaxed">
                            When several rules match the same part, the most specific wins — <span className="font-mono text-white">#id</span> beats{" "}
                            <span className="font-mono text-white">.class</span> and <span className="font-mono text-white">[attr]</span>, which beat a bare type — and among equals the later rule wins. Material presets
                            like <span className="font-mono text-white">aluminum</span>, <span className="font-mono text-white">carbon_fiber</span> or{" "}
                            <span className="font-mono text-white">rubber</span> set real color, metallic and roughness.
                        </p>
                        <div className="mt-8 divide-y divide-white/5 border border-white/10 bg-[var(--color-ash)]">
                            {SELECTORS.map(({ sel, what, note }) => (
                                <div key={sel} className="grid grid-cols-[minmax(0,10rem)_1fr] gap-4 px-4 py-3 text-xs">
                                    <span className="font-mono text-[var(--color-flame)] break-all">{sel}</span>
                                    <span className="text-[var(--color-mist)]">
                                        <strong className="text-white font-semibold">{what}</strong> — {note}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                    <CodeWindow title="styled_quadruped.rss" code={STYLED} />
                </div>
            </section>

            {/* ═══ LIMBS & MOTORS ═══ */}
            <section className="py-20 px-6 relative z-10 border-b border-white/5">
                <div className="max-w-6xl 2xl:max-w-[1600px] mx-auto grid lg:grid-cols-2 gap-10 items-start">
                    <CodeWindow title="limbs and motors" code={MOTORS} className="order-2 lg:order-1" />
                    <div className="order-1 lg:order-2">
                        <span className="text-[10px] font-bold tracking-[0.25em] text-[var(--color-ember)] uppercase font-mono">LIMBS · JOINTS · MOTORS</span>
                        <h2 className="font-[var(--font-display)] text-5xl sm:text-6xl tracking-wider mt-2">PARTS GO WHERE THEY BELONG</h2>
                        <p className="text-sm text-[var(--color-mist)] mt-3 leading-relaxed">
                            A limb&apos;s label places it: <span className="font-mono text-white">leg front_left</span> mounts under the front-left corner. Joints pivot at the end of each segment, like real hardware, with ROS axes
                            (+X forward, +Y left). Give a joint both <span className="font-mono text-white">effort</span> and <span className="font-mono text-white">speed</span> and it behaves like a DC motor — torque falls with
                            speed, so a wheel settles at a top speed instead of accelerating forever.
                        </p>
                        <div className="mt-8 border border-white/10 bg-[var(--color-ash)] divide-y divide-white/5">
                            {LIMBS.map(({ limb, mount, grows }) => (
                                <div key={limb} className="grid grid-cols-[6.5rem_1fr] gap-3 px-4 py-3 text-xs">
                                    <span className="font-mono text-[var(--color-electric)]">{limb}</span>
                                    <span className="text-[var(--color-mist)]">
                                        {mount} <span className="text-[var(--color-smoke)]">· {grows}</span>
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* ═══ EMBEDDED ═══ */}
            <section className="py-20 px-6 relative z-10 border-b border-white/5">
                <div className="max-w-6xl 2xl:max-w-[1600px] mx-auto grid lg:grid-cols-2 gap-10 items-start">
                    <div>
                        <span className="text-[10px] font-bold tracking-[0.25em] text-[var(--color-plasma)] uppercase font-mono">PYTHON · C++ · RUST</span>
                        <h2 className="font-[var(--font-display)] text-5xl sm:text-6xl tracking-wider mt-2">THE ROBOT LIVES IN YOUR CODE</h2>
                        <p className="text-sm text-[var(--color-mist)] mt-3 leading-relaxed">
                            Put the description between <span className="font-mono text-white">&lt;&lt;&lt;RSS&gt;&gt;&gt;</span> markers inside a comment or string, and the body and the behaviour ship as one file. Compile errors
                            point at the line and column of your source file. NELO Studio spots the block and runs the program with the STACC SDK on its path.
                        </p>
                        <ul className="mt-6 space-y-2.5">
                            {[
                                "One file to review, version and hand to a teammate",
                                "Several blocks per file — a component library and a robot",
                                "Comment leaders (#, //, *) are stripped for you",
                            ].map((item) => (
                                <li key={item} className="flex items-start gap-2 text-sm text-[var(--color-mist)]">
                                    <Check className="w-4 h-4 mt-0.5 shrink-0 text-[var(--color-plasma)]" />
                                    <span>{item}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div>
                        <div className="flex gap-2 mb-3">
                            {(Object.keys(EMBEDDED) as Array<keyof typeof EMBEDDED>).map((id) => (
                                <button
                                    key={id}
                                    onClick={() => setLang(id)}
                                    className={`px-4 py-1.5 text-xs font-bold tracking-wider uppercase cursor-pointer transition-all ${
                                        lang === id ? "bg-[var(--color-plasma)] text-[var(--color-void)]" : "bg-white/5 text-[var(--color-mist)] hover:text-white"
                                    }`}
                                >
                                    {id === "cpp" ? "C++" : id}
                                </button>
                            ))}
                        </div>
                        <CodeWindow title={EMBEDDED[lang].file} code={EMBEDDED[lang].code} />
                    </div>
                </div>
            </section>

            {/* ═══ ONE FILE, EVERY LANGUAGE ═══ */}
            <section className="py-20 px-6 relative z-10 border-b border-white/5">
                <div className="max-w-6xl 2xl:max-w-[1600px] mx-auto grid lg:grid-cols-2 gap-10 items-start">
                    <div>
                        <span className="text-[10px] font-bold tracking-[0.25em] text-[var(--color-volt)] uppercase font-mono">DESIGN.RSS → PYTHON · C++ · RUST</span>
                        <h2 className="font-[var(--font-display)] text-5xl sm:text-6xl tracking-wider mt-2">IMPORT YOUR ROBOT</h2>
                        <p className="text-sm text-[var(--color-mist)] mt-3 leading-relaxed">
                            Or keep the robot in its own <span className="font-mono text-white">design.rss</span> and import it. Its robot, joints, links, components and{" "}
                            <span className="font-mono text-white">class:</span> groups arrive as names in your code. Joint indices follow the simulator&apos;s order, so they index command arrays
                            directly.
                        </p>
                        <ul className="mt-6 space-y-2.5">
                            {[
                                "Open the controller and the 3D view follows design.rss, live",
                                "Edit design.rss anywhere — the view and the generated C++ / Rust names update",
                                "Shared parts across files: use \"parts.rss:servo_leg\";",
                            ].map((item) => (
                                <li key={item} className="flex items-start gap-2 text-sm text-[var(--color-mist)]">
                                    <Check className="w-4 h-4 mt-0.5 shrink-0 text-[var(--color-volt)]" />
                                    <span>{item}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div>
                        <div className="flex gap-2 mb-3">
                            {(Object.keys(IMPORTS) as Array<keyof typeof IMPORTS>).map((id) => (
                                <button
                                    key={id}
                                    onClick={() => setImportLang(id)}
                                    className={`px-4 py-1.5 text-xs font-bold tracking-wider uppercase cursor-pointer transition-all ${
                                        importLang === id ? "bg-[var(--color-volt)] text-[var(--color-void)]" : "bg-white/5 text-[var(--color-mist)] hover:text-white"
                                    }`}
                                >
                                    {id === "cpp" ? "C++" : id}
                                </button>
                            ))}
                        </div>
                        <CodeWindow title={IMPORTS[importLang].file} code={IMPORTS[importLang].code} />
                        <p className="text-[11px] text-[var(--color-smoke)] mt-3">{IMPORTS[importLang].note}</p>
                    </div>
                </div>
            </section>

            {/* ═══ REAL-TIME ═══ */}
            <section className="py-20 px-6 relative z-10 border-b border-white/5">
                <div className="max-w-6xl 2xl:max-w-[1600px] mx-auto">
                    <div className="grid lg:grid-cols-2 gap-10 items-end">
                        <div>
                            <span className="text-[10px] font-bold tracking-[0.25em] text-[var(--color-electric)] uppercase font-mono">FROM DESCRIPTION TO CONTROL LOOP</span>
                            <h2 className="font-[var(--font-display)] text-5xl sm:text-6xl tracking-wider mt-2">CLOSE THE LOOP AT 1 kHz</h2>
                            <p className="text-sm text-[var(--color-mist)] mt-3 leading-relaxed">
                                Once your robot is loaded, a controller in C++, Rust or Python talks to the simulator through shared memory — no sockets, no JSON per step. In{" "}
                                <span className="font-mono text-white">lockstep</span> mode the simulator waits for your answer to every step, so the same controller produces the same trajectory, bit for bit.
                            </p>
                        </div>
                        <div className="flex items-center gap-3 text-xs text-[var(--color-mist)]">
                            <Timer className="w-5 h-5 text-[var(--color-electric)] shrink-0" />
                            <span>Measured on our development machine, Python runtime at a 1000 Hz target. Every language hits the runtime&apos;s own ~940 Hz loop rate.</span>
                        </div>
                    </div>

                    <div className="mt-8 overflow-x-auto">
                        <table className="w-full min-w-[480px] text-left border border-white/10 bg-[var(--color-ash)]">
                            <thead>
                                <tr className="border-b border-white/10 text-[10px] font-mono tracking-widest text-[var(--color-smoke)] uppercase">
                                    <th className="px-4 py-3 font-normal">Controller (lockstep)</th>
                                    <th className="px-4 py-3 font-normal">Closed-loop steps/s</th>
                                    <th className="px-4 py-3 font-normal">Round trip median / p99</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-white/5 text-sm">
                                {SHM.map(({ lang: l, rate, rtt }) => (
                                    <tr key={l}>
                                        <td className="px-4 py-3 text-white">{l}</td>
                                        <td className="px-4 py-3 font-mono text-[var(--color-electric)]">{rate}</td>
                                        <td className="px-4 py-3 font-mono text-[var(--color-mist)]">{rtt}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </section>

            {/* ═══ HONEST LIMITS ═══ */}
            <section className="py-20 px-6 relative z-10 border-b border-white/5">
                <div className="max-w-6xl 2xl:max-w-[1600px] mx-auto grid lg:grid-cols-[1fr_1.4fr] gap-10">
                    <div>
                        <span className="text-[10px] font-bold tracking-[0.25em] text-[var(--color-mist)] uppercase font-mono">WHAT RSS DOESN&apos;T DO YET</span>
                        <h2 className="font-[var(--font-display)] text-5xl tracking-wider mt-2">KNOWN LIMITS</h2>
                        <p className="text-sm text-[var(--color-mist)] mt-3 leading-relaxed">
                            RSS tells you when it can&apos;t do something instead of faking it. Anything it doesn&apos;t understand is kept and reported as a warning — never silently dropped.
                        </p>
                    </div>
                    <ul className="space-y-3">
                        {LIMITS.map((item) => (
                            <li key={item} className="flex items-start gap-3 p-4 bg-[var(--color-ash)]/60 border border-white/10 border-dashed text-sm text-[var(--color-mist)]">
                                <Cpu className="w-4 h-4 mt-0.5 shrink-0 text-[var(--color-smoke)]" />
                                <span>{item}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            </section>

            {/* ═══ CTA ═══ */}
            <section className="py-24 px-6 relative z-10">
                <div className="max-w-4xl mx-auto text-center space-y-6">
                    <Code2 className="w-10 h-10 mx-auto text-[var(--color-ember)]" />
                    <h2 className="font-[var(--font-display)] text-5xl sm:text-6xl tracking-wider">
                        WRITE YOUR FIRST <span className="text-[var(--color-ember)] text-glow">ROBOT</span>
                    </h2>
                    <p className="text-sm text-[var(--color-mist)] max-w-xl mx-auto">
                        NELO Studio ships with example robots — an arm, a quadruped, a drone and a warehouse rover — ready to open, edit and simulate.
                    </p>
                    <div className="flex flex-wrap justify-center gap-4 pt-2">
                        <Link
                            href="/downloads"
                            className="bg-[var(--color-ember)] hover:brightness-110 text-[var(--color-void)] px-8 py-4 font-bold text-xs tracking-wider flex items-center gap-2 transition-all"
                            style={{ clipPath: clip }}
                        >
                            <Download className="w-4 h-4" />
                            <span>DOWNLOAD NELO STUDIO</span>
                        </Link>
                        <Link
                            href="/products#nelo-studio"
                            className="bg-[var(--color-ash)] hover:bg-white/10 text-white border border-white/10 px-8 py-4 font-bold text-xs tracking-wider flex items-center gap-2 transition-all"
                            style={{ clipPath: clip }}
                        >
                            <span>SEE NELO STUDIO</span>
                            <ArrowRight className="w-4 h-4" />
                        </Link>
                    </div>
                </div>
            </section>

            <footer className="border-t border-white/5 py-12 px-6 relative z-10">
                <div className="max-w-6xl 2xl:max-w-[1600px] mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
                    <div className="flex items-center gap-3">
                        <Image src="/logo.png" alt="Nelo" width={24} height={24} className="rounded-lg" />
                        <span className="font-[var(--font-display)] text-sm tracking-[0.2em]">NELO ROBOTICS PVT LTD</span>
                    </div>
                    <div className="flex flex-wrap justify-center items-center gap-x-8 gap-y-2 text-xs text-[var(--color-smoke)] tracking-wider">
                        <Link href="/" className="hover:text-[var(--color-ember)] transition-colors">HOME</Link>
                        <Link href="/products" className="hover:text-[var(--color-ember)] transition-colors">PRODUCTS</Link>
                        <Link href="/products/rss" className="hover:text-[var(--color-ember)] transition-colors">RSS</Link>
                        <Link href="/downloads" className="hover:text-[var(--color-ember)] transition-colors">DOWNLOADS</Link>
                        <Link href="/usecases" className="hover:text-[var(--color-ember)] transition-colors">USE CASES</Link>
                        <span>© 2026</span>
                    </div>
                </div>
            </footer>
        </div>
    );
}
