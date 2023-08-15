import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { VitePWA } from "vite-plugin-pwa";

// https://vitejs.dev/config/
export default defineConfig({
  base: "/",

  plugins: [
    react(),
    VitePWA({
      manifest: {
        name: "My Social Network",
        short_name: "MSN",
        description: "Your best social media",
        start_url: "/",
        display: "standalone",
        background_color: "#ffffff",
        theme_color: "#000000",
        icons: [
          {
            src: "/vite.svg",
            sizes: "192x192",
            type: "image/svg",
          },
        ],
      },
      workbox: {
        swDest: "sw.js",
        globPatterns: ["**/*.{js,css,html,svg}"],
        skipWaiting: true,
        clientsClaim: true,
      },
    }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
