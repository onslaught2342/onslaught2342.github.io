import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import {
	ArrowLeft,
	Download,
	GraduationCap,
	Award,
	Shield,
	Code,
	Server,
	Cloud,
} from "lucide-react";
import { motion } from "framer-motion";
import MatrixBackground from "@/components/MatrixBackground";
import ScanlineEffect from "@/components/ScanlineEffect";
import GlitchText from "@/components/GlitchText";
import BackToTop from "@/components/BackToTop";
import ThemeToggle from "@/components/ThemeToggle";
import SkillBar from "@/components/SkillBar";
import CommandPalette from "@/components/CommandPalette";

const education = [
	{
		period: "Present",
		title: "Cambridge Assessment International Education (CAIE)",
		description:
			"Currently pursuing IGCSE/O-Level studies with focus on Computer Science, Mathematics, and Sciences.",
		status: "IN_PROGRESS",
	},
];

const certifications = [
	{
		name: "Security Certifications",
		status: "PLANNED",
		note: "Targeting CompTIA Security+ and CEH",
	},
	{
		name: "Cloud & DevOps",
		status: "PLANNED",
		note: "AWS / Azure fundamentals",
	},
];

const skills = [
	{ skill: "Python", level: 95 },
	{ skill: "Cybersecurity", level: 85 },
	{ skill: "Linux / DevOps", level: 90 },
	{ skill: "Encryption", level: 80 },
	{ skill: "Networking", level: 75 },
	{ skill: "Web Development", level: 70 },
];

const techHighlights = [
	{ icon: Shield, label: "Pen Testing & Vulnerability Assessment" },
	{ icon: Code, label: "Python, Bash, C++, JavaScript" },
	{ icon: Server, label: "Active Directory, SSO, Self-Hosting" },
	{ icon: Cloud, label: "Docker, Kasm, WSL, CI/CD" },
];

const fadeUp = (delay = 0) => ({
	initial: { opacity: 0, y: 24 },
	whileInView: { opacity: 1, y: 0 },
	viewport: { once: true },
	transition: { duration: 0.5, delay },
});

