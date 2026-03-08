import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { ArrowLeft, Search, Github, Star, GitFork, Code } from 'lucide-react';
import { motion } from 'framer-motion';
import { useGitHubRepos } from '@/hooks/useGitHubRepos';
import GitHubProjectCard from '@/components/GitHubProjectCard';
import MatrixRain from '@/components/MatrixRain';
import ScanlineEffect from '@/components/ScanlineEffect';
import GlitchText from '@/components/GlitchText';
import RepoCardSkeleton from '@/components/RepoCardSkeleton';
import BackToTop from '@/components/BackToTop';
import ThemeToggle from '@/components/ThemeToggle';
import CommandPalette from '@/components/CommandPalette';
import UptimeCounter from '@/components/UptimeCounter';

const Projects = () => {
  const { data: repos, isLoading, error } = useGitHubRepos();
  const [search, setSearch] = useState('');
  const [langFilter, setLangFilter] = useState<string | null>(null);

  const languages = [...new Set(repos?.map((r) => r.language).filter(Boolean) || [])];

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
    const topLang = Object.entries(langCounts).sort((a, b) => b[1] - a[1])[0];
    return { totalStars, totalForks, topLang: topLang?.[0] || 'N/A' };
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
    <div className="relative min-h-screen bg-background overflow-x-hidden flex flex-col">
      <Helmet>
        <title>Projects | Onslaught2342</title>
        <meta name="description" content="Browse all open-source repositories by Onslaught2342 — cybersecurity tools, encryption projects, and more." />
        <meta property="og:title" content="Projects | Onslaught2342" />
      </Helmet>
      <MatrixRain />
      <ScanlineEffect />
      <BackToTop />
      <CommandPalette />

      <header className="border-b border-border/20 glass sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-3 sm:px-6 py-3 sm:py-4 flex items-center justify-between">
          <Link
            to="/"
            className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors font-mono"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>cd ..</span>
          </Link>
          <div className="flex items-center gap-2">
            <a
              href="https://github.com/onslaught2342"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-xs text-muted-foreground hover:text-primary transition-colors font-mono"
            >
              <Github className="w-4 h-4" />
              <span className="hidden sm:inline">github.com/onslaught2342</span>
            </a>
            <ThemeToggle />
          </div>
        </div>
      </header>

      <main className="relative z-10 max-w-6xl mx-auto px-3 sm:px-6 py-8 sm:py-12 flex-1">
        <motion.div
          className="mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-2xl sm:text-4xl font-bold text-foreground font-display mb-2">
            <GlitchText text="ALL REPOSITORIES" intensity="low" />
          </h1>
          <p className="text-sm text-muted-foreground/60 font-mono">
            $ ls -la /projects/ <span className="text-primary">({repos?.length || 0} repos)</span>
          </p>
        </motion.div>

        {/* Stats Summary */}
        {stats && (
          <motion.div
            className="flex flex-wrap gap-4 sm:gap-6 mb-8 px-4 py-3 glass-subtle rounded-xl border border-border/20 font-mono text-xs sm:text-sm"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
          >
            <span className="flex items-center gap-1.5 text-muted-foreground/70">
              <Star className="w-3.5 h-3.5 text-primary" />
              Total Stars: <span className="text-primary font-semibold">{stats.totalStars}</span>
            </span>
            <span className="flex items-center gap-1.5 text-muted-foreground/70">
              <GitFork className="w-3.5 h-3.5 text-accent" />
              Total Forks: <span className="text-accent font-semibold">{stats.totalForks}</span>
            </span>
            <span className="flex items-center gap-1.5 text-muted-foreground/70">
              <Code className="w-3.5 h-3.5 text-secondary" />
              Top Language: <span className="text-secondary font-semibold">{stats.topLang}</span>
            </span>
          </motion.div>
        )}

        {/* Filters */}
        <motion.div
          className="flex flex-col sm:flex-row gap-3 mb-8"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.15 }}
        >
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground/40" />
            <input
              type="text"
              placeholder="Search repositories..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 glass-subtle rounded-xl text-sm text-foreground
                placeholder:text-muted-foreground/40 border border-border/20
                focus:border-primary/40 focus:outline-none focus:shadow-[0_0_20px_hsl(var(--primary)/0.1)]
                transition-all font-mono bg-transparent"
            />
          </div>
          <div className="flex gap-2 flex-wrap">
            <button
              onClick={() => setLangFilter(null)}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all ${
                !langFilter
                  ? 'bg-primary/20 text-primary border border-primary/30'
                  : 'glass-subtle text-muted-foreground hover:text-foreground'
              }`}
            >
              All
            </button>
            {languages.map((lang) => (
              <button
                key={lang}
                onClick={() => setLangFilter(lang === langFilter ? null : lang!)}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all ${
                  langFilter === lang
                    ? 'bg-primary/20 text-primary border border-primary/30'
                    : 'glass-subtle text-muted-foreground hover:text-foreground'
                }`}
              >
                {lang} <span className="opacity-50">({langCounts[lang!] || 0})</span>
              </button>
            ))}
          </div>
        </motion.div>

        {/* Content */}
        {isLoading && (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {Array.from({ length: 6 }).map((_, i) => (
              <RepoCardSkeleton key={i} />
            ))}
          </div>
        )}

        {error && (
          <div className="text-center py-20">
            <p className="text-destructive font-mono">Error loading repositories. Try again later.</p>
          </div>
        )}

        {filtered && filtered.length > 0 && (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filtered.map((repo, i) => (
              <motion.div
                key={repo.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: Math.min(i * 0.06, 0.3) }}
              >
                <GitHubProjectCard repo={repo} />
              </motion.div>
            ))}
          </div>
        )}

        {filtered?.length === 0 && !isLoading && (
          <div className="text-center py-20">
            <div className="inline-block glass-subtle rounded-xl border border-border/20 px-6 py-8 max-w-md">
              <p className="text-primary font-mono text-sm mb-2">
                $ grep -r "<span className="text-accent">{search || langFilter}</span>" /projects/
              </p>
              <p className="text-muted-foreground/50 font-mono text-xs mb-4">
                → 0 results found
              </p>
              <button
                onClick={() => { setSearch(''); setLangFilter(null); }}
                className="text-xs font-mono text-primary/60 hover:text-primary transition-colors underline underline-offset-4"
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
        <p className="text-center text-[10px] text-muted-foreground/30 font-mono">
          © {new Date().getFullYear()} Onslaught2342 — All systems operational
        </p>
      </footer>
    </div>
  );
};

export default Projects;
