"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

interface Card {
  id: string;
  title: string;
  description: string;
  image?: string;
  gradient?: string;
  backgroundColor?: string;
  textColor?: string;
}

interface HorizontalStorySectionProps {
  cards: Card[];
  scrollHeight?: number; // Height in vh (default: cards.length * 100vh)
  headingText?: string;
}

export default function HorizontalStorySection({
  cards,
  scrollHeight,
  headingText,
}: HorizontalStorySectionProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [viewportWidth, setViewportWidth] = useState(0);

  // Get viewport width on mount and resize
  useEffect(() => {
    if (typeof window !== "undefined") {
      setViewportWidth(window.innerWidth);
      const handleResize = () => setViewportWidth(window.innerWidth);
      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }
  }, []);

  // Calculate card width - if heading exists, leave space on left (300px), otherwise full width
  const cardWidth = headingText 
    ? (viewportWidth || 1000) - 300 
    : (viewportWidth || 1000);
  
  // Calculate total width needed - each card takes cardWidth
  const totalWidth = cards.length * cardWidth;

  // Scroll progress: 0 when section enters viewport, 1 when last card is fully visible
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Calculate max translate - move from first card to last card
  // If heading exists, start cards from right of heading
  const startOffset = headingText ? 300 : 0;
  const maxTranslate = viewportWidth > 0 
    ? -(totalWidth - (viewportWidth - startOffset))
    : 0;

  // Map scroll progress to horizontal position with smooth easing - slower scroll
  const translateX = useTransform(scrollYProgress, (progress) => {
    if (viewportWidth === 0) return 0;
    // Use smoother, slower easing for transitions
    const eased = progress * progress * progress * (progress * (progress * 6 - 15) + 10); // Ease in-out cubic
    // Start from right of heading if heading exists
    const startOffset = headingText ? 300 : 0;
    return startOffset + (eased * maxTranslate);
  });

  // Create transforms for each card (must be outside map to follow hooks rules)
  const cardTransforms = cards.map((_, index) => {
    const cardStart = index / cards.length;
    const cardEnd = (index + 1) / cards.length;
    const cardCenter = (cardStart + cardEnd) / 2;

    const opacity = useTransform(scrollYProgress, (progress) => {
      // Fade in/out as card enters/exits center
      if (progress < cardStart - 0.1) return 0;
      if (progress > cardEnd + 0.1) return 0;
      if (progress >= cardStart && progress <= cardEnd) {
        // Peak opacity when centered
        const distanceFromCenter = Math.abs(progress - cardCenter);
        const maxDistance = (cardEnd - cardStart) / 2;
        return 1 - (distanceFromCenter / maxDistance) * 0.3;
      }
      return 1;
    });

    const scale = useTransform(scrollYProgress, (progress) => {
      // Scale up when centered
      if (progress < cardStart - 0.1) return 0.95;
      if (progress > cardEnd + 0.1) return 0.95;
      const distanceFromCenter = Math.abs(progress - cardCenter);
      const maxDistance = (cardEnd - cardStart) / 2;
      return 1 - (distanceFromCenter / maxDistance) * 0.05;
    });

    const rotationY = useTransform(scrollYProgress, (progress) => {
      const distanceFromCenter = progress - cardCenter;
      // Rotate based on distance from center (max 15 degrees)
      return distanceFromCenter * 15;
    });

    return { opacity, scale, rotationY };
  });

  return (
    <div
      ref={containerRef}
      className="relative bg-[#f5f1e8]"
      style={{ height: `${scrollHeight || cards.length * 100}vh` }}
    >
      {/* Sticky container */}
      <div className="sticky top-0 h-screen overflow-hidden flex items-center py-4">
        {/* Left side - "What About Aelio?" heading */}
        {headingText && (
          <div className="absolute left-6 md:left-12 lg:left-20 z-20 top-1/2 -translate-y-1/2">
            <div className="relative">
              <div className="absolute -top-2 -right-2 w-2 h-2 bg-black rounded-full" />
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-black leading-tight">
                {headingText.split('\n').map((line, i) => (
                  <span key={i}>
                    {line}
                    {i < headingText.split('\n').length - 1 && <br />}
                  </span>
                ))}
              </h2>
            </div>
          </div>
        )}

        {/* Cards container */}
        <motion.div
          className="flex items-center h-full w-full"
          style={{
            x: translateX,
          }}
        >
          {cards.map((card, index) => {
            const { opacity, scale, rotationY } = cardTransforms[index];

            return (
              <motion.div
                key={card.id}
                className="flex-shrink-0 flex items-center justify-center px-4 md:px-6"
                style={{
                  opacity,
                  scale,
                  perspective: "1000px",
                  width: `${cardWidth}px`,
                }}
              >
                <motion.div
                  className={`w-full max-w-md h-[75vh] flex flex-col justify-center p-6 md:p-8 lg:p-10 rounded-3xl ${
                    card.gradient
                      ? `bg-gradient-to-br ${card.gradient}`
                      : card.backgroundColor || "bg-white"
                  }`}
                  style={{
                    rotateY: rotationY,
                    boxShadow: "0 20px 60px rgba(0, 0, 0, 0.15), 0 0 0 1px rgba(0, 0, 0, 0.05), inset 0 1px 0 rgba(255, 255, 255, 0.5)",
                    transformStyle: "preserve-3d",
                  }}
                >
                  <div className="w-full">
                    {card.image && (
                      <div className="w-full h-36 md:h-40 overflow-hidden rounded-2xl mb-3">
                        <img
                          src={card.image}
                          alt={card.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}
                    <div style={{ color: card.textColor || "#1a1a1a" }}>
                      <h3 className="text-lg md:text-xl lg:text-2xl font-bold mb-2 md:mb-3 leading-tight">
                        {card.title}
                      </h3>
                      <p className="text-xs md:text-sm leading-relaxed opacity-90">
                        {card.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </div>
  );
}
