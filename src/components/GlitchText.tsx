import { memo } from 'react';

interface GlitchTextProps {
  text: string;
  className?: string;
  intensity?: 'low' | 'medium' | 'high';
}

const GlitchText = memo(({ text, className = '', intensity = 'medium' }: GlitchTextProps) => {
  const getIntensityStyles = () => {
    switch (intensity) {
      case 'low':
        return {
          animDuration: '6s',
          offset1: '1px',
          offset2: '1px',
        };
      case 'high':
        return {
          animDuration: '2s',
          offset1: '3px',
          offset2: '4px',
        };
      default:
        return {
          animDuration: '4s',
          offset1: '2px',
          offset2: '3px',
        };
    }
  };

  const styles = getIntensityStyles();

  return (
    <span 
      className={`glitch-text-wrapper ${className}`} 
      data-text={text}
      aria-label={text}
    >
      {text}
      <style>{`
        .glitch-text-wrapper {
          position: relative;
          display: inline-block;
          color: inherit;
        }
        
        .glitch-text-wrapper::before,
        .glitch-text-wrapper::after {
          content: attr(data-text);
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          pointer-events: none;
        }
        
        .glitch-text-wrapper::before {
          animation: glitch-effect-1 ${styles.animDuration} infinite linear alternate-reverse;
          clip-path: inset(40% 0 20% 0);
          color: hsl(200 100% 60%);
          opacity: 0;
          text-shadow: ${styles.offset1} 0 hsl(200 100% 60%);
        }
        
        .glitch-text-wrapper::after {
          animation: glitch-effect-2 ${styles.animDuration} infinite linear alternate-reverse;
          clip-path: inset(60% 0 10% 0);
          color: hsl(0 80% 55%);
          opacity: 0;
          text-shadow: -${styles.offset2} 0 hsl(0 80% 55%);
        }
        
        @keyframes glitch-effect-1 {
          0%, 88%, 100% { 
            transform: translateX(0); 
            opacity: 0;
            clip-path: inset(40% 0 20% 0);
          }
          90% { 
            transform: translateX(${styles.offset1}); 
            opacity: 0.8;
            clip-path: inset(10% 0 60% 0);
          }
          92% { 
            transform: translateX(-${styles.offset1}); 
            opacity: 0.8;
            clip-path: inset(70% 0 5% 0);
          }
          94% { 
            transform: translateX(${styles.offset1}); 
            opacity: 0.8;
            clip-path: inset(30% 0 40% 0);
          }
          96% { 
            transform: translateX(0); 
            opacity: 0.6;
            clip-path: inset(80% 0 10% 0);
          }
        }
        
        @keyframes glitch-effect-2 {
          0%, 86%, 100% { 
            transform: translateX(0); 
            opacity: 0;
            clip-path: inset(60% 0 10% 0);
          }
          88% { 
            transform: translateX(-${styles.offset2}); 
            opacity: 0.8;
            clip-path: inset(5% 0 70% 0);
          }
          91% { 
            transform: translateX(${styles.offset2}); 
            opacity: 0.8;
            clip-path: inset(50% 0 20% 0);
          }
          93% { 
            transform: translateX(-${styles.offset1}); 
            opacity: 0.7;
            clip-path: inset(15% 0 55% 0);
          }
          95% { 
            transform: translateX(0); 
            opacity: 0.5;
            clip-path: inset(25% 0 45% 0);
          }
        }
        
        @media (prefers-reduced-motion: reduce) {
          .glitch-text-wrapper::before,
          .glitch-text-wrapper::after {
            animation: none;
            opacity: 0;
          }
        }
        
        @media (max-width: 640px) {
          .glitch-text-wrapper::before,
          .glitch-text-wrapper::after {
            animation-duration: 8s;
          }
        }
      `}</style>
    </span>
  );
});

GlitchText.displayName = 'GlitchText';

export default GlitchText;