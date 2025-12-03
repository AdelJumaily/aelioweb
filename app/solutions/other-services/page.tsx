"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Navbar from "../../components/layout/Navbar";
import Footer from "../../components/layout/Footer";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function OtherServicesPage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const footerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Hero animation
    if (heroRef.current) {
      gsap.fromTo(
        heroRef.current.children,
        {
          opacity: 0,
          y: 30,
        },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          stagger: 0.2,
          ease: "power3.out",
        }
      );
    }

    // Footer animation
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
          ease: "power2.out",
          scrollTrigger: {
            trigger: footerRef.current,
            start: "top 90%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <main className="bg-[#f5f1e8] min-h-screen">
      <Navbar />

      {/* Coming Soon Section */}
      <section ref={heroRef} className="relative bg-[#f5f1e8] px-6 md:px-12 lg:px-20 py-24 md:py-32 min-h-[80vh] flex items-center justify-center">
        <div className="max-w-4xl mx-auto text-center">
          <div className="text-8xl mb-8">🚧</div>
          <h1 className="shadow-headline text-5xl md:text-6xl lg:text-7xl mb-6">
            Coming Soon
          </h1>
          <p className="text-xl md:text-2xl text-gray-700 mb-8 max-w-2xl mx-auto">
            We&apos;re working hard to bring you Other Services including Branding, App Development, Graphic Design, and more. 
            Stay tuned for updates!
          </p>
        </div>
      </section>

      <div ref={footerRef}>
        <Footer />
      </div>
    </main>
  );
}

