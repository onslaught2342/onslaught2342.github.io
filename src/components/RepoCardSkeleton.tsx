import { memo } from "react";
import { Skeleton } from "@/components/ui/skeleton";

const RepoCardSkeleton = memo(() => (
	<div className="glass-subtle space-y-3 rounded-xl border border-border/20 p-4">
		<Skeleton className="h-5 w-3/4 bg-muted/30" />
		<Skeleton className="h-4 w-full bg-muted/20" />
		<Skeleton className="h-4 w-2/3 bg-muted/20" />
		<div className="flex gap-4 pt-2">
			<Skeleton className="h-3 w-16 bg-muted/20" />
			<Skeleton className="h-3 w-12 bg-muted/20" />
			<Skeleton className="h-3 w-12 bg-muted/20" />
		</div>
	</div>
));

RepoCardSkeleton.displayName = "RepoCardSkeleton";
export default RepoCardSkeleton;
