"use client";

import React, { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const subheadRef = useRef<HTMLParagraphElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Staggered fade-in animations
      gsap.from(headingRef.current, {
        opacity: 0,
        y: 60,
        duration: 1.2,
        ease: "power3.out",
      });

      gsap.from(subheadRef.current, {
        opacity: 0,
        y: 40,
        duration: 1,
        delay: 0.3,
        ease: "power3.out",
      });

      gsap.from(buttonsRef.current?.children || [], {
        opacity: 0,
        x: -30,
        duration: 0.8,
        delay: 0.6,
        stagger: 0.15,
        ease: "power3.out",
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);


  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex items-center px-6 md:px-10 lg:px-20 overflow-hidden bg-[#F5F5F0]"
    >

      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center relative z-10 pt-32 pb-20">
        {/* Left Side - Content */}
        <div className="space-y-8 relative z-20">
          <h1
            ref={headingRef}
            className="text-[clamp(3rem,6vw,5.5rem)] font-bold leading-[1.1] text-[#0A0A0A]"
          >
            Design-led websites that feel expensive.
          </h1>

          <p
            ref={subheadRef}
            className="text-xl md:text-2xl leading-relaxed text-[#6B6B6B] max-w-xl"
          >
            Aelio is a boutique digital studio crafting modern, conversion-ready web experiences for ambitious brands.
          </p>

          <div ref={buttonsRef} className="flex flex-col sm:flex-row gap-4 pt-4">
            <Link
              href="/work"
              className="px-8 py-4 bg-[#FF5722] text-white rounded-lg font-medium hover:bg-[#E64A19] transition-colors text-center"
            >
              View Work
            </Link>
            <Link
              href="/contact"
              className="px-8 py-4 border-2 border-[#0A0A0A] text-[#0A0A0A] rounded-lg font-medium hover:bg-[#0A0A0A] hover:text-white transition-colors text-center"
            >
              Get a Proposal
            </Link>
          </div>
        </div>

        {/* Right Side - Placeholder for future content */}
        <div className="relative w-full h-full min-h-[400px] lg:min-h-[500px] bg-gray-100 rounded-lg">
          {/* Add your content here */}
        </div>
      </div>
    </section>
  );
}


