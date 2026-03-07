import { useState, memo, useCallback } from 'react';
import TerminalBox from './TerminalBox';

interface ProjectCardProps {
  title: string;
  description: string;
  status: 'COMPLETE' | 'RUNNING' | 'TESTING' | 'VALIDATED';
  code: string[];
}

const statusColors: Record<string, string> = {
  COMPLETE: 'border-primary/50 text-primary bg-primary/10 shadow-[0_0_10px_hsl(var(--primary)/0.2)]',
  RUNNING: 'border-accent/50 text-accent bg-accent/10 shadow-[0_0_10px_hsl(var(--accent)/0.2)]',
  TESTING: 'border-yellow-500/50 text-yellow-400 bg-yellow-500/10 shadow-[0_0_10px_hsl(45_100%_50%/0.2)]',
  VALIDATED: 'border-primary/50 text-primary bg-primary/10 shadow-[0_0_10px_hsl(var(--primary)/0.2)]',
};

const ProjectCard = memo(({ title, description, status, code }: ProjectCardProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpand = useCallback(() => {
    setIsExpanded(prev => !prev);
  }, []);

  return (
    <div className="perspective-card transition-all duration-500">
      <TerminalBox onClick={toggleExpand} className="p-3 sm:p-5">
        <div className="space-y-2 sm:space-y-3">
          <div className="flex items-start justify-between gap-2 sm:gap-4">
            <div className="flex-1 min-w-0">
              <h3 className="text-foreground font-semibold mb-1.5 text-sm sm:text-base truncate sm:whitespace-normal font-body">
                {title}
              </h3>
              <p className="text-xs sm:text-sm text-muted-foreground line-clamp-2 font-body">{description}</p>
            </div>
            <span className={`text-[10px] sm:text-xs px-2.5 sm:px-3 py-0.5 sm:py-1 border rounded-full whitespace-nowrap flex-shrink-0 font-mono ${statusColors[status]}`}>
              {status}
            </span>
          </div>

          {isExpanded && (
            <div className="animate-fade-in overflow-hidden">
              <div className="mt-2 sm:mt-4 p-3 sm:p-4 rounded-lg glass-subtle">
                <div className="text-[10px] sm:text-xs text-accent mb-2 glow-text-accent font-mono">&gt; Source Code Preview</div>
                <div className="space-y-0.5 sm:space-y-1 overflow-x-auto">
                  {code.map((line, i) => (
                    <div key={i} className="text-[10px] sm:text-sm text-muted-foreground font-mono whitespace-nowrap">
                      <span className="text-muted-foreground/30 mr-2 sm:mr-3 select-none">{i + 1}</span>
                      {line}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          <div className="flex items-center text-[10px] sm:text-xs text-muted-foreground/60 pt-1 font-mono">
            <span className="text-accent/60">{isExpanded ? '▲ Tap to collapse' : '▼ Tap to expand code'}</span>
          </div>
        </div>
      </TerminalBox>
    </div>
  );
});

ProjectCard.displayName = 'ProjectCard';

export default ProjectCard;
