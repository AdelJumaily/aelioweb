"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

interface SceneTransitionSectionProps {
  // Video
  initialVideo?: string;
  intermediateText?: string;
  heroCtaText?: string;
  cardCtaText?: string;

  // Animation settings
  scrollHeight?: number; // Height in vh (default: 300vh)
}

// Helper functions
const clamp01 = (value: number) => Math.max(0, Math.min(1, value));
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
const smoothStep = (t: number) => t * t * (3 - 2 * t);
const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);
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

export default function SceneTransitionSection({
  initialVideo,
  intermediateText = "we create",
  heroCtaText = "UNIQUE GRAPHICS",
  cardCtaText = "INTUITIVE UX SOLUTIONS",
  scrollHeight = 400,
}: SceneTransitionSectionProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [viewportWidth, setViewportWidth] = useState(0);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setViewportWidth(window.innerWidth);
      const handleResize = () => setViewportWidth(window.innerWidth);
      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Normalized progress t ∈ [0, 1]
  const t = useTransform(scrollYProgress, (progress) => clamp01(progress));

  // ===== SCENE 2: VIDEO WITH "UNIQUE GRAPHICS" TAG (t ≈ 0.05 → 0.6) =====
  // Video/Animation box scale - expands continuously to fill full page
  const videoScale = useTransform(t, (val) => {
    if (val < 0.1) return 0.85; // Start smaller
    if (val < 0.25) {
      // Scale up to normal size (0.85 → 1)
      const u = clamp01((val - 0.1) / (0.25 - 0.1));
      return lerp(0.85, 1, smoothStep(u));
    }
    if (val < 0.6) {
      // Continuously expand to fill full page (1 → 2.8)
      // This makes the video take up the entire viewport
      const u = clamp01((val - 0.25) / (0.6 - 0.25));
      return lerp(1, 2.8, smoothStep(u));
    }
    // Stay at full size during transition
    return 2.8;
  });

  // "UNIQUE GRAPHICS" tag appears with video - fades out as video expands
  const tagOpacity = useTransform(t, (val) => {
    if (val < 0.15) return 0;
    if (val < 0.3) return mapRange(val, 0.15, 0.3, 0, 1);
    if (val < 0.45) return 1; // Visible during expansion
    // Fade out as video gets very large
    if (val < 0.55) return mapRange(val, 0.45, 0.55, 1, 0);
    return 0;
  });

  const tagOffsetY = useTransform(t, (val) => {
    if (val < 0.15) return 20;
    const u = mapRange(val, 0.15, 0.3, 0, 1);
    return lerp(20, 0, u);
  });

  // ===== SCENE 3: DASHBOARD (t ≈ 0.6 → 1.0) =====
  // Dark overlay - starts appearing as video reaches full size
  const overlayOpacity = useTransform(t, (val) => {
    return mapRange(val, 0.6, 0.75, 0, 1);
  });

  // Dashboard frame - appears at full size, then zooms out gradually
  const frameOpacity = useTransform(t, (val) => {
    if (val < 0.6) return 0;
    const u = clamp01((val - 0.6) / (0.75 - 0.6));
    return lerp(0, 1, smoothStep(u));
  });

  const frameScale = useTransform(t, (val) => {
    if (val < 0.6) return 1.2; // Start at large size (full screen)
    if (val < 0.75) {
      // Fade in at large scale (1.2)
      const u = clamp01((val - 0.6) / (0.75 - 0.6));
      return lerp(1.2, 1.2, smoothStep(u)); // Stay large during fade in
    }
    if (val < 1.0) {
      // Zoom out gradually (1.2 → 0.95)
      const u = clamp01((val - 0.75) / (1.0 - 0.75));
      return lerp(1.2, 0.95, smoothStep(u));
    }
    // End at slightly smaller than normal for final view
    return 0.95;
  });

  const frameOffsetY = useTransform(t, (val) => {
    if (val < 0.6) return 0;
    if (val < 0.75) {
      const u = clamp01((val - 0.6) / (0.75 - 0.6));
      return lerp(0, 0, smoothStep(u)); // Stay centered during fade in
    }
    // Slight upward movement as it zooms out
    const u = clamp01((val - 0.75) / (1.0 - 0.75));
    return lerp(0, -20, smoothStep(u));
  });

  const frameBorderRadius = useTransform(t, (val) => {
    const u = clamp01((val - 0.4) / (0.7 - 0.4));
    return lerp(0, 32, smoothStep(u));
  });

  // Video zooms out into card (t ≈ 0.6 → 0.8)
  const cardVideoScale = useTransform(t, (val) => {
    if (val < 0.6) return 2.8; // Match the full-screen video scale
    const u = clamp01((val - 0.6) / (0.8 - 0.6));
    return lerp(2.8, 0.35, smoothStep(u));
  });

  const cardVideoX = useTransform(t, (val) => {
    if (val < 0.6) return 0;
    const u = clamp01((val - 0.6) / (0.8 - 0.6));
    return lerp(0, 0, smoothStep(u));
  });

  const cardVideoY = useTransform(t, (val) => {
    if (val < 0.6) return 0;
    const u = clamp01((val - 0.6) / (0.8 - 0.6));
    return lerp(0, -30, smoothStep(u));
  });

  const cardVideoBorderRadius = useTransform(t, (val) => {
    if (val < 0.6) return 0;
    const u = clamp01((val - 0.6) / (0.8 - 0.6));
    return lerp(0, 24, smoothStep(u));
  });

  // Card CTA
  const cardCtaOpacity = useTransform(t, (val) => {
    return mapRange(val, 0.8, 0.9, 0, 1);
  });

  const cardCtaOffsetY = useTransform(t, (val) => {
    const u = mapRange(val, 0.8, 0.9, 0, 1);
    return lerp(20, 0, u);
  });

  // Dashboard columns
  const leftColumnOpacity = useTransform(t, (val) => {
    return mapRange(val, 0.75, 0.85, 0, 1);
  });

  const rightColumnOpacity = useTransform(t, (val) => {
    return mapRange(val, 0.8, 0.9, 0, 1);
  });

  const controlsOpacity = useTransform(t, (val) => {
    return mapRange(val, 0.8, 0.92, 0, 1);
  });

  // Extract YouTube video ID
  const getYouTubeEmbedUrl = (url: string) => {
    const match = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\n?#]+)/);
    if (match) {
      const videoId = match[1];
      return `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&loop=1&playlist=${videoId}&controls=0&modestbranding=1&rel=0`;
    }
    return url;
  };

  const videoUrl = initialVideo || "https://www.youtube.com/watch?v=PVGeM40dABA";

  return (
    <section
      id="hero-animation"
      ref={containerRef}
      className="relative bg-[#f5f1e8]"
      style={{ height: `${scrollHeight}vh` }}
    >
      {/* Sticky wrapper */}
      <div className="sticky top-0 h-screen overflow-hidden" style={{ zIndex: 1 }}>
        {/* Horizontal scroll container */}
        <motion.div 
          className="absolute inset-0 flex"
          style={{
            x: useTransform(t, (val) => {
              // As we scroll, move the entire container to the left
              // This creates the horizontal scroll effect
              // Start earlier and make it slower/more gradual
              if (viewportWidth === 0) return 0;
              // Start scrolling at t=0.05, complete by t=0.5 (longer, slower transition)
              if (val < 0.05) return 0; // Stay at "we create" initially
              if (val < 0.5) {
                const u = clamp01((val - 0.05) / (0.5 - 0.05));
                // Use easeOut for slower, more gradual movement
                const eased = easeOut(u);
                // Move from 0 to -100vw (one screen width to the left)
                return lerp(0, -viewportWidth, eased);
              }
              // After 0.5, keep it at -100vw (video is centered)
              return -viewportWidth;
            }),
          }}
        >
          {/* Scene 1: "we create" Text */}
          <div className="scene-text flex-shrink-0 w-screen h-full flex items-center justify-center bg-[#f5f1e8]">
            <h2 className="text-6xl md:text-8xl lg:text-9xl font-normal text-gray-900">
              {intermediateText}
            </h2>
          </div>

          {/* Scene 2: Video with "UNIQUE GRAPHICS" tag */}
          <motion.div
            className="scene-video flex-shrink-0 w-screen h-full flex items-center justify-center bg-[#f5f1e8]"
            style={{
              opacity: useTransform(t, (val) => {
                // Show earlier - start appearing as soon as we start scrolling
                // Fade in gradually from 0.05 to 0.15, stay visible during expansion until 0.55, then fade out
                if (val < 0.05) return 0;
                if (val < 0.15) return mapRange(val, 0.05, 0.15, 0, 1);
                if (val < 0.6) return 1; // Stay visible during full expansion phase
                if (val < 0.7) return mapRange(val, 0.6, 0.7, 1, 0); // Fade out as dashboard appears
                return 0;
              }),
            }}
          >
            {/* Video/Animation box */}
            <motion.div
              className="video-container w-full max-w-5xl aspect-video relative"
              style={{
                scale: videoScale,
                transformOrigin: "center center",
              }}
            >
              <div className="w-full h-full bg-black rounded-3xl overflow-hidden shadow-2xl">
                <iframe
                  src={getYouTubeEmbedUrl(videoUrl)}
                  className="w-full h-full"
                  allow="autoplay; encrypted-media"
                  allowFullScreen
                  title="Animation video"
                />
              </div>

              {/* "UNIQUE GRAPHICS" tag below video */}
              <motion.div
                className="absolute -bottom-16 left-1/2 -translate-x-1/2"
                style={{
                  opacity: tagOpacity,
                  y: tagOffsetY,
                }}
              >
                <div className="px-8 py-4 bg-white/90 backdrop-blur-sm text-black rounded-full text-base font-semibold shadow-xl">
                  {heroCtaText}
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Dark overlay */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-[#1a1a1a] to-[#0a0a0a] pointer-events-none"
          style={{ opacity: overlayOpacity }}
        />

        {/* Scene 3: Dashboard */}
        <motion.div
          className="scene-dashboard absolute inset-0 flex items-center justify-center p-8 md:p-12 lg:p-16"
          style={{
            opacity: frameOpacity,
            scale: frameScale,
            y: frameOffsetY,
          }}
        >
          {/* Dashboard frame */}
          <motion.div
            className="dashboard-frame w-full max-w-7xl h-full bg-[#1a1a1a] rounded-3xl overflow-hidden shadow-2xl relative"
            style={{
              borderRadius: frameBorderRadius,
            }}
          >
            {/* Top Navigation Bar */}
            <div className="absolute top-0 left-0 right-0 h-16 bg-[#1a1a1a] border-b border-white/10 flex items-center justify-between px-6 z-20">
              <div className="flex items-center gap-8">
                <a href="#" className="text-white/70 hover:text-white text-sm">
                  Home
                </a>
                <a href="#" className="text-white/70 hover:text-white text-sm">
                  About
                </a>
                <a href="#" className="text-white/70 hover:text-white text-sm">
                  Works
                </a>
                <a href="#" className="text-white/70 hover:text-white text-sm">
                  Contact us
                </a>
              </div>
              <button className="px-4 py-2 bg-[#4ade80] text-white rounded-lg text-sm font-medium hover:bg-[#3dd16f] transition-colors">
                Let&apos;s Talk
              </button>
            </div>

            {/* Main Content Area */}
            <div className="absolute top-16 left-0 right-0 bottom-0 flex">
              {/* Column Left */}
              <motion.div
                className="column-left w-20 bg-[#1a1a1a] border-r border-white/10 flex flex-col items-center pt-6"
                style={{ opacity: leftColumnOpacity }}
              >
                <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center mb-6">
                  <span className="text-white text-lg font-bold">Q</span>
                </div>
                <div className="flex flex-col gap-4">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <div
                      key={i}
                      className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center"
                    >
                      <div className="w-2 h-2 rounded-full bg-white/40" />
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Column Center */}
              <div className="flex-1 flex flex-col p-6">
                {/* Top Section */}
                <motion.div
                  className="mb-6"
                  style={{ opacity: controlsOpacity }}
                >
                  <div className="h-12 bg-white/5 rounded-lg mb-6 border border-white/10" />
                  <div className="grid grid-cols-4 gap-4 mb-4">
                    {[1, 2, 3, 4].map((i) => (
                      <div
                        key={i}
                        className="bg-white/5 rounded-xl p-4 border border-white/10"
                      >
                        <div className="flex items-center justify-between">
                          <div className="w-8 h-8 bg-white/10 rounded" />
                          <div className="flex flex-col gap-1">
                            <div className="w-12 h-1 bg-white/20 rounded" />
                            <div className="w-10 h-1 bg-white/20 rounded" />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="flex items-center gap-2">
                    {[1, 2, 3, 4].map((i) => (
                      <div
                        key={i}
                        className="w-2 h-2 rounded-full bg-white/20"
                      />
                    ))}
                    <div className="w-2 h-2 rounded-full bg-red-500" />
                  </div>
                </motion.div>

                {/* Main Card with Video */}
                <div className="flex-1 flex items-center justify-center">
                  <div className="card-main w-full max-w-2xl">
                    {/* Card Video - morphs from full video */}
                    <motion.div
                      className="card-video relative mb-4 overflow-hidden"
                      style={{
                        scale: cardVideoScale,
                        x: cardVideoX,
                        y: cardVideoY,
                        borderRadius: cardVideoBorderRadius,
                        transformOrigin: "center center",
                      }}
                    >
                      <div className="w-full aspect-video bg-black rounded-2xl overflow-hidden">
                        <iframe
                          src={getYouTubeEmbedUrl(videoUrl)}
                          className="w-full h-full"
                          allow="autoplay; encrypted-media"
                          allowFullScreen
                          title="Card video"
                        />
                      </div>
                    </motion.div>

                    {/* Card CTA */}
                    <motion.div
                      className="card-cta text-center"
                      style={{
                        opacity: cardCtaOpacity,
                        y: cardCtaOffsetY,
                      }}
                    >
                      <div className="px-8 py-4 bg-white/10 backdrop-blur-sm text-white rounded-full text-base font-semibold inline-block border border-white/20">
                        {cardCtaText}
                      </div>
                    </motion.div>
                  </div>
                </div>
              </div>

              {/* Column Right */}
              <motion.div
                className="column-right w-80 bg-[#1a1a1a] border-l border-white/10 p-6 overflow-y-auto"
                style={{ opacity: rightColumnOpacity }}
              >
                <div className="space-y-4">
                  {[1, 2, 3].map((i) => (
                    <div
                      key={i}
                      className="bg-white/5 rounded-xl p-4 border border-white/10"
                    >
                      <div className="space-y-2 mb-3">
                        <div className="h-2 bg-white/10 rounded w-full" />
                        <div className="h-2 bg-white/10 rounded w-3/4" />
                      </div>
                      <div className="h-24 bg-white/5 rounded-lg" />
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>

        {/* Curved bottom edge for smooth transition */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#f5f1e8] to-transparent pointer-events-none" />
      </div>
    </section>
  );
}
