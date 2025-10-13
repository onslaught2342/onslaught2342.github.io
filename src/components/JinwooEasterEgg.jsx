import React, { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function JinwooEasterEgg() {
	const [active, setActive] = useState(false);
	const [showText, setShowText] = useState(false);
	const [input, setInput] = useState("");
	const [tapCount, setTapCount] = useState(0);
	const audioRef = useRef(null);
	const tapTimeoutRef = useRef(null);

	// Detect "jinwoo" typed on desktop
	useEffect(() => {
		function handleKey(e) {
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
					clearTimeout(tapTimeoutRef.current);
					tapTimeoutRef.current = setTimeout(() => setTapCount(0), 3000); // reset after 3s
				}
				if (newCount >= 5) {
					clearTimeout(tapTimeoutRef.current);
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
					"https://cdn.onslaught2342.qzz.io/assets/aura.m4a"
				);
				audio.loop = true;
				audio.volume = 0.4;
				audio.play().catch((err) => console.warn("Audio blocked:", err));
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
				className="fixed top-0 left-0 w-screen h-screen object-cover opacity-50 z-[4] pointer-events-none"
			>
				<source
					src="https://cdn.onslaught2342.qzz.io/assets/aura.mp4"
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
						className="fixed inset-0 flex flex-col items-center justify-center z-[9999] bg-black/90 backdrop-blur-3xl"
					>
						<motion.h1
							initial={{ scale: 0.8, opacity: 0 }}
							animate={{ scale: 1.05, opacity: 1 }}
							exit={{ scale: 0.9, opacity: 0 }}
							transition={{ duration: 1.5, ease: "easeOut" }}
							className="text-5xl md:text-8xl font-extrabold text-green-400 tracking-widest drop-shadow-[0_0_40px_#00ff00] text-center px-4"
						>
							Awaken, Shadow Monarch
						</motion.h1>

						<motion.p
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							exit={{ opacity: 0 }}
							transition={{ delay: 1.5, duration: 1.2 }}
							className="mt-6 text-2xl md:text-4xl text-gray-200 italic tracking-wide drop-shadow-[0_0_20px_#00ff00]"
						>
							“Arise.”
						</motion.p>
					</motion.div>
				)}
			</AnimatePresence>
		</>
	);
}
