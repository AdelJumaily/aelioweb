"use client";

import React, { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function ContactCTA() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(headingRef.current, {
        opacity: 0,
        y: 40,
        duration: 1,
        scrollTrigger: {
          trigger: headingRef.current,
          start: "top 80%",
          toggleActions: "play none none none",
        },
        ease: "power3.out",
      });

      gsap.from(textRef.current, {
        opacity: 0,
        y: 30,
        duration: 0.8,
        delay: 0.1,
        scrollTrigger: {
          trigger: textRef.current,
          start: "top 80%",
          toggleActions: "play none none none",
        },
        ease: "power3.out",
      });

      gsap.from(buttonsRef.current?.children || [], {
        opacity: 0,
        y: 20,
        duration: 0.6,
        delay: 0.2,
        stagger: 0.1,
        scrollTrigger: {
          trigger: buttonsRef.current,
          start: "top 80%",
          toggleActions: "play none none none",
        },
        ease: "power3.out",
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={sectionRef} 
      className="py-40 px-6 md:px-10 bg-[#FF5722] text-white"
    >
      <div className="max-w-4xl mx-auto text-center">
        <h2
          ref={headingRef}
          className="text-[clamp(2.5rem,5vw,4rem)] font-bold mb-6"
        >
          Ready to Build Something Exceptional?
        </h2>
        <p
          ref={textRef}
          className="text-xl opacity-90 mb-10"
        >
          Let&apos;s discuss your project and see how we can help you grow.
        </p>
        <div
          ref={buttonsRef}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Link
            href="/contact"
            className="px-8 py-4 bg-white text-[#0A0A0A] rounded-lg font-medium hover:bg-[#FAFAF8] transition-colors"
          >
            Start a Project
          </Link>
          <Link
            href="/services"
            className="px-8 py-4 border-2 border-white text-white rounded-lg font-medium hover:bg-white/10 transition-colors"
          >
            View Services
          </Link>
        </div>
      </div>
    </section>
  );
}

