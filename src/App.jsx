import React from "react";
import { motion } from "framer-motion";
import "./index.css";
import MatrixBackground from "./components/MatrixBackground";
import Animated3DSection from "./components/Animated3DSection";
import TechCategory from "./components/TechCategory";

export default function App() {
	return (
		<div className="relative bg-black text-white min-h-screen font-sans overflow-hidden">
			<MatrixBackground />

			<header className="relative z-10 p-10 text-center bg-black bg-opacity-80 shadow-md border-b border-gray-800 backdrop-blur-sm">
				<motion.h1
					initial={{ opacity: 0, y: -50 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 1.2, ease: "easeOut" }}
					className="text-4xl md:text-5xl font-bold text-white tracking-tight"
				>
					Onslaught2342 — Cybersecurity & Systems Architect
				</motion.h1>
				<motion.p
					initial={{ opacity: 0, y: -20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ delay: 0.4, duration: 1 }}
					className="mt-4 text-base md:text-lg text-gray-400 max-w-2xl mx-auto"
				>
					working
				</motion.p>
			</header>

			<main className="relative z-10 px-6 md:px-10 py-12 space-y-24 max-w-5xl mx-auto">
				<Animated3DSection title="About Me">
					<p className="text-gray-300">
						I’m a CAIE student with a strong focus on cybersecurity, modern IT
						architecture, and ethical hacking. I blend security research with
						hands-on system engineering to build secure, scalable, and
						privacy-focused solutions.
					</p>
					<ul className="list-disc list-inside mt-4 text-gray-400">
						<li>Zero-trust architecture and endpoint hardening</li>
						<li>Custom encryption workflows and in-house crypto tools</li>
						<li>Security-first infrastructure for critical applications</li>
					</ul>
				</Animated3DSection>

				<Animated3DSection title="Technical Expertise">
					<TechCategory title="Programming & Automation">
						Python, Bash, JavaScript (ongoing), C++ (ongoing); automation in
						Linux environments.
					</TechCategory>
					<TechCategory title="Cybersecurity & Encryption">
						Penetration testing, RSA/AES encryption, network security, VPNs,
						IAM.
					</TechCategory>
					<TechCategory title="Infrastructure & DevOps">
						Active Directory, backups, containerization (Docker), Kasm, WSL, and
						self-hosted services.
					</TechCategory>
					<TechCategory title="Web & UI/UX">
						Frontend with HTML/CSS/Tailwind, plus visual tools like Canva and
						Adobe for design.
					</TechCategory>
				</Animated3DSection>

				<Animated3DSection title="Projects & Innovations">
					<ul className="list-disc list-inside space-y-2 text-gray-400">
						<li>Custom hybrid encryption tool using AES + RSA with UI</li>
						<li>Self-hosted browser stack and tracker-free search setup</li>
						<li>Disaster recovery & backup automation with versioning</li>
						<li>Exploit research, reverse engineering, and red teaming labs</li>
					</ul>
				</Animated3DSection>

				<Animated3DSection title="Future Goals">
					<ul className="list-disc list-inside space-y-2 text-gray-400">
						<li>Earn advanced certifications (e.g., OSCP, CEH)</li>
						<li>Design an enterprise-grade zero-trust network model</li>
						<li>Contribute to open-source cybersecurity initiatives</li>
					</ul>
				</Animated3DSection>
			</main>

			<footer className="relative z-10 text-center text-gray-500 p-6 border-t border-gray-800">
				©Onslaught2342— Built with React, TailwindCSS & Framer Motion
			</footer>
		</div>
	);
}
