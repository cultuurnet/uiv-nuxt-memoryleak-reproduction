import { createVuetify } from "vuetify";
import { nl } from "vuetify/locale";

export default defineNuxtPlugin((nuxtApp) => {
  const vuetify = createVuetify({
    ssr: true,
    locale: {
      locale: "nl",
      messages: { nl },
    },
    theme: {
      themes: {
        light: {
          dark: false,
          colors: {
            primary: "#ea1340",
            secondary: "#27856e",
          },
        },
      },
    },
  });

  nuxtApp.vueApp.use(vuetify);
});
