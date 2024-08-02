import {
  ApolloClient,
  ApolloLink,
  HttpLink,
  InMemoryCache,
  NormalizedCacheObject,
  concat,
} from "@apollo/client";
import { awsGraphqlFetch } from "./awsGraphqlFetch";

type Client = {
  client: ApolloClient<NormalizedCacheObject> | null;
};
const client: Client = {
  client: null,
};

export const getApolloClient = (): ApolloClient<NormalizedCacheObject> => {
  // NOTE: Probably a good practive to recreate the client at
  // every authentication event to clear the in memory cache.
  // It's not implemented in this simplified demo.

  if (client.client === null) {
    const uri = `${process.env.REACT_APP_BACKEND_PROTOCOL}${process.env.REACT_APP_BACKEND_HOST}/${process.env.REACT_APP_BACKEND_PATH}/backend-apollo`;

    const httpLink = new HttpLink({
      uri: uri,
      fetch: awsGraphqlFetch,
    });

    const addMyHeaderMiddleware = new ApolloLink((operation, forward) => {
      operation.setContext(({ headers = {} }) => ({
        headers: {
          ...headers,
          // NOTE: set your custom headers here,
          // and check the backend for CORS headers as well.
          "X-My-Waffle-App-Header": "Something",
        },
      }));
      return forward(operation);
    });

    client.client = new ApolloClient({
      link: concat(addMyHeaderMiddleware, httpLink),
      cache: new InMemoryCache(),
    });
  }
  return client.client;
};
