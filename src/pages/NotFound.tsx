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
		console.error(
			"404 Error: User attempted to access non-existent route:",
			location.pathname,
		);
	}, [location.pathname]);

	// Terminal lines typing effect
	useEffect(() => {
		const terminalLines = [
			`$ cd ${location.pathname}`,
			`bash: cd: ${location.pathname}: No such file or directory`,
			"",
			'$ find / -name "page" 2>/dev/null',
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
		<div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-background">
			<MatrixBackground />
			<ScanlineEffect />
			<CommandPalette />

			<motion.div
				initial={{ opacity: 0, scale: 0.95 }}
				animate={{ opacity: 1, scale: 1 }}
				transition={{ duration: 0.5 }}
				className="relative z-10 mx-4 w-full max-w-2xl"
			>
				<div className="glass-intense rounded-2xl border border-primary/30 p-6 shadow-[0_0_60px_hsl(var(--primary)/0.15)] sm:p-10">
					{/* ASCII Art */}
					<pre className="glow-text mb-6 select-none text-center font-mono text-[10px] leading-tight text-primary sm:text-xs">
						{ASCII_404}
					</pre>

					<div className="mb-6 text-center">
						<h1 className="mb-2 font-display text-2xl font-bold sm:text-4xl">
							<GlitchText
								text="ROUTE NOT FOUND"
								intensity="high"
							/>
						</h1>
						<p className="font-mono text-xs text-muted-foreground sm:text-sm">
							ERR_CONNECTION_REFUSED — The requested path does not
							exist
						</p>
					</div>

					{/* Terminal output */}
					<div className="glass-subtle mb-6 max-h-48 space-y-1 overflow-y-auto rounded-xl p-4 font-mono text-[11px] sm:text-xs">
						{lines.map((line, i) => (
							<motion.p
								key={i}
								initial={{ opacity: 0, x: -8 }}
								animate={{ opacity: 1, x: 0 }}
								transition={{ duration: 0.15 }}
								className={
									line.startsWith("$")
										? "text-primary"
										: line.startsWith("bash:") ||
											  line.startsWith("Search")
											? "text-destructive"
											: line.includes("404")
												? "font-bold text-accent"
												: "text-muted-foreground"
								}
							>
								{line || "\u00A0"}
							</motion.p>
						))}
						<span className="inline-block h-4 w-2 animate-pulse bg-primary" />
					</div>

					{/* Countdown + nav */}
					<div className="space-y-4 text-center">
						<p className="font-mono text-xs text-muted-foreground">
							Redirecting to{" "}
							<span className="text-primary">/home</span> in{" "}
							<span className="text-sm font-bold text-accent">
								{countdown}
							</span>
							s...
						</p>

						<div className="flex justify-center gap-3">
							<button
								onClick={() => navigate("/")}
								className="glass-subtle rounded-xl px-5 py-2 font-mono text-xs text-primary transition-all duration-300 hover:border-primary/50 hover:bg-primary/10 hover:shadow-[0_0_20px_hsl(var(--primary)/0.2)] active:scale-95"
							>
								cd /home
							</button>
							<button
								onClick={() => navigate(-1)}
								className="glass-subtle rounded-xl px-5 py-2 font-mono text-xs text-muted-foreground transition-all duration-300 hover:border-accent/50 hover:bg-accent/10 hover:shadow-[0_0_20px_hsl(var(--accent)/0.2)] active:scale-95"
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
