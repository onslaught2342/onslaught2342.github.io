import { useEffect, useState, useRef, memo, useCallback } from "react";

const JinwooEasterEgg = memo(() => {
  const [active, setActive] = useState(false);
  const [showText, setShowText] = useState(false);
  const inputRef = useRef("");
  const tapCountRef = useRef(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const tapTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  const activateEasterEgg = useCallback(() => {
    setActive(true);
    setShowText(true);
    setTimeout(() => setShowText(false), 5000);
  }, []);

  // Simple CSS-driven fade for the text overlay
  useEffect(() => {
    if (!showText || !overlayRef.current) return;
    requestAnimationFrame(() => {
      overlayRef.current?.classList.add("ee-visible");
    });
  }, [showText]);

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

  // Detect multiple taps on mobile
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

  // Handle audio + video playback when activated
  useEffect(() => {
    if (!active) return;

    // Audio
    if (!audioRef.current) {
      const audio = new Audio(
        "https://cdn.onslaught2342.qzz.io/assets/audio/music/aura.m4a"
      );
      audio.loop = true;
      audio.volume = 0.4;
      audio.play().catch(() => {});
      audioRef.current = audio;
    }

    // Force video play
    if (videoRef.current) {
      videoRef.current.play().catch(() => {});
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
      {/* Looping aura video — above matrix rain (z-0), below content */}
      <video
        ref={videoRef}
        autoPlay
        loop
        muted
        playsInline
        className="fixed top-0 left-0 w-screen h-screen object-cover opacity-50 z-[5] pointer-events-none"
        src="https://cdn.onslaught2342.qzz.io/assets/videos/wallpapers/aura.mp4"
      />

      {/* Auto-dismissing awakening overlay — pure CSS animations */}
      {showText && (
        <div
          ref={overlayRef}
          className="ee-overlay fixed inset-0 flex flex-col items-center justify-center z-[9999] pointer-events-none"
        >
          <h1 className="ee-title text-4xl sm:text-6xl md:text-8xl font-extrabold tracking-[0.12em] text-center px-4 font-display select-none">
            SHADOW MONARCH
          </h1>
          <p className="ee-subtitle mt-6 md:mt-10 text-3xl sm:text-5xl md:text-7xl font-bold italic font-display select-none">
            ARISE
          </p>
        </div>
      )}
    </>
  );
});

JinwooEasterEgg.displayName = "JinwooEasterEgg";

export default JinwooEasterEgg;
