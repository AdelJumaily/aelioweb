"use client";

import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import GradualBlur from "../../../components/animations/GradualBlur";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const processSteps = [
  "Discovery",
  "Strategy",
  "Design",
  "Development",
  "Launch",
  "Ongoing care",
];

export default function ProcessSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const stepsRef = useRef<HTMLDivElement>(null);
  const photoRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    // Animate title
    if (titleRef.current) {
      gsap.fromTo(
        titleRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: titleRef.current,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        }
      );
    }

    // Animate process steps
    if (stepsRef.current) {
      gsap.fromTo(
        stepsRef.current.children,
        { opacity: 0, y: 20, scale: 0.9 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.6,
          stagger: 0.1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: stepsRef.current,
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
      ref={sectionRef}
      id="process"
      className="relative bg-[#5C4F42] px-6 md:px-12 lg:px-20 py-24 md:py-32 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto">
        <h2
          ref={titleRef}
          className="text-3xl md:text-4xl lg:text-5xl mb-12 text-center text-white font-normal"
        >
          Our website design & care process
        </h2>

        <div ref={stepsRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {processSteps.map((label, index) => (
            <div
              key={label}
              className="flex flex-col items-center gap-3 text-center transition-transform hover:scale-105"
            >
              <div className="flex items-center justify-center w-16 h-16 rounded-full bg-[#E6672E] text-white text-lg font-semibold shadow-lg">
                {index + 1}
              </div>
              <span className="text-sm font-medium text-white">
                {label}
              </span>
            </div>
          ))}
        </div>

        {/* Photo spot */}
        <div
          ref={photoRef}
          className="relative w-full h-[300px] md:h-[400px] bg-white/5 border-2 border-dashed border-white/20 rounded-lg flex items-center justify-center mt-8"
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
            <p className="text-white/50 text-sm">Process Image</p>
          </div>
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

