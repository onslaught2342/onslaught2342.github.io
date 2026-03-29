import {
	useState,
	useEffect,
	useRef,
	ReactNode,
	memo,
	useCallback,
} from "react";
import TerminalBox from "./TerminalBox";

interface CommandBoxProps {
	command: string;
	children: ReactNode;
	className?: string;
	glow?: boolean;
	delay?: number;
	priority?: boolean;
	onAnimationComplete?: () => void;
}

const TerminalDots = memo(() => {
	const [hovered, setHovered] = useState<null | "red" | "yellow" | "green">(
		null,
	);

	return (
		<div className="flex gap-1.5">
			{/* Close dot */}
			<div
				className={`h-2.5 w-2.5 cursor-pointer rounded-full bg-destructive/80 transition-all duration-300 sm:h-3 sm:w-3 ${hovered === "red" ? "scale-125 bg-destructive shadow-[0_0_8px_hsl(var(--destructive))]" : "hover:brightness-125"}`}
				onMouseEnter={() => setHovered("red")}
				onMouseLeave={() => setHovered(null)}
			>
				{hovered === "red" && (
					<span className="flex h-full select-none items-center justify-center text-[7px] font-bold leading-none text-destructive-foreground sm:text-[8px]">
						✕
					</span>
				)}
			</div>
			{/* Minimize dot */}
			<div
				className={`h-2.5 w-2.5 cursor-pointer rounded-full bg-accent/80 transition-all duration-300 sm:h-3 sm:w-3 ${hovered === "yellow" ? "scale-125 bg-accent shadow-[0_0_8px_hsl(var(--accent))]" : "hover:brightness-125"}`}
				onMouseEnter={() => setHovered("yellow")}
				onMouseLeave={() => setHovered(null)}
			>
				{hovered === "yellow" && (
					<span className="flex h-full select-none items-center justify-center text-[7px] font-bold leading-none text-accent-foreground sm:text-[8px]">
						−
					</span>
				)}
			</div>
			{/* Maximize dot */}
			<div
				className={`h-2.5 w-2.5 cursor-pointer rounded-full bg-primary/80 transition-all duration-300 sm:h-3 sm:w-3 ${hovered === "green" ? "scale-125 bg-primary shadow-[0_0_8px_hsl(var(--primary))]" : "hover:brightness-125"}`}
				onMouseEnter={() => setHovered("green")}
				onMouseLeave={() => setHovered(null)}
			>
				{hovered === "green" && (
					<span className="flex h-full select-none items-center justify-center text-[7px] font-bold leading-none text-primary-foreground sm:text-[8px]">
						⬜
					</span>
				)}
			</div>
		</div>
	);
});
TerminalDots.displayName = "TerminalDots";

const CommandBox = memo(
	({
		command,
		children,
		className = "",
		glow = false,
		delay = 0,
		priority = false,
		onAnimationComplete,
	}: CommandBoxProps) => {
		const [typedCommand, setTypedCommand] = useState("");
		const [showContent, setShowContent] = useState(false);
		const [hasStarted, setHasStarted] = useState(false);
		const [isInView, setIsInView] = useState(priority);
		const elementRef = useRef<HTMLDivElement>(null);

		const handleViewportEnter = useCallback(() => {
			if (!isInView) setIsInView(true);
		}, [isInView]);

		useEffect(() => {
			if (!isInView || hasStarted) return;

			const startDelay = setTimeout(() => {
				setHasStarted(true);
				let index = 0;

				const typeNext = () => {
					if (index <= command.length) {
						setTypedCommand(command.slice(0, index));
						index++;
						// Randomized delay: occasional longer pauses simulate thinking
						const base = 30 + Math.random() * 60;
						const pause =
							Math.random() > 0.85 ? 120 + Math.random() * 80 : 0;
						setTimeout(typeNext, base + pause);
					} else {
						// Brief "Enter" flash before content reveals
						setTimeout(() => {
							setShowContent(true);
							onAnimationComplete?.();
						}, 150);
					}
				};
				typeNext();
			}, delay);

			return () => clearTimeout(startDelay);
		}, [isInView, hasStarted, command, delay, onAnimationComplete]);

		useEffect(() => {
			if (priority) return;

			const observer = new IntersectionObserver(
				([entry]) => {
					if (entry.isIntersecting) {
						handleViewportEnter();
						observer.disconnect();
					}
				},
				{ rootMargin: "50px", threshold: 0.1 },
			);

			if (elementRef.current) observer.observe(elementRef.current);

			return () => observer.disconnect();
		}, [priority, handleViewportEnter]);

		return (
			<div ref={elementRef} className="gsap-section">
				<TerminalBox glow={glow} className={className}>
					{/* Terminal Header */}
					<div className="flex items-center gap-2 border-b border-border/30 bg-background/40 px-3 py-2.5 sm:px-4">
						<TerminalDots />
						<span className="xs:inline ml-2 hidden truncate font-mono text-[10px] text-muted-foreground/60 sm:text-xs">
							root@onslaught: ~/secure
						</span>
					</div>

					{/* Command Line */}
					<div className="px-3 pb-2 pt-3 sm:px-4">
						<div className="flex flex-wrap items-center gap-1 font-mono text-xs sm:gap-2 sm:text-sm">
							<span className="glow-text text-primary">root</span>
							<span className="text-muted-foreground/60">@</span>
							<span className="glow-text-accent text-accent">
								onslaught
							</span>
							<span className="text-muted-foreground/60">:</span>
							<span className="text-secondary">~</span>
							<span className="text-muted-foreground/60">$</span>
							<span className="ml-1 break-all text-foreground">
								{typedCommand}
							</span>
							{!showContent && (
								<span className="h-3.5 w-1.5 animate-pulse bg-primary shadow-[0_0_10px_hsl(var(--primary)/0.8)] sm:h-4 sm:w-2" />
							)}
						</div>
					</div>

					{/* Content */}
					{showContent && (
						<div className="animate-fade-in px-3 pb-4 sm:px-4">
							{children}
						</div>
					)}
				</TerminalBox>
			</div>
		);
	},
);

CommandBox.displayName = "CommandBox";

export default CommandBox;
