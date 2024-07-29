import {
  startServerAndCreateLambdaHandler,
  handlers,
} from "@as-integrations/aws-lambda";
import {
  APIGatewayEvent,
  APIGatewayProxyResult,
  APIGatewayProxyStructuredResultV2,
  Callback,
  Context,
} from "aws-lambda";
import { GraphQLError } from "graphql";
import { server } from "./apollo_server";
import { ResolverContext } from "./resolver_context";
import { getUserBySub } from "./get_user_by_sub";

export const handler = async (
  event: APIGatewayEvent,
  context: Context,
  callback: Callback<APIGatewayProxyStructuredResultV2 | APIGatewayProxyResult>
): Promise<any> => {
  const apolloHandler = startServerAndCreateLambdaHandler(
    server,
    handlers.createAPIGatewayProxyEventRequestHandler(),
    {
      context: async ({ event, context }): Promise<ResolverContext> => {
        const {
          requestContext: {
            identity: { cognitoAuthenticationProvider },
          },
          headers,
        } = event;
        console.log("handler: headers", headers);
        const selectedOrganizationId = headers["x-wca-organizationid"] || null;
        if (cognitoAuthenticationProvider === null) {
          console.error(
            "lambda handler: authentication information not found, rejecting the request"
          );
          throw new GraphQLError("Auth error", {
            extensions: {
              http: { status: 500 },
            },
          });
        }
        const sub: string =
          cognitoAuthenticationProvider.split(":CognitoSignIn:")[1];

        const user = await getUserBySub(sub);
        if (user === null) {
          console.error(
            "lambda handler: user not found with sub, rejecting the request"
          );
          throw new GraphQLError("Auth error", {
            extensions: {
              code: "UNAUTHENTICATED",
              http: { status: 401 },
            },
          });
        }
        const resolverContext: ResolverContext = {
          user,
        };
        return resolverContext;
      },
    }
  );
  const resp = await apolloHandler(event, context, callback);
  return {
    ...resp,
    headers: {
      ...resp?.headers,
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Headers":
        // NOTE: set your custom headers here,
        // and check the frontend as well
        "Content-Type,X-My-Waffle-App-Header,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token,Accept,Cache",
      "Access-Control-Allow-Credentials": "true",
      "Access-Control-Allow-Methods": "*",
    },
  };
};
