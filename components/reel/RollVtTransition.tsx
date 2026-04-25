export function RollVtTransition() {
  return (
    <section className="relative z-10 bg-black min-h-screen flex items-center justify-center overflow-hidden">
      {/* SMPTE-style flash bar */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-full h-0.5 bg-gradient-to-r from-transparent via-accent to-transparent animate-pulse" />
      </div>
      
      <div className="grid grid-cols-3 gap-16 items-center z-10">
        {/* Left cue */}
        <div className="text-left">
          <div className="font-mono text-xs uppercase tracking-widest text-text-faint mb-2">
            VT 01 / SDI 04
          </div>
          <div className="font-mono text-lg font-bold text-accent tracking-wider">
            ROLL VT
          </div>
        </div>
        
        {/* Center title */}
        <div className="text-center">
          <div className="font-serif italic text-6xl lg:text-8xl leading-none text-text mb-4">
            The Reel
          </div>
          <div className="font-mono text-xs uppercase tracking-widest text-text-dim">
            1UP &middot; 2024 &middot; Duration
          </div>
        </div>
        
        {/* Right cue */}
        <div className="text-right">
          <div className="font-mono text-xs uppercase tracking-widest text-text-faint mb-2">
            Status
          </div>
          <div className="font-mono text-lg font-bold text-accent tracking-wider flex items-center justify-end">
            <span className="w-2 h-2 bg-accent rounded-full mr-2 animate-pulse" />
            STANDBY
          </div>
        </div>
      </div>
    </section>
  );
}