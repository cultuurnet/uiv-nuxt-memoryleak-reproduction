import { DefaultApolloClient } from "@vue/apollo-composable";
import { createApolloClient } from "~~/apollo-client";

export default defineNuxtPlugin((nuxtApp) => {
  console.log("in apollo plugin");

  const apolloClient = createApolloClient({
    ssrCache: nuxtApp.payload.apolloCache
      ? toRaw(nuxtApp.payload.apolloCache)
      : undefined,
  });

  nuxtApp.hook("app:rendered", () => {
    if (!nuxtApp.ssrContext) return;

    nuxtApp.ssrContext.payload.apolloCache = apolloClient.cache.extract();
  });

  nuxtApp.vueApp.provide(DefaultApolloClient, apolloClient);
});
