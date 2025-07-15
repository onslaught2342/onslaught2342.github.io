import React, { useEffect } from "react";

export default function MatrixBackground() {
	useEffect(() => {
		const canvas = document.getElementById("matrixCanvas");
		const ctx = canvas.getContext("2d");
		canvas.width = window.innerWidth;
		canvas.height = window.innerHeight;

		const chars = "01".split("");
		const fontSize = 14;
		const columns = canvas.width / fontSize;
		const drops = Array.from({ length: columns }, () => 1);

		function draw() {
			ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
			ctx.fillRect(0, 0, canvas.width, canvas.height);
			ctx.fillStyle = "#0f0";
			ctx.font = fontSize + "px monospace";

			for (let i = 0; i < drops.length; i++) {
				const text = chars[Math.floor(Math.random() * chars.length)];
				ctx.fillText(text, i * fontSize, drops[i] * fontSize);

				if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
					drops[i] = 0;
				}
				drops[i]++;
			}
		}

		const interval = setInterval(draw, 35);
		return () => clearInterval(interval);
	}, []);

	return (
		<canvas
			id="matrixCanvas"
			className="fixed inset-0 z-0 pointer-events-none"
		/>
	);
}
