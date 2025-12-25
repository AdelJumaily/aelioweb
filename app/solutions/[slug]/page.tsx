"use client";

import { useEffect, useRef, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ContactModal from "../../components/forms/ContactModal";
import Link from "next/link";
import { solutionsData } from "@/lib/solutions-data";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const slugMap: Record<string, keyof typeof solutionsData> = {
  'web-design': 'web-design',
  'branding': 'branding',
  'digital-marketing': 'digital-marketing',
  'ecommerce': 'ecommerce',
  'app-development': 'app-development',
  'maintenance': 'maintenance'
};

export default function SolutionDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const slug = params?.slug as string;
  const solution = solutionsData[slugMap[slug] || 'web-design'];

  const heroRef = useRef<HTMLDivElement>(null);
  const featuresRef = useRef<HTMLDivElement>(null);
  const processRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
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

    // Features animation
    if (featuresRef.current) {
      gsap.fromTo(
        featuresRef.current.children,
        {
          opacity: 0,
          y: 50,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: featuresRef.current,
            start: "top 75%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }

    // Process animation
    if (processRef.current) {
      gsap.fromTo(
        processRef.current.children,
        {
          opacity: 0,
          x: -30,
        },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: processRef.current,
            start: "top 75%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }

    // CTA animation
    if (ctaRef.current) {
      gsap.fromTo(
        ctaRef.current,
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
            trigger: ctaRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
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
  }, [slug]);

  if (!solution) {
    return (
      <main className="bg-[#f5f1e8] min-h-screen">
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <h1 className="shadow-headline text-4xl mb-4">Solution Not Found</h1>
            <Link href="/solutions" className="text-blue-600 hover:underline">
              Back to Solutions
            </Link>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="bg-[#f5f1e8] min-h-screen">

      {/* Hero Section */}
      <section className="relative bg-[#f5f1e8] px-6 md:px-12 lg:px-20 py-24 md:py-32">
        <div ref={heroRef} className="max-w-7xl mx-auto">
          <div className="mb-6">
            <Link
              href="/solutions"
              className="text-sm text-gray-600 hover:text-gray-900 transition-colors inline-flex items-center gap-2"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back to Solutions
            </Link>
          </div>
          <div className="text-center">
            <div className="text-6xl mb-6">{solution.icon}</div>
            <h1 className="shadow-headline text-4xl md:text-5xl lg:text-6xl leading-tight mb-4">
              {solution.title}
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 mb-6">{solution.subtitle}</p>
            <p className="text-base md:text-lg text-gray-700 max-w-3xl mx-auto">
              {solution.description}
            </p>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="relative bg-white px-6 md:px-12 lg:px-20 py-24 md:py-32">
        <div className="max-w-7xl mx-auto">
          <h2 className="shadow-headline text-3xl md:text-4xl lg:text-5xl mb-12 text-center">
            What&apos;s Included
          </h2>
          <div ref={featuresRef} className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {solution.features.map((feature, index) => (
              <div
                key={index}
                className="bg-[#f5f1e8] rounded-2xl p-8 border border-gray-200 hover:shadow-lg transition-all duration-300"
              >
                <h3 className="shadow-headline text-2xl md:text-3xl mb-3">{feature.title}</h3>
                <p className="text-gray-700 text-base leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="relative bg-[#f5f1e8] px-6 md:px-12 lg:px-20 py-24 md:py-32">
        <div className="max-w-7xl mx-auto">
          <h2 className="shadow-headline text-3xl md:text-4xl lg:text-5xl mb-12 text-center">
            Our Process
          </h2>
          <div ref={processRef} className="max-w-4xl mx-auto">
            <div className="space-y-8">
              {solution.process.map((step, index) => (
                <div key={index} className="flex items-start gap-6">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-black text-white flex items-center justify-center font-bold text-lg">
                    {index + 1}
                  </div>
                  <div className="flex-1 pt-2">
                    <h3 className="shadow-headline text-xl md:text-2xl mb-2">{step}</h3>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section ref={ctaRef} className="relative bg-white px-6 md:px-12 lg:px-20 py-24 md:py-32 border-t border-gray-300">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="shadow-headline text-3xl md:text-4xl lg:text-5xl mb-6">
            Ready to Get Started?
          </h2>
          <p className="text-base md:text-lg text-gray-700 mb-8 max-w-2xl mx-auto">
            Let&apos;s discuss how we can help transform your business with {solution.title.toLowerCase()}.
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
        </div>
      </section>

      {/* Footer */}
      <footer ref={footerRef} className="bg-[#f5f1e8] border-t border-gray-300 py-16 px-6 md:px-12 lg:px-20">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            <div>
              <h3 className="shadow-headline text-xl mb-4">Navigation</h3>
              <ul className="space-y-2 text-gray-700">
                <li>
                  <Link href="/#solutions" className="hover:text-gray-900 transition-colors">
                    Solutions
                  </Link>
                </li>
                <li>
                  <Link href="/#about" className="hover:text-gray-900 transition-colors">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link href="/#contact" className="hover:text-gray-900 transition-colors">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="shadow-headline text-xl mb-4">Social Links</h3>
              <ul className="space-y-2 text-gray-700">
                <li>
                  <a
                    href="https://www.linkedin.com/company/aelio"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-gray-900 transition-colors"
                  >
                    LinkedIn
                  </a>
                </li>
                <li>
                  <a
                    href="https://twitter.com/aelio"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-gray-900 transition-colors"
                  >
                    Twitter
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.instagram.com/aelio.web?igsh=MWRicGNidHNlZXduaA=="
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-gray-900 transition-colors"
                  >
                    Instagram
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="shadow-headline text-xl mb-4">Contact</h3>
              <p className="text-gray-700">
                <a
                  href="mailto:info@aelio.dev"
                  className="hover:text-gray-900 transition-colors"
                >
                  info@aelio.dev
                </a>
              </p>
            </div>
          </div>
          <div className="text-center text-gray-500 text-sm">
            © {new Date().getFullYear()} Aelio. All rights reserved.
          </div>
        </div>
      </footer>

      <ContactModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </main>
  );
}

