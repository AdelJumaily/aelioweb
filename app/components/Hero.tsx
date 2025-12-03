"use client";

import { useState, useEffect, useRef } from 'react';
import dynamic from 'next/dynamic';
import { gsap } from 'gsap';
import ContactModal from './ContactModal';

const Spline = dynamic(
  () => import('@splinetool/react-spline'),
  {
    ssr: false,
    loading: () => <div className="w-full h-full bg-black" />,
  }
);

export default function Hero() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (buttonRef.current) {
      // Animate button on mount
      gsap.fromTo(
        buttonRef.current,
        {
          opacity: 0,
          y: 20,
          scale: 0.9,
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          delay: 1,
          ease: 'back.out(1.7)',
        }
      );

      // Continuous subtle pulse animation
      gsap.to(buttonRef.current, {
        scale: 1.05,
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: 'power1.inOut',
        delay: 2,
      });
    }
  }, []);

  return (
    <>
      <section className="relative min-h-screen w-full overflow-hidden flex flex-col">
        <div className="flex-1">
          {isClient && (
            <Spline
              scene="/scene.splinecode"
              style={{ width: '100%', height: '100%' }}
            />
          )}
        </div>
        <div className="absolute bottom-[10vh] left-1/2 -translate-x-1/2 z-10">
          <button
            ref={buttonRef}
            onClick={() => setIsModalOpen(true)}
            className="px-8 py-4 bg-white text-black rounded-full hover:bg-gray-100 transition-all duration-200 flex items-center gap-2 text-base font-medium shadow-lg hover:shadow-xl"
          >
            Let&apos;s Talk
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </section>
      <ContactModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
}