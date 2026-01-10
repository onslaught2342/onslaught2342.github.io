import { useState, useEffect, useRef, ReactNode, memo, useCallback } from 'react';
import TerminalBox from './TerminalBox';

interface CommandBoxProps {
  command: string;
  children: ReactNode;
  className?: string;
  glow?: boolean;
  delay?: number;
  priority?: boolean;
  onAnimationComplete?: () => void;
}

const CommandBox = memo(({
  command,
  children,
  className = '',
  glow = false,
  delay = 0,
  priority = false,
  onAnimationComplete
}: CommandBoxProps) => {
  const [typedCommand, setTypedCommand] = useState('');
  const [showContent, setShowContent] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const [isInView, setIsInView] = useState(priority);
  const elementRef = useRef<HTMLDivElement>(null);

  const handleViewportEnter = useCallback(() => {
    if (!isInView) {
      setIsInView(true);
    }
  }, [isInView]);

  useEffect(() => {
    if (!isInView || hasStarted) return;

    const startDelay = setTimeout(() => {
      setHasStarted(true);
      let index = 0;

      const typeInterval = setInterval(() => {
        if (index <= command.length) {
          setTypedCommand(command.slice(0, index));
          index++;
        } else {
          clearInterval(typeInterval);
          setTimeout(() => {
            setShowContent(true);
            onAnimationComplete?.();
          }, 80);
        }
      }, 25);

      return () => clearInterval(typeInterval);
    }, delay);

    return () => clearTimeout(startDelay);
  }, [isInView, hasStarted, command, delay, onAnimationComplete]);

  useEffect(() => {
    if (priority) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          handleViewportEnter();
          observer.disconnect();
        }
      },
      { rootMargin: '50px', threshold: 0.1 }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => observer.disconnect();
  }, [priority, handleViewportEnter]);

  return (
    <div ref={elementRef}>
      <TerminalBox glow={glow} className={className}>
        <div className="flex items-center gap-2 px-3 sm:px-4 py-2 border-b border-border/50 bg-background/60">
          <div className="flex gap-1.5">
            <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-destructive shadow-[0_0_8px_hsl(var(--destructive)/0.6)]" />
            <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-yellow-500 shadow-[0_0_8px_hsl(45_100%_50%/0.6)]" />
            <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-primary shadow-[0_0_8px_hsl(var(--primary)/0.6)]" />
          </div>
          <span className="hidden xs:inline text-[10px] sm:text-xs text-muted-foreground ml-2 font-mono truncate">
            root@onslaught: ~/secure
          </span>
        </div>

        <div className="px-3 sm:px-4 pt-3 pb-2">
          <div className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm font-mono flex-wrap">
            <span className="text-primary glow-text">root</span>
            <span className="text-muted-foreground">@</span>
            <span className="text-accent glow-text-accent">onslaught</span>
            <span className="text-muted-foreground">:</span>
            <span className="text-secondary">~</span>
            <span className="text-muted-foreground">$</span>
            <span className="text-foreground ml-1 break-all">{typedCommand}</span>
            {!showContent && (
              <span className="w-1.5 sm:w-2 h-3.5 sm:h-4 bg-primary animate-pulse shadow-[0_0_10px_hsl(var(--primary)/0.8)]" />
            )}
          </div>
        </div>

        {showContent && (
          <div className="px-3 sm:px-4 pb-4 animate-fade-in">
            {children}
          </div>
        )}
      </TerminalBox>
    </div>
  );
});

CommandBox.displayName = 'CommandBox';

export default CommandBox;