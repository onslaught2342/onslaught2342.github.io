import { ReactNode, memo } from 'react';

interface TerminalBoxProps {
  children: ReactNode;
  className?: string;
  glow?: boolean;
  onClick?: () => void;
}

const TerminalBox = memo(({ children, className = '', glow = false, onClick }: TerminalBoxProps) => {
  return (
    <div
      onClick={onClick}
      className={`
        relative border bg-card/70 backdrop-blur-md rounded-lg overflow-hidden
        transition-all duration-500 ease-out
        ${glow
          ? 'border-primary/60 shadow-[0_0_30px_hsl(var(--primary)/0.3),0_0_60px_hsl(var(--accent)/0.15)]'
          : 'border-border/80 shadow-[0_0_20px_hsl(var(--primary)/0.15)]'
        }
        hover:shadow-[0_0_40px_hsl(var(--primary)/0.35),0_0_80px_hsl(var(--accent)/0.2)]
        hover:border-primary/70
        ${onClick ? 'cursor-pointer' : ''}
        ${className}
      `}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 pointer-events-none" />

      <div className="absolute top-0 left-0 w-5 h-5 border-t-2 border-l-2 border-primary rounded-tl-lg" />
      <div className="absolute top-0 right-0 w-5 h-5 border-t-2 border-r-2 border-accent rounded-tr-lg" />
      <div className="absolute bottom-0 left-0 w-5 h-5 border-b-2 border-l-2 border-accent rounded-bl-lg" />
      <div className="absolute bottom-0 right-0 w-5 h-5 border-b-2 border-r-2 border-primary rounded-br-lg" />

      <div className="relative z-10">{children}</div>
    </div>
  );
});

TerminalBox.displayName = 'TerminalBox';

export default TerminalBox;