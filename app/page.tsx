'use client';
import dynamic from 'next/dynamic';
import { RollVtTransition } from '@/components/reel/RollVtTransition';
import { Reel } from '@/components/reel/Reel';
import { PortfolioGrid } from '@/components/portfolio/PortfolioGrid';
import { DualCta } from '@/components/portfolio/DualCta';

// Dynamic import the hero experience to avoid SSR issues with three.js
const HeroExperience = dynamic(() => import('@/components/hero/HeroExperience').then(mod => ({ default: mod.HeroExperience })), { 
  ssr: false,
  loading: () => <div className="fixed inset-0 bg-black" />
});

export default function HomePage() {
  return (
    <main className="relative min-h-screen bg-bg text-text">
      <HeroExperience />
      
      {/* Roll VT transition */}
      <RollVtTransition />
      
      {/* The Reel - video player section */}
      <Reel />
      
      {/* Portfolio Grid */}
      <PortfolioGrid />
      
      {/* Dual CTA */}
      <DualCta />
      
      {/* Footer */}
      <footer className="relative z-10 bg-bg border-t border-line py-12">
        <div className="max-w-4xl mx-auto px-8 text-center">
          <div className="font-serif text-xl italic mb-4">1<span className="font-sans font-bold">UP</span></div>
          <p className="font-mono text-xs uppercase tracking-wider text-text-dim">
            Productions &middot; Est. 2015 &middot; UK
          </p>
        </div>
      </footer>
    </main>
  );
}