import { motion } from "framer-motion";

interface SkillBarProps {
	skill: string;
	level: number;
	delay?: number;
}

const SkillBar = ({ skill, level, delay = 0 }: SkillBarProps) => {
	return (
		<div className="space-y-2">
			<div className="flex items-center justify-between text-sm">
				<span className="text-foreground">{skill}</span>
				<span className="text-muted-foreground">{level}%</span>
			</div>
			<div className="h-2 overflow-hidden rounded-full border border-border bg-muted">
				<motion.div
					initial={{ width: 0 }}
					whileInView={{ width: `${level}%` }}
					viewport={{ once: true }}
					transition={{ duration: 1, delay, ease: "easeOut" }}
					className="progress-glow h-full rounded-full bg-gradient-to-r from-primary to-accent"
				/>
			</div>
		</div>
	);
};

export default SkillBar;
