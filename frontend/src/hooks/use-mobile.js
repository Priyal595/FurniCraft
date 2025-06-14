import { useState, useEffect } from 'react';

const MOBILE_BREAKPOINT = 768; // breakpoint in pixels

export function useIsMobile() {
  const [isMobile, setIsMobile] = useState(undefined);

  useEffect(() => {
    const mediaQuery = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`);

    const handleChange = () => {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
    };

    mediaQuery.addEventListener('change', handleChange);
    handleChange(); // initial check

    return () => {
      mediaQuery.removeEventListener('change', handleChange);
    };
  }, []);

  return !!isMobile;
}
