import { memo } from "react";
import { useTheme } from "next-themes";
import { Palette } from "lucide-react";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const themes = [
	{ name: "matrix", label: "Matrix", color: "hsl(160 100% 50%)" },
	{ name: "ice", label: "Ice", color: "hsl(210 100% 60%)" },
	{ name: "danger", label: "Danger", color: "hsl(0 80% 55%)" },
	{ name: "midnight", label: "Midnight", color: "hsl(265 70% 60%)" },
];

const ThemeToggle = memo(() => {
	const { theme, setTheme } = useTheme();

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<button
					className="glass-subtle flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 font-mono text-[10px] text-muted-foreground transition-all hover:border-primary/40 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary sm:text-xs"
					aria-label="Change theme"
				>
					<Palette className="h-3.5 w-3.5" />
					<span className="hidden sm:inline">Theme</span>
				</button>
			</DropdownMenuTrigger>
			<DropdownMenuContent
				align="end"
				className="glass min-w-[140px] border-border/30"
			>
				{themes.map((t) => (
					<DropdownMenuItem
						key={t.name}
						onClick={() => setTheme(t.name)}
						className="flex cursor-pointer items-center gap-2 font-mono text-xs"
					>
						<span
							className="h-3 w-3 flex-shrink-0 rounded-full border border-border/40"
							style={{
								backgroundColor: t.color,
								boxShadow:
									theme === t.name
										? `0 0 8px ${t.color}`
										: "none",
							}}
						/>
						<span
							className={
								theme === t.name
									? "text-foreground"
									: "text-muted-foreground"
							}
						>
							{t.label}
						</span>
						{theme === t.name && (
							<span className="ml-auto text-[10px] text-primary">
								●
							</span>
						)}
					</DropdownMenuItem>
				))}
			</DropdownMenuContent>
		</DropdownMenu>
	);
});

ThemeToggle.displayName = "ThemeToggle";
export default ThemeToggle;
