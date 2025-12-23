"use client";

import { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { gsap } from "gsap";
import Calendar from "./forms/Calendar";

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
  const overlayRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const stepRef = useRef<HTMLDivElement>(null);

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    // Here you would send the data to your backend
    alert("Thank you! We'll be in touch soon.");
    onClose();
  };

  const canProceed = () => {
    if (step === 1) {
      return formData.name.trim() !== "" && formData.email.trim() !== "" && formData.phone.trim() !== "";
    }
    if (step === 2) {
      return formData.companyName.trim() !== "" && (formData.budget !== "" || formData.budgetLessThan10k);
    }
    if (step === 3) {
      return formData.selectedDate !== "" && formData.selectedTime !== "";
    }
    return false;
  };

  // Generate available time slots
  const timeSlots = [
    "9:00 AM", "10:00 AM", "11:00 AM", "12:00 PM",
    "1:00 PM", "2:00 PM", "3:00 PM", "4:00 PM", "5:00 PM"
  ];


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
        className="relative w-full max-w-4xl text-white max-h-[90vh] overflow-y-auto"
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

        <div ref={stepRef}>
          {/* Step 1: Contact Info */}
          {step === 1 && (
            <form onSubmit={(e) => { e.preventDefault(); handleNext(); }} className="space-y-10">
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
            <form onSubmit={(e) => { e.preventDefault(); handleNext(); }} className="space-y-10">
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
                      className={`px-6 py-3 rounded-lg text-lg font-medium transition-all border-2 ${
                        formData.budget === budget
                          ? "bg-white text-black border-white"
                          : "bg-gray-900/80 text-white border-gray-700 hover:bg-gray-800 hover:border-gray-600"
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
                      className={`px-6 py-3 rounded-lg text-lg font-medium transition-all border-2 ${
                        formData.services.includes(service)
                          ? "bg-white text-black border-white"
                          : "bg-gray-900/80 text-white border-gray-700 hover:bg-gray-800 hover:border-gray-600"
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

              <div className="flex justify-between pt-8">
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
            <form onSubmit={handleSubmit} className="space-y-10">
              <div>
                <h2 className="text-5xl md:text-6xl font-bold mb-4 text-white" style={{ fontFamily: '"Times New Roman", Times, serif' }}>
                  Book Your Appointment
                </h2>
                <p className="text-xl md:text-2xl text-gray-200">
                  Choose a date and time that works for you
                </p>
              </div>

              {/* Calendar */}
              <div>
                <label className="block text-xl md:text-2xl text-gray-200 mb-6">
                  Select a date
                </label>
                <div className="max-w-2xl">
                  <Calendar
                    selectedDate={formData.selectedDate}
                    onDateSelect={(date) => setFormData({ ...formData, selectedDate: date, selectedTime: "" })}
                    minDate={new Date()}
                    maxDate={new Date(Date.now() + 90 * 24 * 60 * 60 * 1000)} // 90 days from now
                  />
                </div>
              </div>

              {/* Time Slots */}
              {formData.selectedDate && (
                <div>
                  <label className="block text-xl md:text-2xl text-gray-200 mb-4">
                    Select a time
                  </label>
                  <div className="grid grid-cols-3 md:grid-cols-5 gap-3">
                    {timeSlots.map((time) => (
                      <button
                        key={time}
                        type="button"
                        onClick={() => setFormData({ ...formData, selectedTime: time })}
                        className={`px-6 py-3 rounded-lg text-lg font-medium transition-all border-2 ${
                          formData.selectedTime === time
                            ? "bg-white text-black border-white"
                            : "bg-gray-900/80 text-white border-gray-700 hover:bg-gray-800 hover:border-gray-600"
                        }`}
                      >
                        {time}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <div className="flex justify-between pt-8">
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
                  Book Appointment
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
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
