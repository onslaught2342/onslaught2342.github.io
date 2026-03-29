import { ReactNode, memo } from "react";

interface TerminalBoxProps {
	children: ReactNode;
	className?: string;
	glow?: boolean;
	onClick?: () => void;
}

const TerminalBox = memo(
	({ children, className = "", glow = false, onClick }: TerminalBoxProps) => {
		return (
			<div
				onClick={onClick}
				className={`glass-intense noise-overlay relative overflow-hidden rounded-xl transition-all duration-500 ease-out ${
					glow
						? "shadow-[0_0_40px_hsl(var(--primary)/0.25),0_0_80px_hsl(var(--accent)/0.1),inset_0_1px_0_hsl(0_0%_100%/0.08)]"
						: "shadow-[0_4px_30px_hsl(var(--primary)/0.1),inset_0_1px_0_hsl(0_0%_100%/0.05)]"
				} hover:shadow-[0_8px_50px_hsl(var(--primary)/0.2),0_0_80px_hsl(var(--accent)/0.1),inset_0_1px_0_hsl(0_0%_100%/0.1)] ${onClick ? "cursor-pointer" : ""} ${className} `}
			>
				{/* Glass highlight at top */}
				<div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />

				{/* Gradient overlay for depth */}
				<div className="to-accent/3 pointer-events-none absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent" />

				{/* Corner accents */}
				<div className="absolute left-0 top-0 h-6 w-6 rounded-tl-xl border-l border-t border-primary/40" />
				<div className="absolute right-0 top-0 h-6 w-6 rounded-tr-xl border-r border-t border-accent/40" />
				<div className="absolute bottom-0 left-0 h-6 w-6 rounded-bl-xl border-b border-l border-accent/40" />
				<div className="absolute bottom-0 right-0 h-6 w-6 rounded-br-xl border-b border-r border-primary/40" />

				<div className="relative z-10">{children}</div>
			</div>
		);
	},
);

TerminalBox.displayName = "TerminalBox";

export default TerminalBox;
