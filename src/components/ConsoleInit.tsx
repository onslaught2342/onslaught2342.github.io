import { useEffect } from "react";
import figlet from "figlet";
import customConsole from "@/utils/CustomConsole";

interface ConsoleInitProps {
	enabled?: boolean;
}

export default function ConsoleInit({ enabled = true }: ConsoleInitProps) {
	useEffect(() => {
		customConsole.enable(enabled);

		const bannerConfigs = [
			{ text: "ONSLAUGHT", font: "Big Money-nw", color: "green" },
			{ text: "2342", font: "Doom", color: "cyan" },
			{ text: "Security", font: "Slant", color: "purple" },
			{ text: "Researcher", font: "Slant", color: "pink" },
		];

		async function loadFont(fontName: string) {
			const url = `https://cdn.jsdelivr.net/gh/onslaught2342/cdn@main/assets/fonts/figlet/${fontName}.flf`;
			const res = await fetch(url);
			const raw = await res.text();
			figlet.parseFont(fontName, raw);
		}

		async function initFonts() {
			const fontNames = [...new Set(bannerConfigs.map((b) => b.font))];
			for (const fn of fontNames) {
				await loadFont(fn);
			}
		}

		const renderFiglet = (text: string, font: string) =>
			new Promise<string>((resolve, reject) => {
				figlet.text(text, { font } as any, (err: any, data: any) => {
					if (err) reject(err);
					else resolve(data || "");
				});
			});

		(async () => {
			try {
				await initFonts();

				let delay = 0;
				for (const { text, font, color } of bannerConfigs) {
					const ascii = await renderFiglet(text, font);
					setTimeout(
						() => customConsole.log(ascii, color as any),
						delay,
					);
					delay += 500;
				}

				// Hidden recruitment messages
				setTimeout(() => {
					customConsole.log(
						"═══════════════════════════════════════════════",
						"purple",
					);
					customConsole.log(
						"👁  You found the console. Curious minds are welcome.",
						"cyan",
					);
					customConsole.log(
						"🔓  Try typing 'hack', 'matrix', 'midnight', 'jinwoo', or the Konami code.",
						"green",
					);
					customConsole.log(
						"📡  Want to connect? → /contact",
						"pink",
					);
					customConsole.log(
						"═══════════════════════════════════════════════",
						"purple",
					);
				}, delay + 500);
			} catch {
				// Silently fail if fonts can't load
				customConsole.log("=== ONSLAUGHT2342 ===", "green");
				customConsole.log(
					"Security Researcher | Ethical Hacker",
					"cyan",
				);
			}
		})();
	}, [enabled]);

	return null;
}
