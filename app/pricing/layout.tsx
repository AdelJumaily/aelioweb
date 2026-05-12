import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Web Design Pricing — Custom Sites | Aelio",
  description:
    "Transparent pricing for web design, video production, branding, and managed hosting. Aelio builds conversion-focused websites for businesses in the DMV and beyond.",
};

export default function PricingLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
