import { memo, useMemo, useCallback } from "react";

function slugify(text: string): string {
	return text
		.toLowerCase()
		.replace(/\s+/g, "-")
		.replace(/[^\w-]+/g, "");
}

function parseMarkdown(raw: string): string {
	let html = raw;

	html = html.replace(/```(\w*)\n([\s\S]*?)```/g, (_m, _lang, code) => {
		const escaped = code
			.replace(/</g, "&lt;")
			.replace(/>/g, "&gt;")
			.trimEnd();
		return `<pre class="md-codeblock"><code>${escaped}</code></pre>`;
	});

	const lines = html.split("\n");
	const out: string[] = [];
	let inList = false;

	for (let i = 0; i < lines.length; i++) {
		let line = lines[i];

		if (line.includes("md-codeblock")) {
			out.push(line);
			continue;
		}

		if (/^-{3,}$/.test(line.trim()) || /^\*{3,}$/.test(line.trim())) {
			if (inList) {
				out.push("</ul>");
				inList = false;
			}
			out.push('<hr class="md-hr" />');
			continue;
		}

		const headingMatch = line.match(/^(#{1,4})\s+(.+)$/);
		if (headingMatch) {
			if (inList) {
				out.push("</ul>");
				inList = false;
			}
			const level = headingMatch[1].length;
			const text = headingMatch[2];
			const id = slugify(text.replace(/\*\*/g, "").replace(/`/g, ""));
			out.push(
				`<h${level} id="${id}" class="md-h${level}">${inlineFormat(text)}</h${level}>`,
			);
			continue;
		}

		if (line.startsWith("> ")) {
			if (inList) {
				out.push("</ul>");
				inList = false;
			}
			out.push(
				`<blockquote class="md-blockquote">${inlineFormat(line.slice(2))}</blockquote>`,
			);
			continue;
		}

		const listMatch = line.match(/^(\s*)[-*]\s+(.+)$/);
		if (listMatch) {
			if (!inList) {
				out.push('<ul class="md-ul">');
				inList = true;
			}
			out.push(`<li class="md-li">${inlineFormat(listMatch[2])}</li>`);
			continue;
		}

		const olMatch = line.match(/^(\s*)\d+\.\s+(.+)$/);
		if (olMatch) {
			if (!inList) {
				out.push('<ul class="md-ul md-ol">');
				inList = true;
			}
			out.push(`<li class="md-li">${inlineFormat(olMatch[2])}</li>`);
			continue;
		}

		if (inList && line.trim() === "") {
			out.push("</ul>");
			inList = false;
		}
		if (line.trim() === "") {
			out.push('<div class="md-spacer"></div>');
			continue;
		}

		if (inList) {
			out.push("</ul>");
			inList = false;
		}
		out.push(`<p class="md-p">${inlineFormat(line)}</p>`);
	}

	if (inList) out.push("</ul>");
	return out.join("\n");
}

function inlineFormat(text: string): string {
	text = text.replace(/`([^`]+)`/g, '<code class="md-inline-code">$1</code>');
	text = text.replace(
		/\*\*([^*]+)\*\*/g,
		'<strong class="md-bold">$1</strong>',
	);
	text = text.replace(/\*([^*]+)\*/g, '<em class="md-italic">$1</em>');
	// Hash links → span for internal scroll; external links → normal <a>
	text = text.replace(/\[([^\]]+)\]\(([^)]+)\)/g, (_m, label, url) => {
		if (url.startsWith("#")) {
			return `<span class="md-hash-link md-link" data-hash="${url}" role="link" tabindex="0">${label}</span>`;
		}
		return `<a href="${url}" target="_blank" rel="noopener noreferrer" class="md-link">${label}</a>`;
	});
	return text;
}

const MarkdownRenderer = memo(({ content }: { content: string }) => {
	const html = useMemo(() => parseMarkdown(content), [content]);

	const handleClick = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
		const target = (e.target as HTMLElement).closest(".md-hash-link");
		if (!target) return;
		e.preventDefault();
		const hash = target.getAttribute("data-hash");
		if (!hash) return;
		const container = e.currentTarget;
		const el = container.querySelector(hash);
		if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
	}, []);

	return (
		<div
			className="markdown-body"
			onClick={handleClick}
			dangerouslySetInnerHTML={{ __html: html }}
		/>
	);
});

MarkdownRenderer.displayName = "MarkdownRenderer";
export default MarkdownRenderer;
