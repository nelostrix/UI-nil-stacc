import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
    title: "Nelo Robotics — Build Robots That Think",
    description:
        "The complete robotics intelligence stack. Define, simulate, deploy, and evolve any robot.",
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <head>
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link
                    rel="preconnect"
                    href="https://fonts.gstatic.com"
                    crossOrigin=""
                />
                <link
                    href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Outfit:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500&family=Permanent+Marker&display=swap"
                    rel="stylesheet"
                />
                <link rel="icon" href="/logo.png" />
            </head>
            <body className="grain">{children}</body>
        </html>
    );
}
