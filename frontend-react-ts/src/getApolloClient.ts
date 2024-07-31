import {
  ApolloClient,
  ApolloLink,
  HttpLink,
  InMemoryCache,
  NormalizedCacheObject,
  concat,
} from "@apollo/client";
import { awsGraphqlFetch } from "./awsGraphqlFetch";

export const getApolloClient = (): ApolloClient<NormalizedCacheObject> => {
  // Best recreated a new one at every authentication event
  // to clear the in memory cache. The service takes care of that.

  const uri = `${process.env.REACT_APP_BACKEND_PROTOCOL}${process.env.REACT_APP_BACKEND_HOST}/${process.env.REACT_APP_BACKEND_PATH}/backend-apollo`;

  const httpLink = new HttpLink({
    uri: uri,
    fetch: awsGraphqlFetch,
  });

  const rootCorporationSelectorMiddleware = new ApolloLink(
    (operation, forward) => {
      operation.setContext(({ headers = {} }) => ({
        headers: {
          ...headers,
          // NOTE: set your custom headers here,
          // and check the backend for CORS headers as well.
          "X-My-Waffle-App-Header": "Something",
        },
      }));

      return forward(operation);
    }
  );

  const client: ApolloClient<NormalizedCacheObject> = new ApolloClient({
    link: concat(rootCorporationSelectorMiddleware, httpLink),
    cache: new InMemoryCache(),
  });
  return client;
};
