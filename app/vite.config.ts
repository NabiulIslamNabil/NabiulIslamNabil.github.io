import path from "path"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"
import glsl from 'vite-plugin-glsl'

// https://vite.dev/config/
export default defineConfig({
  base: './',
  plugins: [react(), glsl()],
  server: {
    port: 3000,
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
