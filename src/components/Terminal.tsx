import { useState, useEffect, memo, useCallback } from 'react';
import GlitchText from './GlitchText';

interface TerminalProps {
  onComplete: () => void;
}

interface TerminalLine {
  type: 'command' | 'output' | 'success' | 'progress';
  text: string;
}

const Terminal = memo(({ onComplete }: TerminalProps) => {
  const [lines, setLines] = useState<TerminalLine[]>([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [progress, setProgress] = useState(0);

  const terminalSteps: { line: TerminalLine; progressTarget?: number; delay: number }[] = [
    { line: { type: 'command', text: 'sudo ./activate_protocol' }, delay: 120 },
    { line: { type: 'output', text: '[sudo] password for root: ••••••••••' }, delay: 80 },
    { line: { type: 'output', text: 'Initializing secure tunnel...' }, delay: 60 },
    { line: { type: 'progress', text: '' }, progressTarget: 30, delay: 100 },
    { line: { type: 'output', text: 'Handshaking with C&C server...' }, delay: 60 },
    { line: { type: 'progress', text: '' }, progressTarget: 55, delay: 100 },
    { line: { type: 'success', text: '[OK] Keypair generated (0x2A3F5C7B)' }, delay: 60 },
    { line: { type: 'output', text: 'Authenticating identity: Onslaught2342' }, delay: 60 },
    { line: { type: 'progress', text: '' }, progressTarget: 80, delay: 100 },
    { line: { type: 'success', text: '[OK] Fingerprint verified (0xDEADBEEF)' }, delay: 60 },
    { line: { type: 'progress', text: '' }, progressTarget: 100, delay: 120 },
    { line: { type: 'success', text: '[OK] All systems operational' }, delay: 80 },
    { line: { type: 'success', text: 'Welcome back, Onslaught2342' }, delay: 60 },
    { line: { type: 'success', text: 'Deploying portfolio interface...' }, delay: 100 },
  ];

  useEffect(() => {
    if (currentStep < terminalSteps.length) {
      const step = terminalSteps[currentStep];
      
      const timeout = setTimeout(() => {
        if (step.line.type === 'progress' && step.progressTarget !== undefined) {
          setProgress(step.progressTarget);
          setCurrentStep(prev => prev + 1);
        } else {
          setLines(prev => [...prev, step.line]);
          setCurrentStep(prev => prev + 1);
        }
      }, step.delay);
      
      return () => clearTimeout(timeout);
    } else {
      const finalTimeout = setTimeout(onComplete, 200);
      return () => clearTimeout(finalTimeout);
    }
  }, [currentStep, onComplete]);

  const renderProgressBar = useCallback(() => {
    const filledBlocks = Math.floor(progress / 100 * 30);
    const emptyBlocks = 30 - filledBlocks;
    return `[${'█'.repeat(filledBlocks)}${'░'.repeat(emptyBlocks)}] ${progress}%`;
  }, [progress]);

  return (
    <div className="fixed inset-0 bg-background flex items-center justify-center p-3 sm:p-4 z-50 animate-fade-in">
      <div className="w-full max-w-3xl">
        <div className="rounded-xl overflow-hidden glass-intense shadow-[0_0_80px_hsl(var(--primary)/0.2),0_0_120px_hsl(var(--accent)/0.1)] animate-scale-in">
          {}
          <div className="px-3 sm:px-4 py-2.5 flex items-center justify-between border-b border-border/20 bg-background/30">
            <div className="flex items-center gap-1.5 sm:gap-2">
              <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-destructive/80" />
              <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-yellow-500/80" />
              <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-primary/80" />
            </div>
            <div className="text-[10px] sm:text-xs text-muted-foreground/60 font-mono">
              <GlitchText text="root@onslaught: ~/secure" intensity="low" />
            </div>
            <div className="w-12 sm:w-16" />
          </div>
          
          {}
          <div className="p-4 sm:p-6 min-h-[300px] sm:min-h-[350px] font-mono text-xs sm:text-sm">
            <div className="text-muted-foreground/50 text-[10px] sm:text-xs mb-3 sm:mb-4 border-b border-border/20 pb-2">
              GNU/Linux 5.15.0-kali3-amd64 | <span className="text-accent">SECURE SHELL</span> | <span className="text-primary">ENCRYPTED</span>
            </div>
            
            <div className="space-y-1">
              {lines.map((line, index) => (
                <div key={index} className="flex items-center gap-1 sm:gap-2 animate-fade-in flex-wrap">
                  {line.type === 'command' && (
                    <>
                      <span className="text-primary glow-text">root</span>
                      <span className="text-muted-foreground/40">@</span>
                      <span className="text-accent glow-text-accent">onslaught</span>
                      <span className="text-muted-foreground/40">:</span>
                      <span className="text-secondary">~</span>
                      <span className="text-muted-foreground/40">$</span>
                      <span className="text-foreground ml-1 sm:ml-2">{line.text}</span>
                    </>
                  )}
                  {line.type === 'output' && (
                    <span className="text-muted-foreground/70">{line.text}</span>
                  )}
                  {line.type === 'success' && (
                    <span className="text-primary glow-text">{line.text}</span>
                  )}
                </div>
              ))}
              
              {progress > 0 && (
                <div className="text-accent font-mono transition-all duration-300 glow-text-accent text-xs sm:text-sm">
                  {renderProgressBar()}
                </div>
              )}
              
              {currentStep < terminalSteps.length && (
                <div className="flex items-center gap-1 sm:gap-2 mt-1">
                  <span className="text-primary glow-text">root</span>
                  <span className="text-muted-foreground/40">@</span>
                  <span className="text-accent glow-text-accent">onslaught</span>
                  <span className="text-muted-foreground/40">:</span>
                  <span className="text-secondary">~</span>
                  <span className="text-muted-foreground/40">$</span>
                  <span className="w-2 h-4 sm:h-5 bg-primary animate-pulse ml-1 sm:ml-2 shadow-[0_0_10px_hsl(var(--primary)/0.8)]" />
                </div>
              )}
            </div>
          </div>
        </div>
        
        <div className="mt-3 sm:mt-4 text-center text-muted-foreground/40 text-[10px] sm:text-xs animate-fade-in font-body" style={{ animationDelay: '0.8s' }}>
          Press any key or tap anywhere to skip...
        </div>
      </div>
    </div>
  );
});

Terminal.displayName = 'Terminal';

export default Terminal;
