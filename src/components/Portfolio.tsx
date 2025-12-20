import { motion } from "framer-motion";
import {
	Code,
	Shield,
	Server,
	Globe,
	Zap,
	Terminal as TerminalIcon,
	Github,
	Mail,
	MessageSquare,
	Cloud,
	Palette,
	Lock,
	Database,
	Network,
	HardDrive,
} from "lucide-react";
import MatrixBackground from "./MatrixBackground";
import ScanlineEffect from "./ScanlineEffect";
import GlitchText from "./GlitchText";
import TerminalBox from "./TerminalBox";
import CommandBox from "./CommandBox";
import SkillBar from "./SkillBar";
import ProjectCard from "./ProjectCard";
import JinwooEasterEgg from "./JinwooEasterEgg";
import logo from "@/assets/logo.png";
const fadeInUp = {
	initial: { opacity: 0, y: 30 },
	whileInView: { opacity: 1, y: 0 },
	viewport: { once: true },
	transition: { duration: 0.6 },
};

const staggerContainer = {
	initial: {},
	whileInView: { transition: { staggerChildren: 0.1 } },
	viewport: { once: true },
};

const Portfolio = () => {
	const projects = [
		{
			title: "Encryption-Based Security Tools",
			description:
				"Developing hybrid AES + RSA encryption tools with data obfuscation techniques",
			status: "COMPLETE" as const,
			code: [
				"from cryptography.hazmat.primitives import hashes",
				"aes_key = generate_aes_256_key()",
				"rsa_keypair = generate_rsa_4096()",
				"encrypted = hybrid_encrypt(data, aes_key, rsa_keypair)",
				"obfuscated = apply_obfuscation(encrypted)",
			],
		},
		{
			title: "Privacy-Focused Browser & Search Engine",
			description:
				"Custom browser with strong privacy features and self-hosted secure search",
			status: "RUNNING" as const,
			code: [
				"docker-compose up -d searxng",
				"nginx proxy_pass /search;",
				"tor_enabled: true",
				"tracking_protection: maximum",
				"dns_over_https: cloudflare",
			],
		},
		{
			title: "Automated Backup & Disaster Recovery",
			description:
				"Real-time multi-site replication with secure encrypted backups",
			status: "VALIDATED" as const,
			code: [
				"async def backup_critical_systems():",
				"    snapshot = create_incremental_snapshot()",
				"    encrypted = encrypt_aes256_gcm(snapshot)",
				'    await replicate_to_sites(["site_a", "site_b"])',
				"    verify_integrity(checksum)",
			],
		},
		{
			title: "Network Security Assessment Framework",
			description:
				"Penetration testing toolkit for vulnerability assessment and exploit research",
			status: "TESTING" as const,
			code: [
				"def security_audit(target_network):",
				"    vulnerabilities = scan_ports(target)",
				"    exploits = match_cve_database(vulnerabilities)",
				"    report = generate_pentest_report()",
				"    return remediation_steps(exploits)",
			],
		},
	];

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
			items: "Python • Bash • C++ (learning) • JavaScript (learning)",
			icon: Code,
		},
		{
			title: "Cybersecurity",
			items: "Penetration Testing • AES/RSA • IAM • VPN Security",
			icon: Shield,
		},
		{
			title: "Enterprise IT",
			items: "Active Directory • SSO • Disaster Recovery • Load Balancing",
			icon: Server,
		},
		{
			title: "DevOps",
			items: "Docker • Kasm • WSL/Ubuntu • Self-Hosting",
			icon: Cloud,
		},
		{
			title: "Network",
			items: "Security Auditing • Secure Tunneling • Privacy Networking",
			icon: Network,
		},
		{
			title: "Creative",
			items: "Canva Pro • Adobe CC • HTML/CSS • UI/UX",
			icon: Palette,
		},
	];
	return (
		<div className="relative min-h-screen overflow-x-hidden bg-background">
			<MatrixBackground />
			<ScanlineEffect />
			<JinwooEasterEgg />
			{/* Header */}
			<motion.header
				initial={{ y: -100 }}
				animate={{ y: 0 }}
				transition={{ duration: 0.5 }}
				className="sticky top-0 z-40 border-b border-border bg-background/90 backdrop-blur-md"
			>
				<div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6">
					<div className="flex items-center gap-3">
						<div className="h-10 w-10 animate-glow-pulse overflow-hidden rounded-lg border border-primary">
							<img
								src={logo}
								alt="Onslaught2342 Logo"
								className="h-full w-full object-cover"
							/>
						</div>
						<span className="glow-text text-lg font-bold text-foreground sm:text-xl">
							./Onslaught2342
						</span>
					</div>
					<div className="hidden space-x-4 text-xs text-muted-foreground sm:flex">
						<span className="text-primary">[ONLINE]</span>
						<span>|</span>
						<span className="text-accent">[SECURE]</span>
						<span>|</span>
						<span>[ACTIVE]</span>
					</div>
				</div>
			</motion.header>

			<main className="relative z-10 mx-auto max-w-6xl space-y-12 px-4 py-8 sm:space-y-16 sm:px-6 sm:py-12">
				{/* Hero Section */}
				<section>
					<CommandBox command="whoami" glow delay={200}>
						<h1 className="glow-text mb-4 text-3xl font-bold text-foreground sm:text-5xl">
							<GlitchText text="ONSLAUGHT2342" />
						</h1>

						<div className="mb-6 space-y-2 text-base text-muted-foreground sm:text-lg">
							<p className="flex items-start gap-2">
								<span className="text-primary">&gt;</span>
								<span>
									Security Enthusiast | Ethical Hacker | Code
									Architect
								</span>
							</p>
							<p className="flex items-start gap-2">
								<span className="text-primary">&gt;</span>
								<span>
									15y/o CAIE Student | Building at 2 AM |
									Breaking systems for fun
								</span>
							</p>
						</div>

						<div className="flex flex-wrap gap-2 sm:gap-3">
							{["ETHICAL", "SECURE", "CURIOUS", "RELENTLESS"].map(
								(tag, i) => (
									<motion.span
										key={tag}
										initial={{ opacity: 0, scale: 0.8 }}
										animate={{ opacity: 1, scale: 1 }}
										transition={{ delay: 0.5 + i * 0.1 }}
										className="cursor-default rounded border border-border px-3 py-1.5 text-xs text-foreground transition-all hover:border-primary hover:bg-primary/10 sm:px-4 sm:py-2"
									>
										[#{tag}]
									</motion.span>
								),
							)}
						</div>
					</CommandBox>
				</section>

				{/* About & Skills */}
				<section className="grid gap-6 sm:gap-8 md:grid-cols-2">
					<div>
						<CommandBox
							command="cat /home/onslaught/bio.txt"
							delay={400}
						>
							<div className="space-y-4 text-sm">
								<p className="leading-relaxed text-muted-foreground">
									<span className="text-primary">
										Experimenting
									</span>{" "}
									– Self-hosted browsers, privacy-focused
									search engines, enterprise security systems.
								</p>
								<p className="leading-relaxed text-muted-foreground">
									I enjoy{" "}
									<span className="text-accent">
										reverse engineering, penetration
										testing, and security research
									</span>
									, aiming to develop robust defenses against
									cyber threats.
								</p>
								<div className="rounded border-l-2 border-accent bg-background/80 p-3">
									<p className="font-mono text-xs text-accent">
										$ echo $FOCUS
									</p>
									<p className="text-foreground">
										Ethical Hacking • Network Security •
										Vulnerability Assessment
									</p>
								</div>
							</div>
						</CommandBox>
					</div>

					<div>
						<CommandBox command="./skills --matrix" delay={600}>
							<div className="space-y-4">
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
				<section>
					<CommandBox command="neofetch --tech-stack" delay={800}>
						<div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
							{techCategories.map((category, i) => (
								<motion.div
									key={category.title}
									initial={{ opacity: 0, y: 20 }}
									animate={{ opacity: 1, y: 0 }}
									transition={{ delay: i * 0.1 }}
									className="rounded border border-border bg-background/30 p-3 transition-colors hover:border-primary/50"
								>
									<div className="flex items-start gap-3">
										<category.icon className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary" />
										<div>
											<h3 className="mb-2 text-sm font-semibold text-foreground">
												{category.title}
											</h3>
											<p className="text-xs text-muted-foreground">
												{category.items}
											</p>
										</div>
									</div>
								</motion.div>
							))}
						</div>
					</CommandBox>
				</section>

				{/* Projects */}
				<section>
					<CommandBox command="ls -la /projects/active" delay={1000}>
						<div className="space-y-4">
							{projects.map((project, i) => (
								<motion.div
									key={project.title}
									initial={{ opacity: 0, x: -20 }}
									animate={{ opacity: 1, x: 0 }}
									transition={{ delay: i * 0.15 }}
								>
									<ProjectCard {...project} />
								</motion.div>
							))}
						</div>
					</CommandBox>
				</section>

				{/* Goals */}
				<section>
					<CommandBox command="cat /etc/objectives.conf" delay={1200}>
						<div className="space-y-4">
							{goals.map((item, i) => (
								<motion.div
									key={item.goal}
									initial={{ opacity: 0 }}
									animate={{ opacity: 1 }}
									transition={{ delay: i * 0.1 }}
									className="rounded border border-border bg-background/50 p-4"
								>
									<div className="mb-3 flex items-center justify-between">
										<span className="text-sm text-foreground">
											{item.goal}
										</span>
										<span
											className={`rounded px-2 py-0.5 text-xs ${
												item.difficulty === "EXTREME"
													? "bg-destructive/10 text-destructive"
													: "bg-yellow-500/10 text-yellow-500"
											}`}
										>
											[{item.difficulty}]
										</span>
									</div>
									<div className="h-1.5 overflow-hidden rounded-full bg-muted">
										<motion.div
											initial={{ width: 0 }}
											animate={{
												width: `${item.progress}%`,
											}}
											transition={{
												duration: 1,
												delay: i * 0.1,
											}}
											className="progress-glow h-full bg-gradient-to-r from-primary to-accent"
										/>
									</div>
								</motion.div>
							))}
						</div>
					</CommandBox>
				</section>

				{/* Contact */}
				<section>
					<CommandBox
						command="curl -X GET https://onslaught2342.secure/contact"
						glow
						delay={1400}
					>
						<div className="text-center">
							<p className="mb-6 text-muted-foreground">
								Interested in security research? Want to
								collaborate on something epic?
							</p>
							<div className="flex flex-wrap justify-center gap-3">
								{[
									{ label: "GITHUB", icon: Github },
									{ label: "EMAIL", icon: Mail },
									{ label: "DISCORD", icon: MessageSquare },
								].map(({ label, icon: Icon }) => (
									<motion.button
										key={label}
										whileHover={{ scale: 1.05 }}
										whileTap={{ scale: 0.95 }}
										className="flex items-center gap-2 rounded border border-border px-4 py-2 text-sm text-foreground transition-all hover:border-primary hover:bg-primary/10"
									>
										<Icon className="h-4 w-4" />[{label}]
									</motion.button>
								))}
							</div>
						</div>
					</CommandBox>
				</section>
			</main>

			{/* Footer */}
			<footer className="relative z-10 mt-16 border-t border-border bg-background/90 backdrop-blur-md">
				<div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
					<div className="mb-8 grid gap-6 text-sm sm:grid-cols-3 sm:gap-8">
						<div>
							<p className="mb-2 text-primary">
								root@onslaught:~$
							</p>
							<p className="text-xs leading-relaxed text-muted-foreground">
								A young hacker on a mission to understand,
								secure, and architect the systems of tomorrow.
							</p>
						</div>
						<div>
							<p className="mb-2 text-primary">STATUS</p>
							<p className="text-xs text-muted-foreground">
								[ONLINE] • [LEARNING] • [BUILDING] • [SECURING]
							</p>
						</div>
						<div>
							<p className="mb-2 text-primary">PHILOSOPHY</p>
							<p className="text-xs italic text-muted-foreground">
								"To defend, first understand. To attack, test
								yourself."
							</p>
						</div>
					</div>
					<div className="border-t border-border pt-6 text-center text-xs text-muted-foreground">
						<p className="text-primary">$ exit 0</p>
						<p className="mt-2">
							CONNECTION CLOSED • STAY CURIOUS • STAY SECURE
						</p>
					</div>
				</div>
			</footer>
		</div>
	);
};

export default Portfolio;
