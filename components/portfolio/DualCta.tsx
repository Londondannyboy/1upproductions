export function DualCta() {
  return (
    <section className="relative z-10 bg-surface py-20">
      <div className="max-w-4xl mx-auto px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="text-center lg:text-left border border-line p-12 hover:border-accent transition-colors">
            <h3 className="font-serif text-3xl mb-6">
              Commissioning <em className="italic text-accent">a show?</em>
            </h3>
            <p className="font-sans text-text-dim mb-8">
              From concept to broadcast, we handle multi-camera production for television, 
              streaming platforms, and live events worldwide.
            </p>
            <div className="font-mono text-xs uppercase tracking-wider text-accent">
              Contact &middot; Production
            </div>
          </div>
          
          <div className="text-center lg:text-left border border-line p-12 hover:border-accent transition-colors">
            <h3 className="font-serif text-3xl mb-6">
              Launching a <em className="italic text-accent">live event?</em>
            </h3>
            <p className="font-sans text-text-dim mb-8">
              Esports tournaments, gaming competitions, and live experiences. 
              From stage design to global streaming distribution.
            </p>
            <div className="font-mono text-xs uppercase tracking-wider text-accent">
              Contact &middot; Live Events
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}