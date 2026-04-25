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
      
      {/* Portfolio sections after the 3D experience */}
      <section className="relative z-10 bg-black min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="font-serif text-6xl italic text-accent mb-6">The Reel</h2>
          <p className="font-mono text-sm uppercase tracking-wider text-text-dim">
            1UP Productions · Esports · Broadcast · Coming Soon
          </p>
        </div>
      </section>
      
      {/* Portfolio Grid */}
      <section className="relative z-10 bg-bg py-20">
        <div className="max-w-6xl mx-auto px-8">
          <div className="text-center mb-16">
            <h2 className="font-serif text-5xl mb-6">The <em className="italic text-accent">Portfolio</em></h2>
            <p className="font-mono text-sm uppercase tracking-wider text-text-dim">
              Esports · Broadcast · Live Events
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { title: 'LEC FINALS', sub: 'MUNICH · DE · 2024', cat: 'ESPORTS' },
              { title: 'LOL WORLDS', sub: 'SEOUL · KR · 2023', cat: 'ESPORTS' },
              { title: 'VCT CHAMPIONS', sub: 'LOS ANGELES · US · 2023', cat: 'VALORANT' },
              { title: 'TOP GEAR', sub: 'BBC · UK', cat: 'BROADCAST' },
              { title: 'A$AP ROCKY', sub: 'COACHELLA · 2016', cat: 'LIVE MUSIC' },
              { title: 'UFC', sub: 'ESPN · MULTI-EVENT', cat: 'SPORT' }
            ].map((project, i) => (
              <div key={i} className="border border-line hover:border-accent transition-colors p-6">
                <div className="aspect-video bg-gradient-to-br from-surface via-line to-line-2 mb-4 border border-accent/20 flex items-center justify-center">
                  <div className="font-mono text-xs uppercase tracking-wider text-accent">
                    {project.cat}
                  </div>
                </div>
                <h3 className="font-serif text-xl mb-2">{project.title}</h3>
                <p className="font-mono text-xs uppercase tracking-wide text-text-dim">
                  {project.sub}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
      
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