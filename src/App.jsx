import React, { useEffect } from "react";
import { motion } from "framer-motion";
import "./index.css";

export default function App() {
	return (
		<div className="relative bg-black text-white min-h-screen font-sans overflow-hidden">
			<MatrixBackground />

			<header className="relative z-10 p-6 text-center bg-black bg-opacity-80 shadow-lg border-b border-gray-800">
				<motion.h1
					initial={{ y: -100, opacity: 0 }}
					animate={{ y: 0, opacity: 1 }}
					transition={{ duration: 1 }}
					className="text-5xl font-extrabold text-white tracking-wide drop-shadow-lg"
				>
					🚀 Onslaught2342 - Cybersecurity Enthusiast
				</motion.h1>
				<motion.p
					initial={{ y: -50, opacity: 0 }}
					animate={{ y: 0, opacity: 1 }}
					transition={{ delay: 0.5, duration: 1 }}
					className="mt-2 text-xl text-gray-400"
				>
					Building enterprise IT and breaking things ethically 😎
				</motion.p>
			</header>

			<main className="relative z-10 p-8 space-y-20 max-w-6xl mx-auto">
				<Animated3DSection title="🚀 About Me">
					<p className="text-gray-300">
						I’m a <strong>CAIE student</strong> with a hacker mindset. Obsessed
						with{" "}
						<strong>
							cybersecurity, IT infrastructure, and ethical hacking
						</strong>
						. I design robust systems, build secure tools, and explore how to
						break them — all in the name of defense 🔐.
					</p>
					<ul className="list-disc list-inside mt-4 text-gray-400">
						<li>
							<strong>Exploring:</strong> Cryptography, PenTesting, Advanced
							Networking
						</li>
						<li>
							<strong>Building:</strong> Encryption Algorithms, IAM, VPNs
						</li>
						<li>
							<strong>Experimenting:</strong> Self-hosted search engines, Secure
							OS setups
						</li>
					</ul>
				</Animated3DSection>

				<Animated3DSection title="💻 Tech Stack">
					<TechCategory title="🖥 Programming">
						Python, Bash, C++ (learning), JavaScript (learning)
					</TechCategory>
					<TechCategory title="🔐 Cybersecurity">
						PenTesting, Encryption (AES/RSA), IAM, VPNs
					</TechCategory>
					<TechCategory title="🏢 Enterprise IT">
						Active Directory, Load Balancing, DR, Secure Infra
					</TechCategory>
					<TechCategory title="☁️ DevOps & Virtualization">
						Docker, Kasm, WSL, Linux Admin, Private Clouds
					</TechCategory>
					<TechCategory title="🎨 Creative">
						Web Design (HTML/CSS/JS), Canva, Adobe CC
					</TechCategory>
				</Animated3DSection>

				<Animated3DSection title="🔥 Projects & Interests">
					<ul className="list-disc list-inside space-y-2 text-gray-400">
						<li>Encryption tools (AES + RSA), data obfuscation</li>
						<li>Privacy tech – custom browser, VPN</li>
						<li>Disaster recovery & secure backups</li>
						<li>Network vulnerability & reverse engineering</li>
					</ul>
				</Animated3DSection>

				<Animated3DSection title="📈 Goals">
					<ul className="list-disc list-inside space-y-2 text-gray-400">
						<li>Master red team skills and get certified</li>
						<li>Build full-stack secure self-hosted ecosystem</li>
						<li>Contribute to open-source cybersecurity</li>
					</ul>
				</Animated3DSection>
			</main>

			<footer className="relative z-10 text-center text-gray-500 p-6 border-t border-gray-800">
				Made with 🔐 by Onslaught2342 | React ⚛ + Tailwind 💨 + Motion 🎬
			</footer>
		</div>
	);
}

function Animated3DSection({ title, children }) {
	return (
		<motion.section
			initial={{ opacity: 0, y: 100, rotateX: -45 }}
			whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
			viewport={{ once: true }}
			transition={{ duration: 0.8, type: "spring", bounce: 0.4 }}
			className="transform-gpu transition-transform duration-1000 bg-black bg-opacity-60 p-6 rounded-2xl shadow-2xl hover:scale-105 backdrop-blur-md border border-gray-800"
		>
			<h2 className="text-3xl font-bold text-green-400 mb-4 border-b border-green-700 pb-2">
				{title}
			</h2>
			<div className="text-lg leading-relaxed">{children}</div>
		</motion.section>
	);
}

function TechCategory({ title, children }) {
	return (
		<div className="mb-6">
			<h3 className="text-xl font-semibold text-green-300 mb-1">{title}</h3>
			<p className="ml-4 text-gray-300">{children}</p>
		</div>
	);
}

function MatrixBackground() {
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
