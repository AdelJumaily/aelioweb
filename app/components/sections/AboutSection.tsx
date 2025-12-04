"use client";

import { useEffect, useRef } from "react";

const aboutCards = [
  {
    id: "mission",
    title: "Our Mission",
    description:
      "We believe that every brand deserves a digital presence that reflects its unique identity and values. Our mission is to bridge the gap between timeless design principles and cutting-edge web technology.",
    gradient: "from-[#f5f1e8] via-[#e8e0d0] to-[#d9cbb2]",
  },
  {
    id: "approach",
    title: "Our Approach",
    description:
      "From startups to established enterprises, we work with brands that care about every pixel, every interaction, and every moment of their customer's journey.",
    gradient: "from-[#e8e0d0] via-[#d9cbb2] to-[#c0b198]",
  },
  {
    id: "values",
    title: "Our Values",
    description:
      "Excellence: We strive for perfection in every project. Innovation: We embrace new technologies and creative solutions. Partnership: We build long-term relationships with our clients.",
    gradient: "from-[#d9cbb2] via-[#c0b198] to-[#a8957a]",
  },
  {
    id: "results",
    title: "Our Results",
    description:
      "We've helped hundreds of brands elevate their digital presence and achieve measurable results through strategic design and development.",
    gradient: "from-[#c0b198] via-[#a8957a] to-[#8b7a5f]",
  },
];

export default function AboutSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const cards = cardsRef.current;
    const text = textRef.current;

    if (!container || !cards || !text) return;

    const handleScroll = () => {
      const scrollProgress = window.scrollY - container.offsetTop;
      const maxScroll = container.offsetHeight - window.innerHeight;
      const scrollPercentage = Math.max(0, Math.min(scrollProgress / maxScroll, 1));

      // Calculate horizontal scroll - slower scroll (multiply by 0.6 for slower speed)
      const maxTranslate = cards.scrollWidth - window.innerWidth;
      const translateX = scrollPercentage * maxTranslate * 0.6;

      // Move cards leftwards
      cards.style.transform = `translateX(-${translateX}px)`;
      
      // Move text leftwards at the same speed as cards
      text.style.transform = `translateX(-${translateX}px)`;
    };

    const handleResize = () => {
      handleScroll();
    };

    // Run once on mount
    handleScroll();

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative bg-[#f5f1e8]"
      style={{ height: `${aboutCards.length * 100}vh` }}
    >
      <div className="sticky top-0 h-screen overflow-hidden">
        <div 
          ref={textRef}
          className="absolute left-4 md:left-12 lg:left-20 top-1/2 -translate-y-1/2 z-20 px-4 md:px-0"
          style={{ willChange: "transform" }}
        >
          <div className="relative inline-block">
            <div className="absolute -top-2 -right-2 w-2 h-2 bg-black rounded-full" />
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-black leading-tight">
              What About
              <br />
              Aelio?
            </h2>
          </div>
        </div>
        <div
          ref={cardsRef}
          className="absolute top-0 left-0 h-screen flex items-center pl-[200px] sm:pl-[280px] md:pl-[450px] lg:pl-[550px] z-10"
          style={{ willChange: "transform" }}
        >
          {aboutCards.map((card, index) => (
            <div
              key={card.id}
              className={`h-[80vh] w-[90vw] sm:w-[85vw] md:w-[70vw] lg:w-[60vw] flex-shrink-0 bg-gradient-to-br ${card.gradient} rounded-2xl md:rounded-3xl p-6 md:p-12 lg:p-16 flex flex-col justify-center ${index < aboutCards.length - 1 ? 'mr-2 md:mr-3 lg:mr-4' : ''}`}
            >
              <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-black mb-4 md:mb-6">
                {card.title}
              </h3>
              <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-black/80 leading-relaxed">
                {card.description}
              </p>
            </div>
          ))}
          {/* Extra space at the end */}
          <div className="w-[20vw] flex-shrink-0" />
        </div>
      </div>
    </div>
  );
}
