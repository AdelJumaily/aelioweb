"use client";

import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Button } from "../../../components/ui/button";
import GradualBlur from "../../../components/animations/GradualBlur";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface FeaturesSectionProps {
  onOpenModal: () => void;
}

const features = [
  {
    icon: (
      <svg
        className="w-6 h-6"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
        />
      </svg>
    ),
    title: "Conversion-focused UX/UI",
    description:
      "Every design decision is backed by research and optimized for user engagement. We create interfaces that don't just look good—they drive action.",
  },
  {
    icon: (
      <svg
        className="w-6 h-6"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"
        />
      </svg>
    ),
    title: "Responsive & Mobile-first",
    description:
      "Your website looks perfect on every device. We build with mobile users in mind first, ensuring seamless experiences across all screen sizes.",
  },
  {
    icon: (
      <svg
        className="w-6 h-6"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M13 10V3L4 14h7v7l9-11h-7z"
        />
      </svg>
    ),
    title: "Performance optimization",
    description:
      "Lightning-fast load times and smooth animations. We optimize every aspect of your site for speed, ensuring your visitors never wait.",
  },
];

export default function FeaturesSection({ onOpenModal }: FeaturesSectionProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const leftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);
  const codeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    // Animate left side elements
    if (leftRef.current) {
      gsap.fromTo(
        leftRef.current.children,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          stagger: 0.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: leftRef.current,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        }
      );
    }

    // Animate right side elements
    if (rightRef.current) {
      gsap.fromTo(
        rightRef.current.children,
        { opacity: 0, x: 30 },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: rightRef.current,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        }
      );
    }

    // Animate image
    if (codeRef.current) {
      gsap.fromTo(
        codeRef.current,
        { opacity: 0, scale: 0.95 },
        {
          opacity: 1,
          scale: 1,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: codeRef.current,
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
    <section
      ref={sectionRef}
      className="relative bg-[#f5f1e8] px-6 md:px-12 lg:px-20 py-24 md:py-32 overflow-hidden"
    >
      <div className="relative max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Side - Visual Elements */}
          <div ref={leftRef} className="relative h-[500px] md:h-[600px]">
            <div
              ref={codeRef}
              className="relative w-full h-full rounded-3xl overflow-hidden shadow-2xl"
            >
              <img
                src="https://images.unsplash.com/photo-1558655146-364adaf1fcc9?w=1200&h=800&fit=crop&q=80"
                alt="Abstract modern design"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Right Side - Text Content */}
          <div ref={rightRef} className="space-y-8">
            <div>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-normal leading-tight mb-6 text-black">
                We help our clients shine online
              </h2>
              <Button
                onClick={onOpenModal}
                className="rounded-full px-6 py-3 text-sm bg-black text-white hover:bg-black/90 backdrop-blur-sm transition-transform hover:scale-105"
              >
                Get Started
              </Button>
            </div>

            <div className="space-y-6">
              {features.map((feature, index) => (
                <div key={index} className="flex gap-4">
                  <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-black/10 border border-black/20 flex items-center justify-center text-black">
                    {feature.icon}
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-black mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-black/70 text-sm leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </div>
              ))}
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
  );
}



