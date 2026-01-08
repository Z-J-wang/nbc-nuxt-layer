import { fileURLToPath } from "node:url";

export default defineNuxtConfig({
  extends: [".."],
  modules: ["@nuxt/eslint"],
  eslint: {
    config: {
      // Use the generated ESLint config for lint root project as well
      rootDir: fileURLToPath(new URL("..", import.meta.url)),
    },
  },
  ssr: false,
  devtools: { enabled: true },
  app: {
    baseURL: "./",
    // 设置全局默认的 meta
    head: {
      title: "NBC-Nuxt-Layer",
      meta: [{ name: "description", content: "NBC-Nuxt-Layer" }],
    },
  },
  devServer: { port: 8100 },
});
