import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
	plugins: [tailwindcss(), react()],
	server: {
		host: true, // binds to 0.0.0.0 → all network interfaces
		port: 5173, // or any port you prefer
	},
});
