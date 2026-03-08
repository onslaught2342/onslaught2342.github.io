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

const TerminalDots = memo(() => {
  const [hovered, setHovered] = useState<null | 'red' | 'yellow' | 'green'>(null);

  return (
    <div className="flex gap-1.5">
      {/* Close dot */}
      <div
        className={`w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-destructive/80 transition-all duration-300 cursor-pointer
          ${hovered === 'red' ? 'scale-125 shadow-[0_0_8px_hsl(var(--destructive))] bg-destructive' : 'hover:brightness-125'}`}
        onMouseEnter={() => setHovered('red')}
        onMouseLeave={() => setHovered(null)}
      >
        {hovered === 'red' && (
          <span className="flex items-center justify-center h-full text-[7px] sm:text-[8px] font-bold text-destructive-foreground leading-none select-none">✕</span>
        )}
      </div>
      {/* Minimize dot */}
      <div
        className={`w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-accent/80 transition-all duration-300 cursor-pointer
          ${hovered === 'yellow' ? 'scale-125 shadow-[0_0_8px_hsl(var(--accent))] bg-accent' : 'hover:brightness-125'}`}
        onMouseEnter={() => setHovered('yellow')}
        onMouseLeave={() => setHovered(null)}
      >
        {hovered === 'yellow' && (
          <span className="flex items-center justify-center h-full text-[7px] sm:text-[8px] font-bold text-accent-foreground leading-none select-none">−</span>
        )}
      </div>
      {/* Maximize dot */}
      <div
        className={`w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-primary/80 transition-all duration-300 cursor-pointer
          ${hovered === 'green' ? 'scale-125 shadow-[0_0_8px_hsl(var(--primary))] bg-primary' : 'hover:brightness-125'}`}
        onMouseEnter={() => setHovered('green')}
        onMouseLeave={() => setHovered(null)}
      >
        {hovered === 'green' && (
          <span className="flex items-center justify-center h-full text-[7px] sm:text-[8px] font-bold text-primary-foreground leading-none select-none">⬜</span>
        )}
      </div>
    </div>
  );
});
TerminalDots.displayName = 'TerminalDots';

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
    if (!isInView) setIsInView(true);
  }, [isInView]);

  useEffect(() => {
    if (!isInView || hasStarted) return;
    
    const startDelay = setTimeout(() => {
      setHasStarted(true);
      let index = 0;
      
      const typeNext = () => {
        if (index <= command.length) {
          setTypedCommand(command.slice(0, index));
          index++;
          // Randomized delay: occasional longer pauses simulate thinking
          const base = 30 + Math.random() * 60;
          const pause = Math.random() > 0.85 ? 120 + Math.random() * 80 : 0;
          setTimeout(typeNext, base + pause);
        } else {
          // Brief "Enter" flash before content reveals
          setTimeout(() => {
            setShowContent(true);
            onAnimationComplete?.();
          }, 150);
        }
      };
      typeNext();
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

    if (elementRef.current) observer.observe(elementRef.current);

    return () => observer.disconnect();
  }, [priority, handleViewportEnter]);

  return (
    <div ref={elementRef} className="gsap-section">
      <TerminalBox glow={glow} className={className}>
        {/* Terminal Header */}
        <div className="flex items-center gap-2 px-3 sm:px-4 py-2.5 border-b border-border/30 bg-background/40">
          <TerminalDots />
          <span className="hidden xs:inline text-[10px] sm:text-xs text-muted-foreground/60 ml-2 font-mono truncate">
            root@onslaught: ~/secure
          </span>
        </div>

        {/* Command Line */}
        <div className="px-3 sm:px-4 pt-3 pb-2">
          <div className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm font-mono flex-wrap">
            <span className="text-primary glow-text">root</span>
            <span className="text-muted-foreground/60">@</span>
            <span className="text-accent glow-text-accent">onslaught</span>
            <span className="text-muted-foreground/60">:</span>
            <span className="text-secondary">~</span>
            <span className="text-muted-foreground/60">$</span>
            <span className="text-foreground ml-1 break-all">{typedCommand}</span>
            {!showContent && (
              <span className="w-1.5 sm:w-2 h-3.5 sm:h-4 bg-primary animate-pulse shadow-[0_0_10px_hsl(var(--primary)/0.8)]" />
            )}
          </div>
        </div>

        {/* Content */}
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
