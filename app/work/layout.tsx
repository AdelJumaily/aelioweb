import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Our Work — Web Design Case Studies | Aelio",
  description:
    "Browse Aelio's portfolio of custom websites built in Next.js and Framer for businesses across the DMV — Washington DC, Northern Virginia, and Maryland.",
};

export default function WorkLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
