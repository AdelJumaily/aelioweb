"use client";

import React, { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import Image from "next/image";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function ContactCTA() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);
  const buttonRef = useRef<HTMLAnchorElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

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

      gsap.from(buttonRef.current, {
        opacity: 0,
        y: 20,
        duration: 0.6,
        delay: 0.2,
        scrollTrigger: {
          trigger: buttonRef.current,
          start: "top 80%",
          toggleActions: "play none none none",
        },
        ease: "power3.out",
      });

      gsap.from(imageRef.current, {
        opacity: 0,
        scale: 1.05,
        duration: 1.2,
        delay: 0.3,
        scrollTrigger: {
          trigger: imageRef.current,
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
      className="relative py-32 md:py-40 px-6 md:px-10 bg-[#F5F5F0] overflow-hidden"
    >
      {/* Background Image with Fade */}
      <div 
        ref={imageRef}
        className="absolute inset-0 w-full h-full"
      >
        <div className="absolute inset-0 bg-gradient-to-b from-[#F5F5F0] via-[#F5F5F0]/80 to-transparent z-10" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#F5F5F0] via-[#F5F5F0]/60 to-transparent z-10" />
        <Image
          src="/cta.jpg"
          alt="CTA Visual"
          fill
          className="object-cover object-center"
          priority
          quality={90}
        />
      </div>

      {/* Content Overlay */}
      <div className="relative z-20 max-w-4xl mx-auto text-center">
        <h2
          ref={headingRef}
          className="text-[clamp(3rem,6vw,5rem)] font-normal mb-6 text-[#0A0A0A] leading-tight"
        >
          Ready to Build Something Exceptional?
        </h2>
        <p
          ref={textRef}
          className="text-xl md:text-2xl text-[#0A0A0A]/80 mb-10 max-w-2xl mx-auto leading-relaxed"
        >
          Let&apos;s discuss your project and see how we can help you grow.
        </p>
        <div className="flex justify-center">
          <Link
            ref={buttonRef}
            href="/contact"
            className="px-10 py-4 bg-[#0A0A0A] text-white rounded-lg font-normal text-lg hover:bg-[#0A0A0A]/90 transition-colors inline-block"
          >
            Get started
          </Link>
        </div>
      </div>
    </section>
  );
}

