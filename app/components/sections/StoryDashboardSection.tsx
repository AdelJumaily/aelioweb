"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

interface StoryDashboardSectionProps {
  videoSrc?: string;
}

export default function StoryDashboardSection({
  videoSrc = "/your-video.mp4",
}: StoryDashboardSectionProps) {
  const sectionRef = useRef<HTMLDivElement | null>(null);

  // Scroll progress only for this section
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"], // 0 when section top hits top, 1 when bottom hits bottom
  });

  // VIDEO transforms (hero → card)
  const videoScale = useTransform(scrollYProgress, [0, 0.4], [1, 0.55]);
  const videoY = useTransform(scrollYProgress, [0, 0.4], [0, -40]); // slight lift
  const videoRadius = useTransform(scrollYProgress, [0.2, 0.4], [0, 24]); // rounded as it becomes a card
  const videoOpacity = useTransform(scrollYProgress, [0, 0.7, 0.85], [1, 1, 0]); // fades only near the end

  // DASHBOARD background fade-in
  const dashboardOpacity = useTransform(scrollYProgress, [0.2, 0.6], [0, 1]);

  // DASHBOARD "zoom-out" as you scroll further
  const dashboardScale = useTransform(scrollYProgress, [0.6, 1], [1, 0.9]);
  const dashboardY = useTransform(scrollYProgress, [0.6, 1], [0, 60]);
  const dashboardRadius = useTransform(scrollYProgress, [0.6, 1], [24, 40]);

  return (
    <section
      ref={sectionRef}
      className="relative h-[260vh] bg-[#d8d1c5]" // tall section for scroll room
    >
      <div className="sticky top-0 h-screen overflow-hidden">
        {/* BACKGROUND BEHIND EVERYTHING (page color) */}
        <div className="absolute inset-0 bg-[#d8d1c5]" />

        {/* DASHBOARD LAYER */}
        <motion.div
          style={{
            opacity: dashboardOpacity,
            scale: dashboardScale,
            y: dashboardY,
            borderRadius: dashboardRadius,
          }}
          className="absolute inset-0 flex items-center justify-center px-4 md:px-10 lg:px-20"
        >
          <div className="relative w-full max-w-5xl h-[70vh] bg-[#090b10] rounded-[inherit] shadow-[0_20px_60px_rgba(0,0,0,0.45)] overflow-hidden">
            {/* top nav bar */}
            <div className="h-12 px-6 flex items-center gap-6 border-b border-white/5 bg-black/60 backdrop-blur-md">
              <span className="text-sm font-semibold text-white">Dashboard</span>
              <span className="text-sm text-white/60">Projects</span>
              <span className="text-sm text-white/60">Settings</span>
              <div className="ml-auto">
                <span className="inline-flex items-center rounded-full px-3 py-1 text-xs bg-white/10 text-white/80">
                  Creative engineering
                </span>
              </div>
            </div>

            {/* ghost background UI */}
            <div className="absolute inset-0 pt-16 px-6 text-white/10 select-none pointer-events-none">
              <div className="flex gap-6 h-full">
                <div className="w-1/4 space-y-4">
                  <div className="h-24 rounded-2xl bg-white/5" />
                  <div className="h-40 rounded-2xl bg-white/5" />
                </div>
                <div className="w-1/2 flex flex-col items-center justify-center">
                  {/* the video will sit on top of this column */}
                  <div className="mt-40 h-40 rounded-2xl border border-white/10" />
                </div>
                <div className="w-1/4 space-y-4">
                  <div className="h-16 rounded-2xl bg-white/5" />
                  <div className="h-32 rounded-2xl bg-white/5" />
                </div>
              </div>
            </div>

            {/* text below card (inside dashboard) */}
            <div className="absolute inset-x-0 bottom-10 flex justify-center">
              <p className="text-xs md:text-sm tracking-[0.18em] text-white/70 uppercase">
                NEXT-LEVEL UI EXPERIENCES
              </p>
            </div>
          </div>
        </motion.div>

        {/* VIDEO LAYER – starts as full hero, shrinks into dashboard card */}
        <motion.div
          style={{
            scale: videoScale,
            y: videoY,
            borderRadius: videoRadius,
            opacity: videoOpacity,
          }}
          className="absolute inset-0 flex items-center justify-center pointer-events-none"
        >
          <div className="w-[90vw] max-w-4xl aspect-[16/9] overflow-hidden rounded-[inherit] bg-black">
            {/* swap this for your own video */}
            <video
              src={videoSrc}
              autoPlay
              muted
              loop
              playsInline
              className="h-full w-full object-cover"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}

