import { memo, useEffect, useState, useRef } from 'react';

interface SkillBarProps {
  skill: string;
  level: number;
  delay?: number;
}

const SkillBar = memo(({ skill, level, delay = 0 }: SkillBarProps) => {
  const [width, setWidth] = useState(0);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setWidth(level), delay * 1000);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [level, delay]);

  return (
    <div className="space-y-1.5 sm:space-y-2" ref={ref}>
      <div className="flex justify-between items-center text-xs sm:text-sm">
        <span className="text-foreground font-medium">{skill}</span>
        <span className="text-accent glow-text-accent">{level}%</span>
      </div>
      <div className="h-1.5 sm:h-2 bg-muted/50 rounded-full overflow-hidden border border-border/50">
        <div
          className="h-full bg-gradient-to-r from-primary via-accent to-secondary rounded-full transition-all duration-1000 ease-out"
          style={{ 
            width: `${width}%`,
            boxShadow: width > 0 ? '0 0 15px hsl(var(--primary) / 0.7), 0 0 30px hsl(var(--accent) / 0.4)' : 'none'
          }}
        />
      </div>
    </div>
  );
});

SkillBar.displayName = 'SkillBar';

export default SkillBar;
