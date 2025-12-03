"use client";

import { TextReveal } from "../ui/text-reveal";

const lines = [
  "Most agencies stop at a pretty landing page.",
  "We design the entire journey — from the first click to the last checkout.",
  "Websites, web apps, and mobile apps that feel as crafted as a film.",
  "So your brand doesn't just look good. It moves people.",
];

export default function TextRevealSection() {
  return (
    <section
      className="relative bg-[#f5f1e8] py-24 md:py-32 px-6 md:px-12 lg:px-20"
    >
      <div className="max-w-4xl mx-auto space-y-8">
        {lines.map((line, index) => (
          <TextReveal
            key={index}
            className="text-3xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight"
          >
            {line}
          </TextReveal>
        ))}
      </div>
    </section>
  );
}

