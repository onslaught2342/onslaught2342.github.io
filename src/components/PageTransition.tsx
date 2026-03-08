import { motion, AnimatePresence } from 'framer-motion';
import { ReactNode, useState } from 'react';
import { useLocation } from 'react-router-dom';

const loadingVariants = {
  initial: { opacity: 1 },
  animate: { opacity: 1 },
  exit: { opacity: 0, transition: { duration: 0.15 } },
};

const contentVariants = {
  initial: { opacity: 0, y: 12, filter: 'brightness(1.3)' },
  animate: {
    opacity: 1,
    y: 0,
    filter: 'brightness(1)',
    transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] as [number, number, number, number], delay: 0.05 },
  },
  exit: {
    opacity: 0,
    y: -8,
    filter: 'brightness(1.4)',
    transition: { duration: 0.2, ease: 'easeIn' as const },
  },
};

const TerminalLoader = ({ path }: { path: string }) => {
  const [progress, setProgress] = useState(0);

  // Animate the progress bar
  useState(() => {
    let frame: number;
    let start: number | null = null;
    const duration = 350;
    const step = (ts: number) => {
      if (!start) start = ts;
      const p = Math.min((ts - start) / duration, 1);
      setProgress(p);
      if (p < 1) frame = requestAnimationFrame(step);
    };
    frame = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frame);
  });

  const filled = Math.floor(progress * 20);
  const bar = '█'.repeat(filled) + '░'.repeat(20 - filled);

  return (
    <motion.div
      variants={loadingVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      className="fixed inset-0 z-50 flex items-center justify-center bg-background/95"
    >
      <div className="font-mono text-xs sm:text-sm text-primary space-y-2 text-center">
        <p className="text-muted-foreground/60">
          $ cd {path || '/'}
        </p>
        <p>
          [{bar}] {Math.floor(progress * 100)}%
        </p>
        <p className="text-muted-foreground/40 text-[10px] animate-glow-pulse">
          Loading modules...
        </p>
      </div>
    </motion.div>
  );
};

const PageTransition = ({ children }: { children: ReactNode }) => {
  const location = useLocation();
  const [showLoader, setShowLoader] = useState(true);

  useState(() => {
    const timer = setTimeout(() => setShowLoader(false), 400);
    return () => clearTimeout(timer);
  });

  return (
    <>
      <AnimatePresence>
        {showLoader && <TerminalLoader path={location.pathname} />}
      </AnimatePresence>
      <motion.div
        variants={contentVariants}
        initial="initial"
        animate="animate"
        exit="exit"
      >
        {children}
      </motion.div>
    </>
  );
};

export default PageTransition;
