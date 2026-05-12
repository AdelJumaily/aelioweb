import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Web Development Services — Next.js & Framer | Aelio",
  description:
    "Custom web development in Next.js and Framer for businesses in the DMV. Aelio builds fast, design-forward websites for service companies across Northern Virginia, DC, and Maryland.",
};

export default function WebDevelopmentLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
