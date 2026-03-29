import { memo, useState, useCallback, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import {
	Code,
	Shield,
	Server,
	Github,
	MessageSquare,
	Cloud,
	Palette,
	Network,
	ArrowRight,
	Globe,
	Menu,
} from "lucide-react";
import { Link } from "react-router-dom";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import MatrixBackground from "./MatrixBackground";
import ScanlineEffect from "./ScanlineEffect";
import GlitchText from "./GlitchText";
import CommandBox from "./CommandBox";
import SkillBar from "./SkillBar";
import GoalProgressBar from "./GoalProgressBar";
import ProjectCard from "./ProjectCard";
import JinwooEasterEgg from "./JinwooEasterEgg";
import EasterEggs from "./EasterEggs";
import UptimeCounter from "./UptimeCounter";
import CommandPalette from "./CommandPalette";
import GitHubProjectCard from "./GitHubProjectCard";
import IdleLockScreen from "./IdleLockScreen";
import RepoCardSkeleton from "./RepoCardSkeleton";
import BackToTop from "./BackToTop";
import ThemeToggle from "./ThemeToggle";
import { useFeaturedRepos } from "@/hooks/useGitHubRepos";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

import { toast } from "@/hooks/use-toast";
import logo from "@/assets/logo.png";

gsap.registerPlugin(ScrollTrigger);

const Portfolio = memo(() => {
	const [initialBoxesComplete, setInitialBoxesComplete] = useState(0);
	const [logoGlitch, setLogoGlitch] = useState(false);
	const logoClickRef = useRef(0);
	const logoTimerRef = useRef<NodeJS.Timeout | null>(null);
	const mainRef = useRef<HTMLElement>(null);
	const headerRef = useRef<HTMLElement>(null);

	const { data: featuredRepos, isLoading: reposLoading } =
		useFeaturedRepos(4);

	const handlePriorityComplete = useCallback(() => {
		setInitialBoxesComplete((prev) => prev + 1);
	}, []);

	const canAnimateScrollBoxes = initialBoxesComplete >= 3;

	// GSAP scroll animations
	useEffect(() => {
		if (!canAnimateScrollBoxes) return;

		const ctx = gsap.context(() => {
			// Animate sections sliding in
			gsap.utils
				.toArray<HTMLElement>(".gsap-section")
				.forEach((section, i) => {
					gsap.fromTo(
						section,
						{ y: 60, opacity: 0 },
						{
							y: 0,
							opacity: 1,
							duration: 0.8,
							ease: "power3.out",
							scrollTrigger: {
								trigger: section,
								start: "top 85%",
								end: "top 50%",
								toggleActions: "play none none none",
							},
						},
					);
				});

			// Tech cards stagger
			gsap.utils.toArray<HTMLElement>(".tech-card").forEach((card, i) => {
				gsap.fromTo(
					card,
					{ y: 40, opacity: 0, scale: 0.95 },
					{
						y: 0,
						opacity: 1,
						scale: 1,
						duration: 0.5,
						delay: i * 0.08,
						ease: "back.out(1.2)",
						scrollTrigger: {
							trigger: card,
							start: "top 90%",
							toggleActions: "play none none none",
						},
					},
				);
			});

			// Project cards slide alternating
			gsap.utils
				.toArray<HTMLElement>(".project-card")
				.forEach((card, i) => {
					gsap.fromTo(
						card,
						{ x: i % 2 === 0 ? -40 : 40, opacity: 0 },
						{
							x: 0,
							opacity: 1,
							duration: 0.7,
							ease: "power2.out",
							scrollTrigger: {
								trigger: card,
								start: "top 85%",
								toggleActions: "play none none none",
							},
						},
					);
				});

			// Goal items
			gsap.utils.toArray<HTMLElement>(".goal-item").forEach((item, i) => {
				gsap.fromTo(
					item,
					{ x: -30, opacity: 0 },
					{
						x: 0,
						opacity: 1,
						duration: 0.6,
						delay: i * 0.1,
						ease: "power2.out",
						scrollTrigger: {
							trigger: item,
							start: "top 88%",
							toggleActions: "play none none none",
						},
					},
				);
			});

			// Footer
			const footer = document.querySelector(".gsap-footer");
			if (footer) {
				gsap.fromTo(
					footer,
					{ y: 30, opacity: 0 },
					{
						y: 0,
						opacity: 1,
						duration: 0.8,
						ease: "power2.out",
						scrollTrigger: {
							trigger: footer,
							start: "top 90%",
							toggleActions: "play none none none",
						},
					},
				);
			}

			// Header shrink on scroll
			if (headerRef.current) {
				ScrollTrigger.create({
					start: "top top",
					end: "+=100",
					onUpdate: (self) => {
						if (headerRef.current) {
							const py = gsap.utils.interpolate(
								16,
								8,
								self.progress,
							);
							headerRef.current.style.paddingTop = `${py}px`;
							headerRef.current.style.paddingBottom = `${py}px`;
						}
					},
				});
			}
		}, mainRef);

		return () => ctx.revert();
	}, [canAnimateScrollBoxes]);

	const handleDiscordCopy = useCallback(() => {
		navigator.clipboard.writeText("onslaught2342").then(() => {
			toast({
				title: "Copied!",
				description: "Discord username copied to clipboard",
			});
		});
	}, []);

	const goals = [
		{
			goal: "Master Offensive Security & Obtain Certifications",
			progress: 45,
			difficulty: "EXTREME",
		},
		{
			goal: "Build Highly Secure Self-Hosted IT Ecosystem",
			progress: 70,
			difficulty: "HIGH",
		},
		{
			goal: "Contribute to Open-Source Security Projects",
			progress: 20,
			difficulty: "HIGH",
		},
		{
			goal: "Advanced Exploit Development & Research",
			progress: 35,
			difficulty: "EXTREME",
		},
	];

	const techCategories = [
		{
			title: "Languages",
			items: "Python • Bash • C++ • JavaScript",
			icon: Code,
		},
		{
			title: "Cybersecurity",
			items: "Pen Testing • AES/RSA • IAM • VPN",
			icon: Shield,
		},
		{
			title: "Enterprise IT",
			items: "Active Directory • SSO • DR • LB",
			icon: Server,
		},
		{
			title: "DevOps",
			items: "Docker • Kasm • WSL • Self-Hosting",
			icon: Cloud,
		},
		{
			title: "Network",
			items: "Security Auditing • Tunneling • Privacy",
			icon: Network,
		},
		{
			title: "Creative",
			items: "Canva Pro • Adobe CC • UI/UX",
			icon: Palette,
		},
	];

	return (
		<div className="relative min-h-screen overflow-x-hidden bg-background">
			<MatrixBackground />
			<ScanlineEffect />
			<JinwooEasterEgg />
			<EasterEggs />
			<CommandPalette />
			<BackToTop />
			<IdleLockScreen />

			{/* Header */}
			<header
				ref={headerRef}
				className="glass animate-slide-down sticky top-0 z-40 border-b border-border/20"
			>
				<div className="mx-auto flex max-w-6xl items-center justify-between px-3 py-3 sm:px-6 sm:py-4">
					<div className="flex items-center gap-2 sm:gap-3">
						<div
							className={`h-8 w-8 cursor-pointer overflow-hidden rounded-lg border border-primary/30 shadow-[0_0_20px_hsl(var(--primary)/0.3)] transition-all duration-200 sm:h-10 sm:w-10 ${logoGlitch ? "ee-logo-glitch" : ""}`}
							onClick={() => {
								logoClickRef.current += 1;
								if (logoTimerRef.current)
									clearTimeout(logoTimerRef.current);
								logoTimerRef.current = setTimeout(() => {
									logoClickRef.current = 0;
								}, 3000);
								if (logoClickRef.current >= 10) {
									logoClickRef.current = 0;
									setLogoGlitch(true);
									document.body.classList.add(
										"ee-screen-invert",
									);
									setTimeout(() => {
										setLogoGlitch(false);
										document.body.classList.remove(
											"ee-screen-invert",
										);
									}, 2000);
								}
							}}
						>
							<img
								src={logo}
								alt="Onslaught2342 Logo"
								className="h-full w-full object-cover"
								loading="lazy"
							/>
						</div>
						<span className="font-display text-sm font-bold tracking-wider text-foreground sm:text-xl">
							<GlitchText
								text="./Onslaught2342"
								intensity="low"
							/>
						</span>
					</div>

					{/* Desktop nav */}
					<nav
						className="hidden items-center gap-1 md:flex"
						role="navigation"
						aria-label="Main navigation"
					>
						{[
							{ label: "About", id: "about" },
							{ label: "Skills", id: "skills" },
							{ label: "Repos", id: "repos" },
						].map((link) => (
							<button
								key={link.id}
								onClick={() =>
									document
										.getElementById(link.id)
										?.scrollIntoView({ behavior: "smooth" })
								}
								className="rounded-lg px-3 py-1.5 font-mono text-xs text-muted-foreground transition-colors hover:bg-primary/5 hover:text-primary"
							>
								{link.label}
							</button>
						))}
						<Link
							to="/projects"
							className="rounded-lg px-3 py-1.5 font-mono text-xs text-muted-foreground transition-colors hover:bg-primary/5 hover:text-primary"
						>
							Projects
						</Link>
						<Link
							to="/resume"
							className="rounded-lg px-3 py-1.5 font-mono text-xs text-muted-foreground transition-colors hover:bg-primary/5 hover:text-primary"
						>
							Resume
						</Link>
						<Link
							to="/contact"
							className="rounded-lg px-3 py-1.5 font-mono text-xs text-muted-foreground transition-colors hover:bg-primary/5 hover:text-primary"
						>
							Contact
						</Link>
						<button
							onClick={() =>
								window.dispatchEvent(
									new Event("open-command-palette"),
								)
							}
							className="glass-subtle ml-1 flex items-center gap-1 rounded-lg px-2 py-1 font-mono text-[10px] text-muted-foreground/50 transition-all hover:border-primary/30 hover:text-primary"
							aria-label="Open command palette"
						>
							<kbd className="rounded border border-border/30 px-1 py-0.5 text-[9px]">
								⌘K
							</kbd>
						</button>
						<div className="ml-1">
							<ThemeToggle />
						</div>
					</nav>

					{/* Mobile nav */}
					<div className="flex items-center gap-2 md:hidden">
						<ThemeToggle />
						<Sheet>
							<SheetTrigger asChild>
								<button
									className="glass-subtle rounded-lg p-2 text-muted-foreground transition-colors hover:text-primary"
									aria-label="Menu"
								>
									<Menu className="h-5 w-5" />
								</button>
							</SheetTrigger>
							<SheetContent
								side="right"
								className="glass w-64 border-border/20 p-6"
							>
								<nav
									className="mt-8 flex flex-col gap-1"
									role="navigation"
									aria-label="Mobile navigation"
								>
									<p className="mb-2 px-3 font-mono text-[10px] text-muted-foreground/40">
										$ ls ./pages
									</p>
									{[
										{ label: "About", id: "about" },
										{ label: "Skills", id: "skills" },
										{ label: "Repos", id: "repos" },
									].map((link, i) => (
										<motion.button
											key={link.id}
											initial={{ opacity: 0, x: -16 }}
											animate={{ opacity: 1, x: 0 }}
											transition={{
												delay: 0.1 + i * 0.06,
												duration: 0.3,
											}}
											onClick={() => {
												document
													.getElementById(link.id)
													?.scrollIntoView({
														behavior: "smooth",
													});
											}}
											className="rounded-lg px-3 py-2.5 text-left font-mono text-sm text-muted-foreground transition-colors hover:bg-primary/5 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
										>
											/{link.label.toLowerCase()}
										</motion.button>
									))}
									<div className="my-2 border-t border-border/20" />
									{[
										{ to: "/projects", label: "/projects" },
										{ to: "/resume", label: "/resume" },
										{ to: "/contact", label: "/contact" },
									].map((link, i) => (
										<motion.div
											key={link.to}
											initial={{ opacity: 0, x: -16 }}
											animate={{ opacity: 1, x: 0 }}
											transition={{
												delay: 0.3 + i * 0.06,
												duration: 0.3,
											}}
										>
											<Link
												to={link.to}
												className="block rounded-lg px-3 py-2.5 font-mono text-sm text-muted-foreground transition-colors hover:bg-primary/5 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
											>
												{link.label}
											</Link>
										</motion.div>
									))}
									<div className="my-2 border-t border-border/20" />
									<motion.button
										initial={{ opacity: 0 }}
										animate={{ opacity: 1 }}
										transition={{ delay: 0.5 }}
										onClick={() =>
											window.dispatchEvent(
												new Event(
													"open-command-palette",
												),
											)
										}
										className="flex items-center gap-2 px-3 py-2 text-left font-mono text-[10px] text-muted-foreground/40"
									>
										<kbd className="rounded border border-border/30 px-1.5 py-0.5">
											⌘K
										</kbd>{" "}
										Command Palette
									</motion.button>
								</nav>
							</SheetContent>
						</Sheet>
					</div>
				</div>
			</header>

			<main
				ref={mainRef}
				className="relative z-10 mx-auto max-w-6xl space-y-8 px-3 py-6 sm:space-y-16 sm:px-6 sm:py-12"
			>
				{/* Hero Section */}
				<section>
					<CommandBox
						command="whoami"
						glow
						delay={100}
						priority={true}
						onAnimationComplete={handlePriorityComplete}
					>
						<h1 className="glow-text mb-3 font-display text-2xl font-bold tracking-wide text-foreground sm:mb-4 sm:text-4xl md:text-5xl">
							<GlitchText text="ONSLAUGHT2342" intensity="high" />
						</h1>

						<div className="mb-4 space-y-1.5 font-body text-sm text-muted-foreground sm:mb-6 sm:space-y-2 sm:text-lg">
							<p className="flex items-start gap-2">
								<span className="text-primary">❯</span>
								<span>
									Security Enthusiast |{" "}
									<span className="text-accent">
										Ethical Hacker
									</span>{" "}
									| Code Architect
								</span>
							</p>
							<p className="flex items-start gap-2">
								<span className="text-primary">❯</span>
								<span>
									15y/o CAIE Student | Building at 2 AM |{" "}
									<span className="text-secondary">
										Breaking systems for fun
									</span>
								</span>
							</p>
						</div>

						<div className="flex flex-wrap gap-2">
							{["ETHICAL", "SECURE", "CURIOUS", "RELENTLESS"].map(
								(tag, i) => (
									<span
										key={tag}
										className="glass-subtle animate-fade-in cursor-default rounded-lg px-2.5 py-1 font-mono text-[10px] text-foreground transition-all duration-300 hover:border-primary/50 hover:bg-primary/10 hover:shadow-[0_0_15px_hsl(var(--primary)/0.2)] sm:px-4 sm:py-1.5 sm:text-xs"
										style={{
											animationDelay: `${0.3 + i * 0.1}s`,
										}}
									>
										[#{tag}]
									</span>
								),
							)}
						</div>
					</CommandBox>
				</section>

				{/* About & Skills */}
				<section
					id="about"
					className="grid scroll-mt-20 gap-4 sm:gap-8 md:grid-cols-2"
				>
					<div>
						<CommandBox
							command="cat /home/onslaught/bio.txt"
							delay={200}
							priority={true}
							onAnimationComplete={handlePriorityComplete}
						>
							<div className="space-y-3 font-body text-xs sm:space-y-4 sm:text-sm">
								<p className="leading-relaxed text-muted-foreground">
									<span className="glow-text text-primary">
										Experimenting
									</span>{" "}
									– Self-hosted browsers, privacy-focused
									search engines, enterprise security systems.
								</p>
								<p className="leading-relaxed text-muted-foreground">
									I enjoy{" "}
									<span className="glow-text-accent text-accent">
										reverse engineering, penetration
										testing, and security research
									</span>
									, aiming to develop robust defenses against
									cyber threats.
								</p>
								<div className="glass-subtle rounded-lg p-3">
									<p className="mb-1 font-mono text-[10px] text-accent sm:text-xs">
										$ echo $FOCUS
									</p>
									<p className="text-xs text-foreground sm:text-sm">
										Ethical Hacking • Network Security •
										Vulnerability Assessment
									</p>
								</div>
							</div>
						</CommandBox>
					</div>

					<div>
						<CommandBox
							command="./skills --matrix"
							delay={300}
							priority={true}
							onAnimationComplete={handlePriorityComplete}
						>
							<div className="space-y-3 sm:space-y-4">
								<SkillBar skill="Python" level={95} delay={0} />
								<SkillBar
									skill="Cybersecurity"
									level={85}
									delay={0.1}
								/>
								<SkillBar
									skill="Linux/DevOps"
									level={90}
									delay={0.2}
								/>
								<SkillBar
									skill="Encryption"
									level={80}
									delay={0.3}
								/>
							</div>
						</CommandBox>
					</div>
				</section>

				{/* Tech Arsenal */}
				{canAnimateScrollBoxes && (
					<section id="skills" className="scroll-mt-20">
						<CommandBox command="neofetch --tech-stack" delay={0}>
							<div className="grid grid-cols-2 gap-2 sm:gap-4 lg:grid-cols-3">
								{techCategories.map((category) => (
									<div
										key={category.title}
										className="tech-card glass-subtle perspective-card rounded-xl p-3 transition-all duration-500 hover:border-primary/30 hover:bg-primary/5 hover:shadow-[0_0_25px_hsl(var(--primary)/0.15)] sm:p-4"
									>
										<div className="flex items-start gap-2 sm:gap-3">
											<category.icon className="mt-0.5 h-4 w-4 flex-shrink-0 text-accent sm:h-5 sm:w-5" />
											<div className="min-w-0">
												<h3 className="mb-1 font-display text-xs font-semibold text-foreground sm:text-sm">
													<GlitchText
														text={category.title}
														intensity="low"
													/>
												</h3>
												<p className="truncate font-body text-[10px] leading-relaxed text-muted-foreground/70 sm:whitespace-normal sm:text-xs">
													{category.items}
												</p>
											</div>
										</div>
									</div>
								))}
							</div>
						</CommandBox>
					</section>
				)}

				{/* Featured GitHub Repos */}
				{canAnimateScrollBoxes && (
					<section id="repos" className="scroll-mt-20">
						<CommandBox
							command="gh repo list onslaught2342 --limit 4"
							delay={0}
						>
							<div className="mb-4 flex items-center justify-between">
								<h2 className="font-display text-sm text-foreground sm:text-base">
									<GlitchText
										text="FEATURED REPOSITORIES"
										intensity="low"
									/>
								</h2>
								<div className="flex items-center gap-3">
									<Link
										to="/projects"
										className="glass-subtle flex items-center gap-1.5 rounded-lg px-3 py-1.5 font-mono text-[10px] text-primary transition-all hover:border-primary/40 hover:text-accent sm:text-xs"
									>
										<Globe className="h-3 w-3" />
										Site
									</Link>
									<Link
										to="/projects"
										className="flex items-center gap-1 font-mono text-[10px] text-primary transition-colors hover:text-accent sm:text-xs"
									>
										View All{" "}
										<ArrowRight className="h-3 w-3" />
									</Link>
								</div>
							</div>
							{reposLoading ? (
								<div className="grid gap-3 sm:grid-cols-2 sm:gap-4">
									{Array.from({ length: 4 }).map((_, i) => (
										<RepoCardSkeleton key={i} />
									))}
								</div>
							) : (
								<div className="grid gap-3 sm:grid-cols-2 sm:gap-4">
									{featuredRepos?.map((repo) => (
										<div
											key={repo.id}
											className="project-card"
										>
											<GitHubProjectCard repo={repo} />
										</div>
									))}
								</div>
							)}
						</CommandBox>
					</section>
				)}

				{/* Goals */}
				{canAnimateScrollBoxes && (
					<section>
						<CommandBox
							command="cat /etc/objectives.conf"
							delay={0}
						>
							<div className="space-y-3 sm:space-y-4">
								{goals.map((item, index) => (
									<div
										key={item.goal}
										className="goal-item glass-subtle rounded-xl p-3 transition-all duration-500 hover:border-primary/30 hover:shadow-[0_0_20px_hsl(var(--primary)/0.1)] sm:p-4"
									>
										<div className="mb-3 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
											<span className="font-body text-xs font-medium text-foreground sm:text-sm">
												{item.goal}
											</span>
											<span
												className={`self-start rounded-full px-2 py-0.5 font-mono text-[10px] sm:self-auto sm:text-xs ${
													item.difficulty ===
													"EXTREME"
														? "bg-destructive/10 text-destructive shadow-[0_0_10px_hsl(var(--destructive)/0.2)]"
														: "bg-yellow-500/10 text-yellow-400 shadow-[0_0_10px_hsl(45_100%_50%/0.2)]"
												}`}
											>
												[{item.difficulty}]
											</span>
										</div>
										<GoalProgressBar
											progress={item.progress}
											delay={index * 0.15}
										/>
									</div>
								))}
							</div>
						</CommandBox>
					</section>
				)}

				{/* Contact */}
				{canAnimateScrollBoxes && (
					<section id="contact" className="scroll-mt-20">
						<CommandBox
							command={`curl -X GET ${window.location.origin}/contact`}
							glow
							delay={0}
						>
							<div className="text-center">
								<p className="mb-4 font-body text-xs text-muted-foreground sm:mb-6 sm:text-base">
									Interested in{" "}
									<span className="text-accent">
										security research
									</span>
									? Want to collaborate on something{" "}
									<span className="text-primary">epic</span>?
								</p>
								<div className="flex flex-wrap justify-center gap-2 sm:gap-3">
									<a
										href="https://github.com/onslaught2342"
										target="_blank"
										rel="noopener noreferrer"
										className="glass-subtle flex items-center gap-1.5 rounded-xl px-4 py-2 font-mono text-[10px] text-foreground transition-all duration-300 hover:border-primary/50 hover:bg-primary/10 hover:shadow-[0_0_25px_hsl(var(--primary)/0.2)] active:scale-95 sm:gap-2 sm:px-5 sm:py-2.5 sm:text-sm"
									>
										<Github className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
										[GITHUB]
									</a>
									<button
										onClick={handleDiscordCopy}
										className="glass-subtle flex items-center gap-1.5 rounded-xl px-4 py-2 font-mono text-[10px] text-foreground transition-all duration-300 hover:border-accent/50 hover:bg-accent/10 hover:shadow-[0_0_25px_hsl(var(--accent)/0.2)] active:scale-95 sm:gap-2 sm:px-5 sm:py-2.5 sm:text-sm"
									>
										<MessageSquare className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
										[DISCORD]
									</button>
									<Link
										to="/contact"
										className="glass-subtle flex items-center gap-1.5 rounded-xl px-4 py-2 font-mono text-[10px] text-foreground transition-all duration-300 hover:border-secondary/50 hover:bg-secondary/10 hover:shadow-[0_0_25px_hsl(var(--secondary)/0.2)] active:scale-95 sm:gap-2 sm:px-5 sm:py-2.5 sm:text-sm"
									>
										<MessageSquare className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
										[CONTACT_FORM]
									</Link>
								</div>
							</div>
						</CommandBox>
					</section>
				)}
			</main>

			{/* Footer */}
			<footer className="gsap-footer glass relative z-10 mt-12 border-t border-border/20 sm:mt-16">
				<div className="mx-auto max-w-6xl px-3 py-6 sm:px-6 sm:py-8">
					<div className="mb-6 grid gap-4 text-xs sm:mb-8 sm:grid-cols-3 sm:gap-8 sm:text-sm">
						<div>
							<p className="mb-2 font-display text-sm text-primary">
								<GlitchText
									text="root@onslaught:~$"
									intensity="low"
								/>
							</p>
							<p className="font-body text-[10px] leading-relaxed text-muted-foreground/60 sm:text-xs">
								A young hacker on a mission to understand,
								secure, and architect the systems of tomorrow.
							</p>
						</div>
						<div>
							<p className="mb-2 font-display text-sm text-accent">
								STATUS
							</p>
							<p className="flex flex-wrap gap-1 font-mono text-[10px] text-muted-foreground/60 sm:text-xs">
								<span className="text-primary">[ONLINE]</span>
								<span>•</span>
								<span>[LEARNING]</span>
								<span>•</span>
								<span className="text-accent">[BUILDING]</span>
							</p>
						</div>
						<div>
							<p className="mb-2 font-display text-sm text-secondary">
								PHILOSOPHY
							</p>
							<p className="font-body text-[10px] italic text-muted-foreground/60 sm:text-xs">
								"To defend, first understand. To attack, test
								yourself."
							</p>
						</div>
					</div>
					<UptimeCounter />
					<div className="border-t border-border/15 pt-4 text-center font-mono text-[10px] text-muted-foreground/40 sm:pt-6 sm:text-xs">
						<p className="glow-text text-primary">$ exit 0</p>
						<p className="mt-2">
							CONNECTION CLOSED •{" "}
							<span className="text-accent">STAY CURIOUS</span> •
							STAY SECURE
						</p>
					</div>
				</div>
			</footer>
		</div>
	);
});

Portfolio.displayName = "Portfolio";

export default Portfolio;
