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
        className="relative bg-[#f5f1e8] px-6 md:px-12 lg:px-20 py-24 md:py-32 border-t border-black/10 overflow-hidden"
      >
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* CTA Image */}
            <div
              ref={photoRef}
              className="relative w-full h-[300px] md:h-[400px] rounded-3xl overflow-hidden shadow-2xl order-2 lg:order-1"
            >
              <img
                src="https://images.unsplash.com/photo-1557682250-33bd709cbe85?w=1200&h=800&fit=crop&q=80"
                alt="Creative collaboration"
                className="w-full h-full object-cover"
              />
            </div>

            <div ref={contentRef} className="max-w-4xl mx-auto text-center space-y-6 order-1 lg:order-2">
              <h2 className="text-3xl md:text-4xl lg:text-5xl text-black font-normal">
                Ready to build something
                <br />
                extraordinary?
              </h2>
              <p className="text-base md:text-lg text-black/80 max-w-2xl mx-auto">
                Let&apos;s discuss your project and see how we can help bring your vision to life. From initial concept to launch and beyond, we&apos;re here to make it happen.
              </p>
              <div className="flex flex-wrap justify-center gap-4 pt-2">
                <Button
                  onClick={onOpenModal}
                  className="rounded-full px-8 py-4 text-sm md:text-base shadow-[0_18px_60px_rgba(0,0,0,0.15)] hover:shadow-[0_22px_70px_rgba(0,0,0,0.25)] bg-black text-white hover:bg-black/90 transition-transform hover:scale-105"
                >
                  Start Your Project
                </Button>
                <Button
                  asChild
                  variant="outline"
                  className="rounded-full border-black/20 bg-white/50 backdrop-blur-sm text-xs md:text-sm px-8 py-4 hover:bg-white/80 text-black transition-transform hover:scale-105"
                >
                  <Link href="/pricing">View Pricing</Link>
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

