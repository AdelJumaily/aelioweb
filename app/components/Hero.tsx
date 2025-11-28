'use client';

import DarkVeil from './DarkVeil';
import Prism from './Prism';

export default function Hero() {
  return (
    <section className="relative w-full h-screen overflow-hidden">
      {/* Hero Section */}
      <div className="grainy-bg relative w-full h-full flex items-center">
        {/* DarkVeil Background */}
        <div style={{ width: '100%', height: '100%', position: 'absolute', inset: 0, background: '#000000' }}>
        <Prism
            numPrisms={30}
            prismColor="255, 255, 255"
            maxOpacity={0.05}
            minOpacity={0.02}
            animationDuration={8000}
            />
        </div>

        {/* Main Content Container */}
        <div className="relative z-20 w-full h-full flex items-center justify-center">
          {/* Centered Hero Content */}
          <div className="px-6 md:px-12 lg:px-20 max-w-4xl text-center">
            {/* Main Headline */}
            <h1 className="hero-headline text-4xl md:text-5xl lg:text-6xl xl:text-7xl text-white leading-tight mb-6">
              The digital backbone for modern businesses
            </h1>

            {/* Description */}
            <p className="text-lg md:text-xl lg:text-2xl text-white/80 mb-8 max-w-2xl mx-auto">
              Aelio builds high-performance websites and brand ecosystems designed to scale, convert, and dominate your industry.
            </p>

            {/* Lets Talk Button */}
            <div className="flex justify-center">
              <button className="lets-talk-button">
                Lets talk
              </button>
            </div>
          </div>

          {/* Right Side - Tagline */}
          <div className="hidden md:block absolute right-6 md:right-12 lg:right-20 top-1/2 -translate-y-1/2">
            <p className="hero-tagline text-white uppercase text-sm md:text-base tracking-wider">
              A CREATIVE, HUMAN, AND AMBITIOUS AGENCY
            </p>
          </div>
        </div>
      </div>
        </section>
  );
}