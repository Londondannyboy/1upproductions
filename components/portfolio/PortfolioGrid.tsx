import { projects } from '@/content/projects';
import { PortfolioCard } from './PortfolioCard';

export function PortfolioGrid() {
  return (
    <section className="relative z-10 bg-bg py-20">
      <div className="max-w-6xl mx-auto px-8">
        <div className="text-center mb-16">
          <h2 className="font-serif text-5xl mb-6">The <em className="italic text-accent">Portfolio</em></h2>
          <p className="font-mono text-sm uppercase tracking-wider text-text-dim">
            6 Films · Esports · Broadcast · Live
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.slice(0, 6).map((project) => (
            <PortfolioCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
}