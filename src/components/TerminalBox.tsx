import { motion } from "framer-motion";
import { ReactNode } from "react";

interface TerminalBoxProps {
	children: ReactNode;
	className?: string;
	glow?: boolean;
	onClick?: () => void;
}

const TerminalBox = ({
	children,
	className = "",
	glow = false,
	onClick,
}: TerminalBoxProps) => {
	return (
		<motion.div
			whileHover={{
				boxShadow:
					"0 0 30px hsl(var(--primary) / 0.4), inset 0 0 20px hsl(var(--primary) / 0.1)",
				borderColor: "hsl(var(--primary))",
			}}
			transition={{ duration: 0.3 }}
			onClick={onClick}
			className={`relative overflow-hidden rounded-lg border border-border bg-card/60 backdrop-blur-sm ${glow ? "animate-glow-pulse" : "shadow-[0_0_15px_hsl(var(--primary)/0.2)]"} ${onClick ? "cursor-pointer" : ""} ${className} `}
		>
			{/* Corner decorations */}
			<div className="absolute left-0 top-0 h-4 w-4 rounded-tl-lg border-l-2 border-t-2 border-primary" />
			<div className="absolute right-0 top-0 h-4 w-4 rounded-tr-lg border-r-2 border-t-2 border-primary" />
			<div className="absolute bottom-0 left-0 h-4 w-4 rounded-bl-lg border-b-2 border-l-2 border-primary" />
			<div className="absolute bottom-0 right-0 h-4 w-4 rounded-br-lg border-b-2 border-r-2 border-primary" />

			{/* Scanline overlay */}
			<div className="scanline pointer-events-none absolute inset-0" />

			<div className="relative z-10">{children}</div>
		</motion.div>
	);
};

export default TerminalBox;
