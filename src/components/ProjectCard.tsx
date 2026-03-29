import { useState, memo, useCallback } from "react";
import TerminalBox from "./TerminalBox";

interface ProjectCardProps {
	title: string;
	description: string;
	status: "COMPLETE" | "RUNNING" | "TESTING" | "VALIDATED";
	code: string[];
}

const statusColors: Record<string, string> = {
	COMPLETE:
		"border-primary/50 text-primary bg-primary/10 shadow-[0_0_10px_hsl(var(--primary)/0.2)]",
	RUNNING:
		"border-accent/50 text-accent bg-accent/10 shadow-[0_0_10px_hsl(var(--accent)/0.2)]",
	TESTING:
		"border-yellow-500/50 text-yellow-400 bg-yellow-500/10 shadow-[0_0_10px_hsl(45_100%_50%/0.2)]",
	VALIDATED:
		"border-primary/50 text-primary bg-primary/10 shadow-[0_0_10px_hsl(var(--primary)/0.2)]",
};

const ProjectCard = memo(
	({ title, description, status, code }: ProjectCardProps) => {
		const [isExpanded, setIsExpanded] = useState(false);

		const toggleExpand = useCallback(() => {
			setIsExpanded((prev) => !prev);
		}, []);

		return (
			<div className="perspective-card transition-all duration-500">
				<TerminalBox onClick={toggleExpand} className="p-3 sm:p-5">
					<div className="space-y-2 sm:space-y-3">
						<div className="flex items-start justify-between gap-2 sm:gap-4">
							<div className="min-w-0 flex-1">
								<h3 className="mb-1.5 truncate font-body text-sm font-semibold text-foreground sm:whitespace-normal sm:text-base">
									{title}
								</h3>
								<p className="line-clamp-2 font-body text-xs text-muted-foreground sm:text-sm">
									{description}
								</p>
							</div>
							<span
								className={`flex-shrink-0 whitespace-nowrap rounded-full border px-2.5 py-0.5 font-mono text-[10px] sm:px-3 sm:py-1 sm:text-xs ${statusColors[status]}`}
							>
								{status}
							</span>
						</div>

						{isExpanded && (
							<div className="animate-fade-in overflow-hidden">
								<div className="glass-subtle mt-2 rounded-lg p-3 sm:mt-4 sm:p-4">
									<div className="glow-text-accent mb-2 font-mono text-[10px] text-accent sm:text-xs">
										&gt; Source Code Preview
									</div>
									<div className="space-y-0.5 overflow-x-auto sm:space-y-1">
										{code.map((line, i) => (
											<div
												key={i}
												className="whitespace-nowrap font-mono text-[10px] text-muted-foreground sm:text-sm"
											>
												<span className="mr-2 select-none text-muted-foreground/30 sm:mr-3">
													{i + 1}
												</span>
												{line}
											</div>
										))}
									</div>
								</div>
							</div>
						)}

						<div className="flex items-center pt-1 font-mono text-[10px] text-muted-foreground/60 sm:text-xs">
							<span className="text-accent/60">
								{isExpanded
									? "▲ Tap to collapse"
									: "▼ Tap to expand code"}
							</span>
						</div>
					</div>
				</TerminalBox>
			</div>
		);
	},
);

ProjectCard.displayName = "ProjectCard";

export default ProjectCard;
