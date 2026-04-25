import { ReelCanvas } from './ReelCanvas';

export function Reel() {
  return (
    <section className="relative z-10 bg-black py-20 border-t border-line border-b">
      {/* Header */}
      <div className="max-w-6xl mx-auto px-8 mb-12">
        <div className="grid grid-cols-3 gap-8 items-end">
          <div className="font-mono text-xs uppercase tracking-wide text-text-dim">
            Demo Reel
          </div>
          <div className="text-center">
            <h2 className="font-serif text-5xl lg:text-7xl leading-none">
              The <em className="italic text-accent">Reel</em>
            </h2>
          </div>
          <div className="text-right font-mono text-xs uppercase tracking-wide text-text-dim">
            02:14 · 1080p
          </div>
        </div>
      </div>
      
      {/* Video Player */}
      <div className="max-w-6xl mx-auto px-8">
        <div className="relative bg-black border border-line overflow-hidden aspect-video max-h-[80vh]">
          <ReelCanvas />
          
          {/* Corner frame markers */}
          <div className="absolute top-4 left-4 w-7 h-7 border-t border-l border-accent opacity-70" />
          <div className="absolute top-4 right-4 w-7 h-7 border-t border-r border-accent opacity-70" />
          <div className="absolute bottom-4 left-4 w-7 h-7 border-b border-l border-accent opacity-70" />
          <div className="absolute bottom-4 right-4 w-7 h-7 border-b border-r border-accent opacity-70" />
          
          {/* Badge */}
          <div className="absolute top-14 left-14 flex items-center gap-3 z-10">
            <div className="bg-accent text-bg font-mono text-xs font-bold uppercase tracking-wider px-3 py-1 flex items-center gap-2">
              <div className="w-1.5 h-1.5 bg-bg rounded-full animate-pulse" />
              Demo
            </div>
            <div className="font-mono text-xs uppercase tracking-wider text-text">
              1UP // The Reel // Placeholder
            </div>
          </div>
          
          {/* Timecode */}
          <div className="absolute top-14 right-14 font-mono text-sm text-text">
            00:00 / 02:14
          </div>
        </div>
      </div>
    </section>
  );
}