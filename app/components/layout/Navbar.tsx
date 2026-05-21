'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { services } from '@/lib/content/services';
import { ChevronDown } from 'lucide-react';
import { easing } from '@/lib/animations';

interface NavbarProps {
  onContactClick?: () => void;
}

function MenuToggleIcon({ open }: { open: boolean }) {
  return (
    <span className="relative flex h-5 w-6 flex-col items-center justify-center" aria-hidden>
      <motion.span
        className="absolute block h-0.5 w-6 rounded-full bg-current"
        animate={open ? { rotate: 45, y: 0 } : { rotate: 0, y: -7 }}
        transition={{ duration: 0.25, ease: easing.smooth }}
      />
      <motion.span
        className="absolute block h-0.5 w-6 rounded-full bg-current"
        animate={open ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
        transition={{ duration: 0.2 }}
      />
      <motion.span
        className="absolute block h-0.5 w-6 rounded-full bg-current"
        animate={open ? { rotate: -45, y: 0 } : { rotate: 0, y: 7 }}
        transition={{ duration: 0.25, ease: easing.smooth }}
      />
    </span>
  );
}

const menuPanelVariants = {
  closed: { opacity: 0 },
  open: { opacity: 1 },
};

const menuSheetVariants = {
  closed: { x: '100%' },
  open: { x: 0 },
};

const menuItemVariants = {
  closed: { opacity: 0, x: 16 },
  open: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: { delay: 0.08 + i * 0.05, duration: 0.35, ease: easing.smooth },
  }),
};

