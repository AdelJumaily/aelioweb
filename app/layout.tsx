import type { Metadata } from "next";
import { Inter, JetBrains_Mono, Playfair_Display } from "next/font/google";
import NavbarWrapper from "./components/layout/NavbarWrapper";
import SiteFooter from "./components/layout/SiteFooter";
import "./globals.css";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  display: "swap",
});

const playfairDisplay = Playfair_Display({
  variable: "--font-display",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Aelio | High-Performance Websites Built to Elevate Your Brand",
  description: "Design-forward. Performance-first. We craft blazing-fast websites using Next.js, modern design systems, and conversion-focused UX. Your site will load in under 2 seconds and turn visitors into customers.",
  keywords: ["web development", "web design", "Next.js", "React", "TypeScript", "digital agency", "website design", "performance"],
  authors: [{ name: "Aelio" }],
  openGraph: {
    title: "Aelio | High-Performance Websites",
    description: "Design-forward. Performance-first. We craft blazing-fast websites that convert.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Aelio | High-Performance Websites",
    description: "Design-forward. Performance-first.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable} ${playfairDisplay.variable}`}>
      <body className="antialiased font-sans">
        <NavbarWrapper />
        {children}
        <SiteFooter />
      </body>
    </html>
  );
}
