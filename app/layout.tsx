import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
    title: "AI-Powered Study Buddy",
    description: "Your personal AI tutor for simplifying concepts and active recall.",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" className="dark">
            <body className="antialiased">
                {children}
            </body>
        </html>
    );
}
