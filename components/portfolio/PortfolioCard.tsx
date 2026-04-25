interface Project {
  id: string;
  title: string;
  subtitle: string;
  category: string;
  color: string;
}

interface PortfolioCardProps {
  project: Project;
}

export function PortfolioCard({ project }: PortfolioCardProps) {
  return (
    <div className="group relative overflow-hidden bg-surface border border-line hover:border-accent transition-colors">
      <div className="aspect-video bg-gradient-to-br from-surface via-line to-line-2 relative">
        <div className="absolute inset-4 border border-accent/20 flex items-center justify-center">
          <div className="text-center">
            <div 
              className="w-3 h-3 rounded-full mb-2 mx-auto"
              style={{ backgroundColor: project.color }}
            />
            <div className="font-mono text-xs uppercase tracking-wider text-accent">
              {project.category}
            </div>
          </div>
        </div>
      </div>
      
      <div className="p-6">
        <h3 className="font-serif text-xl mb-2">{project.title}</h3>
        <p className="font-mono text-xs uppercase tracking-wide text-text-dim">
          {project.subtitle}
        </p>
      </div>
    </div>
  );
}