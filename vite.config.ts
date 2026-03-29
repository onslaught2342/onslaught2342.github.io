import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import viteCompression from "vite-plugin-compression";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig(({ mode }) => {
	const isDev = mode === "development";
	const isProd = !isDev;

	return {
		server: {
			host: "::",
			port: 8080,
			open: true,
			hmr: { overlay: false },
		},

		resolve: {
			alias: {
				"@": path.resolve(__dirname, "./src"),
			},
		},

		plugins: [
			react(),

			VitePWA({
				registerType: "autoUpdate",
				includeAssets: ["favicon.ico", "robots.txt"],
				manifest: {
					name: "Onslaught2342 | Security Researcher",
					short_name: "Onslaught2342",
					description:
						"Security Researcher & Ethical Hacker Portfolio",
					theme_color: "#00FF88",
					background_color: "#0a0e14",
					display: "standalone",
					orientation: "portrait-primary",
					icons: [
						{
							src: "/pwa-192.png",
							sizes: "192x192",
							type: "image/png",
						},
						{
							src: "/pwa-512.png",
							sizes: "512x512",
							type: "image/png",
							purpose: "any maskable",
						},
					],
				},
				workbox: {
					navigateFallbackDenylist: [/^\/~oauth/],
					globPatterns: ["**/*.{js,css,html,ico,png,svg,woff2}"],
				},
			}),

			isProd &&
				viteCompression({
					algorithm: "brotliCompress",
					ext: ".br",
					deleteOriginFile: false,
					threshold: 4096,
					compressionOptions: { level: 11 },
				}),

			isProd &&
				viteCompression({
					algorithm: "gzip",
					ext: ".gz",
					deleteOriginFile: false,
					threshold: 4096,
				}),
		].filter(Boolean),

		build: {
			target: "esnext",
			outDir: "dist",
			assetsInlineLimit: 4096,
			cssCodeSplit: true,
			minify: "esbuild",
			reportCompressedSize: false,
			chunkSizeWarningLimit: 1024,
			sourcemap: isDev,
		},

		esbuild: {
			drop: isProd ? ["console", "debugger"] : [],
			legalComments: "none",
		},

		optimizeDeps: {
			include: ["react", "react-dom"],
			esbuildOptions: {
				target: "es2020",
			},
		},

		preview: {
			port: 4173,
			strictPort: true,
		},
	};
});
