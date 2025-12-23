"use client";

import React, { useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Zap,
  Code,
  Smartphone,
  Search,
  Rocket,
  Shield,
  Globe,
  Palette,
} from "lucide-react";
import { BentoGrid, BentoGridItem } from "../ui/bento-grid";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const Skeleton = () => (
  <div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl bg-gradient-to-br from-[#FF5722]/15 via-[#FF5722]/8 to-transparent"></div>
);

interface Feature {
  icon: React.ReactNode;
  title: string;
  description: string;
  header?: React.ReactNode;
  className?: string;
}

const features: Feature[] = [
  {
    icon: <Zap className="h-4 w-4 text-[#FF5722]" />,
    title: "Lightning Fast Performance",
    description: "Sub-2 second load times with optimized code and modern hosting infrastructure.",
    header: <Skeleton />,
  },
  {
    icon: <Code className="h-4 w-4 text-[#FF5722]" />,
    title: "Clean, Scalable Code",
    description: "Maintainable codebase built with Next.js, TypeScript, and best practices.",
    header: <Skeleton />,
  },
  {
    icon: <Smartphone className="h-4 w-4 text-[#FF5722]" />,
    title: "Mobile-First Design",
    description: "Responsive layouts that look perfect on every device and screen size.",
    header: <Skeleton />,
  },
  {
    icon: <Search className="h-4 w-4 text-[#FF5722]" />,
    title: "SEO Optimized",
    description: "Built-in SEO best practices to help you rank higher and get found.",
    header: <Skeleton />,
    className: "md:col-span-2",
  },
  {
    icon: <Rocket className="h-4 w-4 text-[#FF5722]" />,
    title: "Rapid Deployment",
    description: "From concept to launch in weeks, not months. Fast iteration and delivery.",
    header: <Skeleton />,
  },
  {
    icon: <Shield className="h-4 w-4 text-[#FF5722]" />,
    title: "Secure & Reliable",
    description: "Enterprise-grade security and 99.9% uptime guarantee for peace of mind.",
    header: <Skeleton />,
    className: "md:col-span-2",
  },
  {
    icon: <Globe className="h-4 w-4 text-[#FF5722]" />,
    title: "Global CDN",
    description: "Content delivered instantly worldwide with edge network optimization.",
    header: <Skeleton />,
  },
  {
    icon: <Palette className="h-4 w-4 text-[#FF5722]" />,
    title: "Custom Design Systems",
    description: "Bespoke design systems that scale with your brand and business needs.",
    header: <Skeleton />,
  },
];

export default function FeaturesShowcase() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(sectionRef.current, {
        opacity: 0,
        y: 40,
        duration: 0.8,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          toggleActions: "play none none none",
        },
        ease: "power3.out",
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="py-20 px-6 md:px-10 bg-[#FAFAF8]"
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="inline-block mb-3"
          >
            <span className="px-4 py-2 bg-[#FF5722]/20 text-[#FF5722] rounded-full text-sm font-semibold uppercase tracking-wider">
              Features
            </span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-[clamp(2rem,4vw,3rem)] font-bold leading-tight text-[#0A0A0A] mb-4"
          >
            Everything you need to succeed online
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg text-[#6B6B6B] max-w-2xl mx-auto"
          >
            We build websites that don&apos;t just look good—they perform, convert, and scale with your business.
          </motion.p>
        </div>

        {/* Bento Grid */}
        <BentoGrid className="max-w-7xl mx-auto gap-3">
          {features.map((feature, i) => (
            <BentoGridItem
              key={i}
              title={feature.title}
              description={feature.description}
              header={feature.header}
              icon={feature.icon}
              className={`${feature.className || ""} bg-white/60 backdrop-blur-sm border-[#0A0A0A]/10 hover:bg-white/80 hover:border-[#0A0A0A]/20 text-[#0A0A0A] p-3`}
            />
          ))}
        </BentoGrid>
      </div>
    </section>
  );
}

