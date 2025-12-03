"use client";

import { useState } from "react";

const faqs = [
  {
    question: "What exactly does Aelio do?",
    answer:
      "We design and build custom websites, web apps, and mobile apps — plus the brand systems and visuals that tie everything together. No templates, no generic themes. Everything is tailored to your product and audience.",
  },
  {
    question: "Who is Aelio a good fit for?",
    answer:
      "Growing brands, SaaS products, and service businesses that care about design, performance, and storytelling. If you're tired of cookie-cutter sites and want something that actually feels premium, we're a fit.",
  },
  {
    question: "How long does a project usually take?",
    answer:
      "Smaller projects (like a marketing site) typically take 3–5 weeks. Full product experiences — websites + apps + brand — can range from 6–10 weeks depending on scope.",
  },
  {
    question: "What does the process look like?",
    answer:
      "We start with a discovery call → moodboards & direction → UX wireframes → high-fidelity designs → development & animations → launch and light optimization.",
  },
  {
    question: "Do you offer ongoing support or just one-off projects?",
    answer:
      "Both. We can hand everything over to your team, or stay on as your long-term design & dev partner for updates, new features, and experiments.",
  },
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="relative bg-[#f5f1e8] py-24 md:py-32 px-6 md:px-12 lg:px-20">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-16">
          FAQ
        </h2>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="border-b border-gray-300 pb-4"
            >
              <button
                onClick={() =>
                  setOpenIndex(openIndex === index ? null : index)
                }
                className="w-full text-left flex items-center justify-between py-4"
              >
                <h3 className="text-xl md:text-2xl font-semibold text-gray-900 pr-8">
                  {faq.question}
                </h3>
                <svg
                  className={`w-6 h-6 text-gray-900 transition-transform flex-shrink-0 ${
                    openIndex === index ? "rotate-180" : ""
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>

              {openIndex === index && (
                <div className="mt-2 pb-4">
                  <p className="text-base md:text-lg text-gray-700 leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
