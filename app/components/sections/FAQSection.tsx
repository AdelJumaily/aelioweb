"use client";

import React, { useRef, useEffect, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { faqs } from "@/lib/content/faqs";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function FAQSection() {
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const faqRefs = useRef<(HTMLDivElement | null)[]>([]);
  const answerRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate heading
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

      // Animate FAQ items
      faqRefs.current.forEach((faq, index) => {
        if (faq) {
          gsap.from(faq, {
            opacity: 0,
            y: 20,
            duration: 0.8,
            delay: index * 0.08,
            scrollTrigger: {
              trigger: faq,
              start: "top 85%",
              toggleActions: "play none none none",
            },
            ease: "power2.out",
          });
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Animate answer when opening
  useEffect(() => {
    answerRefs.current.forEach((answer, index) => {
      if (answer && openFAQ === index) {
        gsap.from(answer, {
          opacity: 0,
          height: 0,
          duration: 0.5,
          ease: "power2.out",
        });
      }
    });
  }, [openFAQ]);

  return (
    <section 
      ref={sectionRef} 
      className="py-32 px-6 md:px-10 bg-white"
    >
      <div className="max-w-4xl mx-auto">
        <div ref={headingRef} className="text-center mb-16">
          <h2 className="text-[clamp(2.5rem,5vw,4.5rem)] font-bold mb-4 text-[#0A0A0A]">
            Frequently Asked Questions
          </h2>
          <p className="text-lg text-[#6B6B6B]">
            Everything you need to know about working with us.
          </p>
        </div>

        <div className="space-y-0">
          {faqs.map((faq, index) => (
            <div
              key={index}
              ref={(el) => {
                faqRefs.current[index] = el;
              }}
              className="border-b border-[rgba(0,0,0,0.08)] last:border-b-0"
            >
              <button
                onClick={() => setOpenFAQ(openFAQ === index ? null : index)}
                className="w-full flex items-center justify-between py-6 text-left hover:opacity-70 transition-opacity group"
              >
                <span className="text-lg md:text-xl font-medium text-[#0A0A0A] pr-8 group-hover:text-[#FF5722] transition-colors">
                  {faq.question}
                </span>
                <span className="text-2xl text-[#6B6B6B] flex-shrink-0 transition-transform group-hover:text-[#FF5722]">
                  {openFAQ === index ? "−" : "+"}
                </span>
              </button>

              {openFAQ === index && (
                <div
                  ref={(el) => {
                    answerRefs.current[index] = el;
                  }}
                  className="overflow-hidden"
                >
                  <div className="pb-6 pr-12">
                    <p className="text-base md:text-lg leading-relaxed text-[#6B6B6B]">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
