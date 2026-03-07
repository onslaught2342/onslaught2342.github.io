import { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Terminal from '@/components/Terminal';
import Portfolio from '@/components/Portfolio';

const Index = () => {
  const [showTerminal, setShowTerminal] = useState(true);

  const handleTerminalComplete = () => {
    setShowTerminal(false);
  };

  const handleSkip = () => {
    if (showTerminal) setShowTerminal(false);
  };

  useEffect(() => {
    window.addEventListener('keydown', handleSkip);
    return () => window.removeEventListener('keydown', handleSkip);
  }, [showTerminal]);

  return (
    <div onClick={showTerminal ? handleSkip : undefined}>
      <AnimatePresence mode="wait">
        {showTerminal ? (
          <motion.div
            key="terminal"
            exit={{ opacity: 0, scale: 0.95, filter: 'blur(10px)' }}
            transition={{ duration: 0.5, ease: 'easeInOut' }}
          >
            <Terminal onComplete={handleTerminalComplete} />
          </motion.div>
        ) : (
          <motion.div
            key="portfolio"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <Portfolio />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Index;
