'use client';

import { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';

interface ScrollMockupRevealProps {
  images: string[];
  mockupType?: 'laptop' | 'phone';
  className?: string;
  parentRef?: React.RefObject<HTMLElement | null>;
  onBlurChange?: (blurAmount: number) => void;
}

export default function ScrollMockupReveal({
  images,
  mockupType = 'laptop',
  className = '',
  parentRef,
  onBlurChange,
}: ScrollMockupRevealProps) {
  const stickyRef = useRef<HTMLDivElement>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Use parent ref if provided, otherwise fallback to sticky element's parent
  const scrollTarget = parentRef || stickyRef;

  const { scrollYProgress } = useScroll({
    target: scrollTarget,
    offset: ['start end', 'end start'], // Start when section enters, end when it leaves
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 50,
    damping: 25,
    restDelta: 0.001,
  });

  // Calculate blur amount based on scroll progress
  const blurAmount = useTransform(smoothProgress, [0, 0.2, 0.8, 1], [0, 8, 8, 0]);

  useEffect(() => {
    const unsubscribe = smoothProgress.on('change', (latest) => {
      const imageCount = images.length;
      const index = Math.min(
        Math.floor(latest * imageCount),
        imageCount - 1
      );
      setCurrentImageIndex(index);
    });

    return () => unsubscribe();
  }, [smoothProgress, images.length]);

  useEffect(() => {
    if (onBlurChange) {
      const unsubscribe = blurAmount.on('change', (latest) => {
        onBlurChange(latest);
      });
      return () => unsubscribe();
    }
  }, [blurAmount, onBlurChange]);

  // Smooth scale: starts at 50%, expands to 100%
  const mockupScale = useTransform(
    smoothProgress,
    [0, 1],
    [0.5, 1.0]
  );
  const opacity = useTransform(smoothProgress, [0, 0.1, 1], [1, 1, 1]);
  
  // Parallax Y position for smooth reveal
  const yOffset = useTransform(
    smoothProgress,
    [0, 1],
    ['0vh', '-25vh']
  );

  const mockupDimensions = {
    laptop: {
      borderRadius: '12px',
    },
    phone: {
      borderRadius: '40px',
    },
  };

  const dimensions = mockupDimensions[mockupType];

  return (
    // Sticky element - starts at bottom of hero (half visible), expands as you scroll
    <div
      ref={stickyRef}
      className={`sticky top-0 h-screen flex items-end justify-center px-4 z-30 ${className}`}
      style={{ marginTop: '-50vh' }}
    >
      <motion.div
        className="relative"
        style={{
          scale: mockupScale,
          opacity,
          y: yOffset,
          width: mockupType === 'laptop' ? '90vw' : '80vw',
          maxWidth: mockupType === 'laptop' ? '1400px' : '400px',
          height:
            mockupType === 'laptop'
              ? 'calc(90vw * 0.625)'
              : 'calc(80vw * 2)',
          maxHeight: mockupType === 'laptop' ? '875px' : '800px',
        }}
      >
        {/* Frame */}
        <motion.div
          className="relative bg-gradient-to-br from-gray-800 via-gray-900 to-black rounded-2xl w-full h-full"
          style={{
            aspectRatio: mockupType === 'laptop' ? '16/10' : '9/19',
            borderRadius: dimensions.borderRadius,
            boxShadow:
              '0 25px 50px -12px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(255, 255, 255, 0.1)',
          }}
        >
          {/* Screen */}
          <div
            className="absolute bg-black rounded-lg overflow-hidden"
            style={{
              top: mockupType === 'laptop' ? '6%' : '3%',
              left: mockupType === 'laptop' ? '7.5%' : '6.25%',
              width: mockupType === 'laptop' ? '85%' : '87.5%',
              height: mockupType === 'laptop' ? '85%' : '93.75%',
              borderRadius: '8px',
            }}
          >
            <div className="relative w-full h-full">
              {images.map((image, index) => (
                <motion.div
                  key={index}
                  className="absolute inset-0"
                  initial={false}
                  animate={{
                    opacity: index === currentImageIndex ? 1 : 0,
                    scale: index === currentImageIndex ? 1 : 1.05,
                  }}
                  transition={{
                    duration: 0.6,
                    ease: [0.4, 0, 0.2, 1],
                  }}
                >
                  <img
                    src={image}
                    alt={`Screenshot ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </motion.div>
              ))}
            </div>

            {/* Reflection */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background:
                  'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, transparent 50%)',
                borderRadius: '8px',
              }}
            />
          </div>

          {/* Laptop extras */}
          {mockupType === 'laptop' && (
            <>
              <div
                className="absolute bottom-0 left-0 right-0 bg-gradient-to-b from-gray-900 to-black"
                style={{
                  height: '60px',
                  borderBottomLeftRadius: dimensions.borderRadius,
                  borderBottomRightRadius: dimensions.borderRadius,
                }}
              >
                <div
                  className="absolute bottom-2 left-1/2 -translate-x-1/2 bg-gray-800 rounded"
                  style={{
                    width: '120px',
                    height: '8px',
                  }}
                />
              </div>
              <div
                className="absolute left-0 right-0 h-1 bg-gradient-to-r from-transparent via-gray-700 to-transparent"
                style={{ bottom: '60px' }}
              />
            </>
          )}

          {/* Phone extras */}
          {mockupType === 'phone' && (
            <>
              <div
                className="absolute top-0 left-1/2 -translate-x-1/2 bg-black rounded-b-full"
                style={{
                  width: '120px',
                  height: '25px',
                }}
              />
              <div
                className="absolute bottom-8 left-1/2 -translate-x-1/2 bg-white/30 rounded-full"
                style={{
                  width: '120px',
                  height: '4px',
                }}
              />
            </>
          )}

          {/* Gloss */}
          <div
            className="absolute inset-0 pointer-events-none rounded-2xl"
            style={{
              background:
                'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, transparent 50%, rgba(0,0,0,0.2) 100%)',
              borderRadius: dimensions.borderRadius,
            }}
          />
        </motion.div>

        {/* Progress dots */}
        <div className="absolute -bottom-12 left-1/2 -translate-x-1/2 flex gap-2 z-10">
          {images.map((_, index) => (
            <motion.div
              key={index}
              className="h-1 rounded-full bg-white/20"
              style={{ width: '40px' }}
              animate={{
                backgroundColor:
                  index === currentImageIndex
                    ? 'rgba(255, 255, 255, 0.8)'
                    : 'rgba(255, 255, 255, 0.2)',
              }}
              transition={{ duration: 0.3 }}
            />
          ))}
        </div>
      </motion.div>
    </div>
  );
}
