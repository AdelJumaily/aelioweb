"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface Service {
  number: string;
  title: string;
  description: string;
  items: string[];
}

const services: Service[] = [
  {
    number: "01",
    title: "We translate research into solutions",
    description:
      "We offer a complete process from discovery, branding, design, launch to post-launch optimization and testing.",
    items: [
      "Visual identity systems",
      "Logo & typography",
      "Brand guidelines",
    ],
  },
  {
    number: "02",
    title: "We help our clients to shine online",
    description:
      "We collaborate as a collective of individuals bringing their whole self to a project and, together, create work that none of us would be able to do on our own.",
    items: [
      "Conversion-focused UX/UI",
      "Responsive layouts",
      "Design systems",
    ],
  },
  {
    number: "03",
    title: "Beyond websites, a full 360° approach",
    description:
      "We don't just build websites—we craft complete brand experiences that resonate, convert, and elevate your business across every touchpoint.",
    items: [
      "Web apps & dashboards",
      "API integrations",
      "Performance optimization",
    ],
  },
  {
    number: "04",
    title: "Digital marketing that drives results",
    description:
      "From paid ads to email flows, we create marketing strategies that connect with your audience and deliver measurable outcomes.",
    items: [
      "Paid ads & funnels",
      "Email flows",
      "Analytics & optimization",
    ],
  },
];

export default function ServicesShowcase() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const sectionRef = useRef<HTMLDivElement>(null);
  const numberRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    // Animate number
    if (numberRef.current) {
      gsap.fromTo(
        numberRef.current,
        { opacity: 0, scale: 0.8 },
        {
          opacity: 1,
          scale: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        }
      );
    }

    // Animate content
    if (contentRef.current) {
      gsap.fromTo(
        contentRef.current,
        { opacity: 0, x: 50 },
        {
          opacity: 1,
          x: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
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

  const nextService = () => {
    setCurrentIndex((prev) => (prev + 1) % services.length);
  };

  const prevService = () => {
    setCurrentIndex((prev) => (prev - 1 + services.length) % services.length);
  };

  const currentService = services[currentIndex];

  return (
    <section
      ref={sectionRef}
      id="solutions"
      className="relative w-full bg-[#f5f1e8] py-24 md:py-32 px-6 md:px-12 lg:px-20 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Side - Number */}
          <div
            ref={numberRef}
            className="lg:col-span-2 flex items-center justify-center lg:justify-start"
          >
            <div className="text-[120px] md:text-[180px] lg:text-[200px] font-light text-gray-300 leading-none">
              {currentService.number}
            </div>
          </div>

          {/* Right Side - Swipeable Card */}
          <div ref={contentRef} className="lg:col-span-10 relative">
            <div className="relative bg-[#E8F4F8] rounded-3xl p-8 md:p-12 lg:p-16 min-h-[500px] md:min-h-[600px]">
              {/* Abstract 3D Shapes */}
              <div className="absolute top-8 right-8 md:top-12 md:right-12 w-32 h-32 md:w-48 md:h-48">
                <div className="relative w-full h-full">
                  {/* Pill shapes */}
                  {[0, 1, 2, 3, 4].map((i) => (
                    <motion.div
                      key={i}
                      className="absolute rounded-full"
                      style={{
                        width: `${40 + i * 15}px`,
                        height: `${60 + i * 10}px`,
                        background: i % 2 === 0
                          ? "rgba(255, 255, 255, 0.9)"
                          : "rgba(255, 182, 193, 0.7)",
                        left: `${i * 25}%`,
                        top: `${i * 15}%`,
                        rotate: i * 15,
                      }}
                      animate={{
                        y: [0, -10, 0],
                        rotate: [i * 15, i * 15 + 5, i * 15],
                      }}
                      transition={{
                        duration: 3 + i * 0.5,
                        repeat: Infinity,
                        delay: i * 0.3,
                      }}
                    />
                  ))}
                  {/* Red spheres */}
                  {[0, 1].map((i) => (
                    <motion.div
                      key={`sphere-${i}`}
                      className="absolute rounded-full bg-red-300/60"
                      style={{
                        width: "20px",
                        height: "20px",
                        left: `${30 + i * 40}%`,
                        top: `${40 + i * 20}%`,
                      }}
                      animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.6, 0.8, 0.6],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        delay: i * 0.5,
                      }}
                    />
                  ))}
                </div>
              </div>

              {/* Content */}
              <div className="relative z-10 max-w-3xl">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentIndex}
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -50 }}
                    transition={{ duration: 0.5 }}
                  >
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-normal leading-tight mb-6 text-gray-900">
                      {currentService.title}
                    </h2>
                    <p className="text-base md:text-lg text-gray-700 mb-8 leading-relaxed">
                      {currentService.description}
                    </p>
                    <ul className="space-y-3">
                      {currentService.items.map((item, idx) => (
                        <motion.li
                          key={idx}
                          className="text-gray-700 text-base md:text-lg flex items-center"
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: idx * 0.1 + 0.3 }}
                        >
                          <span className="mr-3 text-[#E6672E]">•</span>
                          {item}
                        </motion.li>
                      ))}
                    </ul>
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Navigation Arrows */}
              <div className="absolute bottom-8 left-8 md:bottom-12 md:left-12 flex gap-4">
                <button
                  onClick={prevService}
                  className="w-12 h-12 rounded-full bg-white/80 hover:bg-white border border-gray-200 flex items-center justify-center transition-all hover:scale-110 shadow-lg"
                  aria-label="Previous service"
                >
                  <svg
                    className="w-6 h-6 text-gray-700"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 19l-7-7 7-7"
                    />
                  </svg>
                </button>
                <button
                  onClick={nextService}
                  className="w-12 h-12 rounded-full bg-white/80 hover:bg-white border border-gray-200 flex items-center justify-center transition-all hover:scale-110 shadow-lg"
                  aria-label="Next service"
                >
                  <svg
                    className="w-6 h-6 text-gray-700"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </button>
              </div>

              {/* Dots Indicator */}
              <div className="absolute bottom-8 right-8 md:bottom-12 md:right-12 flex gap-2">
                {services.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentIndex(idx)}
                    className={`w-2 h-2 rounded-full transition-all ${
                      idx === currentIndex
                        ? "bg-[#E6672E] w-8"
                        : "bg-gray-300 hover:bg-gray-400"
                    }`}
                    aria-label={`Go to service ${idx + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Subtle background lines */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <svg
          className="absolute top-1/4 right-0 w-96 h-96 opacity-10"
          viewBox="0 0 200 200"
        >
          <path
            d="M50,100 Q100,50 150,100 T250,100"
            stroke="currentColor"
            strokeWidth="1"
            fill="none"
            className="text-gray-400"
          />
        </svg>
        <svg
          className="absolute bottom-1/4 left-0 w-96 h-96 opacity-10"
          viewBox="0 0 200 200"
        >
          <path
            d="M150,100 Q100,150 50,100 T-50,100"
            stroke="currentColor"
            strokeWidth="1"
            fill="none"
            className="text-gray-400"
          />
        </svg>
      </div>
    </section>
  );
}
