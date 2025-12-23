"use client";

import React from "react";
import Link from "next/link";
import { Twitter, Linkedin, Instagram } from "lucide-react";

export default function SiteFooter() {
  return (
    <footer className="bg-[#0A0A0A] text-white py-24 px-6 md:px-10">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8 mb-12">
          {/* Brand Column */}
          <div>
            <div className="text-2xl font-bold mb-4" style={{ letterSpacing: "-0.02em" }}>
              Aelio
            </div>
            <p className="text-sm opacity-80 mb-6">
              Design-forward. Performance-first.
            </p>
            <div className="flex gap-4">
              <a href="#" className="text-white/60 hover:text-[#FF5722] transition-colors">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-white/60 hover:text-[#FF5722] transition-colors">
                <Linkedin size={20} />
              </a>
              <a href="#" className="text-white/60 hover:text-[#FF5722] transition-colors">
                <Instagram size={20} />
              </a>
            </div>
          </div>

          {/* Pages Column */}
          <div>
            <h3 className="text-sm uppercase font-medium opacity-60 mb-4 tracking-wider">
              Pages
            </h3>
            <ul className="space-y-3">
              {["Home", "Work", "Services", "Agency", "Contact"].map((page) => (
                <li key={page}>
                  <Link
                    href={page === "Home" ? "/" : `/${page.toLowerCase()}`}
                    className="text-[15px] text-white/80 hover:text-[#FF5722] transition-colors"
                  >
                    {page}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services Column */}
          <div>
            <h3 className="text-sm uppercase font-medium opacity-60 mb-4 tracking-wider">
              Services
            </h3>
            <ul className="space-y-3">
              {[
                "Website Design",
                "Web Development",
                "Landing Pages",
                "SEO & Performance",
                "Branding",
              ].map((service) => (
                <li key={service}>
                  <Link
                    href="/services"
                    className="text-[15px] text-white/80 hover:text-[#FF5722] transition-colors"
                  >
                    {service}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Column */}
          <div>
            <h3 className="text-sm uppercase font-medium opacity-60 mb-4 tracking-wider">
              Get in Touch
            </h3>
            <ul className="space-y-3">
              <li>
                <a
                  href="mailto:hello@aelio.com"
                  className="text-[15px] text-[#FF5722] hover:text-[#E64A19] transition-colors"
                >
                  hello@aelio.com
                </a>
              </li>
              <li className="text-[15px] text-white/80">+1 (555) 123-4567</li>
              <li className="text-[15px] text-white/80">Remote-First</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-white/60">
            © 2024 Aelio. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm text-white/60">
            <Link href="/legal/privacy" className="hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <Link href="/legal/terms" className="hover:text-white transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}