export default function Navbar({ onContactClick }: NavbarProps = {}) {
  const [isSolutionsOpen, setIsSolutionsOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobileSolutionsOpen, setIsMobileSolutionsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const closeMobileMenu = useCallback(() => {
    setIsMobileMenuOpen(false);
    setIsMobileSolutionsOpen(false);
  }, []);

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

  useEffect(() => {
    if (!isMobileMenuOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeMobileMenu();
    };
    document.addEventListener('keydown', onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [isMobileMenuOpen, closeMobileMenu]);

  const navLinks = [
    { href: '/work', label: 'Work' },
    { href: '/agency', label: 'Agency' },
    { href: '/pricing', label: 'Pricing' },
  ];

  const handleGetStarted = () => {
    closeMobileMenu();
    if (onContactClick) {
      onContactClick();
    } else {
      window.location.href = '/contact';
    }
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 border-t border-[#0A0A0A]/5 transition-[background-color,backdrop-filter] duration-300 ${
          isMobileMenuOpen
            ? 'bg-[#F5F5F0]/95 backdrop-blur-md'
            : 'bg-[#F5F5F0]/40 backdrop-blur-sm'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <div className="relative flex h-16 items-center">
            {/* Logo */}
            <div className="relative z-10 flex shrink-0 items-center">
              <Link
                href="/"
                className="flex items-center gap-2 group"
                onClick={closeMobileMenu}
              >
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
                      className="absolute top-full left-1/2 z-50 mt-6 w-[min(320px,calc(100vw-3rem))] -translate-x-1/2 rounded-2xl border border-[#0A0A0A]/10 bg-white/95 p-6 shadow-lg backdrop-blur-xl"
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

            {/* CTA + mobile menu toggle */}
            <div className="relative z-10 ml-auto flex shrink-0 items-center gap-3">
              <button
                onClick={handleGetStarted}
                className="hidden sm:inline-flex px-6 py-2.5 bg-[#FF5722] text-white rounded-full font-medium text-sm hover:bg-[#E64A19] transition-all duration-200"
              >
                Get Started
              </button>

              <button
                type="button"
                onClick={() => setIsMobileMenuOpen((open) => !open)}
                className="lg:hidden flex h-11 w-11 items-center justify-center rounded-full text-[#0A0A0A] hover:bg-[#0A0A0A]/5 active:bg-[#0A0A0A]/10 transition-colors"
                aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
                aria-expanded={isMobileMenuOpen}
                aria-controls="mobile-navigation"
              >
                <MenuToggleIcon open={isMobileMenuOpen} />
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile menu — full-screen overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            id="mobile-navigation"
            role="dialog"
            aria-modal="true"
            aria-label="Main menu"
            className="fixed inset-0 z-[60] lg:hidden"
            variants={menuPanelVariants}
            initial="closed"
            animate="open"
            exit="closed"
            transition={{ duration: 0.25 }}
          >
            <motion.button
              type="button"
              className="absolute inset-0 bg-[#0A0A0A]/20 backdrop-blur-[2px]"
              aria-label="Close menu"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={closeMobileMenu}
            />

            <motion.div
              className="absolute top-0 right-0 bottom-0 flex w-full max-w-sm flex-col bg-[#F5F5F0] shadow-[-8px_0_40px_rgba(0,0,0,0.12)]"
              variants={menuSheetVariants}
              initial="closed"
              animate="open"
              exit="closed"
              transition={{ duration: 0.4, ease: easing.smooth }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex h-16 items-center justify-between border-b border-[#0A0A0A]/8 px-6">
                <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#6B6B6B]">
                  Menu
                </span>
                <button
                  type="button"
                  onClick={closeMobileMenu}
                  className="flex h-11 w-11 items-center justify-center rounded-full text-[#0A0A0A] hover:bg-[#0A0A0A]/5 active:bg-[#0A0A0A]/10 transition-colors"
                  aria-label="Close menu"
                >
                  <MenuToggleIcon open />
                </button>
              </div>

              <nav className="flex-1 overflow-y-auto overscroll-contain px-4 py-6">
                <div className="space-y-1">
                  {navLinks.map((link, index) => (
                      <motion.div
                        key={link.href}
                        custom={index}
                        variants={menuItemVariants}
                        initial="closed"
                        animate="open"
                        exit="closed"
                      >
                        <Link
                          href={link.href}
                          onClick={closeMobileMenu}
                          className="flex min-h-[52px] items-center rounded-xl px-4 text-lg font-medium text-[#0A0A0A] hover:bg-[#0A0A0A]/5 active:bg-[#0A0A0A]/8 transition-colors uppercase tracking-wide"
                        >
                          {link.label}
                        </Link>
                      </motion.div>
                  ))}

                  <motion.div
                    custom={navLinks.length}
                    variants={menuItemVariants}
                    initial="closed"
                    animate="open"
                    exit="closed"
                  >
                    <button
                      type="button"
                      onClick={() => setIsMobileSolutionsOpen((open) => !open)}
                      className="flex w-full min-h-[52px] items-center justify-between rounded-xl px-4 text-lg font-medium text-[#0A0A0A] hover:bg-[#0A0A0A]/5 active:bg-[#0A0A0A]/8 transition-colors uppercase tracking-wide"
                      aria-expanded={isMobileSolutionsOpen}
                    >
                      Solutions
                      <ChevronDown
                        size={20}
                        className={`text-[#6B6B6B] transition-transform duration-300 ${
                          isMobileSolutionsOpen ? 'rotate-180' : ''
                        }`}
                      />
                    </button>
                    <AnimatePresence initial={false}>
                      {isMobileSolutionsOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3, ease: easing.smooth }}
                          className="overflow-hidden"
                        >
                          <div className="space-y-0.5 pb-2 pl-2 pr-1 pt-1">
                            {services.map((service) => (
                              <Link
                                key={service.id}
                                href={`/services/${service.id}`}
                                onClick={closeMobileMenu}
                                className="flex min-h-[44px] items-center gap-3 rounded-lg px-4 text-base text-[#0A0A0A]/90 hover:bg-[#0A0A0A]/5 active:bg-[#0A0A0A]/8 transition-colors"
                              >
                                <span className="text-xs font-bold text-[#FF5722]">{service.number}</span>
                                {service.title}
                              </Link>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>

                  <motion.div
                    custom={navLinks.length + 1}
                    variants={menuItemVariants}
                    initial="closed"
                    animate="open"
                    exit="closed"
                  >
                    <Link
                      href="/contact"
                      onClick={closeMobileMenu}
                      className="flex min-h-[52px] items-center rounded-xl px-4 text-lg font-medium text-[#0A0A0A] hover:bg-[#0A0A0A]/5 active:bg-[#0A0A0A]/8 transition-colors uppercase tracking-wide"
                    >
                      Contact
                    </Link>
                  </motion.div>
                </div>
              </nav>

              <motion.div
                custom={navLinks.length + 2}
                variants={menuItemVariants}
                initial="closed"
                animate="open"
                exit="closed"
                className="border-t border-[#0A0A0A]/8 p-4 pb-[max(1rem,env(safe-area-inset-bottom))]"
              >
                <button
                  type="button"
                  onClick={handleGetStarted}
                  className="w-full rounded-full bg-[#FF5722] px-6 py-4 text-base font-medium text-white hover:bg-[#E64A19] active:scale-[0.98] transition-all duration-200"
                >
                  Get Started
                </button>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
