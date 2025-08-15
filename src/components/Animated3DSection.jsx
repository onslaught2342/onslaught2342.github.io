import React from "react";
import { motion } from "framer-motion";

export default function Animated3DSection({ title, children }) {
	return (
		<motion.section
			initial={{ opacity: 0, y: 120, scale: 0.95, rotateX: -15 }}
			whileInView={{ opacity: 1, y: 0, scale: 1, rotateX: 0 }}
			viewport={{ once: true, amount: 0.3 }}
			transition={{ duration: 1, type: "spring", stiffness: 80 }}
			className="transform-gpu bg-gradient-to-br from-black/60 to-gray-900/60 p-8 rounded-3xl shadow-2xl hover:scale-[1.02] backdrop-blur-md border border-gray-800"
		>
			<h2 className="text-3xl font-bold text-green-400 mb-4 border-b border-green-700 pb-2">
				{title}
			</h2>
			<div className="text-lg leading-relaxed">{children}</div>
		</motion.section>
	);
}
