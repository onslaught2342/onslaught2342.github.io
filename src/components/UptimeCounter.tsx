import { memo, useState, useEffect } from 'react';

const DEPLOY_DATE = new Date('2025-01-01T00:00:00Z');

const UptimeCounter = memo(() => {
  const [elapsed, setElapsed] = useState('');

  useEffect(() => {
    const update = () => {
      const now = Date.now();
      const diff = now - DEPLOY_DATE.getTime();
      const days = Math.floor(diff / 86400000);
      const hours = Math.floor((diff % 86400000) / 3600000);
      const minutes = Math.floor((diff % 3600000) / 60000);
      const seconds = Math.floor((diff % 60000) / 1000);
      setElapsed(
        `${days}d ${String(hours).padStart(2, '0')}h ${String(minutes).padStart(2, '0')}m ${String(seconds).padStart(2, '0')}s`
      );
    };
    update();
    const id = setInterval(update, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="flex items-center gap-2 px-3 py-2 glass-subtle rounded-lg font-mono text-[10px] sm:text-xs text-muted-foreground/60 w-fit mx-auto mb-4">
      <span className="inline-block w-1.5 h-1.5 rounded-full bg-primary animate-glow-pulse" />
      <span>
        SYS_UPTIME: <span className="text-primary">{elapsed}</span>
        {' | '}PID: <span className="text-accent">2342</span>
        {' | '}LOAD: <span className="text-secondary">0.42</span>
      </span>
    </div>
  );
});

UptimeCounter.displayName = 'UptimeCounter';

export default UptimeCounter;
