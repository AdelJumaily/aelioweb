"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

interface DashboardZoomSectionProps {
  videoSrc?: string;
}

export default function DashboardZoomSection({
  videoSrc = "/your-video.mp4",
}: DashboardZoomSectionProps) {
  const sectionRef = useRef<HTMLDivElement | null>(null);

  // Scroll progress just for this section
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
    // 0 when section top hits viewport top
    // 1 when section bottom hits viewport top (after you scroll through it)
  });

  // We START zoomed in (1.2), then zoom OUT (0.9)
  const dashScale = useTransform(scrollYProgress, [0, 0.7], [1.2, 0.9]);
  const dashY = useTransform(scrollYProgress, [0, 0.7], [0, 80]);
  const dashRadius = useTransform(scrollYProgress, [0, 0.7], [0, 40]);
  const dashShadow = useTransform(
    scrollYProgress,
    [0, 0.7],
    [
      "0 30px 80px rgba(0,0,0,0.45)",
      "0 20px 60px rgba(0,0,0,0.25)",
    ]
  );

  // Optional: background behind dashboard fades in a bit
  const bgTintOpacity = useTransform(scrollYProgress, [0, 0.7], [0, 0.12]);
  const bgTint = useTransform(bgTintOpacity, (v) => `rgba(0,0,0,${v})`);

  return (
    <section
      ref={sectionRef}
      className="relative h-[220vh] bg-[#d8d1c5]" // tall section for scroll
    >
      <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden">
        {/* page background tint that appears as we zoom out */}
        <motion.div
          style={{ backgroundColor: bgTint }}
          className="absolute inset-0 pointer-events-none"
        />

        {/* DASHBOARD WRAPPER – this is what zooms out */}
        <motion.div
          style={{
            scale: dashScale,
            y: dashY,
            borderRadius: dashRadius,
            boxShadow: dashShadow,
          }}
          className="relative w-[min(1100px,92vw)] h-[70vh] bg-[#05060a] overflow-hidden"
        >
          {/* Top nav of dashboard */}
          <div className="h-12 px-6 flex items-center gap-6 border-b border-white/8 bg-black/70 backdrop-blur-md">
            <span className="text-sm font-semibold text-white">Dashboard</span>
            <span className="text-sm text-white/55">Projects</span>
            <span className="text-sm text-white/55">Settings</span>
            <div className="ml-auto">
              <span className="inline-flex items-center rounded-full px-3 py-1 text-xs bg-white/10 text-white/80">
                Creative engineering
              </span>
            </div>
          </div>

          {/* Ghost UI background */}
          <div className="absolute inset-0 pt-16 px-6 text-white/8 select-none pointer-events-none">
            <div className="flex gap-6 h-full">
              <div className="w-1/4 space-y-4">
                <div className="h-24 rounded-2xl bg-white/10" />
                <div className="h-40 rounded-2xl bg-white/10" />
              </div>
              <div className="w-1/2 flex flex-col items-center justify-center">
                <div className="w-full h-40 rounded-3xl border border-white/10" />
              </div>
              <div className="w-1/4 space-y-4">
                <div className="h-16 rounded-2xl bg-white/10" />
                <div className="h-32 rounded-2xl bg-white/10" />
              </div>
            </div>
          </div>

          {/* MAIN CARD WITH VIDEO – this does NOT have its own scale, only inherits dashboard scale */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="w-[80%] max-w-3xl aspect-[16/9] rounded-3xl overflow-hidden bg-black">
              <video
                src={videoSrc}
                autoPlay
                muted
                loop
                playsInline
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Caption */}
          <div className="absolute inset-x-0 bottom-8 flex justify-center">
            <p className="text-xs md:text-sm tracking-[0.18em] text-white/75 uppercase">
              NEXT-LEVEL UI EXPERIENCES
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

