'use client';

import { useState, useRef, useEffect } from 'react';
import { Luckiest_Guy } from "next/font/google";
import Link from 'next/link';

const luckiestGuy = Luckiest_Guy({
  weight: "400",
  subsets: ["latin"],
});

export default function Navbar() {
  const [isSolutionsOpen, setIsSolutionsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsSolutionsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="navbar-wrapper" style={{ zIndex: 9999 }}>
      <div className="navbar-oval">
        {/* Logo */}
        <a href="/" className="navbar-brand">
          <span className="navbar-logo-icon">✦</span>
          <span
            className={`navbar-logo-text ${luckiestGuy.className}`}
          >
            Aelio
          </span>
        </a>

        {/* Navigation Links */}
        <nav className="navbar-links">
          <a href="/pricing" className="nav-link">
            Pricing
          </a>
          <div ref={dropdownRef} className="relative">
            <button
              onClick={() => setIsSolutionsOpen(!isSolutionsOpen)}
              className="nav-link flex items-center gap-1"
            >
              Solutions
              <svg 
                className={`w-4 h-4 transition-transform ${isSolutionsOpen ? 'rotate-180' : ''}`}
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {isSolutionsOpen && (
              <div className="absolute top-full left-0 mt-2 w-64 bg-[#f5f1e8] rounded-lg shadow-xl border border-gray-300 py-2 z-50">
                <Link
                  href="/solutions/web-development"
                  onClick={() => setIsSolutionsOpen(false)}
                  className="block px-4 py-2.5 text-gray-700 hover:bg-gray-200 transition-colors text-sm"
                >
                  Website Development
                </Link>
                <Link
                  href="/solutions/digital-marketing"
                  onClick={() => setIsSolutionsOpen(false)}
                  className="block px-4 py-2.5 text-gray-700 hover:bg-gray-200 transition-colors text-sm"
                >
                  Digital Marketing
                  <span className="ml-2 text-xs text-gray-500">(Coming Soon)</span>
                </Link>
                <Link
                  href="/solutions/other-services"
                  onClick={() => setIsSolutionsOpen(false)}
                  className="block px-4 py-2.5 text-gray-700 hover:bg-gray-200 transition-colors text-sm"
                >
                  Other Services
                  <span className="ml-2 text-xs text-gray-500">(Coming Soon)</span>
                </Link>
              </div>
            )}
          </div>
          <a
            href="#solutions"
            className="nav-link"
            onClick={(e) => {
              e.preventDefault();
              const solutionsSection = document.getElementById("solutions");
              if (solutionsSection) {
                solutionsSection.scrollIntoView({ behavior: "smooth" });
              }
            }}
          >
            Services
          </a>
        </nav>

        {/* CTA Buttons */}
        <a
          href="#contact"
          onClick={(e) => {
            e.preventDefault();
            const contactSection = document.getElementById("contact");
            if (contactSection) {
              contactSection.scrollIntoView({ behavior: "smooth" });
            }
          }}
          className="navbar-btn navbar-btn-secondary"
        >
          Get Started
        </a>
        <a
          href="#contact"
          onClick={(e) => {
            e.preventDefault();
            const contactSection = document.getElementById("contact");
            if (contactSection) {
              contactSection.scrollIntoView({ behavior: "smooth" });
            }
          }}
          className="navbar-btn navbar-btn-primary"
        >
          Contact
        </a>
      </div>
    </div>
  );
}

