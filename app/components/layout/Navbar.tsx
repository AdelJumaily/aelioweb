'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { services } from '@/lib/content/services';
import { ChevronDown } from 'lucide-react';

interface NavbarProps {
  onContactClick?: () => void;
}

export default function Navbar({ onContactClick }: NavbarProps = {}) {
  const [isSolutionsOpen, setIsSolutionsOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsSolutionsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const navLinks = [
    { href: '/work', label: 'Work' },
    { href: '/agency', label: 'Agency' },
    { href: '/pricing', label: 'Pricing' },
  ];

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 bg-[#F5F5F0]/40 backdrop-blur-sm border-t border-[#0A0A0A]/5"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <div className="relative flex h-16 items-center">
          {/* Logo */}
          <div className="relative z-10 flex shrink-0 items-center">
            <Link href="/" className="flex items-center gap-2 group">
              <span className="text-lg font-bold text-[#0A0A0A] tracking-tight group-hover:text-[#FF5722] transition-colors uppercase">
                Aelio
              </span>
            </Link>
          </div>

          {/* Desktop Navigation — centered in the bar */}
          <div className="pointer-events-none absolute inset-0 hidden lg:flex items-center justify-center">
            <div className="pointer-events-auto flex items-center gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm font-medium text-[#0A0A0A] hover:text-[#0A0A0A]/70 transition-colors relative group uppercase tracking-wide"
                >
                  {link.label}
                </Link>
              ))}

              {/* Solutions Dropdown */}
              <div ref={dropdownRef} className="relative">
              <button
                onClick={() => setIsSolutionsOpen(!isSolutionsOpen)}
                onMouseEnter={() => setIsSolutionsOpen(true)}
                className={`flex items-center gap-1.5 text-sm font-medium transition-colors relative group uppercase tracking-wide ${
                  isSolutionsOpen ? 'text-[#0A0A0A]' : 'text-[#0A0A0A] hover:text-[#0A0A0A]/70'
                }`}
              >
                Solutions
                <ChevronDown
                  size={14}
                  className={`transition-transform duration-300 ${isSolutionsOpen ? 'rotate-180' : ''}`}
                />
              </button>
              
              {isSolutionsOpen && (
                <div 
                  className="absolute top-full left-1/2 z-50 mt-6 w-[min(320px,calc(100vw-3rem))] -translate-x-1/2 rounded-2xl border border-[#0A0A0A]/10 bg-white/95 p-6 shadow-lg backdrop-blur-xl animate-in fade-in slide-in-from-top-2 duration-200"
                  onMouseEnter={() => setIsSolutionsOpen(true)}
                  onMouseLeave={() => setIsSolutionsOpen(false)}
                >
                  <div className="text-xs uppercase tracking-wider text-[#0A0A0A]/60 mb-4 font-semibold">
                    Solutions
                  </div>
                  <div className="space-y-1">
                    {services.map((service) => (
                      <Link
                        key={service.id}
                        href={`/services/${service.id}`}
                        onClick={() => setIsSolutionsOpen(false)}
                        className="block px-3 py-2.5 rounded-lg text-sm font-medium text-[#0A0A0A]/90 hover:bg-[#0A0A0A]/5 hover:text-[#0A0A0A] transition-all duration-200 group"
                      >
                        <div className="flex items-center gap-2">
                          <span className="text-[#FF5722] text-xs font-bold">{service.number}</span>
                          <span className="group-hover:translate-x-1 transition-transform duration-200">
                            {service.title}
                          </span>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
              </div>

              <Link
                href="/contact"
                className="text-sm font-medium text-[#0A0A0A] hover:text-[#0A0A0A]/70 transition-colors relative group uppercase tracking-wide"
              >
                Contact
              </Link>
            </div>
          </div>

          {/* CTA Button */}
          <div className="relative z-10 ml-auto flex shrink-0 items-center gap-4">
            <button
              onClick={() => {
                if (onContactClick) {
                  onContactClick();
                } else {
                  window.location.href = '/contact';
                }
              }}
              className="px-6 py-2.5 bg-[#FF5722] text-white rounded-full font-medium text-sm hover:bg-[#E64A19] transition-all duration-200"
            >
              Get Started
            </button>
            
            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg hover:bg-[#0A0A0A]/5 transition-colors text-[#0A0A0A]"
              aria-label="Menu"
            >
              {isMobileMenuOpen ? (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden border-t border-[#0A0A0A]/5 py-4 mt-2 animate-in slide-in-from-top duration-200 bg-white/95 backdrop-blur-xl rounded-b-2xl">
            <div className="space-y-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block px-4 py-3 rounded-lg text-base font-medium text-[#0A0A0A]/90 hover:bg-[#0A0A0A]/5 hover:text-[#0A0A0A] transition-colors uppercase tracking-wide"
                >
                  {link.label}
                </Link>
              ))}
              
              {/* Mobile Solutions */}
              <div className="px-4 py-2">
                <div className="text-xs uppercase tracking-wider text-[#0A0A0A]/60 mb-2">Solutions</div>
                {services.map((service) => (
                  <Link
                    key={service.id}
                    href={`/services/${service.id}`}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block px-3 py-2 rounded-lg text-sm font-medium text-[#0A0A0A]/90 hover:bg-[#0A0A0A]/5 hover:text-[#0A0A0A] transition-colors"
                  >
                    {service.number} {service.title}
                  </Link>
                ))}
              </div>

              <Link
                href="/contact"
                onClick={() => setIsMobileMenuOpen(false)}
                className="block px-4 py-3 rounded-lg text-base font-medium text-[#0A0A0A]/90 hover:bg-[#0A0A0A]/5 hover:text-[#0A0A0A] transition-colors uppercase tracking-wide"
              >
                Contact
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}

