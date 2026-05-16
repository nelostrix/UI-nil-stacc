"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";

export default function Nav() {
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
