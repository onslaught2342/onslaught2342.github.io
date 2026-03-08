import { useEffect, useState, useRef, useCallback, memo } from "react";
import { toast } from "@/hooks/use-toast";

type ActiveEgg = null | "breach" | "sudo" | "hack" | "matrix" | "ping" | "midnight" | "help";

const KONAMI = ["ArrowUp","ArrowUp","ArrowDown","ArrowDown","ArrowLeft","ArrowRight","ArrowLeft","ArrowRight","b","a"];

const HACK_LOGS = [
  "[*] Initializing exploit framework...",
  "[*] Scanning target: 192.168.1.1",
  "[+] Port 22 (SSH) — OPEN",
  "[+] Port 80 (HTTP) — OPEN",
  "[+] Port 443 (HTTPS) — OPEN",
  "[*] Running vulnerability scan...",
  "[!] CVE-2024-0001 detected — buffer overflow",
  "[*] Crafting payload...",
  "[*] Injecting shellcode into memory...",
  "[+] Payload delivered successfully",
  "[*] Establishing reverse shell...",
  "[+] Connection established on port 4444",
  "[*] Escalating privileges...",
  "[+] Root access obtained",
  "[*] Extracting /etc/shadow...",
  "[+] Hash cracked: ********",
  "[*] Installing persistence backdoor...",
  "[+] Crontab modified",
  "[*] Covering tracks...",
  "[+] Logs wiped from /var/log/",
  "[*] Exfiltrating data...",
  "[+] 42GB transferred to C2 server",
  "",
  "═══════════════════════════════════",
];

const WARNING_LINES = [
  "⚠ FIREWALL BYPASSED",
  "⚠ INTRUSION DETECTED",
  "⚠ SECURITY PROTOCOLS DISABLED",
  "⚠ ENCRYPTION COMPROMISED",
  "⚠ ROOT ACCESS GRANTED",
  "⚠ SYSTEM INTEGRITY: COMPROMISED",
  "⚠ DATA BREACH IN PROGRESS",
  "⚠ ALL DEFENSES NEUTRALIZED",
];

const ASCII_OWL = `
    ,___,
    (O,O)
    /)  )
  ---"--"---
  NIGHT OWL
  PROTOCOL
`;

