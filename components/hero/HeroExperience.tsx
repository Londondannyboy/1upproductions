'use client';
import { useScrollProgress } from '@/lib/scrollProgress';
import { HeroCanvas } from './HeroCanvas';
import { SceneOverlays } from './SceneOverlays';

export function HeroExperience() {
  const scrollProgress = useScrollProgress();

  return (
    <>
      {/* Scroll track for determining scroll progress - extended for stadium exploration */}
      <div className="scroll-track h-[700vh] relative z-10" />
      
      {/* 3D Canvas */}
      <HeroCanvas />
      
      {/* Scene overlays */}
      <SceneOverlays scrollProgress={scrollProgress} />
      
      {/* Film grain overlay */}
      <div className="grain" />
      
      {/* Tally flash - triggered at specific scroll points */}
      <div 
        className="fixed inset-0 z-[70] pointer-events-none bg-accent transition-opacity duration-150"
        style={{
          opacity: (scrollProgress > 0.40 && scrollProgress < 0.43) ? 
            Math.max(0, 1 - (scrollProgress - 0.40) / 0.03) * 0.7 :
            (scrollProgress > 0.66 && scrollProgress < 0.69) ?
            Math.max(0, 1 - (scrollProgress - 0.66) / 0.03) * 0.7 : 0
        }}
      />
    </>
  );
}