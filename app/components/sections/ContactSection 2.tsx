'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface ContactSectionProps {
  onOpenModal: () => void;
}

export default function ContactSection({ onOpenModal }: ContactSectionProps) {
  const contactSectionRef = useRef<HTMLElement>(null);
  const contactContentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Animate Contact section
    if (contactContentRef.current) {
      gsap.fromTo(
        contactContentRef.current.children,
        {
          opacity: 0,
          y: 50,
        },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: contactSectionRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => {
        if (trigger.vars.trigger === contactSectionRef.current) {
          trigger.kill();
        }
      });
    };
  }, []);

  return (
    <section ref={contactSectionRef} id="contact" className="bg-[#f5f1e8] px-6 md:px-12 lg:px-20 py-24 md:py-32 border-t border-gray-300">
      <div ref={contactContentRef} className="max-w-4xl mx-auto text-center">
        <h2 className="shadow-headline text-3xl md:text-4xl lg:text-5xl mb-6">
          Ready to Elevate Your Brand?
        </h2>
        <p className="text-base md:text-lg text-gray-700 mb-8 max-w-2xl mx-auto">
          Let&apos;s discuss how we can help transform your business with creative strategy and conversion-focused marketing.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <button
            onClick={onOpenModal}
            className="px-8 py-3 rounded-lg bg-black text-white text-sm font-medium hover:bg-gray-800 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
          >
            Get in Touch
          </button>
          <Link
            href="/pricing"
            className="px-8 py-3 rounded-lg text-white text-sm font-medium transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 inline-block"
            style={{ backgroundColor: "#a3430a" }}
          >
            View Pricing
          </Link>
        </div>
        <p className="text-gray-600 mt-8 text-sm">
          Email: <a href="mailto:info@aelio.dev" className="text-gray-900 hover:text-gray-700 transition-colors">info@aelio.dev</a>
        </p>
      </div>
    </section>
  );
}


