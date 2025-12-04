"use client";

import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import GradualBlur from "../../../components/animations/GradualBlur";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const factBoxes = [
  { text: "Custom solutions only", isHighlight: true },
  { text: "3-5 week delivery", isHighlight: false },
  { text: "Ongoing support available", isHighlight: false },
  { text: "Performance focused", isHighlight: false },
];

export default function MaintenanceSection() {
  const contentRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const leftColRef = useRef<HTMLDivElement>(null);
  const rightColRef = useRef<HTMLDivElement>(null);
  const photoRef = useRef<HTMLDivElement>(null);
  const boxesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!contentRef.current) return;

    // Animate headline
    if (headlineRef.current) {
      gsap.fromTo(
        headlineRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: headlineRef.current,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        }
      );
    }

    // Animate columns
    if (leftColRef.current) {
      gsap.fromTo(
        leftColRef.current.children,
        { opacity: 0, x: -30 },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          stagger: 0.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: leftColRef.current,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        }
      );
    }

    if (rightColRef.current) {
      gsap.fromTo(
        rightColRef.current.children,
        { opacity: 0, x: 30 },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          stagger: 0.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: rightColRef.current,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        }
      );
    }

    // Animate photo
    if (photoRef.current) {
      gsap.fromTo(
        photoRef.current,
        { opacity: 0, scale: 0.95 },
        {
          opacity: 1,
          scale: 1,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: {
            trigger: photoRef.current,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        }
      );
    }

    // Animate fact boxes
    if (boxesRef.current) {
      gsap.fromTo(
        boxesRef.current.children,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: boxesRef.current,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        }
      );
    }

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <section
      ref={contentRef}
      className="relative bg-[#f5f1e8] px-6 md:px-12 lg:px-20 py-24 md:py-32 overflow-hidden"
    >
      <div className="relative max-w-7xl mx-auto">
        {/* Large Headline */}
        <h2
          ref={headlineRef}
          className="text-4xl md:text-5xl lg:text-6xl font-normal leading-tight mb-12 md:mb-16 text-black max-w-5xl"
        >
          We translate research into solutions
        </h2>

        {/* Two Column Text Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 mb-12 md:mb-16">
          {/* Left Column */}
          <div ref={leftColRef} className="space-y-6">
            <p className="text-base md:text-lg leading-relaxed text-black/80">
              We offer a complete process from discovery, branding, design, launch to post-launch optimization and testing. Every project starts with understanding your business, your audience, and your goals.
            </p>
            <p className="text-base md:text-lg leading-relaxed text-black/80">
              From startups to established enterprises, we work with brands that care about every pixel, every interaction, and every moment of their customer&apos;s journey.
            </p>
          </div>

          {/* Right Column */}
          <div ref={rightColRef} className="space-y-6">
            <p className="text-base md:text-lg leading-relaxed text-black/80">
              We don&apos;t just build websites—we craft complete brand experiences that resonate, convert, and elevate your business across every touchpoint.
            </p>
            <p className="text-base md:text-lg leading-relaxed text-black/80">
              Excellence: We strive for perfection in every project. Innovation: We embrace new technologies and creative solutions. Partnership: We build long-term relationships with our clients.
            </p>
          </div>
        </div>

        {/* Content Image */}
        <div
          ref={photoRef}
          className="relative w-full h-[250px] md:h-[350px] rounded-3xl overflow-hidden shadow-2xl mb-16 md:mb-20"
        >
          <img
            src="https://images.unsplash.com/photo-1557682268-e3955ed5d83f?w=1200&h=600&fit=crop&q=80"
            alt="Modern creative space"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Four Fact Boxes */}
        <div
          ref={boxesRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6"
        >
          {factBoxes.map((box, index) => (
            <div
              key={index}
              className={`rounded-lg p-6 text-center transition-transform hover:scale-105 ${
                box.isHighlight
                  ? "bg-black text-white"
                  : "bg-white/50 border border-black/10 text-black"
              }`}
            >
              <p className="text-sm md:text-base font-medium">
                {box.text}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Gradual Blur at bottom */}
      <GradualBlur
        target="parent"
        position="bottom"
        height="6rem"
        strength={2}
        divCount={5}
        curve="bezier"
        exponential={true}
        opacity={1}
      />
    </section>
  );
}

