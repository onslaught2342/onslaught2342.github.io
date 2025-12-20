import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Terminal from "@/components/Terminal";
import Portfolio from "@/components/Portfolio";

const Index = () => {
	const [showTerminal, setShowTerminal] = useState(true);

	const handleTerminalComplete = () => {
		setShowTerminal(false);
	};

	const handleSkip = () => {
		if (showTerminal) {
			setShowTerminal(false);
		}
	};

	// Allow skipping the terminal with any key press
	useEffect(() => {
		window.addEventListener("keydown", handleSkip);
		return () => window.removeEventListener("keydown", handleSkip);
	}, [showTerminal]);

	return (
		<div onClick={showTerminal ? handleSkip : undefined}>
			<AnimatePresence mode="wait">
				{showTerminal ? (
					<motion.div
						key="terminal"
						exit={{ opacity: 0, scale: 0.98 }}
						transition={{ duration: 0.4 }}
					>
						<Terminal onComplete={handleTerminalComplete} />
					</motion.div>
				) : (
					<motion.div
						key="portfolio"
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						transition={{ duration: 0.5 }}
					>
						<Portfolio />
					</motion.div>
				)}
			</AnimatePresence>
		</div>
	);
};

export default Index;
