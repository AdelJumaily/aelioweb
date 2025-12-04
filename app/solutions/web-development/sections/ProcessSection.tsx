"use client";

import { useRef, useEffect, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import CardSwap, { Card } from "../../../components/CardSwap";
import GradualBlur from "../../../components/animations/GradualBlur";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const processSteps = [
  {
    number: "01",
    title: "Discovery",
    description: "We start with understanding your business, audience, and goals. Through research and strategy sessions, we map out the perfect path forward.",
    icon: "🔍",
  },
  {
    number: "02",
    title: "Design",
    description: "From moodboards to high-fidelity designs, we create interfaces that don't just look good—they drive action and engagement.",
    icon: "🎨",
  },
  {
    number: "03",
    title: "Development",
    description: "We build with modern technologies, ensuring your site is fast, secure, and scalable. Every line of code is crafted with care.",
    icon: "</>",
  },
  {
    number: "04",
    title: "Launch",
    description: "Smooth deployment and optimization. We ensure everything works perfectly before going live, then monitor and refine.",
    icon: "🚀",
  },
  {
    number: "05",
    title: "Optimization",
    description: "Post-launch, we analyze performance, gather feedback, and continuously improve. Your success is our ongoing commitment.",
    icon: "⚡",
  },
];

export default function ProcessSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const leftContentRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

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

    // Animate left content
    if (leftContentRef.current) {
      gsap.fromTo(
        leftContentRef.current.children,
        { opacity: 0, x: -30 },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: leftContentRef.current,
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
      id="process"
      className="relative bg-[#f5f1e8] px-6 md:px-12 lg:px-20 py-24 md:py-32 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto">
        <h2
          ref={titleRef}
          className="text-3xl md:text-4xl lg:text-5xl mb-16 text-center text-black font-normal"
        >
          Our web development process
        </h2>

        <div className="relative min-h-[600px] flex flex-col lg:flex-row items-center gap-12">
          {/* Left Side - Text Content */}
          <div ref={leftContentRef} className="flex-1 space-y-8 max-w-2xl">
            <div>
              <h3 className="text-2xl md:text-3xl font-normal text-black mb-4">
                From concept to launch
              </h3>
              <p className="text-lg text-black/70 leading-relaxed">
                We offer a complete process from discovery, branding, design, launch to post-launch optimization and testing. Every step is carefully planned and executed.
              </p>
            </div>
            <div className="space-y-4">
              {processSteps.map((step, index) => (
                <div key={step.number} className="flex gap-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-black text-white flex items-center justify-center text-lg font-semibold">
                    {step.number}
                  </div>
                  <div>
                    <h4 className="text-lg font-medium text-black mb-1">
                      {step.title}
                    </h4>
                    <p className="text-sm text-black/60 leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Side - CardSwap Animation */}
          <div className="flex-1 relative w-full lg:w-auto" style={{ height: isMobile ? '400px' : '500px' }}>
            <CardSwap
              width={isMobile ? 300 : 500}
              height={isMobile ? 350 : 400}
              cardDistance={isMobile ? 40 : 60}
              verticalDistance={isMobile ? 50 : 70}
              delay={2000}
              pauseOnHover={false}
              easing="linear"
            >
              {processSteps.map((step, index) => (
                <Card key={step.number} className="flex flex-col justify-center items-center text-center p-4 md:p-8">
                  <div className="text-4xl md:text-6xl mb-4 md:mb-6">{step.icon}</div>
                  <div className="text-3xl md:text-4xl font-bold text-white mb-3 md:mb-4">{step.number}</div>
                  <h3 className="text-xl md:text-2xl font-semibold text-white mb-3 md:mb-4">{step.title}</h3>
                  <p className="text-white/80 text-xs md:text-sm leading-relaxed max-w-xs px-2">
                    {step.description}
                  </p>
                </Card>
              ))}
            </CardSwap>
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

