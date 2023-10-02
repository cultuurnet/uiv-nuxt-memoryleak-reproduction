import { NuxtConfig } from "nuxt/schema";
import vuetify from "vite-plugin-vuetify";

const isDev = process.env.NODE_ENV !== "production";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  runtimeConfig: {
    public: {
      backend: "https://api-test.uit.be",
    },
  },
  typescript: {
    strict: true,
    shim: false,
  },
  devtools: { enabled: true },
  modules: ["@nuxtjs/i18n"],
  i18n: {
    locales: [{ code: "nl", iso: "nl-NL", file: "nl.json" }],
    compilation: {
      escapeHtml: false,
      strictMessage: false,
    },
    defaultLocale: "nl",
    langDir: "locales/",
    lazy: true,
    customRoutes: "config",
    pages: {
      test: { nl: "/test" },
    },
  } satisfies NuxtConfig["i18n"],
  css: ["vuetify/lib/styles/main.sass"],
  build: {
    transpile: ["@apollo/client", "@vue/apollo-composable", "vuetify"],
  },
  hooks: {
    // enable tree shaking
    "vite:extendConfig": (config) => {
      if (!config.plugins) return;

      console.count("adding vuetify vite plugin");

      config.plugins.push(
        vuetify({
          autoImport: true,
          styles: { configFile: "./settings.scss" },
        })
      );
    },
  },
  vite: {
    define: {
      // fixed apollo client err
      __DEV__: isDev.toString(),
      "process.env.DEBUG": false,
    },
    // ssr: {
    //   noExternal: ["vuetify"],
    // },
    css: {
      preprocessorOptions: {
        scss: {
          omitSourceMapUrl: true,
          additionalData: `
              @use './settings.scss' as *;
              @use 'sass:math';
              @import "@/assets/variables.scss";
            `,
        },
      },
    },
  },
});
