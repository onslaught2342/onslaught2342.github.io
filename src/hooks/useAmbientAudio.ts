import { useState, useEffect, useRef, useCallback } from 'react';

const AMBIENT_URL = 'https://assets.mixkit.co/active_storage/sfx/212/212.wav';

export const useAmbientAudio = () => {
  const [isMuted, setIsMuted] = useState(true);
  const [isReady, setIsReady] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const audio = new Audio(AMBIENT_URL);
    audio.loop = true;
    audio.volume = 0.08;
    audio.preload = 'auto';
    audioRef.current = audio;

    audio.addEventListener('canplaythrough', () => setIsReady(true));

    return () => {
      audio.pause();
      audio.src = '';
      audioRef.current = null;
    };
  }, []);

  const toggleMute = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isMuted) {
      audio.play().catch(() => {});
      audio.volume = 0;
      
      let vol = 0;
      const fadeIn = setInterval(() => {
        vol = Math.min(vol + 0.005, 0.08);
        audio.volume = vol;
        if (vol >= 0.08) clearInterval(fadeIn);
      }, 50);
    } else {
      
      let vol = audio.volume;
      const fadeOut = setInterval(() => {
        vol = Math.max(vol - 0.005, 0);
        audio.volume = vol;
        if (vol <= 0) {
          clearInterval(fadeOut);
          audio.pause();
        }
      }, 50);
    }
    setIsMuted(prev => !prev);
  }, [isMuted]);

  return { isMuted, toggleMute, isReady };
};
