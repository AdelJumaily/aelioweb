"use client";

import { useState } from "react";
import ContactModal from "../forms/ContactModal";

export default function FinalCTASection() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <section className="relative bg-gradient-to-br from-[#1a1a1a] to-[#0a0a0a] py-24 md:py-32 px-6 md:px-12 lg:px-20">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6">
            Ready to see your brand in motion?
          </h2>
          <p className="text-xl md:text-2xl text-white/80 mb-8 max-w-2xl mx-auto">
            We'll design a free concept screen for your product — no commitment,
            no templates, just a taste of what Aelio can do.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
            <button
              onClick={() => setIsModalOpen(true)}
              className="px-8 py-4 bg-white text-black rounded-full hover:bg-gray-100 transition-all duration-200 flex items-center gap-2 text-base font-medium shadow-lg hover:shadow-xl"
            >
              Book a free concept call
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
            <button className="px-8 py-4 bg-transparent border-2 border-white/30 text-white rounded-full hover:border-white/50 hover:bg-white/5 transition-all duration-200 text-base font-medium">
              View recent work
            </button>
          </div>

          <div className="px-4 py-2 bg-white/10 backdrop-blur-sm text-white rounded-full text-sm inline-block">
            Aelio Studio · Web & App Experiences
          </div>
        </div>
      </section>

      <ContactModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
}



