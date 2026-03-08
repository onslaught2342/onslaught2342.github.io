import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import MatrixBackground from "@/components/MatrixBackground";
import ScanlineEffect from "@/components/ScanlineEffect";
import CommandPalette from "@/components/CommandPalette";
import GlitchText from "@/components/GlitchText";

const ASCII_404 = `
 ██   ██  ████   ██   ██
 ██   ██ ██  ██  ██   ██
 ███████ ██  ██  ███████
      ██ ██  ██       ██
      ██  ████        ██
`;

const NotFound = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [countdown, setCountdown] = useState(7);
  const [lines, setLines] = useState<string[]>([]);

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  // Terminal lines typing effect
  useEffect(() => {
    const terminalLines = [
      `$ cd ${location.pathname}`,
      `bash: cd: ${location.pathname}: No such file or directory`,
      "",
      "$ find / -name \"page\" 2>/dev/null",
      "Search returned 0 results.",
      "",
      "$ echo $STATUS",
      "404 — TARGET NOT FOUND",
    ];

    let i = 0;
    const interval = setInterval(() => {
      if (i < terminalLines.length) {
        setLines((prev) => [...prev, terminalLines[i]]);
        i++;
      } else {
        clearInterval(interval);
      }
    }, 250);

    return () => clearInterval(interval);
  }, [location.pathname]);

  // Countdown redirect
  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          navigate("/");
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [navigate]);

  return (
    <div className="relative min-h-screen bg-background overflow-hidden flex items-center justify-center">
      <MatrixBackground />
      <ScanlineEffect />
      <CommandPalette />

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 w-full max-w-2xl mx-4"
      >
        <div className="glass-intense rounded-2xl border border-primary/30 p-6 sm:p-10 shadow-[0_0_60px_hsl(var(--primary)/0.15)]">
          {/* ASCII Art */}
          <pre className="text-primary text-[10px] sm:text-xs font-mono text-center leading-tight mb-6 glow-text select-none">
            {ASCII_404}
          </pre>

          <div className="text-center mb-6">
            <h1 className="text-2xl sm:text-4xl font-bold font-display mb-2">
              <GlitchText text="ROUTE NOT FOUND" intensity="high" />
            </h1>
            <p className="text-muted-foreground text-xs sm:text-sm font-mono">
              ERR_CONNECTION_REFUSED — The requested path does not exist
            </p>
          </div>

          {/* Terminal output */}
          <div className="glass-subtle rounded-xl p-4 mb-6 font-mono text-[11px] sm:text-xs space-y-1 max-h-48 overflow-y-auto">
            {lines.map((line, i) => (
              <motion.p
                key={i}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.15 }}
                className={
                  line.startsWith("$")
                    ? "text-primary"
                    : line.startsWith("bash:") || line.startsWith("Search")
                    ? "text-destructive"
                    : line.includes("404")
                    ? "text-accent font-bold"
                    : "text-muted-foreground"
                }
              >
                {line || "\u00A0"}
              </motion.p>
            ))}
            <span className="inline-block w-2 h-4 bg-primary animate-pulse" />
          </div>

          {/* Countdown + nav */}
          <div className="text-center space-y-4">
            <p className="text-muted-foreground text-xs font-mono">
              Redirecting to <span className="text-primary">/home</span> in{" "}
              <span className="text-accent font-bold text-sm">{countdown}</span>s...
            </p>

            <div className="flex justify-center gap-3">
              <button
                onClick={() => navigate("/")}
                className="px-5 py-2 glass-subtle rounded-xl text-xs font-mono text-primary
                  hover:border-primary/50 hover:bg-primary/10 hover:shadow-[0_0_20px_hsl(var(--primary)/0.2)]
                  transition-all duration-300 active:scale-95"
              >
                cd /home
              </button>
              <button
                onClick={() => navigate(-1)}
                className="px-5 py-2 glass-subtle rounded-xl text-xs font-mono text-muted-foreground
                  hover:border-accent/50 hover:bg-accent/10 hover:shadow-[0_0_20px_hsl(var(--accent)/0.2)]
                  transition-all duration-300 active:scale-95"
              >
                cd -
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default NotFound;
