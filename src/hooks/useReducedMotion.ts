import { useState, useEffect } from 'react';

export const useReducedMotion = () => {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [isLowEndDevice, setIsLowEndDevice] = useState(false);

  useEffect(() => {
    
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handler);

    
    const checkDevice = () => {
      const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
      const hasLowMemory = 'deviceMemory' in navigator && (navigator as any).deviceMemory < 4;
      const hasSlowCPU = 'hardwareConcurrency' in navigator && navigator.hardwareConcurrency < 4;
      
      setIsLowEndDevice(isMobile || hasLowMemory || hasSlowCPU);
    };
    
    checkDevice();

    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  return { prefersReducedMotion, isLowEndDevice, shouldReduceMotion: prefersReducedMotion || isLowEndDevice };
};
