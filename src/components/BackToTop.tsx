import { useState, useEffect, memo } from 'react';
import { ArrowUp } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const BackToTop = memo(() => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.2 }}
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="fixed bottom-6 right-6 z-50 p-3 glass rounded-xl border border-primary/30
            hover:border-primary/60 hover:shadow-[0_0_25px_hsl(var(--primary)/0.3)]
            transition-all duration-300 active:scale-90 group
            focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none"
          aria-label="Back to top"
        >
          <ArrowUp className="w-5 h-5 text-primary group-hover:text-accent transition-colors" />
        </motion.button>
      )}
    </AnimatePresence>
  );
});

BackToTop.displayName = 'BackToTop';
export default BackToTop;
