// components/LandingScreen.jsx
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import logo from "../assets/logo.png"; // Change this path to your logo

export default function LandingScreen({ onFinish }) {
	const [show, setShow] = useState(true);

	useEffect(() => {
		const timer = setTimeout(() => {
			setShow(false);
			if (onFinish) onFinish();
		}, 3000); // total animation time
		return () => clearTimeout(timer);
	}, [onFinish]);

	return (
		<AnimatePresence>
			{show && (
				<motion.div
					className="fixed inset-0 flex items-center justify-center bg-black z-50"
					initial={{ opacity: 1 }}
					exit={{ opacity: 0, transition: { duration: 0.6 } }}
				>
					<motion.img
						src={logo}
						alt="Logo"
						className="w-48 h-48"
						initial={{ scale: 0, rotate: 0 }}
						animate={{
							rotate: [0, 360, 720], // 2 spins
							scale: [0, 1.5, 0.8, 1.3, 1], // bounce splat
						}}
						transition={{
							duration: 2,
							ease: "easeOut",
							times: [0, 0.4, 0.6, 0.75, 1],
						}}
					/>
				</motion.div>
			)}
		</AnimatePresence>
	);
}
