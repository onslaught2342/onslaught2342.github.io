import { memo, useState } from "react";
import {
	Star,
	GitFork,
	ExternalLink,
	Code,
	FileText,
	ChevronDown,
	ChevronUp,
} from "lucide-react";
import type { GitHubRepo } from "@/hooks/useGitHubRepos";
import { useRepoReadme } from "@/hooks/useGitHubRepos";
import MarkdownRenderer from "./MarkdownRenderer";

const langColors: Record<string, string> = {
	Python: "hsl(210 80% 60%)",
	JavaScript: "hsl(50 90% 55%)",
	TypeScript: "hsl(210 80% 55%)",
	"C++": "hsl(340 60% 55%)",
	Shell: "hsl(120 40% 50%)",
	HTML: "hsl(15 80% 55%)",
	CSS: "hsl(260 60% 55%)",
};

const GitHubProjectCard = memo(({ repo }: { repo: GitHubRepo }) => {
	const [showReadme, setShowReadme] = useState(false);
	const { data: readme, isLoading: readmeLoading } = useRepoReadme(
		showReadme ? repo.name : "",
	);

	return (
		<div className="glass-subtle perspective-card group block rounded-xl border border-border/20 p-4 transition-all duration-500 hover:border-primary/40 hover:bg-primary/5 hover:shadow-[0_0_30px_hsl(var(--primary)/0.15)] sm:p-5">
			<a
				href={repo.html_url}
				target="_blank"
				rel="noopener noreferrer"
				className="block"
			>
				<div className="mb-3 flex items-start justify-between gap-3">
					<div className="flex min-w-0 items-center gap-2">
						<Code className="h-4 w-4 flex-shrink-0 text-primary" />
						<h3 className="truncate font-display text-sm font-semibold text-foreground transition-colors group-hover:text-primary sm:text-base">
							{repo.name}
						</h3>
					</div>
					<ExternalLink className="h-3.5 w-3.5 flex-shrink-0 text-muted-foreground/40 transition-colors group-hover:text-primary/60" />
				</div>

				<p className="mb-3 line-clamp-2 font-body text-xs text-muted-foreground/70 sm:text-sm">
					{repo.description || "No description available"}
				</p>

				{repo.topics && repo.topics.length > 0 && (
					<div className="mb-3 flex flex-wrap gap-1.5">
						{repo.topics.slice(0, 5).map((topic) => (
							<span
								key={topic}
								className="rounded-full border border-primary/20 bg-primary/10 px-2 py-0.5 font-mono text-[9px] text-primary/70 sm:text-[10px]"
							>
								{topic}
							</span>
						))}
					</div>
				)}

				<div className="flex items-center gap-4 font-mono text-[10px] text-muted-foreground/50 sm:text-xs">
					{repo.language && (
						<span className="flex items-center gap-1.5">
							<span
								className="h-2.5 w-2.5 rounded-full"
								style={{
									backgroundColor:
										langColors[repo.language] ||
										"hsl(var(--muted-foreground))",
								}}
							/>
							{repo.language}
						</span>
					)}
					<span className="flex items-center gap-1">
						<Star className="h-3 w-3" />
						{repo.stargazers_count}
					</span>
					<span className="flex items-center gap-1">
						<GitFork className="h-3 w-3" />
						{repo.forks_count}
					</span>
				</div>
			</a>

			{/* README toggle */}
			<button
				onClick={(e) => {
					e.stopPropagation();
					setShowReadme(!showReadme);
				}}
				className="mt-3 flex items-center gap-1.5 font-mono text-[10px] text-accent/60 transition-colors hover:text-accent sm:text-xs"
			>
				<FileText className="h-3 w-3" />
				README.md
				{showReadme ? (
					<ChevronUp className="h-3 w-3" />
				) : (
					<ChevronDown className="h-3 w-3" />
				)}
			</button>

			{showReadme && (
				<div className="mt-3 max-h-64 overflow-y-auto rounded-lg border border-border/10 bg-muted/10 p-3">
					{readmeLoading ? (
						<p className="animate-pulse font-mono text-[10px] text-primary">
							Loading README...
						</p>
					) : readme ? (
						<MarkdownRenderer content={readme} />
					) : (
						<p className="font-mono text-[10px] text-muted-foreground/40">
							No README found
						</p>
					)}
				</div>
			)}
		</div>
	);
});

GitHubProjectCard.displayName = "GitHubProjectCard";
export default GitHubProjectCard;
