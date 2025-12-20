import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

const JinwooEasterEgg = () => {
	const [active, setActive] = useState(false);
	const [showText, setShowText] = useState(false);
	const [input, setInput] = useState("");
	const [tapCount, setTapCount] = useState(0);
	const audioRef = useRef<HTMLAudioElement | null>(null);
	const tapTimeoutRef = useRef<NodeJS.Timeout | null>(null);

	// Detect "jinwoo" typed on desktop
	useEffect(() => {
		function handleKey(e: KeyboardEvent) {
			setInput((prev) => {
				const next = (prev + e.key.toLowerCase()).slice(-7);
				if (next.includes("jinwoo") || next.includes("jin woo")) {
					activateEasterEgg();
				}
				return next;
			});
		}
		window.addEventListener("keydown", handleKey);
		return () => window.removeEventListener("keydown", handleKey);
	}, []);

	// Detect multiple taps on mobile
	useEffect(() => {
		function handleTap() {
			setTapCount((prev) => {
				const newCount = prev + 1;
				if (newCount === 1) {
					if (tapTimeoutRef.current) {
						clearTimeout(tapTimeoutRef.current);
					}
					tapTimeoutRef.current = setTimeout(
						() => setTapCount(0),
						3000,
					);
				}
				if (newCount >= 5) {
					if (tapTimeoutRef.current) {
						clearTimeout(tapTimeoutRef.current);
					}
					setTapCount(0);
					activateEasterEgg();
				}
				return newCount;
			});
		}
		window.addEventListener("touchstart", handleTap);
		return () => window.removeEventListener("touchstart", handleTap);
	}, []);

	function activateEasterEgg() {
		setActive(true);
		setShowText(true);
		setTimeout(() => setShowText(false), 5000);
	}

	// Handle audio playback
	useEffect(() => {
		if (active) {
			if (!audioRef.current) {
				const audio = new Audio(
					"https://cdn.onslaught2342.qzz.io/assets/audio/music/aura.m4a",
				);
				audio.loop = true;
				audio.volume = 0.4;
				audio
					.play()
					.catch((err) => console.warn("Audio blocked:", err));
				audioRef.current = audio;
			}
		} else {
			if (audioRef.current) {
				audioRef.current.pause();
				audioRef.current = null;
			}
		}
	}, [active]);

	if (!active) return null;

	return (
		<>
			{/* Looping aura video */}
			<video
				autoPlay
				loop
				muted
				playsInline
				className="pointer-events-none fixed left-0 top-0 z-[4] h-screen w-screen object-cover opacity-50"
			>
				<source
					src="https://cdn.onslaught2342.qzz.io/assets/videos/wallpapers/aura.mp4"
					type="video/mp4"
				/>
			</video>

			{/* Full-screen awakening overlay */}
			<AnimatePresence>
				{showText && (
					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						transition={{ duration: 1.2 }}
						className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-black/90 backdrop-blur-3xl"
					>
						<motion.h1
							initial={{ scale: 0.8, opacity: 0 }}
							animate={{ scale: 1.05, opacity: 1 }}
							exit={{ scale: 0.9, opacity: 0 }}
							transition={{ duration: 1.5, ease: "easeOut" }}
							className="px-4 text-center text-5xl font-extrabold tracking-widest text-primary drop-shadow-[0_0_40px_hsl(var(--primary))] md:text-8xl"
						>
							Awaken, Shadow Monarch
						</motion.h1>

						<motion.p
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							exit={{ opacity: 0 }}
							transition={{ delay: 1.5, duration: 1.2 }}
							className="mt-6 text-2xl italic tracking-wide text-muted-foreground drop-shadow-[0_0_20px_hsl(var(--primary))] md:text-4xl"
						>
							"Arise."
						</motion.p>
					</motion.div>
				)}
			</AnimatePresence>
		</>
	);
};

export default JinwooEasterEgg;
