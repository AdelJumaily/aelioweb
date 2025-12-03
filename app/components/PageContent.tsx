'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Hero from './Hero';
import ServicesShowcase from './ServicesShowcase';
import ContactModal from './ContactModal';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function PageContent() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const contactSectionRef = useRef<HTMLElement>(null);
  const contactContentRef = useRef<HTMLDivElement>(null);
  const footerRef = useRef<HTMLElement>(null);

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

    // Animate Footer
    if (footerRef.current) {
      gsap.fromTo(
        footerRef.current,
        {
          opacity: 0,
          y: 30,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: footerRef.current,
            start: 'top 90%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <>
      {/* Hero Section */}
      <Hero />

      {/* Services Showcase Section */}
      <section id="solutions">
        <ServicesShowcase />
      </section>


      {/* Contact Section */}
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
              onClick={() => setIsModalOpen(true)}
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

      {/* Footer */}
      <footer ref={footerRef} className="bg-[#f5f1e8] border-t border-gray-300 py-16 px-6 md:px-12 lg:px-20">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            <div>
              <h3 className="shadow-headline text-xl mb-4">Navigation</h3>
              <ul className="space-y-2 text-gray-700">
                <li><a href="#solutions" className="hover:text-gray-900 transition-colors">Solutions</a></li>
                <li><a href="#contact" className="hover:text-gray-900 transition-colors">Contact</a></li>
              </ul>
            </div>
            <div>
              <h3 className="shadow-headline text-xl mb-4">Social Links</h3>
              <ul className="space-y-2 text-gray-700">
                <li><a href="https://www.linkedin.com/company/aelio" target="_blank" rel="noopener noreferrer" className="hover:text-gray-900 transition-colors">LinkedIn</a></li>
                <li><a href="https://twitter.com/aelio" target="_blank" rel="noopener noreferrer" className="hover:text-gray-900 transition-colors">Twitter</a></li>
                <li><a href="https://www.instagram.com/aelio.web?igsh=MWRicGNidHNlZXduaA==" target="_blank" rel="noopener noreferrer" className="hover:text-gray-900 transition-colors">Instagram</a></li>
              </ul>
            </div>
            <div>
              <h3 className="shadow-headline text-xl mb-4">Contact</h3>
              <p className="text-gray-700">
                <a href="mailto:info@aelio.dev" className="hover:text-gray-900 transition-colors">info@aelio.dev</a>
              </p>
            </div>
          </div>
          <div className="text-center text-gray-500 text-sm">
            © {new Date().getFullYear()} Aelio. All rights reserved.
          </div>
        </div>
      </footer>

      <ContactModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
}

