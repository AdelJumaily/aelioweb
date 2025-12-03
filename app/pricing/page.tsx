"use client";

import { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import Navbar from "../components/layout/Navbar";
import ContactModal from "../components/forms/ContactModal";

type Plan = {
  name: string;
  price: string;
  tagline: string;
  features: string[];
  cta: string;
};

const webDesignPlans: Plan[] = [
  {
    name: "Starter Site",
    price: "$2,500",
    tagline: "Perfect for new brands",
    features: [
      "3–5 page marketing site",
      "Conversion-focused layouts",
      "Basic analytics setup",
    ],
    cta: "Select Starter",
  },
  {
    name: "Growth Site",
    price: "$5,000",
    tagline: "Built to scale with your brand",
    features: [
      "Up to 10 pages",
      "Reusable components & sections",
      "Blog or resources hub",
    ],
    cta: "Select Growth",
  },
  {
    name: "Product Site",
    price: "$9,500+",
    tagline: "Complex or product-led experiences",
    features: [
      "Custom integrations",
      "Complex information architecture",
      "Motion & interaction design",
    ],
    cta: "Talk to Sales",
  },
];

const hostingPlans: Plan[] = [
  {
    name: "Care",
    price: "$99/mo",
    tagline: "Essentials for smaller sites",
    features: [
      "Managed hosting",
      "Uptime monitoring",
      "Monthly security patches",
    ],
    cta: "Select Care",
  },
  {
    name: "Care+",
    price: "$249/mo",
    tagline: "For growing sites and teams",
    features: [
      "Everything in Care",
      "Priority support",
      "Quarterly optimization review",
    ],
    cta: "Select Care+",
  },
  {
    name: "Enterprise Care",
    price: "Custom",
    tagline: "For mission‑critical workloads",
    features: ["SLAs & SLOs", "Dedicated engineer", "Compliance support"],
    cta: "Talk to Sales",
  },
];

const tabs = [
  { id: "web", label: "Web Design & Development", plans: webDesignPlans },
  {
    id: "hosting",
    label: "Maintenance & Hosting",
    plans: hostingPlans,
  },
];

export default function PricingPage() {
  const [activeTab, setActiveTab] = useState<string>("web");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const tableRef = useRef<HTMLDivElement>(null);
  const prevTabRef = useRef<string>("web");

  const active = tabs.find((t) => t.id === activeTab) ?? tabs[0];

  // Get all unique features across all plans for comparison
  const allFeatures = active.plans.reduce((acc, plan) => {
    plan.features.forEach((feature) => {
      if (!acc.includes(feature)) {
        acc.push(feature);
      }
    });
    return acc;
  }, [] as string[]);

  // GSAP animation for tab transitions
  useEffect(() => {
    if (!tableRef.current || prevTabRef.current === activeTab) {
      prevTabRef.current = activeTab;
      return;
    }

    const table = tableRef.current;
    const direction = tabs.findIndex((t) => t.id === activeTab) > tabs.findIndex((t) => t.id === prevTabRef.current) ? 1 : -1;

    // Create animation timeline
    const tl = gsap.timeline();

    // Fade out and slide out
    tl.to(table, {
      opacity: 0,
      y: direction * 20,
      duration: 0.3,
      ease: "power2.in",
    })
      // Update content (happens instantly)
      .set(table, {
        opacity: 0,
        y: direction * -20,
      })
      // Fade in and slide in
      .to(table, {
        opacity: 1,
        y: 0,
        duration: 0.4,
        ease: "power2.out",
      });

    prevTabRef.current = activeTab;

    return () => {
      tl.kill();
    };
  }, [activeTab]);

  return (
    <main className="bg-[#f5f1e8] min-h-screen">
      <Navbar />
      
      <section id="pricing" className="relative bg-[#f5f1e8] px-6 md:px-12 lg:px-20 py-24 md:py-32">
        <div className="max-w-7xl mx-auto">
          {/* Heading */}
          <div className="text-center mb-12">
            <h1 className="shadow-headline text-4xl md:text-5xl lg:text-6xl mb-4">
              Pricing
            </h1>
            <p className="text-base md:text-lg text-gray-700 max-w-2xl mx-auto">
              Choose the plan that matches where your brand is today: design &amp; build, or ongoing maintenance.
            </p>
          </div>

          {/* Tabs */}
          <div className="flex justify-center mb-10">
            <div className="inline-flex gap-6 md:gap-10 border-b border-gray-300">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`pb-3 text-sm md:text-base font-medium transition-colors ${
                    activeTab === tab.id
                      ? "text-black border-b-2 border-black"
                      : "text-gray-600 hover:text-gray-900"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Comparison Table */}
          <div className="overflow-x-auto" ref={tableRef}>
            <table className="w-full border-collapse bg-white rounded-lg shadow-lg overflow-hidden">
              <thead>
                <tr className="bg-gray-50 border-b-2 border-gray-200">
                  <th className="text-left p-6 font-semibold text-gray-900" style={{ fontFamily: '"Times New Roman", Times, serif' }}>
                    Features
                  </th>
                  {active.plans.map((plan) => (
                    <th key={plan.name} className="text-center p-6 border-l border-gray-200">
                      <div className="space-y-2">
                        <div className="shadow-headline text-xl md:text-2xl">{plan.name}</div>
                        <div className="text-2xl md:text-3xl font-bold text-black">{plan.price}</div>
                        <div className="text-sm text-gray-600">{plan.tagline}</div>
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {allFeatures.map((feature, idx) => (
                  <tr key={idx} className={idx % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                    <td className="p-6 text-gray-700 font-medium">{feature}</td>
                    {active.plans.map((plan) => (
                      <td key={plan.name} className="p-6 text-center border-l border-gray-200">
                        {plan.features.includes(feature) ? (
                          <svg className="w-6 h-6 text-green-600 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        ) : (
                          <span className="text-gray-300">—</span>
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
                <tr className="bg-gray-100 border-t-2 border-gray-200">
                  <td className="p-6"></td>
                  {active.plans.map((plan) => (
                    <td key={plan.name} className="p-6 text-center border-l border-gray-200">
                      <button
                        onClick={() => setIsModalOpen(true)}
                        className="w-full px-6 py-3 rounded-lg bg-black text-white text-sm font-medium hover:bg-gray-800 transition-all duration-200 shadow-lg hover:shadow-xl"
                      >
                        {plan.cta}
                      </button>
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>

          {/* Description */}
          <p className="text-center text-sm md:text-base text-gray-600 max-w-3xl mx-auto mt-12">
            Our packages are built to scale with your business. From strategy to
            execution, we tailor each engagement to match your growth stage.
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#f5f1e8] border-t border-gray-300 py-16 px-6 md:px-12 lg:px-20">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            <div>
              <h3 className="shadow-headline text-xl mb-4">Navigation</h3>
              <ul className="space-y-2 text-gray-700">
                <li><a href="/#solutions" className="hover:text-gray-900 transition-colors">Solutions</a></li>
                <li><a href="/#about" className="hover:text-gray-900 transition-colors">About Us</a></li>
                <li><a href="/#contact" className="hover:text-gray-900 transition-colors">Contact</a></li>
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
    </main>
  );
}
