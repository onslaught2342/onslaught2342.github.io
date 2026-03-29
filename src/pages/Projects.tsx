import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { ArrowLeft, Search, Github, Star, GitFork, Code } from "lucide-react";
import { motion } from "framer-motion";
import { useGitHubRepos } from "@/hooks/useGitHubRepos";
import GitHubProjectCard from "@/components/GitHubProjectCard";
import MatrixRain from "@/components/MatrixRain";
import ScanlineEffect from "@/components/ScanlineEffect";
import GlitchText from "@/components/GlitchText";
import RepoCardSkeleton from "@/components/RepoCardSkeleton";
import BackToTop from "@/components/BackToTop";
import ThemeToggle from "@/components/ThemeToggle";
import CommandPalette from "@/components/CommandPalette";
import UptimeCounter from "@/components/UptimeCounter";

const Projects = () => {
	const { data: repos, isLoading, error } = useGitHubRepos();
	const [search, setSearch] = useState("");
	const [langFilter, setLangFilter] = useState<string | null>(null);

	const languages = [
		...new Set(repos?.map((r) => r.language).filter(Boolean) || []),
	];

	const langCounts = useMemo(() => {
		const counts: Record<string, number> = {};
		repos?.forEach((r) => {
			if (r.language) counts[r.language] = (counts[r.language] || 0) + 1;
		});
		return counts;
	}, [repos]);

	const stats = useMemo(() => {
		if (!repos?.length) return null;
		const totalStars = repos.reduce((s, r) => s + r.stargazers_count, 0);
		const totalForks = repos.reduce((s, r) => s + r.forks_count, 0);
		const topLang = Object.entries(langCounts).sort(
			(a, b) => b[1] - a[1],
		)[0];
		return { totalStars, totalForks, topLang: topLang?.[0] || "N/A" };
	}, [repos, langCounts]);

	const filtered = repos?.filter((r) => {
		const matchesSearch =
			!search ||
			r.name.toLowerCase().includes(search.toLowerCase()) ||
			r.description?.toLowerCase().includes(search.toLowerCase());
		const matchesLang = !langFilter || r.language === langFilter;
		return matchesSearch && matchesLang;
	});

	return (
		<div className="relative flex min-h-screen flex-col overflow-x-hidden bg-background">
			<Helmet>
				<title>Projects | Onslaught2342</title>
				<meta
					name="description"
					content="Browse all open-source repositories by Onslaught2342 — cybersecurity tools, encryption projects, and more."
				/>
				<meta property="og:title" content="Projects | Onslaught2342" />
			</Helmet>
			<MatrixRain />
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
							href="https://github.com/onslaught2342"
							target="_blank"
							rel="noopener noreferrer"
							className="flex items-center gap-2 font-mono text-xs text-muted-foreground transition-colors hover:text-primary"
						>
							<Github className="h-4 w-4" />
							<span className="hidden sm:inline">
								github.com/onslaught2342
							</span>
						</a>
						<ThemeToggle />
					</div>
				</div>
			</header>

			<main className="relative z-10 mx-auto max-w-6xl flex-1 px-3 py-8 sm:px-6 sm:py-12">
				<motion.div
					className="mb-6"
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.5 }}
				>
					<h1 className="mb-2 font-display text-2xl font-bold text-foreground sm:text-4xl">
						<GlitchText text="ALL REPOSITORIES" intensity="low" />
					</h1>
					<p className="font-mono text-sm text-muted-foreground/60">
						$ ls -la /projects/{" "}
						<span className="text-primary">
							({repos?.length || 0} repos)
						</span>
					</p>
				</motion.div>

				{/* Stats Summary */}
				{stats && (
					<motion.div
						className="glass-subtle mb-8 flex flex-wrap gap-4 rounded-xl border border-border/20 px-4 py-3 font-mono text-xs sm:gap-6 sm:text-sm"
						initial={{ opacity: 0, y: 12 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.4, delay: 0.1 }}
					>
						<span className="flex items-center gap-1.5 text-muted-foreground/70">
							<Star className="h-3.5 w-3.5 text-primary" />
							Total Stars:{" "}
							<span className="font-semibold text-primary">
								{stats.totalStars}
							</span>
						</span>
						<span className="flex items-center gap-1.5 text-muted-foreground/70">
							<GitFork className="h-3.5 w-3.5 text-accent" />
							Total Forks:{" "}
							<span className="font-semibold text-accent">
								{stats.totalForks}
							</span>
						</span>
						<span className="flex items-center gap-1.5 text-muted-foreground/70">
							<Code className="h-3.5 w-3.5 text-secondary" />
							Top Language:{" "}
							<span className="font-semibold text-secondary">
								{stats.topLang}
							</span>
						</span>
					</motion.div>
				)}

				{/* Filters */}
				<motion.div
					className="mb-8 flex flex-col gap-3 sm:flex-row"
					initial={{ opacity: 0, y: 16 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.4, delay: 0.15 }}
				>
					<div className="relative flex-1">
						<Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground/40" />
						<input
							type="text"
							placeholder="Search repositories..."
							value={search}
							onChange={(e) => setSearch(e.target.value)}
							className="glass-subtle w-full rounded-xl border border-border/20 bg-transparent py-2.5 pl-10 pr-4 font-mono text-sm text-foreground transition-all placeholder:text-muted-foreground/40 focus:border-primary/40 focus:shadow-[0_0_20px_hsl(var(--primary)/0.1)] focus:outline-none"
						/>
					</div>
					<div className="flex flex-wrap gap-2">
						<button
							onClick={() => setLangFilter(null)}
							className={`rounded-lg px-3 py-1.5 font-mono text-xs transition-all ${
								!langFilter
									? "border border-primary/30 bg-primary/20 text-primary"
									: "glass-subtle text-muted-foreground hover:text-foreground"
							}`}
						>
							All
						</button>
						{languages.map((lang) => (
							<button
								key={lang}
								onClick={() =>
									setLangFilter(
										lang === langFilter ? null : lang!,
									)
								}
								className={`rounded-lg px-3 py-1.5 font-mono text-xs transition-all ${
									langFilter === lang
										? "border border-primary/30 bg-primary/20 text-primary"
										: "glass-subtle text-muted-foreground hover:text-foreground"
								}`}
							>
								{lang}{" "}
								<span className="opacity-50">
									({langCounts[lang!] || 0})
								</span>
							</button>
						))}
					</div>
				</motion.div>

				{/* Content */}
				{isLoading && (
					<div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
						{Array.from({ length: 6 }).map((_, i) => (
							<RepoCardSkeleton key={i} />
						))}
					</div>
				)}

				{error && (
					<div className="py-20 text-center">
						<p className="font-mono text-destructive">
							Error loading repositories. Try again later.
						</p>
					</div>
				)}

				{filtered && filtered.length > 0 && (
					<div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
						{filtered.map((repo, i) => (
							<motion.div
								key={repo.id}
								initial={{ opacity: 0, y: 20 }}
								whileInView={{ opacity: 1, y: 0 }}
								viewport={{ once: true }}
								transition={{
									duration: 0.4,
									delay: Math.min(i * 0.06, 0.3),
								}}
							>
								<GitHubProjectCard repo={repo} />
							</motion.div>
						))}
					</div>
				)}

				{filtered?.length === 0 && !isLoading && (
					<div className="py-20 text-center">
						<div className="glass-subtle inline-block max-w-md rounded-xl border border-border/20 px-6 py-8">
							<p className="mb-2 font-mono text-sm text-primary">
								$ grep -r "
								<span className="text-accent">
									{search || langFilter}
								</span>
								" /projects/
							</p>
							<p className="mb-4 font-mono text-xs text-muted-foreground/50">
								→ 0 results found
							</p>
							<button
								onClick={() => {
									setSearch("");
									setLangFilter(null);
								}}
								className="font-mono text-xs text-primary/60 underline underline-offset-4 transition-colors hover:text-primary"
							>
								clear filters
							</button>
						</div>
					</div>
				)}
			</main>

			{/* Footer */}
			<footer className="relative z-10 border-t border-border/10 py-6">
				<UptimeCounter />
				<p className="text-center font-mono text-[10px] text-muted-foreground/30">
					© {new Date().getFullYear()} Onslaught2342 — All systems
					operational
				</p>
			</footer>
		</div>
	);
};

export default Projects;
