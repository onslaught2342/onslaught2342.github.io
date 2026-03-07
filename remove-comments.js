import fs from "fs";
import path from "path";
import strip from "strip-comments";

const extensions = [".ts", ".tsx", ".js", ".jsx"];

function walk(dir) {
	for (const file of fs.readdirSync(dir)) {
		const full = path.join(dir, file);

		if (fs.statSync(full).isDirectory()) {
			walk(full);
			continue;
		}

		if (extensions.some((ext) => full.endsWith(ext))) {
			const code = fs.readFileSync(full, "utf8");
			const cleaned = strip(code);
			fs.writeFileSync(full, cleaned);
			console.log("cleaned:", full);
		}
	}
}

walk("./src");
