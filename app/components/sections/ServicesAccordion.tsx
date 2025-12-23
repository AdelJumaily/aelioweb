"use client";

import React, { useRef, useEffect, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import { services } from "@/lib/content/services";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function ServicesAccordion() {
  const [selectedService, setSelectedService] = useState<string>(services[0].id);
  const sectionRef = useRef<HTMLElement>(null);
  const leftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);
  const serviceItemRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const selectedServiceData = services.find((s) => s.id === selectedService) || services[0];

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate left side
      gsap.from(leftRef.current, {
        opacity: 0,
        x: -30,
        duration: 1,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          toggleActions: "play none none none",
        },
        ease: "power3.out",
      });

      // Animate right side
      gsap.from(rightRef.current, {
        opacity: 0,
        x: 30,
        duration: 1,
        delay: 0.2,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          toggleActions: "play none none none",
        },
        ease: "power3.out",
      });

      // Animate service items
      serviceItemRefs.current.forEach((item, index) => {
        if (item) {
          gsap.from(item, {
            opacity: 0,
            x: -20,
            duration: 0.6,
            delay: index * 0.1,
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 80%",
              toggleActions: "play none none none",
            },
            ease: "power2.out",
          });
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Animate content change
  useEffect(() => {
    if (rightRef.current) {
      gsap.from(rightRef.current, {
        opacity: 0,
        y: 20,
        duration: 0.5,
        ease: "power2.out",
      });
    }
  }, [selectedService]);

  return (
    <section 
      ref={sectionRef} 
      className="py-32 px-6 md:px-10 bg-white"
    >
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          {/* Left Side - Services List */}
          <div ref={leftRef} className="lg:col-span-5">
            <div className="space-y-1">
              {services.map((service, index) => (
                <button
                  key={service.id}
                  ref={(el) => {
                    serviceItemRefs.current[index] = el;
                  }}
                  onClick={() => setSelectedService(service.id)}
                  className="w-full text-left group"
                >
                  <div className="flex items-start gap-4 py-3">
                    <span
                      className={`text-sm font-medium transition-colors ${
                        selectedService === service.id
                          ? "text-[#0A0A0A]"
                          : "text-[#6B6B6B]"
                      }`}
                    >
                      {service.number}
                    </span>
                    <span
                      className={`transition-all duration-300 ${
                        selectedService === service.id
                          ? "text-[clamp(2rem,4vw,3.5rem)] font-bold text-[#0A0A0A]"
                          : "text-lg font-normal text-[#6B6B6B] group-hover:text-[#0A0A0A]"
                      }`}
                    >
                      {service.title}
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Right Side - Service Details */}
          <div ref={rightRef} className="lg:col-span-7">
            <div className="space-y-8">
              {/* Tags */}
              <div className="flex flex-wrap gap-3">
                {selectedServiceData.tags?.map((tag) => (
                  <span
                    key={tag}
                    className="px-4 py-2 bg-[#FAFAF8] rounded-full text-sm font-medium text-[#6B6B6B] border border-[rgba(0,0,0,0.08)]"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Description */}
              <p className="text-lg md:text-xl leading-relaxed text-[#6B6B6B] max-w-2xl">
                {selectedServiceData.description}
              </p>

              {/* Learn More Link */}
              <div>
                <Link
                  href={`/services/${selectedServiceData.id}`}
                  className="inline-flex items-center gap-2 text-[#FF5722] font-medium text-lg hover:gap-4 transition-all group"
                >
                  Learn more
                  <span className="text-xl group-hover:translate-x-1 transition-transform">
                    →
                  </span>
                </Link>
                <div className="mt-2 h-px bg-[#FF5722] w-0 group-hover:w-full transition-all duration-300" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

