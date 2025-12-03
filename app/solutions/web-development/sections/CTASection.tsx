"use client";

import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import { Button } from "../../../components/ui/button";
import GradualBlur from "../../../components/animations/GradualBlur";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface CTASectionProps {
  onOpenModal: () => void;
}

export default function CTASection({ onOpenModal }: CTASectionProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const photoRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    if (contentRef.current) {
      gsap.fromTo(
        contentRef.current.children,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: contentRef.current,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        }
      );
    }

    if (photoRef.current) {
      gsap.fromTo(
        photoRef.current,
        { opacity: 0, scale: 0.95, x: -30 },
        {
          opacity: 1,
          scale: 1,
          x: 0,
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

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <>
      <section
        ref={sectionRef}
        className="relative bg-[#5C4F42] px-6 md:px-12 lg:px-20 py-24 md:py-32 border-t border-white/10 overflow-hidden"
      >
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Photo spot */}
            <div
              ref={photoRef}
              className="relative w-full h-[300px] md:h-[400px] bg-white/5 border-2 border-dashed border-white/20 rounded-lg flex items-center justify-center order-2 lg:order-1"
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
                <p className="text-white/50 text-sm">CTA Image</p>
              </div>
            </div>

            <div ref={contentRef} className="max-w-4xl mx-auto text-center space-y-6 order-1 lg:order-2">
              <h2 className="text-3xl md:text-4xl lg:text-5xl text-white font-normal">
                Ready to make your website feel
                <br />
                effortless again?
              </h2>
              <p className="text-base md:text-lg text-white/90 max-w-2xl mx-auto">
                Share where you are today and where you&apos;d like your digital
                presence to be. We&apos;ll map the gap, then quietly handle the
                moving parts.
              </p>
              <div className="flex flex-wrap justify-center gap-4 pt-2">
                <Button
                  onClick={onOpenModal}
                  className="rounded-full px-8 py-4 text-sm md:text-base shadow-[0_18px_60px_rgba(0,0,0,0.25)] hover:shadow-[0_22px_70px_rgba(0,0,0,0.35)] bg-[#E6672E] text-white hover:bg-[#D45A1F] transition-transform hover:scale-105"
                >
                  Get in touch
                </Button>
                <Button
                  asChild
                  variant="outline"
                  className="rounded-full border-white/20 bg-white/10 backdrop-blur-sm text-xs md:text-sm px-8 py-4 hover:bg-white/20 text-white transition-transform hover:scale-105"
                >
                  <Link href="/pricing">View maintenance pricing</Link>
                </Button>
              </div>
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

