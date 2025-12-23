"use client";

import React, { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface Stat {
  number: string;
  label: string;
  footnote: string;
}

const stats: Stat[] = [
  {
    number: "150+",
    label: "Websites Launched",
    footnote: "Since 2020",
  },
  {
    number: "95+",
    label: "Avg Lighthouse Score",
    footnote: "Across all metrics",
  },
  {
    number: "< 2s",
    label: "Load Time Target",
    footnote: "On optimized hosting",
  },
];

export default function StatsRow() {
  const sectionRef = useRef<HTMLElement>(null);
  const statRefs = useRef<(HTMLDivElement | null)[]>([]);
  const numberRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      statRefs.current.forEach((stat, index) => {
        if (stat) {
          gsap.from(stat, {
            opacity: 0,
            y: 40,
            duration: 0.8,
            delay: index * 0.15,
            scrollTrigger: {
              trigger: stat,
              start: "top 85%",
              toggleActions: "play none none none",
            },
            ease: "power3.out",
          });
        }
      });

      // Animate numbers
      numberRefs.current.forEach((numRef, index) => {
        if (numRef && stats[index]) {
          const stat = stats[index];
          if (stat.number.includes("+")) {
            const baseValue = parseInt(stat.number.split("+")[0]);
            const obj = { value: 0 };
            gsap.to(obj, {
              value: baseValue,
              duration: 1.5,
              delay: index * 0.15 + 0.3,
              scrollTrigger: {
                trigger: numRef,
                start: "top 85%",
                toggleActions: "play none none none",
              },
              ease: "power2.out",
              onUpdate: function() {
                if (numRef) {
                  numRef.textContent = Math.round(obj.value) + "+";
                }
              },
            });
          }
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={sectionRef} 
      className="py-24 px-6 md:px-10 bg-white"
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">
          {stats.map((stat, index) => (
            <div
              key={index}
              ref={(el) => {
                statRefs.current[index] = el;
              }}
              className="text-center"
            >
              <div className="mb-3">
                {stat.number.includes("+") ? (
                  <div
                    ref={(el) => {
                      numberRefs.current[index] = el;
                    }}
                    className="text-[clamp(3rem,5vw,4.5rem)] font-bold leading-none text-[#FF5722]"
                  >
                    0+
                  </div>
                ) : (
                  <div className="text-[clamp(3rem,5vw,4.5rem)] font-bold leading-none text-[#FF5722]">
                    {stat.number}
                  </div>
                )}
              </div>
              <div className="text-base font-medium text-[#0A0A0A] mb-2">
                {stat.label}
              </div>
              <div className="text-sm text-[#6B6B6B]">
                {stat.footnote}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

