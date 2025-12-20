import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import TerminalBox from "./TerminalBox";

interface ProjectCardProps {
	title: string;
	description: string;
	status: "COMPLETE" | "RUNNING" | "TESTING" | "VALIDATED";
	code: string[];
}

const statusColors = {
	COMPLETE: "border-primary text-primary bg-primary/10",
	RUNNING: "border-accent text-accent bg-accent/10",
	TESTING: "border-yellow-500 text-yellow-500 bg-yellow-500/10",
	VALIDATED: "border-primary text-primary bg-primary/10",
};

const ProjectCard = ({
	title,
	description,
	status,
	code,
}: ProjectCardProps) => {
	const [isExpanded, setIsExpanded] = useState(false);

	return (
		<TerminalBox onClick={() => setIsExpanded(!isExpanded)} className="p-6">
			<div className="space-y-3">
				<div className="flex items-start justify-between gap-4">
					<div className="flex-1">
						<h3 className="mb-1 font-semibold text-foreground">
							{title}
						</h3>
						<p className="text-sm text-muted-foreground">
							{description}
						</p>
					</div>
					<span
						className={`whitespace-nowrap rounded-full border px-3 py-1 text-xs ${statusColors[status]}`}
					>
						{status}
					</span>
				</div>

				<AnimatePresence>
					{isExpanded && (
						<motion.div
							initial={{ height: 0, opacity: 0 }}
							animate={{ height: "auto", opacity: 1 }}
							exit={{ height: 0, opacity: 0 }}
							transition={{ duration: 0.3 }}
							className="overflow-hidden"
						>
							<div className="mt-4 rounded border border-border bg-background/80 p-4">
								<div className="mb-2 text-xs text-accent">
									&gt; Source Code Preview
								</div>
								<div className="space-y-1">
									{code.map((line, i) => (
										<motion.div
											key={i}
											initial={{ opacity: 0, x: -10 }}
											animate={{ opacity: 1, x: 0 }}
											transition={{ delay: i * 0.05 }}
											className="font-mono text-sm text-muted-foreground"
										>
											<span className="mr-3 text-border">
												{i + 1}
											</span>
											{line}
										</motion.div>
									))}
								</div>
							</div>
						</motion.div>
					)}
				</AnimatePresence>

				<div className="flex items-center text-xs text-muted-foreground">
					<span>
						{isExpanded
							? "▲ Click to collapse"
							: "▼ Click to expand code"}
					</span>
				</div>
			</div>
		</TerminalBox>
	);
};

export default ProjectCard;
