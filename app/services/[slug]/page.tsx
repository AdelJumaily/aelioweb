"use client";

import { use } from "react";
import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import { services } from "@/lib/content/services";
import { ArrowRight, Check } from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function ServiceDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const sectionRef = useRef<HTMLElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const numberRef = useRef<HTMLSpanElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const tagsRef = useRef<HTMLDivElement>(null);
  const deliverablesRef = useRef<HTMLDivElement>(null);
  const deliverableItemsRef = useRef<(HTMLLIElement | null)[]>([]);
  const sidebarRef = useRef<HTMLDivElement>(null);
  const processRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  const service = services.find((s) => s.id === slug);

  if (!service) {
    return (
      <main className="min-h-screen bg-[#F5F5F0] flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Service Not Found</h1>
          <Link href="/" className="text-[#FF5722] hover:underline">
            Back to Home
          </Link>
        </div>
      </main>
    );
  }

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero animations with stagger
      gsap.from(numberRef.current, {
        opacity: 0,
        scale: 0.8,
        duration: 0.8,
        ease: "back.out(1.7)",
      });

      gsap.from(titleRef.current, {
        opacity: 0,
        y: 30,
        duration: 1,
        delay: 0.2,
        ease: "power3.out",
      });

      gsap.from(descRef.current, {
        opacity: 0,
        y: 20,
        duration: 0.8,
        delay: 0.4,
        ease: "power2.out",
      });

      // Tags animation
      if (tagsRef.current) {
        gsap.from(tagsRef.current.children, {
          opacity: 0,
          y: 20,
          scale: 0.9,
          duration: 0.6,
          delay: 0.6,
          stagger: 0.1,
          ease: "power2.out",
        });
      }

      // Deliverables section
      gsap.from(deliverablesRef.current, {
        opacity: 0,
        y: 40,
        duration: 1,
        scrollTrigger: {
          trigger: deliverablesRef.current,
          start: "top 80%",
          toggleActions: "play none none none",
        },
        ease: "power3.out",
      });

      // Stagger deliverable items
      deliverableItemsRef.current.forEach((item, index) => {
        if (item) {
          gsap.from(item, {
            opacity: 0,
            x: -30,
            duration: 0.6,
            delay: index * 0.1,
            scrollTrigger: {
              trigger: item,
              start: "top 85%",
              toggleActions: "play none none none",
            },
            ease: "power2.out",
          });
        }
      });

      // Sidebar animation
      gsap.from(sidebarRef.current, {
        opacity: 0,
        x: 30,
        duration: 0.8,
        scrollTrigger: {
          trigger: sidebarRef.current,
          start: "top 80%",
          toggleActions: "play none none none",
        },
        ease: "power3.out",
      });

      // Process section
      if (processRef.current) {
        gsap.from(processRef.current, {
          opacity: 0,
          y: 40,
          duration: 1,
          scrollTrigger: {
            trigger: processRef.current,
            start: "top 80%",
            toggleActions: "play none none none",
          },
          ease: "power3.out",
        });
      }

      // CTA section
      if (ctaRef.current) {
        gsap.from(ctaRef.current, {
          opacity: 0,
          y: 30,
          duration: 0.8,
          scrollTrigger: {
            trigger: ctaRef.current,
            start: "top 85%",
            toggleActions: "play none none none",
          },
          ease: "power2.out",
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const processSteps = [
    { step: "01", title: "Discovery", desc: "We start by understanding your goals, target audience, and brand vision." },
    { step: "02", title: "Strategy", desc: "We develop a comprehensive strategy tailored to your specific needs." },
    { step: "03", title: "Design & Development", desc: "Our team brings the strategy to life with exceptional design and execution." },
    { step: "04", title: "Review & Refine", desc: "We collaborate closely with you to refine and perfect every detail." },
    { step: "05", title: "Launch & Support", desc: "We launch your project and provide ongoing support to ensure success." },
  ];

  return (
    <main className="min-h-screen bg-[#F5F5F0]">
      <section ref={sectionRef} className="pt-32 pb-32 px-6 md:px-10">
        <div className="max-w-7xl mx-auto">
          {/* Hero */}
          <div ref={heroRef} className="mb-24">
            <div className="flex items-start gap-6 md:gap-8 mb-10">
              <span ref={numberRef} className="text-7xl md:text-9xl font-bold text-[#FF5722] leading-none">
                {service.number}
              </span>
              <div className="flex-1">
                <h1 ref={titleRef} className="text-[clamp(3rem,7vw,6rem)] font-bold leading-[1.05] mb-6 text-[#0A0A0A] tracking-tight">
                  {service.title}
                </h1>
                <p ref={descRef} className="text-xl md:text-2xl leading-relaxed text-[#6B6B6B] max-w-4xl">
                  {service.description}
                </p>
              </div>
            </div>

            {/* Tags */}
            <div ref={tagsRef} className="flex flex-wrap gap-3 mt-10">
              {service.tags?.map((tag) => (
                <span
                  key={tag}
                  className="px-5 py-2.5 bg-white rounded-full text-sm font-medium text-[#6B6B6B] border border-[rgba(0,0,0,0.08)] shadow-sm hover:border-[#FF5722] hover:text-[#FF5722] transition-colors"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-24">
            {/* Left Column - Main Content */}
            <div className="lg:col-span-8 space-y-12">
              {/* Deliverables */}
              <div ref={deliverablesRef} className="bg-white p-8 md:p-12 rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.06)] border border-[rgba(0,0,0,0.06)]">
                <h2 className="text-3xl md:text-4xl font-bold mb-8 text-[#0A0A0A]">What&apos;s Included</h2>
                <ul className="space-y-5">
                  {service.deliverables.map((item, idx) => (
                    <li
                      key={idx}
                      ref={(el) => {
                        deliverableItemsRef.current[idx] = el;
                      }}
                      className="flex items-start gap-4 text-lg md:text-xl group"
                    >
                      <div className="mt-1 p-1.5 rounded-full bg-[#FF5722]/10 group-hover:bg-[#FF5722] transition-colors">
                        <Check size={20} className="text-[#FF5722] group-hover:text-white transition-colors" />
                      </div>
                      <span className="text-[#6B6B6B] group-hover:text-[#0A0A0A] transition-colors flex-1">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Process */}
              <div ref={processRef} className="bg-white p-8 md:p-12 rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.06)] border border-[rgba(0,0,0,0.06)]">
                <h2 className="text-3xl md:text-4xl font-bold mb-10 text-[#0A0A0A]">Our Process</h2>
                <div className="space-y-8">
                  {processSteps.map((step, idx) => (
                    <div key={idx} className="flex gap-6 group">
                      <div className="flex-shrink-0">
                        <div className="w-16 h-16 rounded-full bg-[#FAFAF8] flex items-center justify-center text-2xl font-bold text-[#FF5722] group-hover:bg-[#FF5722] group-hover:text-white transition-colors">
                          {step.step}
                        </div>
                      </div>
                      <div className="flex-1 pt-2">
                        <h3 className="text-xl md:text-2xl font-bold mb-2 text-[#0A0A0A]">{step.title}</h3>
                        <p className="text-base md:text-lg text-[#6B6B6B]">{step.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column - Sidebar */}
            <div ref={sidebarRef} className="lg:col-span-4 space-y-6">
              <div className="bg-white p-8 rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.06)] border border-[rgba(0,0,0,0.06)] sticky top-32">
                <div className="mb-8">
                  <div className="text-sm uppercase tracking-wider text-[#6B6B6B] mb-3">
                    Timeline
                  </div>
                  <div className="text-4xl font-bold text-[#0A0A0A] mb-1">{service.timeline}</div>
                  <div className="text-sm text-[#6B6B6B]">Typical project duration</div>
                </div>

                <div className="mb-8 pb-8 border-b border-[rgba(0,0,0,0.08)]">
                  <div className="text-sm uppercase tracking-wider text-[#6B6B6B] mb-4">
                    Tech Stack
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {service.techStack.map((tech) => (
                      <span
                        key={tech}
                        className="text-xs px-3 py-1.5 bg-[#FAFAF8] rounded-full text-[#6B6B6B] font-medium"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                <Link
                  href="/contact"
                  className="block w-full px-8 py-4 bg-[#FF5722] text-white rounded-lg font-medium text-center hover:bg-[#E64A19] transition-all shadow-md hover:shadow-lg group"
                >
                  <span className="flex items-center justify-center gap-2">
                    Get Started
                    <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                  </span>
                </Link>
              </div>
            </div>
          </div>

          {/* CTA Section */}
          <div ref={ctaRef} className="bg-gradient-to-br from-[#FF5722] to-[#E64A19] rounded-2xl p-12 md:p-16 text-white text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Get Started?</h2>
            <p className="text-lg md:text-xl mb-8 opacity-90 max-w-2xl mx-auto">
              Let&apos;s discuss how we can bring your vision to life with {service.title.toLowerCase()}.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-8 py-4 bg-white text-[#FF5722] rounded-lg font-medium hover:bg-[#FAFAF8] transition-colors shadow-lg"
            >
              Start Your Project
              <ArrowRight size={18} />
            </Link>
          </div>

          {/* Back Link */}
          <div className="mt-16">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-[#6B6B6B] hover:text-[#0A0A0A] transition-colors group"
            >
              <span className="group-hover:-translate-x-1 transition-transform">←</span>
              <span>Back to Home</span>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

