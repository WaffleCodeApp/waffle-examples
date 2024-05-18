import aws4 from "aws4-tiny";
import { fetchAuthSession } from 'aws-amplify/auth';

export const awsGraphqlFetch = async (
    uri: RequestInfo | URL,
    options?: RequestInit| undefined,
  ): Promise<Response> => {
    const { host, path, graphqlPath, region } = {
        host: process.env.REACT_APP_BACKEND_HOST,
        path: process.env.REACT_APP_BACKEND_PATH,
        graphqlPath: "/graphql",
        region: process.env.REACT_APP_AWS_PROJECT_REGION,
      };;

    const request = {
      host,
      method: "POST",
      path: `${path}${graphqlPath}`,
      region,
      service: "execute-api",
      // NOTE: options.body is a json string
      body: options?.body,
      headers: options?.headers,
    };

    try {
        const {
            credentials,
        } = await fetchAuthSession();
    
        const signedRequest = aws4.sign(request, credentials);
        if (signedRequest?.headers && signedRequest?.headers["Host"]) {
          delete signedRequest.headers["Host"];
        }
        if (signedRequest?.headers && signedRequest?.headers["Content-Length"]) {
          delete signedRequest.headers["Content-Length"];
        }
        return fetch(uri, signedRequest as RequestInit);
    } catch(e) {
        if ((e as any).name as string === 'UserUnAuthenticatedException') {
          throw Error('Unatuthenticated')
        }
        throw e
      }
  };
