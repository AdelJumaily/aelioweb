"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin } from "lucide-react";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    website: "",
    interest: "",
    budget: "",
    timeline: "",
    message: "",
    ready: false,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // TODO: Implement form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 1000);
  };

  return (
    <main className="min-h-screen bg-[#F5F5F0]">
      <section className="pt-40 pb-32 px-6 md:px-10">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Left Side - Contact Info */}
            <div className="lg:col-span-5">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <h1 className="text-[clamp(3.5rem,8vw,7rem)] font-bold leading-[1.05] mb-6 text-[#0A0A0A]">
                  Let&apos;s Talk
                </h1>
                <p className="text-xl text-[#6B6B6B] mb-12">
                  Tell us about your project, and we&apos;ll get back to you within 24 hours.
                </p>

                <div className="space-y-8 mb-12">
                  <div>
                    <a
                      href="mailto:contact@aelio.dev"
                      className="text-2xl font-bold text-[#FF5722] hover:text-[#E64A19] transition-colors inline-flex items-center gap-3"
                    >
                      <Mail size={24} />
                      contact@aelio.dev
                    </a>
                  </div>
                  <div className="flex items-center gap-3 text-lg text-[#6B6B6B]">
                    <Phone size={20} />
                    (571) 477-7222
                  </div>
                  <div className="flex items-center gap-3 text-lg text-[#6B6B6B]">
                    <MapPin size={20} />
                    Remote-First
                  </div>
                </div>

                <div className="text-sm text-[#6B6B6B] mb-8">
                  We typically respond within 24 hours during business days.
                </div>
              </motion.div>
            </div>

            {/* Right Side - Form */}
            <div className="lg:col-span-7">
              <motion.form
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                onSubmit={handleSubmit}
                className="bg-white p-8 md:p-12 rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.06)] border border-[rgba(0,0,0,0.06)]"
              >
                {isSubmitted ? (
                  <div className="text-center py-12">
                    <div className="text-6xl mb-6">✓</div>
                    <h2 className="text-3xl font-bold mb-4 text-[#0A0A0A]">
                      Thanks for reaching out!
                    </h2>
                    <p className="text-lg text-[#6B6B6B]">
                      We&apos;ll review your request and get back to you within 24 hours.
                    </p>
                  </div>
                ) : (
                  <>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                      <div>
                        <label className="block text-sm font-medium mb-2 text-[#0A0A0A]">
                          Name *
                        </label>
                        <input
                          type="text"
                          required
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          className="w-full px-4 py-3 border border-[rgba(0,0,0,0.15)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF5722] focus:border-transparent"
                          placeholder="Your full name"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2 text-[#0A0A0A]">
                          Email *
                        </label>
                        <input
                          type="email"
                          required
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          className="w-full px-4 py-3 border border-[rgba(0,0,0,0.15)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF5722] focus:border-transparent"
                          placeholder="you@company.com"
                        />
                      </div>
                    </div>

                    <div className="mb-6">
                      <label className="block text-sm font-medium mb-2 text-[#0A0A0A]">
                        Company
                      </label>
                      <input
                        type="text"
                        value={formData.company}
                        onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                        className="w-full px-4 py-3 border border-[rgba(0,0,0,0.15)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF5722] focus:border-transparent"
                        placeholder="Your company name (optional)"
                      />
                    </div>

                    <div className="mb-6">
                      <label className="block text-sm font-medium mb-2 text-[#0A0A0A]">
                        Website
                      </label>
                      <input
                        type="url"
                        value={formData.website}
                        onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                        className="w-full px-4 py-3 border border-[rgba(0,0,0,0.15)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF5722] focus:border-transparent"
                        placeholder="https://yoursite.com (optional)"
                      />
                    </div>

                    <div className="mb-6">
                      <label className="block text-sm font-medium mb-2 text-[#0A0A0A]">
                        I&apos;m interested in *
                      </label>
                      <select
                        required
                        value={formData.interest}
                        onChange={(e) => setFormData({ ...formData, interest: e.target.value })}
                        className="w-full px-4 py-3 border border-[rgba(0,0,0,0.15)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF5722] focus:border-transparent"
                      >
                        <option value="">Select a service</option>
                        <option value="redesign">Website Redesign</option>
                        <option value="new">New Website</option>
                        <option value="landing">Landing Page</option>
                        <option value="ecommerce">E-Commerce Site</option>
                        <option value="seo">SEO & Performance</option>
                        <option value="branding">Branding & Identity</option>
                        <option value="other">Other</option>
                      </select>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                      <div>
                        <label className="block text-sm font-medium mb-2 text-[#0A0A0A]">
                          Budget *
                        </label>
                        <select
                          required
                          value={formData.budget}
                          onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                          className="w-full px-4 py-3 border border-[rgba(0,0,0,0.15)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF5722] focus:border-transparent"
                        >
                          <option value="">Select budget</option>
                          <option value="under-1k">Under $1,000</option>
                          <option value="1k-3k">$1,000 - $3,000</option>
                          <option value="3k-7k">$3,000 - $7,000</option>
                          <option value="7k-15k">$7,000 - $15,000</option>
                          <option value="15k-plus">$15,000+</option>
                          <option value="not-sure">Not sure yet</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2 text-[#0A0A0A]">
                          Timeline
                        </label>
                        <select
                          value={formData.timeline}
                          onChange={(e) => setFormData({ ...formData, timeline: e.target.value })}
                          className="w-full px-4 py-3 border border-[rgba(0,0,0,0.15)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF5722] focus:border-transparent"
                        >
                          <option value="">Select timeline</option>
                          <option value="asap">ASAP (1-2 weeks)</option>
                          <option value="2-4weeks">2-4 weeks</option>
                          <option value="1-2months">1-2 months</option>
                          <option value="3plus">3+ months</option>
                          <option value="flexible">Flexible</option>
                        </select>
                      </div>
                    </div>

                    <div className="mb-6">
                      <label className="block text-sm font-medium mb-2 text-[#0A0A0A]">
                        Tell us about your project *
                      </label>
                      <textarea
                        required
                        rows={6}
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        className="w-full px-4 py-3 border border-[rgba(0,0,0,0.15)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF5722] focus:border-transparent resize-none"
                        placeholder="What are your goals? What problems are you trying to solve?"
                      />
                    </div>

                    <div className="mb-8">
                      <label className="flex items-center gap-3 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={formData.ready}
                          onChange={(e) => setFormData({ ...formData, ready: e.target.checked })}
                          className="w-5 h-5 border border-[rgba(0,0,0,0.15)] rounded"
                        />
                        <span className="text-sm text-[#6B6B6B]">
                          I&apos;m ready to start and have the budget allocated.
                        </span>
                      </label>
                    </div>

                    {/* Honeypot */}
                    <input
                      type="text"
                      name="website_url"
                      style={{ display: "none" }}
                      tabIndex={-1}
                      autoComplete="off"
                    />

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full px-8 py-4 bg-[#FF5722] text-white rounded-lg font-medium hover:bg-[#E64A19] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? "Sending..." : "Send Proposal Request"}
                    </button>

                    <p className="text-xs text-[#6B6B6B] mt-4 text-center">
                      By submitting this form, you agree to our Privacy Policy.
                    </p>
                  </>
                )}
              </motion.form>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}


