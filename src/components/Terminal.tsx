import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface TerminalProps {
	onComplete: () => void;
}

interface TerminalLine {
	type: "command" | "output" | "success" | "progress";
	text: string;
	progress?: number;
}

const Terminal = ({ onComplete }: TerminalProps) => {
	const [lines, setLines] = useState<TerminalLine[]>([]);
	const [currentStep, setCurrentStep] = useState(0);
	const [progress, setProgress] = useState(0);
	const [isAnimatingProgress, setIsAnimatingProgress] = useState(false);

	const terminalSteps: {
		line: TerminalLine;
		progressTarget?: number;
		delay: number;
	}[] = [
		{
			line: { type: "command", text: "sudo ./activate_protocol" },
			delay: 300,
		},
		{
			line: {
				type: "output",
				text: "[sudo] password for root: ••••••••••",
			},
			delay: 200,
		},
		{
			line: { type: "output", text: "Initializing secure tunnel..." },
			delay: 150,
		},
		{
			line: { type: "progress", text: "" },
			progressTarget: 15,
			delay: 400,
		},
		{
			line: { type: "output", text: "Handshaking with C&C server..." },
			delay: 150,
		},
		{
			line: { type: "progress", text: "" },
			progressTarget: 30,
			delay: 400,
		},
		{
			line: { type: "output", text: "Loading RSA-4096 keypair..." },
			delay: 150,
		},
		{
			line: { type: "progress", text: "" },
			progressTarget: 45,
			delay: 400,
		},
		{
			line: {
				type: "success",
				text: "[OK] Keypair generated (0x2A3F5C7B)",
			},
			delay: 150,
		},
		{
			line: { type: "output", text: "Establishing AES-256 session..." },
			delay: 150,
		},
		{
			line: { type: "progress", text: "" },
			progressTarget: 60,
			delay: 400,
		},
		{
			line: { type: "success", text: "[OK] Session key negotiated" },
			delay: 150,
		},
		{
			line: {
				type: "output",
				text: "Authenticating identity: Onslaught2342",
			},
			delay: 150,
		},
		{
			line: { type: "progress", text: "" },
			progressTarget: 75,
			delay: 400,
		},
		{
			line: {
				type: "success",
				text: "[OK] Fingerprint verified (0xDEADBEEF)",
			},
			delay: 150,
		},
		{
			line: { type: "output", text: "Decrypting classified data..." },
			delay: 150,
		},
		{
			line: { type: "progress", text: "" },
			progressTarget: 100,
			delay: 600,
		},
		{
			line: { type: "success", text: "[OK] All systems operational" },
			delay: 200,
		},
		{
			line: { type: "success", text: "Welcome back, Onslaught2342" },
			delay: 150,
		},
		{
			line: { type: "output", text: "System access: UNRESTRICTED" },
			delay: 100,
		},
		{
			line: {
				type: "output",
				text: "Status: [ONLINE] [ANONYMOUS] [SECURE]",
			},
			delay: 100,
		},
		{
			line: { type: "success", text: "Deploying portfolio interface..." },
			delay: 300,
		},
	];

	useEffect(() => {
		if (currentStep < terminalSteps.length) {
			const step = terminalSteps[currentStep];

			const timeout = setTimeout(() => {
				if (
					step.line.type === "progress" &&
					step.progressTarget !== undefined
				) {
					setIsAnimatingProgress(true);
					// Animate progress bar
					const targetProgress = step.progressTarget;
					const startProgress = progress;
					const duration = step.delay;
					const startTime = Date.now();

					const animateProgress = () => {
						const elapsed = Date.now() - startTime;
						const t = Math.min(elapsed / duration, 1);
						const currentProgress =
							startProgress +
							(targetProgress - startProgress) * t;
						setProgress(currentProgress);

						if (t < 1) {
							requestAnimationFrame(animateProgress);
						} else {
							setIsAnimatingProgress(false);
							setCurrentStep(currentStep + 1);
						}
					};

					requestAnimationFrame(animateProgress);
				} else {
					setLines((prev) => [...prev, step.line]);
					setCurrentStep(currentStep + 1);
				}
			}, step.delay);

			return () => clearTimeout(timeout);
		} else {
			const finalTimeout = setTimeout(onComplete, 600);
			return () => clearTimeout(finalTimeout);
		}
	}, [currentStep, progress, onComplete]);

	const renderProgressBar = () => {
		const filledBlocks = Math.floor((progress / 100) * 40);
		const emptyBlocks = 40 - filledBlocks;
		return `[${"█".repeat(filledBlocks)}${"░".repeat(emptyBlocks)}] ${Math.floor(progress)}%`;
	};

	return (
		<AnimatePresence>
			<motion.div
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				exit={{ opacity: 0 }}
				className="fixed inset-0 z-50 flex items-center justify-center bg-background p-4"
			>
				<div className="w-full max-w-4xl">
					{/* Terminal Window */}
					<motion.div
						initial={{ y: 20, opacity: 0 }}
						animate={{ y: 0, opacity: 1 }}
						transition={{ duration: 0.3 }}
						className="overflow-hidden rounded-lg border border-border shadow-[0_0_50px_hsl(var(--primary)/0.3)]"
					>
						{/* Terminal Header - Linux style */}
						<div className="flex items-center justify-between border-b border-border/50 bg-[#2d2d2d] px-4 py-2">
							<div className="flex items-center gap-2">
								<div className="h-3 w-3 rounded-full bg-[#ff5f56]" />
								<div className="h-3 w-3 rounded-full bg-[#ffbd2e]" />
								<div className="h-3 w-3 rounded-full bg-[#27ca40]" />
							</div>
							<div className="font-mono text-xs text-muted-foreground">
								root@onslaught: ~/secure
							</div>
							<div className="w-16" />
						</div>

						{/* Terminal Body */}
						<div className="min-h-[400px] bg-[#1a1a1a] p-6 font-mono text-sm">
							{/* Static header */}
							<div className="mb-4 border-b border-border/30 pb-2 text-xs text-muted-foreground">
								GNU/Linux 5.15.0-kali3-amd64 | SECURE SHELL |
								ENCRYPTED
							</div>

							{/* Command lines */}
							<div className="space-y-1">
								{lines.map((line, index) => (
									<motion.div
										key={index}
										initial={{ opacity: 0, x: -5 }}
										animate={{ opacity: 1, x: 0 }}
										transition={{ duration: 0.1 }}
										className="flex items-center gap-2"
									>
										{line.type === "command" && (
											<>
												<span className="text-primary">
													root@onslaught
												</span>
												<span className="text-muted-foreground">
													:
												</span>
												<span className="text-accent">
													~
												</span>
												<span className="text-muted-foreground">
													$
												</span>
												<span className="ml-2 text-foreground">
													{line.text}
												</span>
											</>
										)}
										{line.type === "output" && (
											<span className="text-muted-foreground">
												{line.text}
											</span>
										)}
										{line.type === "success" && (
											<span className="glow-text text-primary">
												{line.text}
											</span>
										)}
									</motion.div>
								))}

								{/* Real-time progress bar */}
								{progress > 0 && (
									<motion.div
										initial={{ opacity: 0 }}
										animate={{ opacity: 1 }}
										className="font-mono text-accent"
									>
										{renderProgressBar()}
									</motion.div>
								)}

								{/* Cursor */}
								{currentStep < terminalSteps.length &&
									!isAnimatingProgress && (
										<div className="mt-1 flex items-center gap-2">
											<span className="text-primary">
												root@onslaught
											</span>
											<span className="text-muted-foreground">
												:
											</span>
											<span className="text-accent">
												~
											</span>
											<span className="text-muted-foreground">
												$
											</span>
											<span className="ml-2 h-5 w-2.5 animate-typing-cursor bg-primary" />
										</div>
									)}
							</div>
						</div>
					</motion.div>

					{/* Skip hint */}
					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						transition={{ delay: 1 }}
						className="mt-4 text-center text-xs text-muted-foreground"
					>
						Press any key or click anywhere to skip...
					</motion.div>
				</div>
			</motion.div>
		</AnimatePresence>
	);
};

export default Terminal;
