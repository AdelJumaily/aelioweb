import type { Metadata } from "next";
import { Bebas_Neue, Inter, JetBrains_Mono, Playfair_Display } from "next/font/google";
import NavbarWrapper from "./components/layout/NavbarWrapper";
import SiteFooter from "./components/layout/SiteFooter";
import SmoothScroll from "./components/animations/SmoothScroll";
import "./globals.css";

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "Aelio",
  url: "https://aelio.dev",
  // TODO: Replace with /logo.png (min 112×112px) once the asset is added to public/
  logo: "https://aelio.dev/favicon.ico",
  description:
    "Boutique web design studio building custom websites in Framer and Next.js for service businesses.",
  foundingDate: "2025",
  founder: {
    "@type": "Person",
    name: "Adel Al Jumaily",
  },
  email: "contact@aelio.dev",
  telephone: "+1-571-477-7222",
  areaServed: [
    { "@type": "City", name: "Washington, DC" },
    { "@type": "City", name: "Arlington, VA" },
    { "@type": "City", name: "Alexandria, VA" },
    { "@type": "City", name: "Fairfax, VA" },
    { "@type": "City", name: "Bethesda, MD" },
    { "@type": "Country", name: "United States" },
  ],
  serviceType: "Web Design and Development",
  priceRange: "$$",
  sameAs: ["https://www.instagram.com/aelio.web/"],
};

const bebasNeue = Bebas_Neue({
  variable: "--font-bebas",
  weight: "400",
  subsets: ["latin"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  display: "swap",
});

const playfairDisplay = Playfair_Display({
  variable: "--font-display",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://aelio.dev"),
  title: "Aelio | High-Performance Websites Built to Elevate Your Brand",
  description: "Design-forward. Performance-first. We craft blazing-fast websites using Next.js, modern design systems, and conversion-focused UX. Your site will load in under 2 seconds and turn visitors into customers.",
  keywords: [
    "web design DMV",
    "web development Northern Virginia",
    "Next.js web design Fairfax",
    "Framer designer Northern Virginia",
    "web design Washington DC",
    "web design Arlington VA",
    "web design Alexandria VA",
    "web design Bethesda MD",
    "digital agency DMV",
    "website design",
    "Next.js",
    "React",
    "Aelio",
  ],
  authors: [{ name: "Aelio" }],
  openGraph: {
    title: "Aelio | High-Performance Websites",
    description: "Design-forward. Performance-first. We craft blazing-fast websites that convert.",
    type: "website",
    locale: "en_US",
    url: "https://aelio.dev",
    siteName: "Aelio",
    // TODO: Add /og-image.png (1200×630px) to public/ then uncomment the line below
    // images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Aelio — Web Design Studio" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Aelio | High-Performance Websites",
    description: "Design-forward. Performance-first.",
    // TODO: Uncomment once /og-image.png is added to public/
    // images: ["/og-image.png"],
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
    <html lang="en" className={`${bebasNeue.variable} ${inter.variable} ${jetbrainsMono.variable} ${playfairDisplay.variable}`}>
      <body className="antialiased font-bebas">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <SmoothScroll>
          <NavbarWrapper />
          {children}
          <SiteFooter />
        </SmoothScroll>
      </body>
    </html>
  );
}
