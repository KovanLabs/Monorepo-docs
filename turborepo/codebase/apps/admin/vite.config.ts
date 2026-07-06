import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  base: process.env.VITE_BASE_PATH || "/",
  plugins: [react()],
  server: {
    proxy: {
      "/blog": {
        target: "http://localhost:5173",
        changeOrigin: true,
      },
      "/store": {
        target: "http://localhost:3002",
        changeOrigin: true,
      },
    },
  },
});