const EasterEggs = memo(() => {
  const [active, setActive] = useState<ActiveEgg>(null);
  const konamiRef = useRef<string[]>([]);
  const textRef = useRef("");
  const [hackLines, setHackLines] = useState<string[]>([]);
  const [hackDone, setHackDone] = useState(false);
  const [pingResults, setPingResults] = useState<string[]>([]);
  const [breachWarnings, setBreachWarnings] = useState<string[]>([]);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const clearTimers = useCallback(() => {
    if (timerRef.current) clearTimeout(timerRef.current);
  }, []);

  // Reset helper
  const dismiss = useCallback(() => {
    setActive(null);
    setHackLines([]);
    setHackDone(false);
    setPingResults([]);
    setBreachWarnings([]);
    document.body.classList.remove("ee-dissolving");
    clearTimers();
  }, [clearTimers]);

  // Keyboard listener
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      // Skip if an egg is active
      if (active) return;

      // Konami tracking
      konamiRef.current.push(e.key);
      if (konamiRef.current.length > 10) konamiRef.current.shift();
      if (konamiRef.current.length === 10 && konamiRef.current.every((k, i) => k.toLowerCase() === KONAMI[i].toLowerCase())) {
        konamiRef.current = [];
        textRef.current = "";
        setActive("breach");
        return;
      }

      // Text sequence tracking
      if (e.key.length === 1) {
        textRef.current = (textRef.current + e.key.toLowerCase()).slice(-20);
        const buf = textRef.current;
        if (buf.endsWith("sudo rm -rf /")) { textRef.current = ""; setActive("sudo"); }
        else if (buf.endsWith("help")) { textRef.current = ""; setActive("help"); }
        else if (buf.endsWith("hack")) { textRef.current = ""; setActive("hack"); }
        else if (buf.endsWith("matrix")) { textRef.current = ""; setActive("matrix"); }
        else if (buf.endsWith("ping")) { textRef.current = ""; setActive("ping"); }
        else if (buf.endsWith("midnight")) { textRef.current = ""; setActive("midnight"); }
      }
    };

    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [active]);

  // Auto-trigger at midnight hour
  useEffect(() => {
    const now = new Date();
    if (now.getHours() === 0 && !active) {
      setActive("midnight");
    }
  }, []);

  // === MIDNIGHT EFFECT ===
  useEffect(() => {
    if (active !== "midnight") return;
    document.documentElement.setAttribute("data-theme", "midnight");
    timerRef.current = setTimeout(() => {
      setActive(null);
      // Keep the theme active — only dismiss overlay
    }, 5000);
  }, [active]);

  // === BREACH EFFECT ===
  useEffect(() => {
    if (active !== "breach") return;
    let i = 0;
    const interval = setInterval(() => {
      if (i < WARNING_LINES.length) {
        setBreachWarnings(prev => [...prev, WARNING_LINES[i]]);
        i++;
      } else {
        clearInterval(interval);
      }
    }, 400);
    timerRef.current = setTimeout(dismiss, 6000);
    return () => clearInterval(interval);
  }, [active, dismiss]);

  // === SUDO EFFECT ===
  useEffect(() => {
    if (active !== "sudo") return;
    document.body.classList.add("ee-dissolving");
    timerRef.current = setTimeout(() => {
      document.body.classList.remove("ee-dissolving");
      setActive(null);
      toast({ title: "Nice try, script kiddie.", description: "System restored. All files intact." });
    }, 4000);
  }, [active]);

  // === HACK EFFECT ===
  useEffect(() => {
    if (active !== "hack") return;
    let i = 0;
    setHackDone(false);
    const interval = setInterval(() => {
      if (i < HACK_LOGS.length) {
        setHackLines(prev => [...prev, HACK_LOGS[i]]);
        i++;
      } else {
        clearInterval(interval);
        setHackDone(true);
        timerRef.current = setTimeout(dismiss, 3000);
      }
    }, 200);
    return () => clearInterval(interval);
  }, [active, dismiss]);

  // === MATRIX EFFECT ===
  useEffect(() => {
    if (active !== "matrix") return;
    window.dispatchEvent(new CustomEvent("matrix-intensify", { detail: { active: true } }));
    timerRef.current = setTimeout(() => {
      window.dispatchEvent(new CustomEvent("matrix-intensify", { detail: { active: false } }));
      setActive(null);
    }, 10000);
  }, [active]);

  // === PING EFFECT ===
  useEffect(() => {
    if (active !== "ping") return;
    let count = 0;
    const hostname = window.location.hostname;
    setPingResults([`PING ${hostname} — sending 4 packets...`, ""]);

    const doPing = async () => {
      const start = performance.now();
      try {
        await fetch(window.location.origin, { mode: "no-cors", cache: "no-store" });
      } catch {}
      const latency = Math.round(performance.now() - start);
      count++;
      setPingResults(prev => [...prev, `PONG! seq=${count} latency=${latency}ms from ${hostname}`]);
      if (count >= 4) {
        setTimeout(() => {
          setPingResults(prev => [...prev, "", `--- ${hostname} ping statistics ---`, `4 packets transmitted, 4 received, 0% packet loss`]);
          timerRef.current = setTimeout(dismiss, 2000);
        }, 500);
      } else {
        setTimeout(doPing, 1000);
      }
    };
    setTimeout(doPing, 500);
  }, [active, dismiss]);

  // === RENDER ===
  if (active === "midnight") {
    return (
      <div className="fixed inset-0 z-[9998] flex flex-col items-center justify-center bg-background/90 backdrop-blur-md">
        <pre className="text-primary glow-text font-mono text-lg sm:text-2xl leading-tight select-none text-center animate-scale-in">
          {ASCII_OWL}
        </pre>
        <p className="mt-6 text-xl sm:text-3xl font-display font-bold tracking-[0.2em] text-accent animate-pulse">
          NIGHT OWL PROTOCOL ACTIVATED
        </p>
        <p className="mt-3 text-xs text-muted-foreground">
          [ theme will persist until reload ]
        </p>
      </div>
    );
  }

  if (active === "help") {
    const commands = [
      { cmd: "help", desc: "Show this command list" },
      { cmd: "hack", desc: "Simulate a full system breach" },
      { cmd: "matrix", desc: "Intensify the matrix rain for 10s" },
      { cmd: "ping", desc: "Ping this site and measure latency" },
      { cmd: "midnight", desc: "Activate Night Owl theme" },
      { cmd: "sudo rm -rf /", desc: "Try to delete everything..." },
      { cmd: "jinwoo", desc: "Awaken the Shadow Monarch" },
      { cmd: "↑↑↓↓←→←→BA", desc: "Konami Code — trigger a breach alert" },
    ];
    return (
      <div className="fixed inset-0 z-[9998] flex items-center justify-center bg-background/80 backdrop-blur-sm" onClick={dismiss}>
        <div className="glass-intense rounded-lg p-6 sm:p-8 max-w-lg w-full mx-4 animate-scale-in">
          <div className="flex items-center gap-2 mb-4 border-b border-border/30 pb-3">
            <span className="w-3 h-3 rounded-full bg-primary" />
            <span className="font-mono text-xs text-muted-foreground ml-2">root@onslaught:~$ help</span>
          </div>
          <p className="font-mono text-xs text-muted-foreground/60 mb-4">Available secret commands — type anywhere:</p>
          <div className="space-y-2">
            {commands.map((c, i) => (
              <div key={i} className="flex items-start gap-3 font-mono text-xs sm:text-sm animate-fade-in" style={{ animationDelay: `${i * 80}ms` }}>
                <span className="text-primary glow-text whitespace-nowrap min-w-[140px]">{c.cmd}</span>
                <span className="text-muted-foreground/70">{c.desc}</span>
              </div>
            ))}
          </div>
          <p className="font-mono text-[10px] text-muted-foreground/40 mt-6 text-center">click anywhere to dismiss</p>
        </div>
      </div>
    );
  }

  if (active === "matrix" || active === "sudo" || !active) {
    if (active === "sudo") {
      return (
        <div className="ee-sudo-overlay fixed inset-0 z-[9998] flex items-center justify-center pointer-events-none">
          <div className="text-center animate-pulse">
            <p className="font-mono text-destructive text-2xl sm:text-4xl font-bold tracking-wider">
              DELETING SYSTEM FILES...
            </p>
            <p className="font-mono text-destructive/60 text-sm mt-4">rm: removing everything...</p>
          </div>
        </div>
      );
    }
    return null;
  }

  if (active === "breach") {
    return (
      <div className="ee-breach-overlay fixed inset-0 z-[9998] flex flex-col items-center justify-center">
        <div className="ee-screen-shake">
          <h1 className="ee-breach-title text-4xl sm:text-7xl md:text-9xl font-extrabold tracking-[0.15em] text-center font-display select-none">
            SYSTEM BREACHED
          </h1>
          <div className="mt-8 space-y-2 max-w-lg mx-auto px-4">
            {breachWarnings.map((w, i) => (
              <p key={i} className="font-mono text-sm sm:text-base text-destructive/90 animate-fade-in" style={{ animationDelay: `${i * 100}ms` }}>
                {w}
              </p>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (active === "hack") {
    return (
      <div className="fixed inset-0 z-[9998] bg-background/95 backdrop-blur-sm flex flex-col p-4 sm:p-8 overflow-hidden">
        <div className="glass-intense rounded-lg p-4 sm:p-6 flex-1 overflow-hidden flex flex-col">
          <div className="flex items-center gap-2 mb-4 border-b border-border/30 pb-3">
            <span className="w-3 h-3 rounded-full bg-destructive" />
            <span className="w-3 h-3 rounded-full bg-accent" />
            <span className="w-3 h-3 rounded-full bg-primary" />
            <span className="font-mono text-xs text-muted-foreground ml-2">root@target:~#</span>
          </div>
          <div className="flex-1 overflow-y-auto font-mono text-xs sm:text-sm space-y-1">
            {hackLines.map((line, i) => (
              <p key={i} className={
                line.startsWith("[+]") ? "text-primary" :
                line.startsWith("[!]") ? "text-destructive" :
                line.startsWith("═") ? "text-accent" :
                "text-muted-foreground"
              }>
                {line}
              </p>
            ))}
          </div>
          {hackDone && (
            <div className="mt-4 text-center">
              <p className="text-3xl sm:text-6xl font-extrabold font-display tracking-[0.2em] text-primary glow-text animate-scale-in">
                ACCESS GRANTED
              </p>
            </div>
          )}
        </div>
      </div>
    );
  }

  if (active === "ping") {
    return (
      <div className="fixed inset-0 z-[9998] flex items-center justify-center bg-background/80 backdrop-blur-sm">
        <div className="glass-intense rounded-lg p-6 sm:p-8 max-w-xl w-full mx-4">
          <div className="flex items-center gap-2 mb-4 border-b border-border/30 pb-3">
            <span className="w-3 h-3 rounded-full bg-primary" />
            <span className="font-mono text-xs text-muted-foreground ml-2">terminal — ping</span>
          </div>
          <div className="font-mono text-xs sm:text-sm space-y-1">
            {pingResults.map((line, i) => (
              <p key={i} className={
                line.startsWith("PONG") ? "text-primary" :
                line.startsWith("---") ? "text-accent" :
                "text-muted-foreground"
              }>
                {line || "\u00A0"}
              </p>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return null;
});

EasterEggs.displayName = "EasterEggs";
export default EasterEggs;
