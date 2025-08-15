import React, { useState } from "react";
import { motion } from "framer-motion";
import "./index.css";
import LandingScreen from "./components/LandingScreen";
import MatrixBackground from "./components/MatrixBackground";
import Animated3DSection from "./components/Animated3DSection";
import TechCategory from "./components/TechCategory";

export default function App() {
	const [loading, setLoading] = useState(true);

	return (
		<>
			{loading && <LandingScreen onFinish={() => setLoading(false)} />}
			{!loading && (
				<div className="relative bg-black text-white min-h-screen font-sans overflow-hidden">
					<MatrixBackground />

					<header className="relative z-10 p-10 text-center bg-gradient-to-b from-black via-black to-transparent shadow-md border-b border-gray-800">
						<motion.h1
							initial={{ opacity: 0, y: -30 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 1.2, ease: "easeOut" }}
							className="text-4xl md:text-5xl font-bold tracking-tight text-green-400"
							style={{
								textShadow: "0 0 10px rgba(0,255,0,0.6)",
							}}
						>
							Onslaught2342 — Tech Hobbyist
						</motion.h1>

						<motion.p
							initial={{ opacity: 0, y: 10 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ delay: 0.4, duration: 1 }}
							className="mt-4 text-base md:text-lg text-gray-300"
							style={{
								textShadow: "0 0 6px rgba(0,255,0,0.3)",
							}}
						>
							Just a 15-year-old messing around with code, hacking (the ethical
							kind), and building random tech experiments at 2 AM.
						</motion.p>
					</header>

					<main className="relative z-10 px-6 md:px-10 py-12 space-y-24 max-w-5xl mx-auto">
						<Animated3DSection title="About Me">
							<motion.p
								initial={{ opacity: 0, y: 20 }}
								whileInView={{ opacity: 1, y: 0 }}
								transition={{ duration: 0.8 }}
								className="text-gray-300"
							>
								I’m a CAIE student who’s way too interested in how computers
								work. I spend my free time learning cybersecurity, testing out
								ideas, and sometimes breaking my own systems just to fix them
								again.
							</motion.p>
							<ul className="list-disc list-inside mt-4 text-gray-400 space-y-1">
								<li>Messing with zero-trust setups on my laptop</li>
								<li>Making my own encryption tools for fun</li>
								<li>Hosting services at home just to see if I can</li>
							</ul>
						</Animated3DSection>

						<Animated3DSection title="Tech Stuff I Play With">
							<TechCategory title="Programming & Automation">
								Python (main), Bash scripts, and currently figuring out
								JavaScript & C++. Automating small things on Linux just because
								I can.
							</TechCategory>
							<TechCategory title="Cybersecurity & Encryption">
								Ethical hacking basics, AES/RSA encryption, messing with VPNs,
								and securing my own stuff.
							</TechCategory>
							<TechCategory title="Infrastructure & DevOps">
								Experimenting with Docker, WSL, backups, and random self-hosted
								projects.
							</TechCategory>
							<TechCategory title="Web & Design">
								Basic frontend with HTML/Tailwind, and using Canva/Adobe when I
								want it to look less ugly.
							</TechCategory>
						</Animated3DSection>

						<Animated3DSection title="Things I’ve Built / Broken">
							<ul className="list-disc list-inside space-y-2 text-gray-400">
								<li>Hybrid encryption app with AES + RSA and a basic GUI</li>
								<li>Self-hosted browser & tracker-free search setup</li>
								<li>Backup scripts that actually saved my files once</li>
								<li>Random exploits tested in my own lab setup</li>
							</ul>
						</Animated3DSection>

						<Animated3DSection title="Next On My List">
							<ul className="list-disc list-inside space-y-2 text-gray-400">
								<li>Get OSCP or CEH (yeah, big goals)</li>
								<li>Build a proper home lab with more security layers</li>
								<li>Help in open-source cybersecurity projects</li>
							</ul>
						</Animated3DSection>
					</main>

					<footer className="relative z-10 text-center text-gray-500 p-6 border-t border-gray-800">
						© {new Date().getFullYear()} Onslaught2342 — Built with React,
						TailwindCSS & Framer Motion
					</footer>
				</div>
			)}
		</>
	);
}
