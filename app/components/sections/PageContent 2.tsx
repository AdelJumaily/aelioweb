"use client";

import { useState } from "react";
import Hero from "./Hero";
import AboutSection from "./AboutSection";
import AelioDashboardZoom from "./AelioDashboardZoom";
import WebAppShowcaseSection from "./WebAppShowcaseSection";
import TextRevealSection from "./TextRevealSection";
import FAQSection from "./FAQSection";
import FinalCTASection from "./FinalCTASection";
import ContactModal from "../forms/ContactModal";

export default function PageContent() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      {/* 1. Hero - Normal scroll, no pinning, no zoom */}
      <Hero />

      {/* 2. About Section - Horizontal scroll (right to left) */}
      <AboutSection />

      {/* 3. Dashboard Zoom → Phone Transformation */}
      <AelioDashboardZoom />

      {/* 4. Section 2 - Web & App development showcase */}
      <WebAppShowcaseSection />

      {/* 5. Section 3 - Scroll-pinned text reveal */}
      <TextRevealSection />

      {/* 6. Section 4 - FAQ */}
      <FAQSection />

      {/* 7. Section 5 - Final CTA */}
      <FinalCTASection />

      <ContactModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
}
