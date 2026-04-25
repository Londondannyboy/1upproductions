import { useEffect, useState } from 'react';

export function useScrollProgress() {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    function updateScroll() {
      const scrollTrack = document.querySelector('.scroll-track') as HTMLElement;
      if (!scrollTrack) return;
      
      const max = scrollTrack.offsetHeight;
      const progress = Math.max(0, Math.min(1, window.scrollY / max));
      setScrollProgress(progress);
    }

    updateScroll(); // Initial call
    window.addEventListener('scroll', updateScroll, { passive: true });
    window.addEventListener('resize', updateScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', updateScroll);
      window.removeEventListener('resize', updateScroll);
    };
  }, []);

  return scrollProgress;
}