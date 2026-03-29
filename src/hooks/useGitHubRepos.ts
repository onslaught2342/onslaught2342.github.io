import { useQuery } from "@tanstack/react-query";

export interface GitHubRepo {
	id: number;
	name: string;
	full_name: string;
	description: string | null;
	html_url: string;
	language: string | null;
	stargazers_count: number;
	forks_count: number;
	topics: string[];
	updated_at: string;
	created_at: string;
	fork: boolean;
	homepage: string | null;
}

export interface RepoWithReadme extends GitHubRepo {
	readme: string | null;
}

const fetchRepos = async (): Promise<GitHubRepo[]> => {
	const res = await fetch(
		"https://api.github.com/users/onslaught2342/repos?sort=updated&per_page=100",
		{ headers: { Accept: "application/vnd.github.v3+json" } },
	);
	if (!res.ok) throw new Error("Failed to fetch repos");
	const data: GitHubRepo[] = await res.json();
	return data.filter((r) => !r.fork);
};

const fetchReadme = async (repoName: string): Promise<string | null> => {
	try {
		const res = await fetch(
			`https://api.github.com/repos/onslaught2342/${repoName}/readme`,
			{ headers: { Accept: "application/vnd.github.v3+json" } },
		);
		if (!res.ok) return null;
		const data = await res.json();
		// Decode base64 content
		const decoded = atob(data.content);
		return decoded;
	} catch {
		return null;
	}
};

export const useGitHubRepos = () => {
	return useQuery({
		queryKey: ["github-repos", "onslaught2342"],
		queryFn: fetchRepos,
		staleTime: 1000 * 60 * 10,
		refetchOnWindowFocus: false,
	});
};

export const useRepoReadme = (repoName: string) => {
	return useQuery({
		queryKey: ["github-readme", repoName],
		queryFn: () => fetchReadme(repoName),
		staleTime: 1000 * 60 * 30,
		refetchOnWindowFocus: false,
		enabled: !!repoName,
	});
};

export const useFeaturedRepos = (count = 4) => {
	const query = useGitHubRepos();
	const featured = query.data
		?.sort(
			(a, b) =>
				b.stargazers_count - a.stargazers_count ||
				new Date(b.updated_at).getTime() -
					new Date(a.updated_at).getTime(),
		)
		.slice(0, count);
	return { ...query, data: featured };
};

export const useGitHubPagesRepos = () => {
	const query = useGitHubRepos();
	// The main github.io repo + any repo with a homepage pointing to github.io
	const pagesRepos = query.data?.filter(
		(r) =>
			r.name === "onslaught2342.github.io" ||
			r.homepage?.includes("onslaught2342.github.io"),
	);
	return { ...query, data: pagesRepos };
};
