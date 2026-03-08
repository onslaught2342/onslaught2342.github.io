import { memo, useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from 'next-themes';
import {
  Command,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandSeparator,
} from '@/components/ui/command';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import {
  Home, FolderOpen, FileText, Mail, Palette, Bug, Zap, Wifi, Moon, Terminal, Search,
} from 'lucide-react';
import jinwooIcon from '@/assets/jinwoo-icon.jpg';

const CommandPalette = memo(() => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const { setTheme } = useTheme();

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setOpen((o) => !o);
      }
    };
    const openHandler = () => setOpen(true);
    window.addEventListener('keydown', handler);
    window.addEventListener('open-command-palette', openHandler);
    return () => {
      window.removeEventListener('keydown', handler);
      window.removeEventListener('open-command-palette', openHandler);
    };
  }, []);

  const run = useCallback((fn: () => void) => {
    setOpen(false);
    setTimeout(fn, 100);
  }, []);

  const dispatchKeys = useCallback((word: string) => {
    word.split('').forEach((ch) => {
      window.dispatchEvent(new KeyboardEvent('keydown', { key: ch, bubbles: true }));
    });
  }, []);

  const scrollTo = useCallback((id: string) => {
    run(() => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' }));
  }, [run]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="overflow-hidden p-0 shadow-[0_0_40px_hsl(var(--primary)/0.2)] border-primary/20 glass-intense max-w-lg">
        <Command className="bg-transparent">
          <div className="flex items-center border-b border-border/20 px-3">
            <Terminal className="mr-2 h-4 w-4 text-primary shrink-0" />
            <CommandInput placeholder="Type a command..." className="border-0 focus:ring-0 font-mono text-sm" />
            <kbd className="ml-auto text-[10px] font-mono text-muted-foreground/40 border border-border/20 rounded px-1.5 py-0.5 hidden sm:inline">
              ESC
            </kbd>
          </div>
          <CommandList className="max-h-80">
            <CommandEmpty className="font-mono text-muted-foreground/60">
              No results found.
            </CommandEmpty>

            <CommandGroup heading="Navigate">
              {[
                { label: 'Home', icon: Home, path: '/' },
                { label: 'Projects', icon: FolderOpen, path: '/projects' },
                { label: 'Resume', icon: FileText, path: '/resume' },
                { label: 'Contact', icon: Mail, path: '/contact' },
              ].map((item) => (
                <CommandItem
                  key={item.path}
                  onSelect={() => run(() => navigate(item.path))}
                  className="font-mono text-xs cursor-pointer data-[selected=true]:bg-primary/10 data-[selected=true]:text-primary"
                >
                  <item.icon className="mr-2 h-3.5 w-3.5 text-muted-foreground" />
                  <span>cd ~{item.path === '/' ? '' : item.path}</span>
                </CommandItem>
              ))}
            </CommandGroup>

            <CommandSeparator className="bg-border/20" />

            <CommandGroup heading="Scroll To">
              {[
                { label: 'About', id: 'about' },
                { label: 'Skills', id: 'skills' },
                { label: 'Repos', id: 'repos' },
                { label: 'Contact', id: 'contact' },
              ].map((item) => (
                <CommandItem
                  key={item.id}
                  onSelect={() => scrollTo(item.id)}
                  className="font-mono text-xs cursor-pointer data-[selected=true]:bg-primary/10 data-[selected=true]:text-primary"
                >
                  <Search className="mr-2 h-3.5 w-3.5 text-muted-foreground" />
                  <span>goto #{item.id}</span>
                </CommandItem>
              ))}
            </CommandGroup>

            <CommandSeparator className="bg-border/20" />

            <CommandGroup heading="Themes">
              {[
                { label: 'Matrix', theme: 'matrix', color: 'text-primary' },
                { label: 'Ice', theme: 'ice', color: 'text-accent' },
                { label: 'Danger', theme: 'danger', color: 'text-destructive' },
                { label: 'Midnight', theme: 'midnight', color: 'text-secondary' },
              ].map((item) => (
                <CommandItem
                  key={item.theme}
                  onSelect={() => run(() => setTheme(item.theme))}
                  className="font-mono text-xs cursor-pointer data-[selected=true]:bg-primary/10 data-[selected=true]:text-primary"
                >
                  <Palette className={`mr-2 h-3.5 w-3.5 ${item.color}`} />
                  <span>theme --set {item.theme}</span>
                </CommandItem>
              ))}
            </CommandGroup>

            <CommandSeparator className="bg-border/20" />

            <CommandGroup heading="Easter Eggs">
              {[
                { label: 'hack', icon: Bug, desc: 'Initiate hacking sequence' },
                { label: 'matrix', icon: Zap, desc: 'Intensify the matrix' },
                { label: 'ping', icon: Wifi, desc: 'Ping remote servers' },
                { label: 'midnight', icon: Moon, desc: 'Toggle midnight mode' },
              ].map((item) => (
                <CommandItem
                  key={item.label}
                  onSelect={() => run(() => dispatchKeys(item.label))}
                  className="font-mono text-xs cursor-pointer data-[selected=true]:bg-primary/10 data-[selected=true]:text-primary"
                >
                  <item.icon className="mr-2 h-3.5 w-3.5 text-muted-foreground" />
                  <span className="flex-1">{item.label}</span>
                  <span className="text-muted-foreground/40 text-[10px]">{item.desc}</span>
                </CommandItem>
              ))}
              <CommandItem
                onSelect={() => run(() => dispatchKeys('jinwoo'))}
                className="font-mono text-xs cursor-pointer data-[selected=true]:bg-primary/10 data-[selected=true]:text-primary"
              >
                <img src={jinwooIcon} alt="Sung Jin-Woo" className="mr-2 h-4 w-4 rounded-full object-cover" />
                <span className="flex-1">jinwoo</span>
                <span className="text-muted-foreground/40 text-[10px]">Awaken the Shadow Monarch</span>
              </CommandItem>
            </CommandGroup>
          </CommandList>

          <div className="border-t border-border/20 px-3 py-2 text-[10px] text-muted-foreground/40 font-mono flex items-center justify-between">
            <span>
              <kbd className="border border-border/20 rounded px-1 py-0.5 mr-1">↑↓</kbd> navigate
              <kbd className="border border-border/20 rounded px-1 py-0.5 mx-1">↵</kbd> select
            </span>
            <span>
              <kbd className="border border-border/20 rounded px-1 py-0.5">⌘K</kbd> toggle
            </span>
          </div>
        </Command>
      </DialogContent>
    </Dialog>
  );
});

CommandPalette.displayName = 'CommandPalette';

export default CommandPalette;
