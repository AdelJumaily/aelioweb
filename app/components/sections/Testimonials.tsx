"use client";

import React from "react";
import { motion } from "framer-motion";
import { testimonials } from "@/lib/content/testimonials";
import { scrollReveal } from "@/lib/animations";

export default function TestimonialsSection() {
  return (
    <section className="py-32 px-6 md:px-10 bg-[#FAFAF8]">
      <div className="max-w-7xl mx-auto">
        <motion.div
          variants={scrollReveal}
          initial="initial"
          whileInView="whileInView"
          viewport={{ once: true, margin: "-100px" }}
          className="text-center mb-16"
        >
          <h2 className="text-[clamp(2.5rem,5vw,4.5rem)] font-bold mb-4 text-[#0A0A0A]">
            What Clients Say
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-white p-8 rounded-xl shadow-[0_4px_20px_rgba(0,0,0,0.06)] border border-[rgba(0,0,0,0.06)] relative"
            >
              {testimonial.verified && (
                <div className="absolute top-4 right-4 text-xs px-3 py-1 bg-[#FF5722] text-white rounded-full">
                  Verified
                </div>
              )}
              <div className="text-6xl text-[#FF5722] mb-4 leading-none">"</div>
              <p className="text-lg leading-relaxed text-[#0A0A0A] mb-6">
                {testimonial.quote}
              </p>
              <div className="border-t border-[rgba(0,0,0,0.08)] pt-4">
                <div className="font-bold text-[#0A0A0A]">{testimonial.author}</div>
                <div className="text-sm text-[#6B6B6B]">{testimonial.role}</div>
                <div className="text-sm text-[#6B6B6B]">{testimonial.company}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}










