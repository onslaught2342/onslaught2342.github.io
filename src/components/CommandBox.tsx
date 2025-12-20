import { useState, useEffect, ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";
import TerminalBox from "./TerminalBox";

interface CommandBoxProps {
	command: string;
	children: ReactNode;
	className?: string;
	glow?: boolean;
	delay?: number;
}

const CommandBox = ({
	command,
	children,
	className = "",
	glow = false,
	delay = 0,
}: CommandBoxProps) => {
	const [typedCommand, setTypedCommand] = useState("");
	const [showContent, setShowContent] = useState(false);
	const [hasStarted, setHasStarted] = useState(false);
	const [isInView, setIsInView] = useState(false);

	useEffect(() => {
		if (!isInView || hasStarted) return;

		const startDelay = setTimeout(() => {
			setHasStarted(true);
			let index = 0;
			const typeInterval = setInterval(() => {
				if (index <= command.length) {
					setTypedCommand(command.slice(0, index));
					index++;
				} else {
					clearInterval(typeInterval);
					setTimeout(() => setShowContent(true), 150);
				}
			}, 50);

			return () => clearInterval(typeInterval);
		}, delay);

		return () => clearTimeout(startDelay);
	}, [isInView, hasStarted, command, delay]);

	return (
		<motion.div
			onViewportEnter={() => setIsInView(true)}
			viewport={{ once: true, margin: "-50px" }}
		>
			<TerminalBox glow={glow} className={className}>
				{/* Terminal Header */}
				<div className="flex items-center gap-2 border-b border-border bg-background/50 px-4 py-2">
					<div className="flex gap-1.5">
						<div className="h-3 w-3 rounded-full bg-destructive" />
						<div className="h-3 w-3 rounded-full bg-yellow-500" />
						<div className="h-3 w-3 rounded-full bg-primary" />
					</div>
					<span className="ml-2 font-mono text-xs text-muted-foreground">
						root@onslaught: ~/secure
					</span>
				</div>

				{/* Command Line */}
				<div className="px-4 pb-2 pt-3">
					<div className="flex items-center gap-2 font-mono text-sm">
						<span className="text-primary">root@onslaught</span>
						<span className="text-muted-foreground">:</span>
						<span className="text-accent">~</span>
						<span className="text-muted-foreground">$</span>
						<span className="text-foreground">{typedCommand}</span>
						{!showContent && (
							<motion.span
								className="h-4 w-2 bg-primary"
								animate={{ opacity: [1, 0] }}
								transition={{ duration: 0.5, repeat: Infinity }}
							/>
						)}
					</div>
				</div>

				{/* Content with glitch reveal */}
				<AnimatePresence>
					{showContent && (
						<motion.div
							initial={{ opacity: 0, y: -10 }}
							animate={{ opacity: 1, y: 0 }}
							className="px-4 pb-4"
						>
							<motion.div
								initial={{
									clipPath: "inset(0 100% 0 0)",
									filter: "blur(4px)",
								}}
								animate={{
									clipPath: "inset(0 0% 0 0)",
									filter: "blur(0px)",
								}}
								transition={{ duration: 0.4, ease: "easeOut" }}
								className="relative"
							>
								{/* Glitch overlay effect */}
								<motion.div
									className="pointer-events-none absolute inset-0 z-20"
									initial={{ opacity: 1 }}
									animate={{ opacity: 0 }}
									transition={{ duration: 0.6, delay: 0.2 }}
								>
									<div
										className="absolute inset-0 bg-primary/20"
										style={{
											clipPath:
												"polygon(0 20%, 100% 25%, 100% 30%, 0 35%)",
										}}
									/>
									<div
										className="absolute inset-0 bg-accent/20"
										style={{
											clipPath:
												"polygon(0 60%, 100% 55%, 100% 65%, 0 70%)",
										}}
									/>
								</motion.div>

								{/* Scanline sweep effect */}
								<motion.div
									className="pointer-events-none absolute inset-0 z-10"
									initial={{
										background:
											"linear-gradient(180deg, transparent 0%, hsl(var(--primary) / 0.3) 50%, transparent 100%)",
									}}
									animate={{
										backgroundPosition: [
											"0% 0%",
											"0% 200%",
										],
									}}
									transition={{
										duration: 0.5,
										ease: "linear",
									}}
									style={{ backgroundSize: "100% 50%" }}
								/>

								{children}
							</motion.div>
						</motion.div>
					)}
				</AnimatePresence>
			</TerminalBox>
		</motion.div>
	);
};

export default CommandBox;
