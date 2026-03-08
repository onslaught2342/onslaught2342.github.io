import { memo, useState } from 'react';
import { Star, GitFork, ExternalLink, Code, FileText, ChevronDown, ChevronUp } from 'lucide-react';
import type { GitHubRepo } from '@/hooks/useGitHubRepos';
import { useRepoReadme } from '@/hooks/useGitHubRepos';
import MarkdownRenderer from './MarkdownRenderer';

const langColors: Record<string, string> = {
  Python: 'hsl(210 80% 60%)',
  JavaScript: 'hsl(50 90% 55%)',
  TypeScript: 'hsl(210 80% 55%)',
  'C++': 'hsl(340 60% 55%)',
  Shell: 'hsl(120 40% 50%)',
  HTML: 'hsl(15 80% 55%)',
  CSS: 'hsl(260 60% 55%)',
};

const GitHubProjectCard = memo(({ repo }: { repo: GitHubRepo }) => {
  const [showReadme, setShowReadme] = useState(false);
  const { data: readme, isLoading: readmeLoading } = useRepoReadme(showReadme ? repo.name : '');

  return (
    <div
      className="block p-4 sm:p-5 glass-subtle rounded-xl border border-border/20
        hover:border-primary/40 hover:bg-primary/5 hover:shadow-[0_0_30px_hsl(var(--primary)/0.15)]
        transition-all duration-500 group perspective-card"
    >
      <a
        href={repo.html_url}
        target="_blank"
        rel="noopener noreferrer"
        className="block"
      >
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="flex items-center gap-2 min-w-0">
            <Code className="w-4 h-4 text-primary flex-shrink-0" />
            <h3 className="font-semibold text-foreground text-sm sm:text-base font-display truncate
              group-hover:text-primary transition-colors">
              {repo.name}
            </h3>
          </div>
          <ExternalLink className="w-3.5 h-3.5 text-muted-foreground/40 group-hover:text-primary/60 
            transition-colors flex-shrink-0" />
        </div>

        <p className="text-xs sm:text-sm text-muted-foreground/70 mb-3 line-clamp-2 font-body">
          {repo.description || 'No description available'}
        </p>

        {repo.topics && repo.topics.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-3">
            {repo.topics.slice(0, 5).map((topic) => (
              <span
                key={topic}
                className="px-2 py-0.5 text-[9px] sm:text-[10px] font-mono rounded-full
                  bg-primary/10 text-primary/70 border border-primary/20"
              >
                {topic}
              </span>
            ))}
          </div>
        )}

        <div className="flex items-center gap-4 text-[10px] sm:text-xs text-muted-foreground/50 font-mono">
          {repo.language && (
            <span className="flex items-center gap-1.5">
              <span
                className="w-2.5 h-2.5 rounded-full"
                style={{ backgroundColor: langColors[repo.language] || 'hsl(var(--muted-foreground))' }}
              />
              {repo.language}
            </span>
          )}
          <span className="flex items-center gap-1">
            <Star className="w-3 h-3" />
            {repo.stargazers_count}
          </span>
          <span className="flex items-center gap-1">
            <GitFork className="w-3 h-3" />
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
        className="mt-3 flex items-center gap-1.5 text-[10px] sm:text-xs text-accent/60 hover:text-accent 
          transition-colors font-mono"
      >
        <FileText className="w-3 h-3" />
        README.md
        {showReadme ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
      </button>

      {showReadme && (
        <div className="mt-3 p-3 rounded-lg bg-muted/10 border border-border/10 max-h-64 overflow-y-auto">
          {readmeLoading ? (
            <p className="text-primary font-mono text-[10px] animate-pulse">Loading README...</p>
          ) : readme ? (
            <MarkdownRenderer content={readme} />
          ) : (
            <p className="text-muted-foreground/40 font-mono text-[10px]">No README found</p>
          )}
        </div>
      )}
    </div>
  );
});

GitHubProjectCard.displayName = 'GitHubProjectCard';
export default GitHubProjectCard;
