'use client';
import dynamic from 'next/dynamic';

// Dynamic import the hero experience to avoid SSR issues with three.js
const HeroExperience = dynamic(() => import('@/components/hero/HeroExperience').then(mod => ({ default: mod.HeroExperience })), { 
  ssr: false,
  loading: () => <div className="fixed inset-0 bg-black" />
});

export default function HomePage() {
  return (
    <main className="relative min-h-screen bg-bg text-text">
      <HeroExperience />
      
      {/* Placeholder content after hero */}
      <section className="relative z-10 min-h-screen bg-bg-2 p-8">
        <div className="max-w-4xl mx-auto pt-20">
          <h2 className="font-serif text-4xl mb-6">The Reel</h2>
          <p className="font-sans text-text-dim">
            3D hero experience complete. Additional sections (reel, portfolio) to be implemented.
          </p>
        </div>
      </section>
    </main>
  );
}