const Resume = () => (
	<div className="relative min-h-screen overflow-x-hidden bg-background">
		<Helmet>
			<title>Resume | Onslaught2342</title>
			<meta
				name="description"
				content="Resume and skills of Onslaught2342 — cybersecurity, ethical hacking, and software development."
			/>
			<meta property="og:title" content="Resume | Onslaught2342" />
		</Helmet>
		<MatrixBackground />
		<ScanlineEffect />
		<BackToTop />
		<CommandPalette />

		<header className="glass sticky top-0 z-40 border-b border-border/20">
			<div className="mx-auto flex max-w-6xl items-center justify-between px-3 py-3 sm:px-6 sm:py-4">
				<Link
					to="/"
					className="flex items-center gap-2 font-mono text-sm text-muted-foreground transition-colors hover:text-primary"
				>
					<ArrowLeft className="h-4 w-4" />
					<span>cd ..</span>
				</Link>
				<div className="flex items-center gap-2">
					<a
						href="#"
						className="glass-subtle flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 font-mono text-[10px] text-muted-foreground transition-all hover:border-primary/40 hover:text-primary sm:text-xs"
						aria-label="Download resume"
					>
						<Download className="h-3.5 w-3.5" />
						<span className="hidden sm:inline">Resume.pdf</span>
					</a>
					<ThemeToggle />
				</div>
			</div>
		</header>

		<main className="relative z-10 mx-auto max-w-4xl space-y-8 px-3 py-8 sm:space-y-12 sm:px-6 sm:py-12">
			{/* Title */}
			<motion.div {...fadeUp()}>
				<h1 className="mb-2 font-display text-2xl font-bold text-foreground sm:text-4xl">
					<GlitchText text="RESUME" intensity="low" />
				</h1>
				<p className="font-mono text-sm text-muted-foreground/60">
					$ cat /home/onslaught/resume.md
				</p>
			</motion.div>

			{/* Education Timeline */}
			<motion.section
				className="glass-intense rounded-2xl p-6 sm:p-8"
				{...fadeUp(0.1)}
			>
				<h2 className="mb-6 flex items-center gap-2 font-display text-sm text-foreground sm:text-base">
					<GraduationCap className="h-5 w-5 text-primary" />
					<GlitchText text="EDUCATION" intensity="low" />
				</h2>
				<div className="space-y-4">
					{education.map((edu, i) => (
						<motion.div
							key={edu.title}
							className="relative border-l-2 border-primary/30 pl-6"
							initial={{ opacity: 0, x: -20 }}
							whileInView={{ opacity: 1, x: 0 }}
							viewport={{ once: true }}
							transition={{ duration: 0.4, delay: 0.2 + i * 0.1 }}
						>
							<div className="absolute -left-[7px] top-1 h-3 w-3 rounded-full bg-primary shadow-[0_0_10px_hsl(var(--primary)/0.5)]" />
							<div className="mb-1 flex flex-col gap-1 sm:flex-row sm:items-center sm:gap-3">
								<span className="font-mono text-xs text-primary">
									{edu.period}
								</span>
								<span
									className={`rounded-full px-2 py-0.5 font-mono text-[10px] ${
										edu.status === "IN_PROGRESS"
											? "bg-accent/10 text-accent"
											: "bg-muted/20 text-muted-foreground"
									}`}
								>
									[{edu.status}]
								</span>
							</div>
							<h3 className="font-body text-sm font-semibold text-foreground sm:text-base">
								{edu.title}
							</h3>
							<p className="mt-1 font-body text-xs text-muted-foreground/60">
								{edu.description}
							</p>
						</motion.div>
					))}
				</div>
			</motion.section>

			{/* Skills Matrix */}
			<motion.section
				className="glass-intense rounded-2xl p-6 sm:p-8"
				{...fadeUp(0.15)}
			>
				<h2 className="mb-6 flex items-center gap-2 font-display text-sm text-foreground sm:text-base">
					<Code className="h-5 w-5 text-accent" />
					<GlitchText text="SKILLS MATRIX" intensity="low" />
				</h2>
				<div className="space-y-4">
					{skills.map((s, i) => (
						<motion.div
							key={s.skill}
							initial={{ opacity: 0, x: -16 }}
							whileInView={{ opacity: 1, x: 0 }}
							viewport={{ once: true }}
							transition={{
								duration: 0.35,
								delay: 0.2 + i * 0.08,
							}}
						>
							<SkillBar
								skill={s.skill}
								level={s.level}
								delay={i * 0.1}
							/>
						</motion.div>
					))}
				</div>
			</motion.section>

			{/* Tech Highlights */}
			<div className="grid gap-3 sm:grid-cols-2 sm:gap-4">
				{techHighlights.map((item, i) => (
					<motion.div
						key={item.label}
						className="glass-subtle flex items-start gap-3 rounded-xl p-4 transition-all duration-500 hover:border-primary/30 hover:shadow-[0_0_20px_hsl(var(--primary)/0.1)]"
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}
						transition={{ duration: 0.4, delay: i * 0.1 }}
					>
						<item.icon className="mt-0.5 h-5 w-5 flex-shrink-0 text-accent" />
						<span className="font-body text-xs text-muted-foreground sm:text-sm">
							{item.label}
						</span>
					</motion.div>
				))}
			</div>

			{/* Certifications */}
			<motion.section
				className="glass-intense rounded-2xl p-6 sm:p-8"
				{...fadeUp(0.1)}
			>
				<h2 className="mb-6 flex items-center gap-2 font-display text-sm text-foreground sm:text-base">
					<Award className="h-5 w-5 text-secondary" />
					<GlitchText text="CERTIFICATIONS" intensity="low" />
				</h2>
				<div className="space-y-3">
					{certifications.map((cert, i) => (
						<motion.div
							key={cert.name}
							className="glass-subtle flex flex-col gap-2 rounded-xl p-3 sm:flex-row sm:items-center sm:justify-between sm:p-4"
							initial={{ opacity: 0, y: 16 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true }}
							transition={{
								duration: 0.4,
								delay: 0.15 + i * 0.1,
							}}
						>
							<div>
								<h3 className="font-body text-sm font-semibold text-foreground">
									{cert.name}
								</h3>
								<p className="font-body text-xs text-muted-foreground/60">
									{cert.note}
								</p>
							</div>
							<span className="self-start rounded-full bg-accent/10 px-2 py-0.5 font-mono text-[10px] text-accent">
								[{cert.status}]
							</span>
						</motion.div>
					))}
				</div>
			</motion.section>
		</main>
	</div>
);

export default Resume;
