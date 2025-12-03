"use client";

import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import GradualBlur from "../../../components/animations/GradualBlur";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const factBoxes = [
  { text: "Founded in 2022", isOrange: true },
  { text: "Headquartered in Europe", isOrange: false },
  { text: "Platform-first, people-focused", isOrange: false },
  { text: "Built for the real world", isOrange: false },
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
      className="relative bg-[#5C4F42] text-white px-6 md:px-12 lg:px-20 py-24 md:py-32 overflow-hidden"
    >
      <div className="relative max-w-7xl mx-auto">
        {/* Large Headline */}
        <h2
          ref={headlineRef}
          className="text-4xl md:text-5xl lg:text-6xl font-normal leading-tight mb-12 md:mb-16 text-white max-w-5xl"
        >
          Aelio was built for the complex, disconnected reality of modern web
          development— and for the people doing their best to manage it.
        </h2>

        {/* Two Column Text Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 mb-12 md:mb-16">
          {/* Left Column */}
          <div ref={leftColRef} className="space-y-6">
            <p className="text-base md:text-lg leading-relaxed text-white">
              Founded in 2022, Aelio came out of a simple but frustrating
              pattern: web platforms were either too rigid to adapt or too
              light to scale. Developers, designers, and business owners were
              stuck between workarounds and chaos — with no solution designed to
              handle the way real decisions happen.
            </p>
            <p className="text-base md:text-lg leading-relaxed text-white">
              We believed there had to be a better way: one that could connect
              strategy to execution, planning to action, and people to outcomes —
              without ripping out what teams already use.
            </p>
          </div>

          {/* Right Column */}
          <div ref={rightColRef} className="space-y-6">
            <p className="text-base md:text-lg leading-relaxed text-white">
              Today, Aelio helps businesses around the world reduce friction,
              fix misalignment, and make smarter web decisions with less effort.
              Our product evolves with the market — because it was designed to.
            </p>
            <p className="text-base md:text-lg leading-relaxed text-white">
              We&apos;re here to make complex problems easier to manage, not
              more complicated to understand. That&apos;s our philosophy.
              That&apos;s the product.
            </p>
          </div>
        </div>

        {/* Photo spot */}
        <div
          ref={photoRef}
          className="relative w-full h-[250px] md:h-[350px] bg-white/5 border-2 border-dashed border-white/20 rounded-lg flex items-center justify-center mb-16 md:mb-20"
        >
          <div className="text-center">
            <svg
              className="w-16 h-16 mx-auto mb-4 text-white/30"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
            <p className="text-white/50 text-sm">Content Image</p>
          </div>
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
                box.isOrange
                  ? "bg-[#E6672E]"
                  : "bg-[#5C4F42] border border-white/10"
              }`}
            >
              <p className="text-white text-sm md:text-base font-medium">
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

