"use client";

import { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { gsap } from "gsap";
import Cal, { getCalApi } from "@calcom/embed-react";

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type Step = 1 | 2 | 3;

const budgetOptions = ["$10K-$20K", "$20K-$40K", "$40K-$80K", "$80K+"];
const serviceOptions = ["DIGITAL MARKETING", "WEBSITE", "APP", "BRANDING", "GRAPHIC DESIGN"];

export default function ContactModal({ isOpen, onClose }: ContactModalProps) {
  const [step, setStep] = useState<Step>(1);
  const [formData, setFormData] = useState({
    // Step 1
    companyName: "",
    budget: "",
    budgetLessThan10k: false,
    services: [] as string[],
    projectDescription: "",
    // Step 2
    name: "",
    email: "",
    phone: "",
    // Step 3
    selectedDate: "",
    selectedTime: "",
  });

  const [mounted, setMounted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const stepRef = useRef<HTMLDivElement>(null);

  // Initialize Cal.com
  useEffect(() => {
    if (mounted) {
      (async function () {
        const cal = await getCalApi({ namespace: "preliminary-consultation" });
        cal("ui", { hideEventTypeDetails: false, layout: "month_view" });
      })();
    }
  }, [mounted]);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Reset form when modal closes
  useEffect(() => {
    if (!isOpen) {
      setStep(1);
      setFormData({
        companyName: "",
        budget: "",
        budgetLessThan10k: false,
        services: [],
        projectDescription: "",
        name: "",
        email: "",
        phone: "",
        selectedDate: "",
        selectedTime: "",
      });
    }
  }, [isOpen]);

  // GSAP animations for step transitions
  useEffect(() => {
    if (!mounted || !stepRef.current) return;

    gsap.fromTo(
      stepRef.current,
      { opacity: 0, x: 30 },
      { opacity: 1, x: 0, duration: 0.5, ease: "power2.out" }
    );
  }, [step, mounted]);

  // GSAP animations for modal open/close
  useEffect(() => {
    if (!mounted) return;

    if (isOpen) {
      gsap.set(overlayRef.current, { opacity: 0 });
      gsap.set(contentRef.current, { opacity: 0, y: 30, scale: 0.95 });

      gsap.to(overlayRef.current, {
        opacity: 1,
        duration: 0.6,
        ease: "power2.out",
      });

      gsap.to(contentRef.current, {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.8,
        ease: "power3.out",
        delay: 0.1,
      });
    } else {
      const tl = gsap.timeline();
      tl.to(contentRef.current, {
        opacity: 0,
        y: -20,
        scale: 0.95,
        duration: 0.4,
        ease: "power2.in",
      }).to(
        overlayRef.current,
        {
          opacity: 0,
          duration: 0.4,
          ease: "power2.in",
        },
        "-=0.3"
      );
    }
  }, [isOpen, mounted]);

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.documentElement.style.overflow = "hidden";
      document.body.style.overflow = "hidden";
    } else {
      document.documentElement.style.overflow = "";
      document.body.style.overflow = "";
    }

    return () => {
      document.documentElement.style.overflow = "";
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const handleBudgetSelect = (budget: string) => {
    setFormData({ ...formData, budget, budgetLessThan10k: false });
  };

  const handleServiceToggle = (service: string) => {
    setFormData({
      ...formData,
      services: formData.services.includes(service)
        ? formData.services.filter((s) => s !== service)
        : [...formData.services, service],
    });
  };

  const handleNext = () => {
    if (step < 3) {
      setStep((step + 1) as Step);
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep((step - 1) as Step);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError(null);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to submit form');
      }

      // If Cal.com is configured, redirect to booking
      if (process.env.NEXT_PUBLIC_CALCOM_URL) {
        const calUrl = `${process.env.NEXT_PUBLIC_CALCOM_URL}?name=${encodeURIComponent(formData.name)}&email=${encodeURIComponent(formData.email)}`;
        window.open(calUrl, '_blank');
      }

      alert("Thank you! We'll be in touch soon.");
      onClose();
    } catch (error) {
      console.error('Submission error:', error);
      setSubmitError(error instanceof Error ? error.message : 'Failed to submit form. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const canProceed = () => {
    if (step === 1) {
      return formData.name.trim() !== "" && formData.email.trim() !== "" && formData.phone.trim() !== "";
    }
    if (step === 2) {
      return formData.companyName.trim() !== "" && (formData.budget !== "" || formData.budgetLessThan10k);
    }
    if (step === 3) {
      // For Cal.com, we just need to check if they've completed the booking
      // Cal.com handles the booking flow, so we can allow proceeding
      return true;
    }
    return false;
  };


  if (!isOpen || !mounted) return null;

  const modalContent = (
    <div
      ref={overlayRef}
      className="fixed inset-0 flex items-center justify-center bg-black/30 backdrop-blur-md p-8 md:p-12"
      style={{ zIndex: 99999 }}
      onClick={onClose}
    >
      <div
        ref={contentRef}
        className="relative w-full max-w-4xl text-white max-h-[90vh] overflow-y-auto flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-0 right-0 text-white hover:text-gray-300 transition-colors text-4xl md:text-5xl font-light z-10"
          aria-label="Close"
        >
          ×
        </button>

        {/* Step Indicator */}
        <div className="mb-8 flex gap-2">
          {[1, 2, 3].map((s) => (
            <div
              key={s}
              className={`h-1 flex-1 rounded-full transition-all duration-300 ${
                s <= step ? "bg-white" : "bg-white/20"
              }`}
            />
          ))}
        </div>

        <div ref={stepRef} className="flex-1 pb-8">
          {/* Step 1: Contact Info */}
          {step === 1 && (
            <form onSubmit={(e) => { e.preventDefault(); handleNext(); }} className="space-y-8">
              <div>
                <h2 className="text-5xl md:text-6xl font-bold mb-8 text-white" style={{ fontFamily: '"Times New Roman", Times, serif' }}>
                  Let&apos;s talk!
                </h2>
              </div>

              {/* Name */}
              <div>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full bg-transparent border-0 border-b-2 border-white/40 focus:border-white focus:outline-none pb-3 text-2xl md:text-3xl text-white placeholder:text-white/50"
                  placeholder="Name"
                  required
                />
              </div>

              {/* Email */}
              <div>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full bg-transparent border-0 border-b-2 border-white/40 focus:border-white focus:outline-none pb-3 text-2xl md:text-3xl text-white placeholder:text-white/50"
                  placeholder="Email"
                  required
                />
              </div>

              {/* Phone */}
              <div>
                <label className="block text-xl md:text-2xl text-gray-200 mb-3">
                  Phone number:
                </label>
                <div className="flex items-center gap-3 border-b-2 border-white/40 focus-within:border-white pb-3">
                  <div className="flex items-center gap-2 cursor-pointer">
                    <span className="text-3xl">🇺🇸</span>
                    <svg className="w-6 h-6 text-white/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="flex-1 bg-transparent border-0 focus:outline-none text-2xl md:text-3xl text-white placeholder:text-white/50"
                    placeholder="+1 571-477-7222"
                    required
                  />
                </div>
              </div>

              <div className="flex justify-end pt-8">
                <button
                  type="submit"
                  disabled={!canProceed()}
                  className={`px-8 py-4 rounded-full text-lg font-medium transition-all flex items-center gap-2 ${
                    canProceed()
                      ? "bg-white text-black hover:bg-gray-100"
                      : "bg-gray-600 text-gray-400 cursor-not-allowed"
                  }`}
                >
                  Next
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </form>
          )}

          {/* Step 2: Company Info */}
          {step === 2 && (
            <form onSubmit={(e) => { e.preventDefault(); handleNext(); }} className="space-y-6 pb-8">
              <div>
                <h2 className="text-5xl md:text-6xl font-bold mb-4 text-white" style={{ fontFamily: '"Times New Roman", Times, serif' }}>
                  Tell us about your project
                </h2>
              </div>

              {/* Company Name */}
              <div>
                <label className="block text-xl md:text-2xl text-gray-200 mb-4">
                  What&apos;s your company name?
                </label>
                <input
                  type="text"
                  value={formData.companyName}
                  onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                  className="w-full bg-transparent border-0 border-b-2 border-white/40 focus:border-white focus:outline-none pb-3 text-2xl md:text-3xl text-white placeholder:text-white/50"
                  placeholder="Company name"
                  required
                />
              </div>

              {/* Budget */}
              <div>
                <label className="block text-xl md:text-2xl text-gray-200 mb-4">
                  What have you budgeted for this project?
                </label>
                <div className="flex flex-wrap gap-3 mb-4">
                  {budgetOptions.map((budget) => (
                    <button
                      key={budget}
                      type="button"
                      onClick={() => handleBudgetSelect(budget)}
                      className={`px-6 py-3 rounded-lg text-lg font-medium transition-all ${
                        formData.budget === budget
                          ? "bg-white text-black"
                          : "bg-gray-800/50 text-white hover:bg-gray-700/50"
                      }`}
                    >
                      {budget}
                    </button>
                  ))}
                </div>
                <label className="flex items-center gap-3 text-lg text-gray-300">
                  <input
                    type="checkbox"
                    checked={formData.budgetLessThan10k}
                    onChange={(e) => {
                      setFormData({
                        ...formData,
                        budgetLessThan10k: e.target.checked,
                        budget: e.target.checked ? "" : formData.budget,
                      });
                    }}
                    className="w-5 h-5"
                  />
                  Less than $10K
                </label>
              </div>

              {/* Services */}
              <div>
                <label className="block text-xl md:text-2xl text-gray-200 mb-4">
                  What services are you looking for?
                </label>
                <div className="flex flex-wrap gap-3">
                  {serviceOptions.map((service) => (
                    <button
                      key={service}
                      type="button"
                      onClick={() => handleServiceToggle(service)}
                      className={`px-6 py-3 rounded-lg text-lg font-medium transition-all ${
                        formData.services.includes(service)
                          ? "bg-white text-black"
                          : "bg-gray-800/50 text-white hover:bg-gray-700/50"
                      }`}
                    >
                      {service}
                    </button>
                  ))}
                </div>
              </div>

              {/* Project Description */}
              <div>
                <label className="block text-xl md:text-2xl text-gray-200 mb-4">
                  Briefly explain your project
                </label>
                <textarea
                  value={formData.projectDescription}
                  onChange={(e) => setFormData({ ...formData, projectDescription: e.target.value })}
                  className="w-full bg-transparent border-0 border-b-2 border-white/40 focus:border-white focus:outline-none pb-3 text-xl md:text-2xl text-white placeholder:text-white/50 min-h-[100px] resize-none"
                  placeholder="Tell us about your project..."
                />
              </div>

              <div className="flex justify-between pt-6 pb-4">
                <button
                  type="button"
                  onClick={handleBack}
                  className="px-8 py-4 rounded-full bg-white/10 text-white hover:bg-white/20 transition-all flex items-center gap-2 text-lg font-medium"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                  Back
                </button>
                <button
                  type="submit"
                  disabled={!canProceed()}
                  className={`px-8 py-4 rounded-full text-lg font-medium transition-all flex items-center gap-2 ${
                    canProceed()
                      ? "bg-white text-black hover:bg-gray-100"
                      : "bg-gray-600 text-gray-400 cursor-not-allowed"
                  }`}
                >
                  Next
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </form>
          )}

          {/* Step 3: Appointment Booking */}
          {step === 3 && (
            <form onSubmit={handleSubmit} className="space-y-6 pb-8">
              <div>
                <h2 className="text-5xl md:text-6xl font-bold mb-4 text-white" style={{ fontFamily: '"Times New Roman", Times, serif' }}>
                  Book Your Appointment
                </h2>
                <p className="text-xl md:text-2xl text-gray-200">
                  Choose a date and time that works for you
                </p>
              </div>

              {/* Cal.com Calendar */}
              <div>
                <label className="block text-xl md:text-2xl text-gray-200 mb-4">
                  Select a date and time
                </label>
                <div className="max-w-4xl mx-auto" style={{ minHeight: "500px", maxHeight: "600px" }}>
                  <Cal
                    namespace="preliminary-consultation"
                    calLink="aelio.dev/preliminary-consultation"
                    style={{ width: "100%", height: "100%", overflow: "auto" }}
                    config={{ layout: "month_view" }}
                  />
                </div>
              </div>

              {submitError && (
                <div className="bg-red-500/20 border border-red-500/50 rounded-lg p-4 text-red-200">
                  {submitError}
                </div>
              )}

              <div className="flex justify-between pt-6 pb-4">
                <button
                  type="button"
                  onClick={handleBack}
                  className="px-8 py-4 rounded-full bg-white/10 text-white hover:bg-white/20 transition-all flex items-center gap-2 text-lg font-medium"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                  Back
                </button>
                <button
                  type="submit"
                  disabled={!canProceed() || isSubmitting}
                  className={`px-8 py-4 rounded-full text-lg font-medium transition-all flex items-center gap-2 ${
                    canProceed() && !isSubmitting
                      ? "bg-white text-black hover:bg-gray-100"
                      : "bg-gray-600 text-gray-400 cursor-not-allowed"
                  }`}
                >
                  {isSubmitting ? 'Submitting...' : 'Book Appointment'}
                  {!isSubmitting && (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  )}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );

  return createPortal(modalContent, document.body);
}
