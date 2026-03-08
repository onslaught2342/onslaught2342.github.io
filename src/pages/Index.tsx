import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { AnimatePresence, motion } from 'framer-motion';
import Terminal from '@/components/Terminal';
import Portfolio from '@/components/Portfolio';
import ConsoleInit from '@/components/ConsoleInit';

const SKIP_INTRO_KEY = 'onslaught_skip_intro';

const Index = () => {
  const hasVisited = localStorage.getItem(SKIP_INTRO_KEY) === 'true';
  const [showTerminal, setShowTerminal] = useState(!hasVisited);

  const handleTerminalComplete = () => {
    setShowTerminal(false);
    localStorage.setItem(SKIP_INTRO_KEY, 'true');
  };

  const handleSkip = () => {
    if (showTerminal) {
      setShowTerminal(false);
      localStorage.setItem(SKIP_INTRO_KEY, 'true');
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', handleSkip);
    return () => window.removeEventListener('keydown', handleSkip);
  }, [showTerminal]);

  return (
    <div onClick={showTerminal ? handleSkip : undefined}>
      <Helmet>
        <title>Onslaught2342 | Aspiring Ethical Hacker & Security Researcher</title>
        <meta name="description" content="Portfolio of Onslaught2342 — aspiring ethical hacker, security researcher, and developer building cybersecurity tools and encryption projects." />
        <meta property="og:title" content="Onslaught2342 | Security Researcher" />
        <meta property="og:description" content="Aspiring ethical hacker exploring cybersecurity, encryption, and advanced computing." />
      </Helmet>
      <ConsoleInit />
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
