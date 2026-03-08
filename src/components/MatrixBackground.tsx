import { useEffect, useRef, memo } from "react";

const MatrixBackground = memo(({ className }: { className?: string }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const isMobile =
      /Android|iPhone|iPad|iPod|Opera Mini|IEMobile/i.test(navigator.userAgent);

    const fontSize = isMobile ? 12 : 15;
    let speed = isMobile ? 0.6 : 1.2;
    let fadeAlpha = isMobile ? 0.18 : 0.1;
    const glowAmount = isMobile ? 0 : 12;
    let frameInterval = isMobile ? 70 : 40;
    const columnSpacing = isMobile ? 1.35 : 1.15;

    const defaultSpeed = speed;
    const defaultFade = fadeAlpha;
    const defaultFrame = frameInterval;

    const chars =
      "アイウエオカキクケコサシスセソタチツテトナニヌネノ0123456789";

    // Theme-aware colors
    function hslToHex(h: number, s: number, l: number): string {
      s /= 100; l /= 100;
      const a = s * Math.min(l, 1 - l);
      const f = (n: number) => {
        const k = (n + h / 30) % 12;
        const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
        return Math.round(255 * color).toString(16).padStart(2, '0');
      };
      return `#${f(0)}${f(8)}${f(4)}`;
    }

    function getThemeColors() {
      const raw = getComputedStyle(document.documentElement).getPropertyValue('--primary').trim();
      const parts = raw.split(/\s+/);
      const h = parseFloat(parts[0]) || 0;
      const s = parseFloat(parts[1]) || 100;
      const l = parseFloat(parts[2]) || 50;
      return {
        glow: hslToHex(h, s, Math.min(l + 20, 90)),
        head: hslToHex(h, Math.max(s - 30, 10), Math.min(l + 35, 92)),
        trail: hslToHex(h, s, Math.max(l - 10, 20)),
      };
    }

    let colors = getThemeColors();

    let columns = 0;
    let drops: number[] = [];
    let lastTime = 0;

    const resizeCanvas = () => {
      const dpr = window.devicePixelRatio || 1;

      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = "100%";
      canvas.style.height = "100%";

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      columns = Math.floor(window.innerWidth / fontSize);
      drops = Array.from({ length: columns }, () =>
        Math.random() * window.innerHeight
      );
    };

    resizeCanvas();

    function draw(timestamp: number) {
      if (timestamp - lastTime < frameInterval) {
        animationRef.current = requestAnimationFrame(draw);
        return;
      }
      lastTime = timestamp;

      ctx.fillStyle = `rgba(0, 0, 0, ${fadeAlpha})`;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.font = `${fontSize}px monospace`;
      ctx.textBaseline = "top";

      for (let i = 0; i < drops.length; i++) {
        const x = i * fontSize * columnSpacing;
        const y = drops[i];

        const char =
          chars[Math.floor(Math.random() * chars.length)];

        ctx.shadowColor = colors.glow;
        ctx.shadowBlur = glowAmount;
        ctx.fillStyle = colors.head;
        ctx.fillText(char, x, y);

        ctx.shadowBlur = 0;
        ctx.fillStyle = colors.trail;
        ctx.fillText(char, x, y - fontSize);

        if (y > window.innerHeight && Math.random() > 0.975) {
          drops[i] = 0;
        } else {
          drops[i] += fontSize * speed;
        }
      }

      animationRef.current = requestAnimationFrame(draw);
    }

    animationRef.current = requestAnimationFrame(draw);

    let resizeTimeout: number;
    const handleResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = window.setTimeout(resizeCanvas, 200);
    };

    // Matrix intensify listener
    const handleIntensify = (e: Event) => {
      const detail = (e as CustomEvent).detail;
      if (detail.active) {
        speed = defaultSpeed * 2.5;
        fadeAlpha = 0.04;
        frameInterval = 20;
        canvas.style.opacity = "0.85";
      } else {
        speed = defaultSpeed;
        fadeAlpha = defaultFade;
        frameInterval = defaultFrame;
        canvas.style.opacity = "";
      }
    };

    window.addEventListener("resize", handleResize, { passive: true });
    window.addEventListener("matrix-intensify", handleIntensify);

    // Watch for theme changes
    const themeObserver = new MutationObserver(() => {
      colors = getThemeColors();
    });
    themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme', 'class'] });

    return () => {
      cancelAnimationFrame(animationRef.current);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("matrix-intensify", handleIntensify);
      themeObserver.disconnect();
      clearTimeout(resizeTimeout);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={`fixed inset-0 z-0 pointer-events-none ${className || ''}`}
    />
  );
});

MatrixBackground.displayName = "MatrixBackground";
export default MatrixBackground;
