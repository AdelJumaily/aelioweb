"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Navbar from "../../components/layout/Navbar";
import Footer from "../../components/layout/Footer";
import ContactModal from "../../components/forms/ContactModal";
import HeroSection from "./sections/HeroSection";
import MaintenanceSection from "./sections/MaintenanceSection";
import ProcessSection from "./sections/ProcessSection";
import FeaturesSection from "./sections/FeaturesSection";
import CTASection from "./sections/CTASection";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function WebDevelopmentPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const footerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Footer animation
    if (footerRef.current) {
      gsap.fromTo(
        footerRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: footerRef.current,
            start: "top 90%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <main className="bg-[#5C4F42] text-white min-h-screen">
      <Navbar />
      <HeroSection onOpenModal={() => setIsModalOpen(true)} />
      <MaintenanceSection />
      <ProcessSection />
      <FeaturesSection />
      <CTASection onOpenModal={() => setIsModalOpen(true)} />
      <div ref={footerRef}>
        <Footer />
      </div>
      <ContactModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </main>
  );
}

