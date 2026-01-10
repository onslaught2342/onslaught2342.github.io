import { useEffect, useRef, memo } from "react";

const MatrixBackground = memo(() => {
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
    const speed = isMobile ? 0.6 : 1.2;
    const fadeAlpha = isMobile ? 0.18 : 0.1;
    const glow = isMobile ? 0 : 12;
    const frameInterval = isMobile ? 70 : 40;
    const columnSpacing = isMobile ? 1.35 : 1.15;


    const chars =
      "アイウエオカキクケコサシスセソタチツテトナニヌネノ0123456789";

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

        ctx.shadowColor = "#00ff88";
        ctx.shadowBlur = glow;
        ctx.fillStyle = "#ccffcc";
        ctx.fillText(char, x, y);

        ctx.shadowBlur = 0;
        ctx.fillStyle = "#00aa55";
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

    window.addEventListener("resize", handleResize, { passive: true });

    return () => {
      cancelAnimationFrame(animationRef.current);
      window.removeEventListener("resize", handleResize);
      clearTimeout(resizeTimeout);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-0 pointer-events-none"
    />
  );
});

MatrixBackground.displayName = "MatrixBackground";
export default MatrixBackground;
