import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import SmoothScroll from "./components/animations/SmoothScroll";

const inter = Inter({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Aelio Studio | Custom Web & App Development",
  description: "We design and build custom websites, web apps, and mobile apps. From stunning websites to powerful applications, we craft solutions that drive results. No templates, no generic themes—everything is tailored to your brand.",
  keywords: ["web development", "app development", "custom websites", "web design", "mobile apps", "UI/UX design", "digital agency"],
  authors: [{ name: "Aelio Studio" }],
  openGraph: {
    title: "Aelio Studio | Custom Web & App Development",
    description: "We design and build custom websites, web apps, and mobile apps. From stunning websites to powerful applications, we craft solutions that drive results.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Aelio Studio | Custom Web & App Development",
    description: "We design and build custom websites, web apps, and mobile apps.",
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
    <html lang="en">
      <body
        className={`${inter.variable} ${jetbrainsMono.variable} antialiased`}
      >
        <SmoothScroll>
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}
