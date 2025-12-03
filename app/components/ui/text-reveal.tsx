"use client";

import { cn } from "@/lib/utils";
import { useMotionValue, useSpring, useTransform, motion } from "framer-motion";
import { useEffect, useRef } from "react";

export function TextReveal({
  children,
  className,
}: {
  children: string;
  className?: string;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const motionValue = useMotionValue(0);
  const spring = useSpring(motionValue, {
    damping: 50,
    stiffness: 100,
  });
  const opacity = useTransform(spring, [0, 1], [0, 1]);
  const y = useTransform(spring, [0, 1], [20, 0]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          motionValue.set(1);
        }
      },
      { threshold: 0.5 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      if (containerRef.current) {
        observer.unobserve(containerRef.current);
      }
    };
  }, [motionValue]);

  return (
    <motion.div
      ref={containerRef}
      className={cn("overflow-hidden", className)}
      style={{ opacity, y }}
    >
      {children}
    </motion.div>
  );
}

