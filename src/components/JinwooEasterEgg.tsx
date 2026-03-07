import { useEffect, useState, useRef, memo, useCallback } from "react";

const JinwooEasterEgg = memo(() => {
  const [active, setActive] = useState(false);
  const [showText, setShowText] = useState(false);
  const inputRef = useRef("");
  const tapCountRef = useRef(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const tapTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const activateEasterEgg = useCallback(() => {
    setActive(true);
    setShowText(true);
    setTimeout(() => setShowText(false), 5000);
  }, []);

  // Detect "jinwoo" typed on desktop
  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      inputRef.current = (inputRef.current + e.key.toLowerCase()).slice(-7);
      if (inputRef.current.includes("jinwoo")) {
        activateEasterEgg();
      }
    }
    window.addEventListener("keydown", handleKey, { passive: true });
    return () => window.removeEventListener("keydown", handleKey);
  }, [activateEasterEgg]);

  
  useEffect(() => {
    function handleTap() {
      tapCountRef.current += 1;
      
      if (tapCountRef.current === 1) {
        if (tapTimeoutRef.current) clearTimeout(tapTimeoutRef.current);
        tapTimeoutRef.current = setTimeout(() => {
          tapCountRef.current = 0;
        }, 3000);
      }
      
      if (tapCountRef.current >= 5) {
        if (tapTimeoutRef.current) clearTimeout(tapTimeoutRef.current);
        tapCountRef.current = 0;
        activateEasterEgg();
      }
    }
    window.addEventListener("touchstart", handleTap, { passive: true });
    return () => window.removeEventListener("touchstart", handleTap);
  }, [activateEasterEgg]);

  
  useEffect(() => {
    if (active && !audioRef.current) {
      const audio = new Audio(
        "https://cdn.onslaught2342.qzz.io/assets/audio/music/aura.m4a"
      );
      audio.loop = true;
      audio.volume = 0.4;
      audio.play().catch(() => {});
      audioRef.current = audio;
    }
    
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, [active]);

  if (!active) return null;

  return (
    <>
      {}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="fixed top-0 left-0 w-screen h-screen object-cover opacity-50 z-[4] pointer-events-none"
      >
        <source
          src="https://cdn.onslaught2342.qzz.io/assets/videos/wallpapers/aura.mp4"
          type="video/mp4"
        />
      </video>

      {}
      {showText && (
        <div className="fixed inset-0 flex flex-col items-center justify-center z-[9999] bg-black/90 backdrop-blur-3xl animate-fade-in">
          <h1 className="text-5xl md:text-8xl font-extrabold text-primary tracking-widest drop-shadow-[0_0_40px_hsl(var(--primary))] text-center px-4 animate-scale-in">
            Awaken, Shadow Monarch
          </h1>
          <p className="mt-6 text-2xl md:text-4xl text-muted-foreground italic tracking-wide drop-shadow-[0_0_20px_hsl(var(--primary))] animate-fade-in" style={{ animationDelay: '1s' }}>
            "Arise."
          </p>
        </div>
      )}
    </>
  );
});

JinwooEasterEgg.displayName = 'JinwooEasterEgg';

export default JinwooEasterEgg;
