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
      className="fixed top-0 left-0 right-0 z-50 bg-white/70 dark:bg-black/70 backdrop-blur-xl border-b border-black/10 dark:border-white/10 shadow-sm"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <span className="text-xl font-bold text-[#0A0A0A] dark:text-white tracking-tight group-hover:text-[#FF5722] transition-colors uppercase">
              Aelio
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-[#0A0A0A]/80 dark:text-white/80 hover:text-[#0A0A0A] dark:hover:text-white transition-colors relative group uppercase tracking-wide"
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
                  isSolutionsOpen ? 'text-[#0A0A0A] dark:text-white' : 'text-[#0A0A0A]/80 dark:text-white/80 hover:text-[#0A0A0A] dark:hover:text-white'
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
                  className="absolute top-full left-0 mt-6 w-[600px] bg-white/90 dark:bg-black/90 backdrop-blur-xl rounded-2xl shadow-2xl border border-black/10 dark:border-white/20 p-6 z-50 animate-in fade-in slide-in-from-top-2 duration-200"
                  onMouseEnter={() => setIsSolutionsOpen(true)}
                  onMouseLeave={() => setIsSolutionsOpen(false)}
                >
                  <div className="grid grid-cols-2 gap-8">
                    {/* Left Column - Services */}
                    <div>
                      <div className="text-xs uppercase tracking-wider text-[#0A0A0A]/60 dark:text-white/60 mb-4 font-semibold">
                        Services
                      </div>
                      <div className="space-y-1">
                        {services.map((service) => (
                          <Link
                            key={service.id}
                            href={`/services/${service.id}`}
                            onClick={() => setIsSolutionsOpen(false)}
                            className="block px-3 py-2.5 rounded-lg text-sm font-medium text-[#0A0A0A]/90 dark:text-white/90 hover:bg-black/10 dark:hover:bg-white/10 hover:text-[#0A0A0A] dark:hover:text-white transition-all duration-200 group"
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
                    
                    {/* Right Column - Solutions */}
                    <div>
                      <div className="text-xs uppercase tracking-wider text-white/60 mb-4 font-semibold">
                        Solutions
                      </div>
                      <div className="space-y-1">
                        <Link
                          href="/solutions/web-development"
                          onClick={() => setIsSolutionsOpen(false)}
                          className="block px-3 py-2.5 rounded-lg text-sm font-medium text-white/90 hover:bg-white/10 hover:text-white transition-all duration-200 group"
                        >
                          <span className="group-hover:translate-x-1 transition-transform duration-200 inline-block">
                            Web Development
                          </span>
                        </Link>
                        <Link
                          href="/solutions/digital-marketing"
                          onClick={() => setIsSolutionsOpen(false)}
                          className="block px-3 py-2.5 rounded-lg text-sm font-medium text-white/90 hover:bg-white/10 hover:text-white transition-all duration-200 group"
                        >
                          <span className="group-hover:translate-x-1 transition-transform duration-200 inline-block">
                            Digital Marketing
                          </span>
                        </Link>
                        <Link
                          href="/solutions/other-services"
                          onClick={() => setIsSolutionsOpen(false)}
                          className="block px-3 py-2.5 rounded-lg text-sm font-medium text-white/90 hover:bg-white/10 hover:text-white transition-all duration-200 group"
                        >
                          <span className="group-hover:translate-x-1 transition-transform duration-200 inline-block">
                            Other Services
                          </span>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <Link
              href="/contact"
              className="text-sm font-medium text-[#0A0A0A]/80 dark:text-white/80 hover:text-[#0A0A0A] dark:hover:text-white transition-colors relative group uppercase tracking-wide"
            >
              Contact
            </Link>
          </div>

          {/* CTA Button */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => {
                if (onContactClick) {
                  onContactClick();
                } else {
                  window.location.href = '/contact';
                }
              }}
              className="px-6 py-2.5 bg-[#FF5722] text-white rounded-full font-medium text-sm hover:bg-[#E64A19] transition-all duration-200 shadow-sm"
            >
              Get Started
            </button>
            
            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg hover:bg-black/10 dark:hover:bg-white/10 transition-colors text-[#0A0A0A] dark:text-white"
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
          <div className="lg:hidden border-t border-black/10 dark:border-white/20 py-4 mt-2 animate-in slide-in-from-top duration-200 bg-white/90 dark:bg-black/90 backdrop-blur-xl rounded-b-2xl">
            <div className="space-y-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block px-4 py-3 rounded-lg text-base font-medium text-[#0A0A0A]/90 dark:text-white/90 hover:bg-black/10 dark:hover:bg-white/10 hover:text-[#0A0A0A] dark:hover:text-white transition-colors uppercase tracking-wide"
                >
                  {link.label}
                </Link>
              ))}
              
              {/* Mobile Solutions */}
              <div className="px-4 py-2">
                <div className="text-xs uppercase tracking-wider text-[#0A0A0A]/60 dark:text-white/60 mb-2">Services</div>
                {services.map((service) => (
                  <Link
                    key={service.id}
                    href={`/services/${service.id}`}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block px-3 py-2 rounded-lg text-sm font-medium text-white/90 hover:bg-white/10 hover:text-white transition-colors"
                  >
                    {service.number} {service.title}
                  </Link>
                ))}
              </div>
              
              <div className="px-4 py-2">
                <div className="text-xs uppercase tracking-wider text-white/60 mb-2">Solutions</div>
                <Link
                  href="/solutions/web-development"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block px-3 py-2 rounded-lg text-sm font-medium text-white/90 hover:bg-white/10 hover:text-white transition-colors"
                >
                  Web Development
                </Link>
                <Link
                  href="/solutions/digital-marketing"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block px-3 py-2 rounded-lg text-sm font-medium text-white/90 hover:bg-white/10 hover:text-white transition-colors"
                >
                  Digital Marketing
                </Link>
                <Link
                  href="/solutions/other-services"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block px-3 py-2 rounded-lg text-sm font-medium text-white/90 hover:bg-white/10 hover:text-white transition-colors"
                >
                  Other Services
                </Link>
              </div>

              <Link
                href="/contact"
                onClick={() => setIsMobileMenuOpen(false)}
                className="block px-4 py-3 rounded-lg text-base font-medium text-white/90 hover:bg-white/10 hover:text-white transition-colors uppercase tracking-wide"
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

