import { defineConfig, loadEnv } from "vite";
import laravel from "laravel-vite-plugin";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";
import manifestSRI from "vite-plugin-manifest-sri";

const env = loadEnv("development", process.cwd());

export default defineConfig({
    plugins: [
        laravel({
            input: "resources/js/app.tsx",
            ssr: "resources/js/ssr.tsx",
            refresh: true,
        }),
        react(),
        manifestSRI(),
        VitePWA({
            registerType: "autoUpdate",
            includeAssets: [
                "/favicon.ico",
                "/robots.txt",
                "/apple-touch-icon.png",
                "/web-app-manifest-192x192.png",
                "/web-app-manifest-512x512.png",
            ],
            manifest: {
                name: env.VITE_APP_NAME,
                short_name: env.VITE_APP_SHORT_NAME,
                description: env.VITE_APP_DESCRIPTION,
                theme_color: "#ffffff",
                background_color: "#ffffff",
                display: "standalone",
                start_url: "/",
                icons: [
                    {
                        src: "/web-app-manifest-192x192.png",
                        sizes: "192x192",
                        type: "image/png",
                        purpose: "maskable",
                    },
                    {
                        src: "/web-app-manifest-512x512.png",
                        sizes: "512x512",
                        type: "image/png",
                        purpose: "maskable",
                    },
                ],
            },
            workbox: {
                globPatterns: ["**/*.{js,css,html,ico,png,svg,woff2}"],
            },
            devOptions: {
                enabled: true,
            },
        }),
    ],
});
