import { memo, useEffect, useState, useRef } from 'react';

interface GoalProgressBarProps {
  progress: number;
  delay?: number;
}

const GoalProgressBar = memo(({ progress, delay = 0 }: GoalProgressBarProps) => {
  const [width, setWidth] = useState(0);
  const [displayValue, setDisplayValue] = useState(0);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            setWidth(progress);
            let current = 0;
            const step = progress / 30;
            const counter = setInterval(() => {
              current = Math.min(current + step, progress);
              setDisplayValue(Math.round(current));
              if (current >= progress) clearInterval(counter);
            }, 30);
          }, delay * 1000);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [progress, delay]);

  return (
    <div ref={ref}>
      <div className="h-2 sm:h-2.5 bg-muted/20 rounded-full overflow-hidden glass-subtle">
        <div
          className="h-full bg-gradient-to-r from-primary via-accent to-secondary rounded-full transition-all duration-1000 ease-out progress-glow"
          style={{ width: `${width}%` }}
        />
      </div>
      <p className="text-[10px] sm:text-xs text-muted-foreground/60 mt-2 text-right font-mono">{displayValue}% complete</p>
    </div>
  );
});

GoalProgressBar.displayName = 'GoalProgressBar';

export default GoalProgressBar;
