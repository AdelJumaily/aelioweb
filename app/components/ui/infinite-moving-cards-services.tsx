"use client";

import { cn } from "../../../lib/utils";
import React, { useEffect, useState } from "react";

interface ServiceCard {
  quote: string;
  name: string;
  title: string;
  image?: string;
  gradient?: string;
  items?: string[];
}

export const InfiniteMovingCardsServices = ({
  items,
  direction = "left",
  speed = "fast",
  pauseOnHover = true,
  className,
}: {
  items: ServiceCard[];
  direction?: "left" | "right";
  speed?: "fast" | "normal" | "slow";
  pauseOnHover?: boolean;
  className?: string;
}) => {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const scrollerRef = React.useRef<HTMLUListElement>(null);

  useEffect(() => {
    addAnimation();
  }, []);

  const [start, setStart] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  function addAnimation() {
    if (containerRef.current && scrollerRef.current) {
      const scrollerContent = Array.from(scrollerRef.current.children);

      scrollerContent.forEach((item) => {
        const duplicatedItem = item.cloneNode(true);
        if (scrollerRef.current) {
          scrollerRef.current.appendChild(duplicatedItem);
        }
      });

      getDirection();
      getSpeed();
      setStart(true);
    }
  }

  const handleMouseEnter = () => {
    if (pauseOnHover && scrollerRef.current) {
      setIsPaused(true);
      scrollerRef.current.style.animationPlayState = 'paused';
    }
  };

  const handleMouseLeave = () => {
    if (pauseOnHover && scrollerRef.current) {
      setIsPaused(false);
      scrollerRef.current.style.animationPlayState = 'running';
    }
  };

  const getDirection = () => {
    if (containerRef.current) {
      if (direction === "left") {
        containerRef.current.style.setProperty(
          "--animation-direction",
          "forwards"
        );
      } else {
        containerRef.current.style.setProperty(
          "--animation-direction",
          "reverse"
        );
      }
    }
  };

  const getSpeed = () => {
    if (containerRef.current) {
      if (speed === "fast") {
        containerRef.current.style.setProperty("--animation-duration", "20s");
      } else if (speed === "normal") {
        containerRef.current.style.setProperty("--animation-duration", "40s");
      } else {
        containerRef.current.style.setProperty("--animation-duration", "80s");
      }
    }
  };

  return (
    <div
      ref={containerRef}
      className={cn(
        "scroller relative z-20 max-w-7xl overflow-hidden [mask-image:linear-gradient(to_right,transparent,white_20%,white_80%,transparent)]",
        className
      )}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <ul
        ref={scrollerRef}
        className={cn(
          "flex min-w-full shrink-0 gap-6 py-4 w-max flex-nowrap",
          start && "animate-scroll"
        )}
      >
        {items.map((item, idx) => (
          <li
            className="group w-[280px] h-[380px] relative rounded-2xl flex-shrink-0 overflow-hidden cursor-pointer"
            key={item.name + idx}
          >
            {/* Image Container */}
            <div className="absolute inset-0">
              {/* Gradient Fallback */}
              {item.gradient && (
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${item.gradient} opacity-90`}
                />
              )}
              {/* Image */}
              {item.image ? (
                <img
                  src={item.image}
                  alt={item.name}
                  className="absolute inset-0 w-full h-full object-cover"
                />
              ) : null}
            </div>

            {/* Content */}
            <div className="relative z-10 h-full flex flex-col justify-between p-8">
              {/* Service Title */}
              <h3
                className="text-xl md:text-2xl font-bold text-white uppercase tracking-tight mb-4 drop-shadow-lg"
                style={{
                  fontFamily: 'var(--font-geist-sans)',
                  letterSpacing: '-0.02em',
                  lineHeight: '1.1',
                  textShadow: '2px 2px 4px rgba(0, 0, 0, 0.8)',
                }}
              >
                {item.name}
              </h3>

              {/* Service Items - Hidden by default, shown on hover */}
              {item.items && (
                <ul className="space-y-3 mt-auto opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  {item.items.map((serviceItem, itemIdx) => (
                    <li
                      key={itemIdx}
                      className="text-white/90 text-base md:text-lg flex items-center transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300"
                      style={{ 
                        fontFamily: 'var(--font-geist-sans)',
                        transitionDelay: `${itemIdx * 50}ms`
                      }}
                    >
                      <span className="mr-3" style={{ color: 'var(--primary)' }}>•</span>
                      {serviceItem}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

