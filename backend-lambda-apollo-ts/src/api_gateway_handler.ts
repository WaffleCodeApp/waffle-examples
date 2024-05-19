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
import { ResolverContext } from "./resolver_context";
import { server } from "./apollo_server";
import { EnvVars } from "env_vars";
import { Users } from "users";
import { Parameters } from "parameters";

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

        const envVars = EnvVars.get();
        if (envVars.localRun) {
          if (envVars.deploymentId === null) {
            throw Error(
              "this is a local run but deploymentId is not set as an env var"
            );
          }
          if (envVars.awsRegion === null) {
            throw Error(
              "this is a local run but awsRegion is not set as an env var"
            );
          }
          Users.setLocalAwsProfile(envVars.deploymentId, envVars.awsRegion);
          Parameters.setLocalAwsProfile(
            envVars.deploymentId,
            envVars.awsRegion
          );
        }
        Parameters.setDeploymentId(envVars.deploymentId!);
        const users = new Users();

        const user = await users.getUserBySub(sub);
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
        "Content-Type,X-Wca-OrganizationId,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token,Accept,Cache",
      "Access-Control-Allow-Credentials": "true",
      "Access-Control-Allow-Methods": "*",
    },
  };
};
