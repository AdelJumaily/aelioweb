import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Aelio — Web Design DMV",
  description:
    "Start your web design project with Aelio. Serving Washington DC, Northern Virginia, Fairfax, Arlington, and Alexandria. Email contact@aelio.dev or call (571) 477-7222.",
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
