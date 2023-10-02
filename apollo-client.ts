import type { NormalizedCacheObject } from "@apollo/client/core";
import { ApolloLink } from "@apollo/client/core";
import {
  ApolloClient,
  concat,
  createHttpLink,
  InMemoryCache,
} from "@apollo/client/core";
import introspection from "./introspection.json";
import { useAuthCookies } from "./utilities/Auth";

// TODO: Add FetchTimeoutException and onError

export const createApolloCache = () => {
  return new InMemoryCache({
    possibleTypes: introspection.possibleTypes,
  });
};

export const createApolloClient = ({
  cache,
  ssrCache,
  shouldAuthenticate = false,
}: {
  ssrCache?: NormalizedCacheObject;
  cache?: InMemoryCache;
  shouldAuthenticate?: boolean;
}) => {
  const config = useRuntimeConfig();

  const authLink = new ApolloLink((operation, forward) => {
    const getToken = () => {
      if (!shouldAuthenticate) return;

      const { accessToken } = useAuthCookies();

      return accessToken.value;
    };

    operation.setContext({
      headers: {
        authorization: getToken() ?? "",
      },
    });

    return forward(operation);
  });

  const httpLink = createHttpLink({
    uri: config.public.backend,
  });

  cache ??= createApolloCache();

  if (process.client && ssrCache) {
    cache.restore(ssrCache);
  }

  return new ApolloClient({
    link: concat(authLink, httpLink),
    cache,
    ...(process.server
      ? {
          // Set this on the server to optimize queries when SSR
          ssrMode: true,
        }
      : {
          // This will temporary disable query force-fetching
          ssrForceFetchDelay: 100,
        }),
  });
};
