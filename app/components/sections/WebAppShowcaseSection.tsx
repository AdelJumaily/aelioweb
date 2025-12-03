"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

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

const tabs = [
  { id: "web", label: "Web experiences" },
  { id: "mobile", label: "Mobile apps" },
  { id: "brand", label: "Brand & strategy" },
];

const webCards = [
  { title: "Conversion-focused websites", description: "Sites that turn visitors into customers" },
  { title: "Bespoke web apps & portals", description: "Custom applications built for your workflow" },
];

const mobileCards = [
  { title: "Native & cross-platform apps", description: "iOS and Android experiences" },
  { title: "Progressive web apps", description: "Fast, app-like web experiences" },
];

const brandCards = [
  { title: "Brand & digital systems", description: "Complete visual identity systems" },
  { title: "Design systems", description: "Scalable component libraries" },
];

export default function WebAppShowcaseSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const t = useTransform(scrollYProgress, (progress) => clamp01(progress));

  // Tab switching animation
  const activeTab = useTransform(t, (val) => {
    if (val < 0.4) return 0; // Web
    if (val < 0.7) return 1; // Mobile
    return 2; // Brand
  });

  // Web cards
  const webCardsOpacity = useTransform(t, (val) => {
    if (val < 0.3) return mapRange(val, 0, 0.3, 0, 1);
    if (val < 0.5) return mapRange(val, 0.3, 0.5, 1, 0);
    return 0;
  });

  const webCardsX = useTransform(t, (val) => {
    if (val < 0.3) return 0;
    if (val < 0.5) {
      const u = clamp01((val - 0.3) / (0.5 - 0.3));
      return lerp(0, -100, smoothStep(u));
    }
    return -100;
  });

  // Mobile cards
  const mobileCardsOpacity = useTransform(t, (val) => {
    if (val < 0.4) return 0;
    if (val < 0.6) return mapRange(val, 0.4, 0.6, 0, 1);
    if (val < 0.8) return mapRange(val, 0.6, 0.8, 1, 0);
    return 0;
  });

  const mobileCardsX = useTransform(t, (val) => {
    if (val < 0.4) return 100;
    if (val < 0.6) {
      const u = clamp01((val - 0.4) / (0.6 - 0.4));
      return lerp(100, 0, smoothStep(u));
    }
    if (val < 0.8) {
      const u = clamp01((val - 0.6) / (0.8 - 0.6));
      return lerp(0, -100, smoothStep(u));
    }
    return -100;
  });

  // Brand cards
  const brandCardsOpacity = useTransform(t, (val) => {
    if (val < 0.7) return 0;
    return mapRange(val, 0.7, 0.9, 0, 1);
  });

  const brandCardsX = useTransform(t, (val) => {
    if (val < 0.7) return 100;
    if (val < 0.9) {
      const u = clamp01((val - 0.7) / (0.9 - 0.7));
      return lerp(100, 0, smoothStep(u));
    }
    return 0;
  });

  // Tab indicator position
  const tabIndicatorX = useTransform(t, (val) => {
    if (val < 0.4) return "0%";
    if (val < 0.7) return "33.33%";
    return "66.66%";
  });

  return (
    <section
      ref={containerRef}
      className="relative bg-[#1a1a1a] py-32"
      style={{ height: "200vh" }}
    >
      <div className="sticky top-0 h-screen flex items-center justify-center px-6 md:px-12 lg:px-20">
        <div className="max-w-7xl w-full">
          {/* Tab Selector */}
          <div className="relative mb-16">
            <div className="flex gap-2 bg-white/5 rounded-full p-2 backdrop-blur-sm border border-white/10">
              {tabs.map((tab, index) => (
                <button
                  key={tab.id}
                  className="relative flex-1 px-6 py-3 text-sm font-medium text-white/70 rounded-full transition-colors"
                >
                  {tab.label}
                </button>
              ))}
              {/* Active indicator */}
              <motion.div
                className="absolute top-2 bottom-2 bg-white/10 rounded-full"
                style={{
                  left: tabIndicatorX,
                  width: "calc(33.33% - 4px)",
                }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              />
            </div>
          </div>

          {/* Cards Container */}
          <div className="relative h-96 overflow-hidden">
            {/* Web Cards */}
            <motion.div
              className="absolute inset-0 flex gap-6"
              style={{
                opacity: webCardsOpacity,
                x: webCardsX,
              }}
            >
              {webCards.map((card, index) => (
                <div
                  key={index}
                  className="flex-shrink-0 w-80 bg-white/5 rounded-2xl p-8 border border-white/10"
                >
                  <h3 className="text-2xl font-bold text-white mb-3">
                    {card.title}
                  </h3>
                  <p className="text-white/70">{card.description}</p>
                </div>
              ))}
            </motion.div>

            {/* Mobile Cards */}
            <motion.div
              className="absolute inset-0 flex gap-6"
              style={{
                opacity: mobileCardsOpacity,
                x: mobileCardsX,
              }}
            >
              {mobileCards.map((card, index) => (
                <div
                  key={index}
                  className="flex-shrink-0 w-80 bg-white/5 rounded-2xl p-8 border border-white/10"
                >
                  <h3 className="text-2xl font-bold text-white mb-3">
                    {card.title}
                  </h3>
                  <p className="text-white/70">{card.description}</p>
                </div>
              ))}
            </motion.div>

            {/* Brand Cards */}
            <motion.div
              className="absolute inset-0 flex gap-6"
              style={{
                opacity: brandCardsOpacity,
                x: brandCardsX,
              }}
            >
              {brandCards.map((card, index) => (
                <div
                  key={index}
                  className="flex-shrink-0 w-80 bg-white/5 rounded-2xl p-8 border border-white/10"
                >
                  <h3 className="text-2xl font-bold text-white mb-3">
                    {card.title}
                  </h3>
                  <p className="text-white/70">{card.description}</p>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}


