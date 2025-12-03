"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

// Helper functions
const clamp01 = (value: number) => Math.max(0, Math.min(1, value));
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
const smoothStep = (t: number) => t * t * (3 - 2 * t);
const mapRange = (
  value: number,
  inMin: number,
  inMax: number,
  outMin: number,
  outMax: number
) => {
  const t = clamp01((value - inMin) / (inMax - inMin));
  return lerp(outMin, outMax, t);
};

const getYouTubeEmbedUrl = (url: string) => {
  const match = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\n?#]+)/);
  if (match) {
    const videoId = match[1];
    return `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&loop=1&playlist=${videoId}&controls=0&modestbranding=1&rel=0`;
  }
  return url;
};

interface VideoToDashboardSectionProps {
  videoUrl?: string;
}

export default function VideoToDashboardSection({
  videoUrl = "https://www.youtube.com/watch?v=PVGeM40dABA",
}: VideoToDashboardSectionProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLDivElement>(null);
  const [viewportWidth, setViewportWidth] = useState(0);
  const [viewportHeight, setViewportHeight] = useState(0);
  const [cardCenter, setCardCenter] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (typeof window !== "undefined") {
      setViewportWidth(window.innerWidth);
      setViewportHeight(window.innerHeight);
      
      // Calculate card center position (middle column, center card)
      // This is approximate - adjust based on your dashboard layout
      const cardCenterX = window.innerWidth / 2;
      const cardCenterY = window.innerHeight / 2;
      setCardCenter({ x: cardCenterX, y: cardCenterY });

      const handleResize = () => {
        setViewportWidth(window.innerWidth);
        setViewportHeight(window.innerHeight);
        setCardCenter({ 
          x: window.innerWidth / 2, 
          y: window.innerHeight / 2 
        });
      };
      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const t = useTransform(scrollYProgress, (progress) => clamp01(progress));

  // Card dimensions (16:9 aspect ratio, approximate size)
  // The card is in the center column, which is flex-1 (takes remaining space)
  // Approximate: center column is about 50% of dashboard width, card is max-w-2xl
  const cardWidth = Math.min(672, viewportWidth * 0.4); // max-w-2xl = 672px, or 40% of viewport
  const cardHeight = (cardWidth * 9) / 16;
  const cardScale = cardWidth / viewportWidth; // Scale needed to fit card width

  // Phase 0: Enter (t = 0 → 0.25)
  // Phase 1: Morph (t = 0.25 → 0.55)
  // Phase 2: Settle (t = 0.55 → 0.8)
  // Phase 3: Release (t = 0.8 → 1)

  // Video transforms
  const videoScale = useTransform(t, (val) => {
    if (val < 0.25) return 1; // Full screen
    if (val < 0.55) {
      const u = clamp01((val - 0.25) / (0.55 - 0.25));
      return lerp(1, cardScale, smoothStep(u));
    }
    return cardScale; // Locked in card
  });

  const videoTranslateX = useTransform(t, (val) => {
    if (val < 0.25) return 0;
    if (val < 0.55) {
      const u = clamp01((val - 0.25) / (0.55 - 0.25));
      const viewportCenterX = viewportWidth / 2;
      return lerp(0, cardCenter.x - viewportCenterX, smoothStep(u));
    }
    return cardCenter.x - viewportWidth / 2;
  });

  const videoTranslateY = useTransform(t, (val) => {
    if (val < 0.25) {
      // Parallax: 0 to -20px
      const u = clamp01(val / 0.25);
      return lerp(0, -20, u);
    }
    if (val < 0.55) {
      const u = clamp01((val - 0.25) / (0.55 - 0.25));
      const viewportCenterY = viewportHeight / 2;
      return lerp(-20, cardCenter.y - viewportCenterY, smoothStep(u));
    }
    return cardCenter.y - viewportHeight / 2;
  });

  const videoBorderRadius = useTransform(t, (val) => {
    if (val < 0.25) return 0;
    if (val < 0.55) {
      const u = clamp01((val - 0.25) / (0.55 - 0.25));
      return lerp(0, 24, smoothStep(u));
    }
    return 24;
  });

  // Dashboard frame
  const frameOpacity = useTransform(t, (val) => {
    if (val < 0.25) return 0;
    if (val < 0.55) {
      const u = clamp01((val - 0.25) / (0.55 - 0.25));
      return lerp(0, 1, smoothStep(u));
    }
    return 1;
  });

  // PHASE 1: Dashboard fully formed (t = 0.55 → 0.75)
  // PHASE 2: Dashboard zooms out (t = 0.75 → 1.0)
  
  const frameTranslateY = useTransform(t, (val) => {
    if (val < 0.25) return 40;
    if (val < 0.55) {
      const u = clamp01((val - 0.25) / (0.55 - 0.25));
      return lerp(40, 0, smoothStep(u));
    }
    // Phase 1: Dashboard fully formed - stay at 0
    if (val < 0.75) return 0;
    // Phase 2: Zoom out - move downward to reveal whitespace
    if (val < 1.0) {
      const u = clamp01((val - 0.75) / (1.0 - 0.75));
      return lerp(0, 80, smoothStep(u));
    }
    return 80;
  });

  const frameScale = useTransform(t, (val) => {
    if (val < 0.25) return 0.97;
    if (val < 0.55) {
      const u = clamp01((val - 0.25) / (0.55 - 0.25));
      return lerp(0.97, 1, smoothStep(u));
    }
    // Phase 1: Dashboard fully formed - scale = 1
    if (val < 0.75) return 1;
    // Phase 2: Zoom out - scale decreases from 1 to 0.85
    if (val < 1.0) {
      const u = clamp01((val - 0.75) / (1.0 - 0.75));
      return lerp(1, 0.85, smoothStep(u));
    }
    return 0.85;
  });

  // Background overlay - darkens during morph, then fades to light as dashboard zooms out
  const backgroundDark = useTransform(t, (val) => {
    if (val < 0.25) return 0;
    if (val < 0.5) {
      // Darken during morph
      return mapRange(val, 0.25, 0.5, 0, 1);
    }
    if (val < 0.75) return 1; // Stay dark during Phase 1
    // Phase 2: Fade from dark to light as dashboard zooms out
    if (val < 1.0) {
      return mapRange(val, 0.75, 1.0, 1, 0);
    }
    return 0; // Light background when fully zoomed out
  });

  // Hero text
  const heroTextOpacity = useTransform(t, (val) => {
    return mapRange(val, 0.25, 0.4, 1, 0);
  });

  // Card subtitle
  const cardSubtitleOpacity = useTransform(t, (val) => {
    return mapRange(val, 0.45, 0.6, 0, 1);
  });

  // Left and right cards - Phase 3: Expand/reveal with stagger
  const leftCardOpacity = useTransform(t, (val) => {
    if (val < 0.55) return 0;
    if (val < 0.7) {
      // Fade in during Phase 1
      return mapRange(val, 0.55, 0.7, 0, 1);
    }
    // Phase 2 & 3: Stay visible and expand
    return 1;
  });

  const rightCardOpacity = useTransform(t, (val) => {
    if (val < 0.6) return 0;
    if (val < 0.75) {
      // Fade in with slight delay
      return mapRange(val, 0.6, 0.75, 0, 1);
    }
    // Phase 2 & 3: Stay visible and expand
    return 1;
  });

  // Additional UI elements expand in Phase 3 (after 0.75)
  const uiElementsOpacity = useTransform(t, (val) => {
    if (val < 0.75) return 0;
    if (val < 0.85) {
      return mapRange(val, 0.75, 0.85, 0, 1);
    }
    return 1;
  });

  const uiElementsTranslateY = useTransform(t, (val) => {
    if (val < 0.75) return 20;
    if (val < 0.85) {
      const u = clamp01((val - 0.75) / (0.85 - 0.75));
      return lerp(20, 0, smoothStep(u));
    }
    return 0;
  });

  // Nav labels
  const navTranslateY = useTransform(t, (val) => {
    if (val < 0.55) return 12;
    if (val < 0.8) {
      const u = clamp01((val - 0.55) / (0.8 - 0.55));
      return lerp(12, 0, smoothStep(u));
    }
    return 0;
  });

  // Dashboard border radius - increases as it zooms out
  const frameBorderRadius = useTransform(t, (val) => {
    if (val < 0.55) return 0;
    if (val < 0.75) {
      // Phase 1: Dashboard fully formed - start with rounded corners
      const u = clamp01((val - 0.55) / (0.75 - 0.55));
      return lerp(0, 24, smoothStep(u));
    }
    // Phase 2: Zoom out - corner radius increases from 24px to 50px
    if (val < 1.0) {
      const u = clamp01((val - 0.75) / (1.0 - 0.75));
      return lerp(24, 50, smoothStep(u));
    }
    return 50;
  });

  // Shadow increases as dashboard zooms out
  const frameShadow = useTransform(t, (val) => {
    if (val < 0.75) {
      // Phase 1: Minimal shadow
      return "0px 0px 20px rgba(0, 0, 0, 0.05)";
    }
    // Phase 2: Shadow increases - more dramatic as it floats
    if (val < 1.0) {
      const u = clamp01((val - 0.75) / (1.0 - 0.75));
      const opacity = lerp(0.05, 0.15, u);
      const blur = lerp(20, 40, u);
      return `0px 0px ${blur}px rgba(0, 0, 0, ${opacity})`;
    }
    return "0px 0px 40px rgba(0, 0, 0, 0.15)";
  });

  return (
    <section
      id="aelio-story"
      ref={containerRef}
      className="relative bg-[#f5f1e8]"
      style={{ height: "400vh" }}
    >
      <div className="sticky top-0 h-screen overflow-hidden">
        {/* Background overlay - subtle darkening during morph, but keep beige base */}
        <motion.div
          className="absolute inset-0 bg-black/20 pointer-events-none"
          style={{ opacity: backgroundDark }}
        />

        {/* Scene Video Layer */}
        <motion.div
          ref={videoRef}
          className="absolute inset-0 flex items-center justify-center pointer-events-none"
          style={{
            scale: videoScale,
            x: videoTranslateX,
            y: videoTranslateY,
          }}
        >
          <motion.div
            className="w-screen h-screen relative"
            style={{
              borderRadius: videoBorderRadius,
              overflow: "hidden",
            }}
          >
            {/* Video background */}
            <div className="absolute inset-0">
              <iframe
                src={getYouTubeEmbedUrl(videoUrl)}
                className="w-full h-full object-cover"
                allow="autoplay; encrypted-media"
                allowFullScreen
                title="Pixar-style animation"
              />
            </div>

            {/* Overlay gradient for text contrast */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-transparent pointer-events-none" />

            {/* Hero text - fades out during morph */}
            <motion.div
              className="absolute left-12 md:left-20 top-1/2 -translate-y-1/2 z-10 max-w-2xl"
              style={{ opacity: heroTextOpacity }}
            >
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-6">
                We create worlds that feel alive.
              </h1>
              <p className="text-xl md:text-2xl text-white/90 mb-4">
                Then we turn them into products your customers actually use.
              </p>
              <div className="px-4 py-2 bg-white/20 backdrop-blur-sm text-white rounded-full text-sm inline-block">
                Aelio Studio · Web & App Experiences
              </div>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Scene Dashboard Layer */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center p-8 md:p-12 lg:p-16"
          style={{
            opacity: frameOpacity,
            y: frameTranslateY,
            scale: frameScale,
          }}
        >
          {/* Dashboard frame */}
          <motion.div 
            className="relative w-full max-w-7xl h-full bg-[#1a1a1a] overflow-hidden"
            style={{
              borderRadius: frameBorderRadius,
              boxShadow: frameShadow,
            }}
          >
            {/* Dashboard image background */}
            <div className="absolute inset-0">
              <img
                src="/images/dashboard.png"
                alt="Dashboard"
                className="w-full h-full object-cover opacity-30"
              />
            </div>

            {/* Top Navigation */}
            <motion.div
              className="absolute top-0 left-0 right-0 h-16 bg-[#1a1a1a]/80 backdrop-blur-sm border-b border-white/10 flex items-center justify-between px-6 z-20"
              style={{ y: navTranslateY }}
            >
              <div className="flex items-center gap-8">
                <span className="text-white font-bold text-xl">Dashboard</span>
                <span className="text-white/70 text-sm">Projects</span>
                <span className="text-white/70 text-sm">Settings</span>
              </div>
            </motion.div>

            {/* Main Content Area */}
            <div className="absolute top-16 left-0 right-0 bottom-0 flex">
              {/* Left Card */}
              <motion.div
                className="w-64 p-6"
                style={{ opacity: leftCardOpacity }}
              >
                <div className="bg-white/5 rounded-xl p-6 h-full border border-white/10">
                  <div className="h-4 w-3/4 bg-white/10 rounded mb-4" />
                  <div className="space-y-2">
                    <div className="h-3 w-full bg-white/10 rounded" />
                    <div className="h-3 w-5/6 bg-white/10 rounded" />
                    <div className="h-3 w-full bg-white/10 rounded" />
                  </div>
                </div>
              </motion.div>

              {/* Center Column - Hero Card */}
              <div className="flex-1 flex flex-col items-center justify-center p-8">
                <div className="w-full max-w-2xl relative">
                  {/* Video card placeholder - morphing video will align here */}
                  <motion.div
                    className="relative w-full aspect-video bg-black rounded-2xl overflow-hidden mb-4 pointer-events-none"
                    style={{
                      opacity: useTransform(t, (val) => (val > 0.55 ? 1 : 0)),
                    }}
                  >
                    <iframe
                      src={getYouTubeEmbedUrl(videoUrl)}
                      className="w-full h-full"
                      allow="autoplay; encrypted-media"
                      allowFullScreen
                      title="Dashboard video"
                    />
                  </motion.div>

                  {/* Card subtitle */}
                  <motion.div
                    className="text-center"
                    style={{ opacity: cardSubtitleOpacity }}
                  >
                    <p className="text-white text-lg font-semibold">
                      NEXT-LEVEL UI EXPERIENCES
                    </p>
                  </motion.div>
                </div>
              </div>

              {/* Right Card */}
              <motion.div
                className="w-64 p-6"
                style={{ opacity: rightCardOpacity }}
              >
                <div className="bg-white/5 rounded-xl p-6 h-full border border-white/10">
                  <div className="h-4 w-3/4 bg-white/10 rounded mb-4" />
                  <div className="space-y-2">
                    <div className="h-3 w-full bg-white/10 rounded" />
                    <div className="h-3 w-5/6 bg-white/10 rounded" />
                    <div className="h-3 w-full bg-white/10 rounded" />
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Curved bottom edge */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white to-transparent pointer-events-none" />
    </section>
  );
}

