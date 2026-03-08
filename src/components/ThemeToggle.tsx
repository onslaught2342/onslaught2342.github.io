import { memo } from 'react';
import { useTheme } from 'next-themes';
import { Palette } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const themes = [
  { name: 'matrix', label: 'Matrix', color: 'hsl(160 100% 50%)' },
  { name: 'ice', label: 'Ice', color: 'hsl(210 100% 60%)' },
  { name: 'danger', label: 'Danger', color: 'hsl(0 80% 55%)' },
  { name: 'midnight', label: 'Midnight', color: 'hsl(265 70% 60%)' },
];

const ThemeToggle = memo(() => {
  const { theme, setTheme } = useTheme();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          className="flex items-center gap-1.5 px-2.5 py-1.5 glass-subtle rounded-lg text-[10px] sm:text-xs
            text-muted-foreground hover:text-foreground hover:border-primary/40 transition-all font-mono
            focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none"
          aria-label="Change theme"
        >
          <Palette className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Theme</span>
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="glass border-border/30 min-w-[140px]">
        {themes.map((t) => (
          <DropdownMenuItem
            key={t.name}
            onClick={() => setTheme(t.name)}
            className="flex items-center gap-2 text-xs font-mono cursor-pointer"
          >
            <span
              className="w-3 h-3 rounded-full border border-border/40 flex-shrink-0"
              style={{ backgroundColor: t.color, boxShadow: theme === t.name ? `0 0 8px ${t.color}` : 'none' }}
            />
            <span className={theme === t.name ? 'text-foreground' : 'text-muted-foreground'}>
              {t.label}
            </span>
            {theme === t.name && <span className="ml-auto text-primary text-[10px]">●</span>}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
});

ThemeToggle.displayName = 'ThemeToggle';
export default ThemeToggle;
