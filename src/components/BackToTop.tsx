import { useState, useEffect, memo } from "react";
import { ArrowUp } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const BackToTop = memo(() => {
	const [visible, setVisible] = useState(false);

	useEffect(() => {
		const onScroll = () => setVisible(window.scrollY > 400);
		window.addEventListener("scroll", onScroll, { passive: true });
		return () => window.removeEventListener("scroll", onScroll);
	}, []);

	return (
		<AnimatePresence>
			{visible && (
				<motion.button
					initial={{ opacity: 0, scale: 0.8 }}
					animate={{ opacity: 1, scale: 1 }}
					exit={{ opacity: 0, scale: 0.8 }}
					transition={{ duration: 0.2 }}
					onClick={() =>
						window.scrollTo({ top: 0, behavior: "smooth" })
					}
					className="glass group fixed bottom-6 right-6 z-50 rounded-xl border border-primary/30 p-3 transition-all duration-300 hover:border-primary/60 hover:shadow-[0_0_25px_hsl(var(--primary)/0.3)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary active:scale-90"
					aria-label="Back to top"
				>
					<ArrowUp className="h-5 w-5 text-primary transition-colors group-hover:text-accent" />
				</motion.button>
			)}
		</AnimatePresence>
	);
});

BackToTop.displayName = "BackToTop";
export default BackToTop;
