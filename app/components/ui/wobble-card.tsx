"use client";
import React, { useRef, useState } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import { cn } from "@/lib/utils";

export const WobbleCard = ({
  children,
  containerClassName,
  className,
}: {
  children: React.ReactNode;
  containerClassName?: string;
  className?: string;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    const x = e.clientX - left - width / 2;
    const y = e.clientY - top - height / 2;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
    setIsHovered(false);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const springConfig = { damping: 25, stiffness: 700 };
  const x = useSpring(useTransform(mouseX, [-200, 200], [-10, 10]), springConfig);
  const y = useSpring(useTransform(mouseY, [-200, 200], [-10, 10]), springConfig);

  const rotateX = useTransform(mouseY, [-200, 200], [5, -5]);
  const rotateY = useTransform(mouseX, [-200, 200], [-5, 5]);

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={handleMouseEnter}
      style={{
        rotateX,
        rotateY,
        x,
        y,
      }}
      className={cn(
        "relative rounded-2xl",
        // Only apply default gradient if no custom background is provided
        !containerClassName?.includes("bg-") && "bg-gradient-to-br from-neutral-200 to-neutral-800 dark:from-neutral-800 dark:to-neutral-900",
        containerClassName
      )}
    >
      <motion.div
        style={{
          rotateX,
          rotateY,
        }}
        className={cn("relative h-full w-full", className)}
      >
        {children}
      </motion.div>
    </motion.div>
  );
};

