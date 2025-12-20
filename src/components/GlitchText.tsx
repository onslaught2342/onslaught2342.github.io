import { useState, useEffect } from "react";
import { motion } from "framer-motion";

interface GlitchTextProps {
	text: string;
	className?: string;
}

const GlitchText = ({ text, className = "" }: GlitchTextProps) => {
	const [glitchIndex, setGlitchIndex] = useState<number | null>(null);

	useEffect(() => {
		const interval = setInterval(() => {
			if (Math.random() > 0.7) {
				const randomIndex = Math.floor(Math.random() * text.length);
				setGlitchIndex(randomIndex);
				setTimeout(() => setGlitchIndex(null), 100);
			}
		}, 200);

		return () => clearInterval(interval);
	}, [text]);

	return (
		<span className={`relative inline-block ${className}`}>
			{text.split("").map((char, i) => (
				<motion.span
					key={i}
					className="inline-block"
					animate={
						glitchIndex === i
							? {
									x: [0, -2, 2, -1, 1, 0],
									opacity: [1, 0.5, 1],
									color: [
										"hsl(var(--primary))",
										"hsl(var(--accent))",
										"hsl(var(--primary))",
									],
								}
							: {}
					}
					transition={{ duration: 0.1 }}
					style={{
						textShadow:
							glitchIndex === i
								? "2px 0 hsl(var(--accent)), -2px 0 hsl(var(--destructive))"
								: undefined,
					}}
				>
					{char === " " ? "\u00A0" : char}
				</motion.span>
			))}

			{/* Glitch overlay layers */}
			<span
				className="pointer-events-none absolute inset-0 text-accent opacity-0"
				style={{
					clipPath: "inset(10% 0 85% 0)",
					transform: "translateX(2px)",
					animation:
						"glitch-clip 3s infinite linear alternate-reverse",
				}}
				aria-hidden="true"
			>
				{text}
			</span>
		</span>
	);
};

export default GlitchText;
