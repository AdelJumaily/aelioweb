"use client";

import React, { useRef, useState, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";
import { projects } from "@/lib/content/projects";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function FeaturedWork() {
  const carouselRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);

  const scroll = (direction: "left" | "right") => {
    if (!carouselRef.current) return;
    const cardWidth = 400 + 32; // card width + gap
    const scrollAmount = direction === "left" ? -cardWidth : cardWidth;
    carouselRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
  };

  const featuredProjects = projects.slice(0, 6);

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

      // Animate cards
      cardsRef.current.forEach((card, index) => {
        if (card) {
          gsap.from(card, {
            opacity: 0,
            y: 60,
            duration: 0.8,
            delay: index * 0.1,
            scrollTrigger: {
              trigger: card,
              start: "top 85%",
              toggleActions: "play none none none",
            },
            ease: "power3.out",
          });
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-32 px-6 md:px-10 bg-white">
      <div className="max-w-7xl mx-auto">
        <div ref={headingRef} className="text-center mb-16">
          <div className="text-xs uppercase tracking-[0.2em] text-[#6B6B6B] font-medium mb-4">
            Our Work
          </div>
          <h2 className="text-[clamp(2.5rem,5vw,4.5rem)] font-bold mb-4 text-[#0A0A0A]">
            Featured Projects
          </h2>
          <p className="text-lg text-[#6B6B6B] max-w-2xl mx-auto">
            A selection of our best web design and development work.
          </p>
        </div>

        <div className="relative">
          {/* Carousel */}
          <div
            ref={carouselRef}
            className="flex gap-8 overflow-x-auto scrollbar-hide scroll-smooth pb-6"
            style={{ scrollSnapType: "x mandatory" }}
          >
            {featuredProjects.map((project, index) => (
              <div
                key={project.slug}
                ref={(el) => {
                  if (el) cardsRef.current[index] = el;
                }}
                className="flex-shrink-0 w-[320px] md:w-[400px] group"
                style={{ scrollSnapAlign: "start" }}
              >
                <div className="bg-white rounded-xl overflow-hidden shadow-[0_4px_20px_rgba(0,0,0,0.06)] border border-[rgba(0,0,0,0.06)] transition-transform duration-300 hover:-translate-y-2 hover:shadow-[0_8px_32px_rgba(0,0,0,0.12)]">
                  <div className="relative h-64 md:h-80 overflow-hidden">
                    <Image
                      src={project.thumbnail}
                      alt={project.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 768px) 320px, 400px"
                    />
                  </div>
                  <div className="p-6">
                    <div className="flex flex-wrap gap-2 mb-3">
                      {project.tags.slice(0, 3).map((tag) => (
                        <span
                          key={tag}
                          className="text-xs px-3 py-1 bg-[#FAFAF8] rounded-full text-[#6B6B6B]"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <h3 className="text-2xl font-bold mb-2 text-[#0A0A0A]">
                      {project.title}
                    </h3>
                    <p className="text-base text-[#6B6B6B] mb-4">
                      {project.summary}
                    </p>
                    <Link
                      href={`/work/${project.slug}`}
                      className="text-[15px] font-medium text-[#FF5722] hover:text-[#E64A19] inline-flex items-center gap-2 transition-colors"
                    >
                      View Project
                      <ArrowRight size={16} />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Navigation Arrows */}
          <div className="hidden md:flex justify-between items-center absolute top-1/2 -translate-y-1/2 left-0 right-0 pointer-events-none">
            <button
              onClick={() => scroll("left")}
              className="w-12 h-12 rounded-full bg-white border border-[rgba(0,0,0,0.15)] shadow-lg flex items-center justify-center hover:bg-[#FAFAF8] transition-colors pointer-events-auto"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              onClick={() => scroll("right")}
              className="w-12 h-12 rounded-full bg-white border border-[rgba(0,0,0,0.15)] shadow-lg flex items-center justify-center hover:bg-[#FAFAF8] transition-colors pointer-events-auto"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>

        <div className="text-center mt-12">
          <Link
            href="/work"
            className="text-base font-medium text-[#FF5722] hover:text-[#E64A19] inline-flex items-center gap-2 transition-colors"
          >
            View All Projects
            <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
}

