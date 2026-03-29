import { memo, useEffect, useState, useRef, useCallback } from "react";
import { toast } from "@/hooks/use-toast";

interface SkillBarProps {
	skill: string;
	level: number;
	delay?: number;
}

const SkillBar = memo(({ skill, level, delay = 0 }: SkillBarProps) => {
	const [width, setWidth] = useState(0);
	const [displayLevel, setDisplayLevel] = useState(0);
	const [shaking, setShaking] = useState(false);
	const ref = useRef<HTMLDivElement>(null);
	const dragRef = useRef(false);

	useEffect(() => {
		const observer = new IntersectionObserver(
			([entry]) => {
				if (entry.isIntersecting) {
					setTimeout(() => {
						setWidth(level);
						let current = 0;
						const step = level / 30;
						const counter = setInterval(() => {
							current = Math.min(current + step, level);
							setDisplayLevel(Math.round(current));
							if (current >= level) clearInterval(counter);
						}, 30);
					}, delay * 1000);
					observer.disconnect();
				}
			},
			{ threshold: 0.1 },
		);

		if (ref.current) observer.observe(ref.current);
		return () => observer.disconnect();
	}, [level, delay]);

	const handleDragStart = useCallback(
		(e: React.MouseEvent | React.TouchEvent) => {
			e.preventDefault();
			dragRef.current = true;

			const handleUp = () => {
				if (dragRef.current) {
					dragRef.current = false;
					setShaking(true);
					setTimeout(() => setShaking(false), 500);
					toast({
						title: "Nice try, script kiddie.",
						description: "Skills can't be hacked. They're earned.",
					});
				}
				window.removeEventListener("mouseup", handleUp);
				window.removeEventListener("touchend", handleUp);
			};

			window.addEventListener("mouseup", handleUp);
			window.addEventListener("touchend", handleUp);
		},
		[],
	);

	return (
		<div className="space-y-1.5 sm:space-y-2" ref={ref}>
			<div className="flex items-center justify-between text-xs sm:text-sm">
				<span className="font-body font-medium text-foreground">
					{skill}
				</span>
				<span className="glow-text-accent font-mono text-[11px] text-accent">
					{displayLevel}%
				</span>
			</div>
			<div
				className={`glass-subtle h-2 cursor-grab overflow-hidden rounded-full bg-muted/30 active:cursor-grabbing sm:h-2.5 ${shaking ? "ee-skill-shake" : ""}`}
				onMouseDown={handleDragStart}
				onTouchStart={handleDragStart}
			>
				<div
					className="relative h-full rounded-full bg-gradient-to-r from-primary via-accent to-secondary transition-all duration-1000 ease-out"
					style={{
						width: `${width}%`,
						boxShadow:
							width > 0
								? "0 0 20px hsl(var(--primary) / 0.6), 0 0 40px hsl(var(--accent) / 0.3)"
								: "none",
					}}
				>
					{width > 0 && (
						<div className="absolute bottom-0 right-0 top-0 w-4 rounded-full bg-gradient-to-r from-transparent to-primary-foreground/20" />
					)}
				</div>
			</div>
		</div>
	);
});

SkillBar.displayName = "SkillBar";

export default SkillBar;
