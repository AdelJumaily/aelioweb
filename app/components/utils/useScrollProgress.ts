'use client';

import { useEffect, useState } from 'react';

/**
 * Custom hook to track scroll progress within a container
 * Returns a value from 0 to 1 representing scroll progress
 */
export function useScrollProgress(containerRef: React.RefObject<HTMLElement>) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleScroll = () => {
      const rect = container.getBoundingClientRect();
      const scrollTop = window.scrollY - rect.top;
      const scrollHeight = rect.height - window.innerHeight;
      const progress = Math.max(0, Math.min(1, scrollTop / scrollHeight));
      setProgress(progress);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial calculation

    return () => window.removeEventListener('scroll', handleScroll);
  }, [containerRef]);

  return progress;
}

