import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import runtimeErrorOverlay from "@replit/vite-plugin-runtime-error-modal";

export default defineConfig({
  plugins: [
    react(),
    ...(process.env.NODE_ENV !== "production" &&
    process.env.REPL_ID !== undefined
      ? [
          await import("@replit/vite-plugin-cartographer").then((m) =>
            m.cartographer(),
          ),
        ]
      : []),
  ],
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "client", "src"),
      "@shared": path.resolve(import.meta.dirname, "shared"),
      "@assets": path.resolve(import.meta.dirname, "attached_assets"),
    },
  },
  root: path.resolve(import.meta.dirname, "client"),
  build: {
    outDir: path.resolve(import.meta.dirname, "dist/public"),
    emptyOutDir: true,
  },
  server: {
    fs: {
      strict: true,
      deny: ["**/.*"],
    },
    hmr: {
      overlay: false,
      timeout: 120000,
    },
    watch: {
      usePolling: true,
      interval: 2000,
      ignored: [
        "**/node_modules/**",
        "**/dist/**",
        "**/data/**",
        "**/.git/**",
        "**/.cache/**",
        "**/.next/**",
        "**/temp/**",
        "**/*.tmp"
      ],
    },
  },
  optimizeDeps: {
    include: [
      "react",
      "react-dom",
      "wouter",
      "lucide-react",
      "@tanstack/react-query",
      "framer-motion",
      "recharts",
      "clsx",
      "tailwind-merge",
      "class-variance-authority",
      "date-fns",
      "@builder.io/sdk-react"
    ],
    holdUntilResolved: true,
  },
});
