"use client";

import { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import ContactModal from "../components/forms/ContactModal";

type Plan = {
  name: string;
  price: string;
  tagline: string;
  features: string[];
  expandedFeatures?: string[];
  cta: string;
  popular?: boolean;
};

const webDesignPlans: Plan[] = [
  {
    name: "Starter Site",
    price: "Upon Request",
    tagline: "Perfect for new brands",
    features: [
      "3–5 page marketing site",
      "Conversion-focused layouts",
      "Basic analytics setup",
    ],
    expandedFeatures: [
      "Responsive design for all devices",
      "SEO optimization basics",
      "Contact form integration",
      "Social media integration",
      "1 round of revisions",
      "2 weeks delivery time",
    ],
    cta: "Request Quote",
  },
  {
    name: "Growth Site",
    price: "Upon Request",
    tagline: "Built to scale with your brand",
    popular: true,
    features: [
      "Up to 10 pages",
      "Reusable components & sections",
      "Blog or resources hub",
    ],
    expandedFeatures: [
      "Everything in Starter, plus:",
      "Advanced SEO optimization",
      "Content management system",
      "Custom animations & interactions",
      "E-commerce integration ready",
      "3 rounds of revisions",
      "3-4 weeks delivery time",
      "Performance optimization",
    ],
    cta: "Request Quote",
  },
  {
    name: "Product Site",
    price: "Upon Request",
    tagline: "Complex or product-led experiences",
    features: [
      "Custom integrations",
      "Complex information architecture",
      "Motion & interaction design",
    ],
    expandedFeatures: [
      "Everything in Growth, plus:",
      "Custom API integrations",
      "User authentication systems",
      "Advanced analytics & tracking",
      "Multi-language support",
      "Enterprise-grade security",
      "Unlimited revisions",
      "6-8 weeks delivery time",
      "Dedicated project manager",
    ],
    cta: "Talk to Sales",
  },
];

const videoProductionPlans: Plan[] = [
  {
    name: "Essential",
    price: "Upon Request",
    tagline: "Perfect for social media content",
    features: [
      "Concept development",
      "Basic filming & production",
      "Standard editing",
      "1 revision round",
    ],
    expandedFeatures: [
      "Up to 2 minutes final video",
      "Basic color correction",
      "Simple motion graphics",
      "Social media formats",
      "2-3 weeks delivery",
      "Stock music & sound effects",
    ],
    cta: "Request Quote",
  },
  {
    name: "Professional",
    price: "Upon Request",
    tagline: "For brand videos and commercials",
    popular: true,
    features: [
      "Everything in Essential, plus:",
      "Advanced filming & production",
      "Professional editing & post-production",
      "Custom motion graphics",
    ],
    expandedFeatures: [
      "Up to 5 minutes final video",
      "Professional color grading",
      "Custom animations",
      "Multiple format delivery",
      "3-4 weeks delivery",
      "Custom music composition",
      "Voice-over recording",
      "3 revision rounds",
    ],
    cta: "Request Quote",
  },
  {
    name: "Enterprise",
    price: "Upon Request",
    tagline: "Full-scale production projects",
    features: [
      "Everything in Professional, plus:",
      "Multi-day production",
      "Cinematic quality",
      "Full creative team",
    ],
    expandedFeatures: [
      "Unlimited video length",
      "Multiple video deliverables",
      "Aerial & specialty shots",
      "Professional actors & talent",
      "6-8 weeks delivery",
      "Original music composition",
      "Full brand integration",
      "Unlimited revisions",
      "Dedicated project manager",
    ],
    cta: "Talk to Sales",
  },
];

const brandingPlans: Plan[] = [
  {
    name: "Starter Brand",
    price: "Upon Request",
    tagline: "Essential brand identity",
    features: [
      "Logo design (3 concepts)",
      "Basic color palette",
      "Typography selection",
      "Brand guidelines (basic)",
    ],
    expandedFeatures: [
      "1 primary logo concept",
      "2 alternative logo variations",
      "Color palette (3-5 colors)",
      "Font selection (2-3 fonts)",
      "Basic brand guidelines PDF",
      "2 revision rounds",
      "3-4 weeks delivery",
    ],
    cta: "Request Quote",
  },
  {
    name: "Complete Brand",
    price: "Upon Request",
    tagline: "Comprehensive brand identity",
    popular: true,
    features: [
      "Everything in Starter, plus:",
      "Full brand system",
      "Extended color palette",
      "Comprehensive brand guidelines",
    ],
    expandedFeatures: [
      "Multiple logo variations",
      "Logo usage guidelines",
      "Extended color palette (8-10 colors)",
      "Complete typography system",
      "Brand voice & messaging guide",
      "Business card design",
      "Letterhead & envelope design",
      "Social media templates",
      "4-6 weeks delivery",
      "3 revision rounds",
    ],
    cta: "Request Quote",
  },
  {
    name: "Enterprise Brand",
    price: "Upon Request",
    tagline: "Full brand transformation",
    features: [
      "Everything in Complete, plus:",
      "Brand strategy & positioning",
      "Full brand application system",
      "Multi-brand guidelines",
    ],
    expandedFeatures: [
      "Brand research & strategy",
      "Competitive analysis",
      "Complete visual identity system",
      "Brand architecture",
      "Full application examples",
      "Packaging design (if applicable)",
      "Environmental design guidelines",
      "Brand training & workshops",
      "6-8 weeks delivery",
      "Unlimited revisions",
      "Dedicated brand strategist",
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
    expandedFeatures: [
      "99.9% uptime guarantee",
      "Daily backups",
      "SSL certificate included",
      "Basic performance optimization",
      "Email support (48h response)",
      "CDN included",
    ],
    cta: "Select Care",
  },
  {
    name: "Care+",
    price: "$249/mo",
    tagline: "For growing sites and teams",
    popular: true,
    features: [
      "Everything in Care",
      "Priority support",
      "Quarterly optimization review",
    ],
    expandedFeatures: [
      "Everything in Care, plus:",
      "99.99% uptime guarantee",
      "Real-time backups",
      "Advanced security monitoring",
      "Performance optimization",
      "Priority support (24h response)",
      "Quarterly performance reports",
      "Staging environment",
    ],
    cta: "Select Care+",
  },
  {
    name: "Enterprise Care",
    price: "Custom",
    tagline: "For mission‑critical workloads",
    features: ["SLAs & SLOs", "Dedicated engineer", "Compliance support"],
    expandedFeatures: [
      "Everything in Care+, plus:",
      "Custom SLA agreements",
      "Dedicated support engineer",
      "HIPAA/GDPR compliance",
      "24/7 phone support",
      "Custom infrastructure setup",
      "Monthly strategy sessions",
      "White-glove onboarding",
    ],
    cta: "Talk to Sales",
  },
];

const tabs = [
  { id: "web", label: "Web Design & Development", plans: webDesignPlans },
  { id: "video", label: "Video Production", plans: videoProductionPlans },
  { id: "branding", label: "Branding", plans: brandingPlans },
  { id: "hosting", label: "Maintenance & Hosting", plans: hostingPlans },
];

export default function PricingPage() {
  const [activeTab, setActiveTab] = useState<string>("web");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [expandedPlans, setExpandedPlans] = useState<Set<string>>(new Set());
  const cardsRef = useRef<HTMLDivElement>(null);
  const prevTabRef = useRef<string>("web");

  const active = tabs.find((t) => t.id === activeTab) ?? tabs[0];

  const togglePlanExpansion = (planName: string) => {
    setExpandedPlans((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(planName)) {
        newSet.delete(planName);
      } else {
        newSet.add(planName);
      }
      return newSet;
    });
  };

  // GSAP animation for tab transitions
  useEffect(() => {
    if (!cardsRef.current || prevTabRef.current === activeTab) {
      prevTabRef.current = activeTab;
      return;
    }

    const cards = cardsRef.current;
    const direction = tabs.findIndex((t) => t.id === activeTab) > tabs.findIndex((t) => t.id === prevTabRef.current) ? 1 : -1;

    // Create animation timeline
    const tl = gsap.timeline();

    // Fade out and slide out
    tl.to(cards, {
      opacity: 0,
      y: direction * 20,
      duration: 0.3,
      ease: "power2.in",
    })
      // Update content (happens instantly)
      .set(cards, {
        opacity: 0,
        y: direction * -20,
      })
      // Fade in and slide in
      .to(cards, {
        opacity: 1,
        y: 0,
        duration: 0.4,
        ease: "power2.out",
      });

    prevTabRef.current = activeTab;
    setExpandedPlans(new Set()); // Reset expanded plans on tab change

    return () => {
      tl.kill();
    };
  }, [activeTab]);

  return (
    <main className="bg-[#f5f1e8] min-h-screen">
      <section id="pricing" className="relative bg-[#f5f1e8] px-6 md:px-12 lg:px-20 py-24 md:py-32">
        <div className="max-w-7xl mx-auto">
          {/* Heading */}
          <div className="text-center mb-16">
            <h1 className="shadow-headline text-4xl md:text-5xl lg:text-6xl mb-4">
              Pricing
            </h1>
            <p className="text-base md:text-lg text-gray-700 max-w-2xl mx-auto">
              Choose the service and plan that matches where your brand is today. From web development to video production, branding, and ongoing maintenance.
            </p>
          </div>

          {/* Tabs */}
          <div className="flex justify-center mb-12">
            <div className="inline-flex flex-wrap gap-4 md:gap-6 lg:gap-10 border-b border-gray-300 justify-center">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`pb-3 text-xs sm:text-sm md:text-base font-medium transition-colors whitespace-nowrap ${
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

          {/* Pricing Cards */}
          <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mb-12">
            {active.plans.map((plan) => {
              const isExpanded = expandedPlans.has(plan.name);
              const allFeatures = isExpanded && plan.expandedFeatures 
                ? [...plan.features, ...plan.expandedFeatures] 
                : plan.features;
              const isHosting = activeTab === "hosting";
              const priceSuffix = plan.price === "Custom" || plan.price === "Upon Request"
                ? "" 
                : isHosting 
                ? "per month" 
                : "one-time";

              return (
                <div
                  key={plan.name}
                  className={`relative bg-white rounded-xl shadow-lg border-2 transition-all duration-300 hover:shadow-xl ${
                    plan.popular 
                      ? "border-[#FF5722] lg:scale-105 lg:-mt-4" 
                      : "border-gray-200"
                  }`}
                >
                  {plan.popular && (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                      <span className="bg-[#FF5722] text-white text-xs font-semibold px-4 py-1 rounded-full">
                        MOST POPULAR
                      </span>
                    </div>
                  )}
                  
                  <div className="p-8">
                    {/* Plan Header */}
                    <div className="mb-6">
                      <h3 className="shadow-headline text-2xl font-bold mb-2">{plan.name}</h3>
                      <p className="text-gray-600 text-sm mb-4">{plan.tagline}</p>
                      <div className="flex items-baseline gap-2">
                        <span className="text-4xl font-bold text-black">{plan.price}</span>
                        {priceSuffix && (
                          <span className="text-gray-500 text-sm">{priceSuffix}</span>
                        )}
                      </div>
                    </div>

                    {/* Features List */}
                    <ul className="space-y-3 mb-6 min-h-[200px]">
                      {allFeatures.map((feature, idx) => (
                        <li key={idx} className="flex items-start gap-3">
                          <svg 
                            className="w-5 h-5 text-[#FF5722] mt-0.5 flex-shrink-0" 
                            fill="none" 
                            stroke="currentColor" 
                            viewBox="0 0 24 24"
                          >
                            <path 
                              strokeLinecap="round" 
                              strokeLinejoin="round" 
                              strokeWidth={2} 
                              d="M5 13l4 4L19 7" 
                            />
                          </svg>
                          <span className="text-gray-700 text-sm leading-relaxed">{feature}</span>
                        </li>
                      ))}
                    </ul>

                    {/* Expand/Collapse Button */}
                    {plan.expandedFeatures && (
                      <button
                        onClick={() => togglePlanExpansion(plan.name)}
                        className="w-full mb-6 py-2 text-sm font-medium text-[#FF5722] hover:text-[#E64A19] transition-colors flex items-center justify-center gap-2"
                      >
                        {isExpanded ? (
                          <>
                            Show Less
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                            </svg>
                          </>
                        ) : (
                          <>
                            View All Features
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                          </>
                        )}
                      </button>
                    )}

                    {/* CTA Button */}
                    <button
                      onClick={() => setIsModalOpen(true)}
                      className={`w-full px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
                        plan.popular
                          ? "bg-[#FF5722] text-white hover:bg-[#E64A19] shadow-lg hover:shadow-xl"
                          : plan.price === "Custom" || plan.price === "Upon Request"
                          ? "bg-white border-2 border-black text-black hover:bg-black hover:text-white"
                          : "bg-black text-white hover:bg-gray-800 shadow-lg hover:shadow-xl"
                      }`}
                    >
                      {plan.cta}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Description */}
          <p className="text-center text-sm md:text-base text-gray-600 max-w-3xl mx-auto">
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
