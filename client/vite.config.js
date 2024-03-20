import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

// you can copy the base structure of manifest object.
const manifestForPlugIn = {
  devOptions: {
    enabled: true,
  },
  manifest: {
    name: "Kawr",
    short_name: "ReactApp",
    description: "A simple React app with PWA support",
    start_url: ".",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#000000",
    icons: [
      {
        src: "football.png",
        sizes: "192x192",
        type: "image/png",
      },
    ],
  },
};

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    host: "localhost", // e.g., 'localhost', '0.0.0.0', 'example.com'
    port: 5173,
  },
  plugins: [react(), VitePWA(manifestForPlugIn)],
});
