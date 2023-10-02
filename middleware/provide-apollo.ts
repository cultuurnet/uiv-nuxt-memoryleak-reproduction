import { provideApolloClient } from "@vue/apollo-composable";
import type {
  InMemoryCache,
  ApolloClient,
  NormalizedCacheObject,
} from "@apollo/client/core";
import { createApolloCache, createApolloClient } from "~~/apollo-client";

let apolloCacheInstance: InMemoryCache | undefined;
let apolloClientInstance: ApolloClient<NormalizedCacheObject> | undefined;

export default defineNuxtRouteMiddleware(() => {
  if (!apolloCacheInstance) {
    apolloCacheInstance = createApolloCache();
  }

  if (!apolloClientInstance) {
    apolloClientInstance = createApolloClient({
      cache: apolloCacheInstance,
    });
  }

  provideApolloClient(apolloClientInstance);
});
