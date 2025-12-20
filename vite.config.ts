import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import viteCompression from "vite-plugin-compression";

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
			esbuildOptions: { target: "es2020" },
		},

		preview: {
			port: 4173,
			strictPort: true,
			compression: true,
		},
	};
});
