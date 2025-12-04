"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { useEffect } from "react";
import Link from "next/link";
import { Button } from "../../../components/ui/button";
import GradualBlur from "../../../components/animations/GradualBlur";

interface HeroSectionProps {
  onOpenModal: () => void;
}

export default function HeroSection({ onOpenModal }: HeroSectionProps) {
  const heroRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const photoRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (contentRef.current) {
      gsap.fromTo(
        contentRef.current.children,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          stagger: 0.18,
          ease: "power3.out",
        }
      );
    }

    if (photoRef.current) {
      gsap.fromTo(
        photoRef.current,
        { opacity: 0, scale: 0.95, x: 30 },
        {
          opacity: 1,
          scale: 1,
          x: 0,
          duration: 1.2,
          ease: "power3.out",
          delay: 0.3,
        }
      );
    }
  }, []);

  return (
    <>
      <section
        ref={heroRef}
        className="relative bg-[#f5f1e8] px-6 md:px-12 lg:px-20 pt-24 md:pt-32 pb-16 md:pb-24 overflow-hidden"
      >
        <div className="relative max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div ref={contentRef} className="max-w-3xl">
              <h1 className="text-4xl md:text-5xl lg:text-6xl leading-tight mb-5 text-black font-normal">
                Custom web development
                <br />
                that drives results.
              </h1>
              <p className="text-lg md:text-xl text-black/80 mb-8 leading-relaxed max-w-2xl">
                We design and build custom websites, web apps, and digital experiences that resonate with your audience. No templates, no generic themes—everything is tailored to your brand and business goals.
              </p>

              <div className="flex flex-wrap items-center gap-4">
                <Button
                  onClick={onOpenModal}
                  className="rounded-full px-8 py-5 text-sm md:text-base shadow-[0_18px_60px_rgba(0,0,0,0.15)] hover:shadow-[0_22px_70px_rgba(0,0,0,0.25)] bg-black text-white hover:bg-black/90 transition-transform hover:scale-105"
                >
                  Start Your Project
                </Button>
                <Button
                  asChild
                  variant="outline"
                  className="rounded-full border-black/20 bg-white/50 backdrop-blur-sm text-xs md:text-sm px-6 py-4 hover:bg-white/80 text-black transition-transform hover:scale-105"
                >
                  <Link href="#process">See our process</Link>
                </Button>
              </div>
            </div>
            {/* Hero Image */}
            <div
              ref={photoRef}
              className="relative w-full h-[400px] md:h-[500px] lg:h-[600px] rounded-3xl overflow-hidden shadow-2xl"
            >
              <img
                src="https://images.unsplash.com/photo-1557682250-33bd709cbe85?w=1200&h=800&fit=crop&q=80"
                alt="Modern design workspace"
                className="w-full h-full object-cover"
              />
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
    </>
  );
}

