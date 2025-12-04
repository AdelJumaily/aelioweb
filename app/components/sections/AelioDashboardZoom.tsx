"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const getYouTubeEmbedUrl = (url: string) => {
  const match = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\n?#]+)/);
  if (match) {
    const videoId = match[1];
    return `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&loop=1&playlist=${videoId}&controls=0&modestbranding=1&rel=0`;
  }
  return url;
};

export default function AelioDashboardZoom() {
  const sectionRef = useRef<HTMLDivElement | null>(null);

  // Scroll progress for the entire section
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  // Animation stages:
  // 0.0 - 0.2: Video full screen with text overlay
  // 0.2 - 0.35: Video morphs into small player inside dashboard
  // 0.35 - 0.5: Dashboard zooms out to show full view
  // 0.5 - 0.65: CTA text appears
  // 0.65 - 0.75: Transform dashboard → phone
  // 0.75 - 0.95: Phone sticks (visible and stable)
  // 0.85 - 1.0: Mobile apps message appears

  // Video URL
  const videoUrl = "https://www.youtube.com/watch?v=FET1XkLeeUs";

  // STAGE 1: Full screen video (0 → 0.2)
  const fullScreenVideoOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  
  // Hero text overlay - fades out early
  const heroTextOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0]);
  const heroTextY = useTransform(scrollYProgress, [0, 0.15], [0, -20]);

  // STAGE 2: Video morphs from full screen to small player (0.2 → 0.35)
  // The video will shrink from full screen to a small player inside the dashboard
  const morphingVideoScale = useTransform(scrollYProgress, (progress) => {
    if (progress < 0.2) return 1; // Full screen
    if (progress < 0.35) {
      const t = (progress - 0.2) / (0.35 - 0.2);
      // Scale down dramatically - from full screen to small player
      // The player will be about 80% of dashboard width, so relative to viewport it's much smaller
      return 1 - t * 0.85; // Scale down to ~0.15
    }
    return 0.15; // Small player size
  });

  const morphingVideoWidth = useTransform(scrollYProgress, (progress) => {
    if (progress < 0.2) return "100vw";
    if (progress < 0.35) {
      const t = (progress - 0.2) / (0.35 - 0.2);
      // Calculate width as percentage - from 100vw to ~80% of dashboard (which is ~92vw)
      // So final width should be about 0.8 * 0.92 = ~73.6vw, but we want it relative to viewport
      // Actually, we want it to be 80% of the dashboard container width
      const finalWidth = 0.8 * 0.92 * 100; // 80% of 92vw = ~73.6vw
      return `${100 - t * (100 - finalWidth)}vw`;
    }
    // At this point, the video is inside the dashboard, so width is relative to dashboard
    return "80%";
  });

  const morphingVideoBorderRadius = useTransform(scrollYProgress, (progress) => {
    if (progress < 0.2) return "0px";
    if (progress < 0.35) {
      const t = (progress - 0.2) / (0.35 - 0.2);
      return `${t * 24}px`;
    }
    return "24px";
  });

  // Morphing video fades in as full screen fades out, then fades into dashboard
  const morphingVideoOpacity = useTransform(scrollYProgress, [0.15, 0.2, 0.33, 0.35], [0, 1, 1, 0]);

  // STAGE 3: Dashboard zoom out (0.35 → 0.5)
  const dashboardZoomScale = useTransform(scrollYProgress, [0.35, 0.5], [1.2, 0.8]);
  
  // STAGE 4: CTA text (0.5 → 0.65)
  const ctaOpacity = useTransform(scrollYProgress, [0.5, 0.55, 0.6, 0.65], [0, 1, 1, 0]);
  const ctaY = useTransform(scrollYProgress, [0.5, 0.6], [40, 0]);

  // STAGE 5: Dashboard → Phone transformation (0.65 → 0.75)
  const containerScale = useTransform(scrollYProgress, (progress) => {
    if (progress < 0.35) {
      return 1.2; // Start zoomed in
    } else if (progress < 0.5) {
      const t = (progress - 0.35) / (0.5 - 0.35);
      return 1.2 - t * (1.2 - 0.8); // Zoom out
    } else if (progress < 0.65) {
      return 0.8; // Stay at dashboard size
    } else if (progress < 0.75) {
      const t = (progress - 0.65) / (0.75 - 0.65);
      return 0.8 + t * (1.1 - 0.8); // Zoom in for phone
    }
    return 1.1; // Phone stays at this scale (0.75 → 1.0)
  });

  const containerY = useTransform(scrollYProgress, (progress) => {
    if (progress < 0.35) {
      return 0;
    } else if (progress < 0.5) {
      const t = (progress - 0.35) / (0.5 - 0.35);
      return t * 80; // Move down as dashboard zooms out
    } else if (progress < 0.65) {
      return 80; // Stay at dashboard position
    } else if (progress < 0.75) {
      const t = (progress - 0.65) / (0.75 - 0.65);
      return 80 - t * 80; // Move up for phone
    }
    return 0; // Phone stays centered (0.75 → 1.0)
  });

  // Width transition: dashboard width → phone width
  const containerWidth = useTransform(scrollYProgress, (progress) => {
    if (progress < 0.65) {
      return "min(1060px, 95vw)";
    } else if (progress < 0.75) {
      const t = (progress - 0.65) / (0.75 - 0.65);
      // Smoothly transition from dashboard to phone width
      const startWidth = 1060;
      const endWidth = 320;
      const width = startWidth - t * (startWidth - endWidth);
      return `${width}px`;
    }
    return "min(320px, 85vw)"; // Phone stays at this width (0.75 → 1.0), responsive
  });

  // Height transition
  const containerHeight = useTransform(scrollYProgress, (progress) => {
    if (progress < 0.65) {
      return "72vh";
    } else if (progress < 0.75) {
      const t = (progress - 0.65) / (0.75 - 0.65);
      const startHeight = 72;
      const endHeight = 70;
      const height = startHeight - t * (startHeight - endHeight);
      return `${height}vh`;
    }
    return "70vh"; // Phone stays at this height (0.75 → 1.0)
  });

  // Border radius transition (returns number)
  const containerRadiusValue = useTransform(scrollYProgress, (progress) => {
    if (progress < 0.35) {
      return 0; // No radius when video is morphing
    } else if (progress < 0.5) {
      const t = (progress - 0.35) / (0.5 - 0.35);
      return t * 24; // Add radius as dashboard appears
    } else if (progress < 0.65) {
      return 24; // Dashboard radius
    } else if (progress < 0.75) {
      const t = (progress - 0.65) / (0.75 - 0.65);
      return 24 + t * (40 - 24); // Increase for phone
    }
    return 40; // Phone stays at this radius (0.75 → 1.0)
  });

  // Convert to CSS string with px unit
  const containerRadius = useTransform(containerRadiusValue, (v) => `${v}px`);

  const containerShadow = useTransform(scrollYProgress, (progress) => {
    if (progress < 0.35) {
      return "0 0px 0px rgba(0,0,0,0)";
    } else if (progress < 0.5) {
      const t = (progress - 0.35) / (0.5 - 0.35);
      return `0 ${25 * t}px ${60 * t}px rgba(0,0,0,${0.3 * t})`;
    } else if (progress < 0.65) {
      return "0 25px 60px rgba(0,0,0,0.3)";
    } else if (progress < 0.75) {
      const t = (progress - 0.65) / (0.75 - 0.65);
      return `0 ${25 + t * 5}px ${60 + t * 20}px rgba(0,0,0,${0.3 + t * 0.2})`;
    }
    return "0 30px 80px rgba(0,0,0,0.5)"; // Phone shadow stays (0.75 → 1.0)
  });
  
  // Dashboard opacity - appears as video morphs
  const dashboardOpacity = useTransform(scrollYProgress, [0.2, 0.35], [0, 1]);
  
  // Dashboard video player opacity (appears as morphing video fades)
  const dashboardVideoPlayerOpacity = useTransform(scrollYProgress, [0.33, 0.35], [0, 1]);
  
  // Dashboard fades out, phone UI fades in
  const dashboardFadeOut = useTransform(scrollYProgress, [0.65, 0.72], [1, 0]);
  const phoneOpacity = useTransform(scrollYProgress, [0.65, 0.72], [0, 1]);

  // STAGE 6: Mobile apps message (appears after phone is stable, 0.85 → 1.0)
  const mobileMessageOpacity = useTransform(scrollYProgress, [0.85, 0.9, 0.98, 1.0], [0, 1, 1, 1]);
  const mobileMessageY = useTransform(scrollYProgress, [0.85, 0.9], [30, 0]);

  // Background tint - convert number to rgba string
  const bgTintOpacity = useTransform(scrollYProgress, [0, 0.2], [0.15, 0.03]);
  const bgTint = useTransform(bgTintOpacity, (v) => `rgba(0,0,0,${v})`);

  return (
    <section
      ref={sectionRef}
      className="relative h-[500vh] bg-[#d8d1c5]"
    >
      {/* Sticky viewport */}
      <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden">
        {/* Background tint */}
        <motion.div
          style={{
            backgroundColor: bgTint,
          }}
          className="absolute inset-0 pointer-events-none z-0"
        />

        {/* STAGE 1: Full Screen Video with Text Overlay */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center z-30"
          style={{
            opacity: fullScreenVideoOpacity,
          }}
        >
          <div className="w-full h-full relative">
            <iframe
              src={getYouTubeEmbedUrl(videoUrl)}
              className="w-full h-full object-cover"
              allow="autoplay; encrypted-media"
              allowFullScreen
              title="Aelio Studio Video"
            />
            
            {/* Overlay gradient for text contrast */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-transparent pointer-events-none" />

            {/* Hero text overlay */}
            <motion.div
              className="absolute left-4 md:left-12 lg:left-20 top-1/2 -translate-y-1/2 z-10 max-w-[90%] md:max-w-2xl px-4 md:px-0"
              style={{ 
                opacity: heroTextOpacity,
                y: heroTextY,
              }}
            >
              <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-white mb-4 md:mb-6 leading-tight">
                We create worlds that feel alive.
              </h1>
              <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-white/90 mb-3 md:mb-4 leading-relaxed">
                Then we turn them into products your customers actually use.
              </p>
              <div className="px-3 py-1.5 md:px-4 md:py-2 bg-white/20 backdrop-blur-sm text-white rounded-full text-xs md:text-sm inline-block">
                Aelio Studio · Web & App Experiences
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* STAGE 2: Morphing Video Player (transitions from full screen to dashboard player) */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center z-25 pointer-events-none"
          style={{
            opacity: morphingVideoOpacity,
          }}
        >
          <motion.div
            className="relative"
            style={{
              scale: morphingVideoScale,
              width: morphingVideoWidth,
              aspectRatio: "16/9",
              borderRadius: morphingVideoBorderRadius,
              overflow: "hidden",
            }}
          >
            <iframe
              src={getYouTubeEmbedUrl(videoUrl)}
              className="w-full h-full"
              allow="autoplay; encrypted-media"
              allowFullScreen
              title="Morphing Video Player"
            />
          </motion.div>
        </motion.div>

        {/* STAGE 3-5: Dashboard/Phone Container */}
        <motion.div
          style={{
            scale: containerScale,
            y: containerY,
            width: containerWidth,
            height: containerHeight,
            borderRadius: containerRadius,
            boxShadow: containerShadow,
            opacity: dashboardOpacity,
          }}
          className="relative bg-[#05060a] overflow-hidden z-10"
        >
          {/* DASHBOARD UI (visible during zoom out, fades during phone transform) */}
          <motion.div
            style={{ opacity: dashboardFadeOut }}
            className="absolute inset-0"
          >
            {/* Top nav */}
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

            {/* Ghost background UI */}
            <div className="absolute inset-0 pt-16 px-6 text-white/10 select-none pointer-events-none">
              <div className="flex gap-6 h-full">
                <div className="w-1/4 space-y-4">
                  <div className="h-24 rounded-2xl bg-white/10" />
                  <div className="h-40 rounded-2xl bg-white/10" />
                </div>
                <div className="w-1/2 flex flex-col items-center justify-center">
                  <div className="w-full h-56 rounded-3xl bg-white/5" />
                </div>
                <div className="w-1/4 space-y-4">
                  <div className="h-16 rounded-2xl bg-white/10" />
                  <div className="h-32 rounded-2xl bg-white/10" />
                </div>
              </div>
            </div>

            {/* Video player inside dashboard - appears as morphing video fades */}
            <motion.div 
              className="absolute inset-0 flex items-center justify-center pointer-events-none"
              style={{
                opacity: dashboardVideoPlayerOpacity
              }}
            >
              <div className="w-[80%] max-w-3xl aspect-[16/9] rounded-3xl overflow-hidden bg-black border border-white/8">
                <iframe
                  src={getYouTubeEmbedUrl(videoUrl)}
                  className="w-full h-full"
                  allow="autoplay; encrypted-media"
                  allowFullScreen
                  title="Dashboard Video"
                />
              </div>
            </motion.div>
          </motion.div>

          {/* PHONE UI (fades in during transform) */}
          <motion.div
            style={{ opacity: phoneOpacity }}
            className="absolute inset-0 flex flex-col"
          >
            {/* Phone notch */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-28 h-5 bg-[#05060a] rounded-b-xl z-10" />
            
            {/* Phone status bar */}
            <div className="h-10 px-4 flex items-center justify-between text-white/70 text-xs font-medium">
              <span>9:41</span>
              <div className="flex items-center gap-1.5">
                <div className="w-5 h-2.5 border border-white/50 rounded-sm">
                  <div className="w-4/5 h-full bg-white/60 rounded-sm m-0.5" />
                </div>
                <div className="w-1.5 h-1.5 bg-white/60 rounded-full" />
              </div>
            </div>

            {/* Phone content */}
            <div className="flex-1 overflow-y-auto bg-gradient-to-b from-[#1a1b2e] to-[#05060a]">
              <div className="p-4 space-y-3">
                {/* App header */}
                <div className="h-14 rounded-xl bg-white/5 flex items-center px-4 border border-white/5">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                    <span className="text-white text-xs font-bold">A</span>
                  </div>
                  <div className="ml-3 flex-1">
                    <div className="h-2.5 w-28 bg-white/25 rounded mb-1.5" />
                    <div className="h-2 w-20 bg-white/15 rounded" />
                  </div>
                </div>
                
                {/* App cards */}
                {[1, 2, 3].map((i) => (
                  <div key={i} className="h-36 rounded-xl bg-white/5 p-4 border border-white/5">
                    <div className="h-3.5 w-3/4 bg-white/25 rounded mb-2.5" />
                    <div className="h-2.5 w-full bg-white/15 rounded mb-1.5" />
                    <div className="h-2.5 w-5/6 bg-white/15 rounded" />
                  </div>
                ))}
              </div>
            </div>

            {/* Phone home indicator */}
            <div className="h-1 w-36 mx-auto bg-white/25 rounded-full mb-3" />
          </motion.div>
        </motion.div>

        {/* STAGE 2: CTA Text - Positioned on left side to not cover dashboard */}
        <motion.div
          style={{
            opacity: ctaOpacity,
            y: ctaY,
          }}
          className="absolute left-4 md:left-12 lg:left-20 top-1/2 -translate-y-1/2 flex flex-col gap-3 md:gap-4 px-4 md:px-6 z-20 pointer-events-none max-w-[90%] md:max-w-xl"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-black leading-tight">
            We Build Digital Experiences
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-black/70 leading-relaxed">
            From stunning websites to powerful web applications, we craft solutions that drive results
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="mt-2 md:mt-4 px-6 py-2.5 md:px-8 md:py-3 bg-black text-white rounded-full font-semibold text-sm md:text-lg pointer-events-auto w-fit"
          >
            Start Your Project
          </motion.button>
        </motion.div>

        {/* STAGE 4: Mobile Apps Message - Positioned on left side to not cover phone */}
        <motion.div
          style={{
            opacity: mobileMessageOpacity,
            y: mobileMessageY,
          }}
          className="absolute left-4 md:left-12 lg:left-20 top-1/2 -translate-y-1/2 flex flex-col gap-3 md:gap-4 px-4 md:px-6 z-20 pointer-events-none max-w-[90%] md:max-w-xl"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-black leading-tight">
            We Don't Just Make Websites
          </h2>
          <p className="text-lg sm:text-xl md:text-2xl text-black/80 font-medium">
            We build mobile apps too
          </p>
          <p className="text-sm sm:text-base md:text-lg text-black/60 leading-relaxed">
            Native iOS and Android apps that deliver seamless experiences across all devices
          </p>
        </motion.div>
      </div>
    </section>
  );
}
