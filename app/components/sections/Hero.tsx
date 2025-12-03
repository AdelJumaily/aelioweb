"use client";

import { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import dynamic from "next/dynamic";
import ContactModal from "../forms/ContactModal";

const Spline = dynamic(
  () => import("@splinetool/react-spline"),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-full bg-gradient-to-br from-[#f5f1e8] to-[#e8e0d0]" />
    ),
  }
);

export default function Hero() {
  const [isClient, setIsClient] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsClient(true);
  }, []);

  // Parallax effect only - NO pinning, NO scaling/zooming
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  // Only parallax movement - no scale transform
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);

  return (
    <>
      <section
        ref={sectionRef}
        className="relative min-h-screen w-full overflow-hidden flex flex-col"
      >
        {/* Spline Scene - visible on load, no zoom */}
        <motion.div
          className="absolute inset-0"
          style={{ y: backgroundY }}
        >
          {isClient && (
            <Spline
              scene="/images/scene.splinecode"
              style={{ width: "100%", height: "100%" }}
            />
          )}
        </motion.div>

        {/* Content */}
        <div className="relative z-10 flex-1 flex flex-col items-center justify-center">
          <div className="absolute bottom-[10vh] left-1/2 -translate-x-1/2">
            <button
              onClick={() => setIsModalOpen(true)}
              className="px-8 py-4 bg-white text-black rounded-full hover:bg-gray-100 transition-all duration-200 flex items-center gap-2 text-base font-medium shadow-lg hover:shadow-xl"
            >
              Let&apos;s Talk
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          </div>
        </div>
      </section>

      <ContactModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
}
