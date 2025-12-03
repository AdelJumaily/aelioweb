"use client";

import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Button } from "../../../components/ui/button";
import GradualBlur from "../../../components/animations/GradualBlur";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
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
          d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
        />
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
    ),
    title: "Start building immediately",
    description:
      "Deploy your website in minutes, not weeks. Your hosting, SSL, and CDN are already configured and ready.",
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
          d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
    ),
    title: "Never wait in line",
    description:
      "Scale your infrastructure instantly. Run multiple projects in parallel. Stop paying for idle resources when you're done.",
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
          d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
        />
      </svg>
    ),
    title: "Cloud storage",
    description:
      "Store assets and data in distributed volumes, then access them wherever they're needed across your projects.",
  },
];

export default function FeaturesSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const leftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);
  const cubesTopRef = useRef<HTMLDivElement>(null);
  const codeRef = useRef<HTMLDivElement>(null);
  const cubesBottomRef = useRef<HTMLDivElement>(null);

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

    // Animate cubes with floating effect
    if (cubesTopRef.current) {
      gsap.to(cubesTopRef.current.children, {
        y: -10,
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: "power1.inOut",
        stagger: 0.2,
      });
    }

    if (cubesBottomRef.current) {
      gsap.to(cubesBottomRef.current.children, {
        y: 10,
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: "power1.inOut",
        stagger: 0.2,
      });
    }

    // Animate code panel
    if (codeRef.current) {
      gsap.fromTo(
        codeRef.current,
        { opacity: 0, scale: 0.95, rotationX: -15 },
        {
          opacity: 1,
          scale: 1,
          rotationX: 0,
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
      className="relative bg-[#5C4F42] px-6 md:px-12 lg:px-20 py-24 md:py-32 overflow-hidden"
    >
      <div className="relative max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Side - Visual Elements */}
          <div ref={leftRef} className="relative h-[500px] md:h-[600px]">
            {/* Top Cubes */}
            <div
              ref={cubesTopRef}
              className="absolute top-0 left-0 right-0 grid grid-cols-2 gap-4"
            >
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="relative w-16 h-16 md:w-20 md:h-20"
                  style={{
                    transform: "rotateX(45deg) rotateY(-45deg)",
                    transformStyle: "preserve-3d",
                  }}
                >
                  <div
                    className="absolute inset-0 bg-white/20 border border-white/30"
                    style={{
                      transform: "translateZ(20px)",
                    }}
                  />
                  <div
                    className="absolute inset-0 bg-white/15 border border-white/20"
                    style={{
                      transform: "rotateY(90deg) translateZ(20px)",
                    }}
                  />
                  <div
                    className="absolute inset-0 bg-white/25 border border-white/30"
                    style={{
                      transform: "rotateX(90deg) translateZ(20px)",
                    }}
                  />
                </div>
              ))}
            </div>

            {/* Connecting Line Top */}
            <div className="absolute top-24 left-1/2 transform -translate-x-1/2 w-0.5 h-16 bg-white/20" />

            {/* Code Panel */}
            <div
              ref={codeRef}
              className="absolute top-40 left-0 right-0 bg-black/40 backdrop-blur-sm border border-white/10 rounded-lg p-6 transform-gpu"
              style={{
                transform: "perspective(1000px) rotateX(-5deg)",
              }}
            >
              <div className="space-y-2 font-mono text-sm">
                <div className="text-[#98D982]">
                  <span className="text-white/50">from</span> aelio{" "}
                  <span className="text-white/50">import</span> App, Deploy
                </div>
                <div className="text-[#98D982]">
                  <span className="text-white/50">@</span>app
                  <span className="text-white/50">.</span>deploy(
                  <span className="text-[#FFD700]">"production"</span>)
                </div>
                <div className="text-white/70">
                  <span className="text-white/50">def</span>{" "}
                  <span className="text-[#98D982]">launch</span>
                  <span className="text-white/50">(</span>site
                  <span className="text-white/50">):</span>
                </div>
                <div className="text-white/70 pl-4">
                  <span className="text-white/50">return</span>{" "}
                  <span className="text-[#98D982]">Deploy</span>
                  <span className="text-white/50">.</span>build(site)
                </div>
              </div>
            </div>

            {/* Connecting Line Bottom */}
            <div className="absolute bottom-32 left-1/2 transform -translate-x-1/2 w-0.5 h-16 bg-white/20" />

            {/* Bottom Cubes */}
            <div
              ref={cubesBottomRef}
              className="absolute bottom-0 left-0 right-0 grid grid-cols-2 gap-4"
            >
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="relative w-16 h-16 md:w-20 md:h-20"
                  style={{
                    transform: "rotateX(45deg) rotateY(-45deg)",
                    transformStyle: "preserve-3d",
                  }}
                >
                  <div
                    className="absolute inset-0 bg-gradient-to-br from-[#FFD700]/30 to-[#98D982]/30 border border-white/30"
                    style={{
                      transform: "translateZ(20px)",
                    }}
                  />
                  <div
                    className="absolute inset-0 bg-gradient-to-br from-[#FFD700]/20 to-[#98D982]/20 border border-white/20"
                    style={{
                      transform: "rotateY(90deg) translateZ(20px)",
                    }}
                  />
                  <div
                    className="absolute inset-0 bg-gradient-to-br from-[#FFD700]/25 to-[#98D982]/25 border border-white/30"
                    style={{
                      transform: "rotateX(90deg) translateZ(20px)",
                    }}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Right Side - Text Content */}
          <div ref={rightRef} className="space-y-8">
            <div>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-normal leading-tight mb-6 text-white">
                Development and deployment without managing infrastructure
              </h2>
              <Button
                className="rounded-full px-6 py-3 text-sm bg-white/10 border border-white/20 text-white hover:bg-white/20 backdrop-blur-sm"
              >
                View Examples
              </Button>
            </div>

            <div className="space-y-6">
              {features.map((feature, index) => (
                <div key={index} className="flex gap-4">
                  <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-[#98D982]/20 border border-[#98D982]/30 flex items-center justify-center text-[#98D982]">
                    {feature.icon}
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-white mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-white/80 text-sm leading-relaxed">
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


