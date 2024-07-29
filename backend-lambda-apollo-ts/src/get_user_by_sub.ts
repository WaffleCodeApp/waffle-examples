import {
  AdminGetUserCommand,
  CognitoIdentityProviderClient,
  CognitoIdentityProviderClientConfig,
  UserNotFoundException,
} from "@aws-sdk/client-cognito-identity-provider";
import { fromIni } from "@aws-sdk/credential-providers";
import { EnvVars } from "env_vars";
import { User } from "resolver_context";

export const getUserBySub = async (sub: string): Promise<User | null> => {
  if (EnvVars.get().userPoolId === null) {
    throw Error("UserpoolId is null");
  }
  const command = new AdminGetUserCommand({
    UserPoolId: EnvVars.get().userPoolId!,
    Username: sub,
  });
  let clientConfig: CognitoIdentityProviderClientConfig = {};
  // For local development set up a local AWS profile
  // with the deployment's ID as the profile name.
  // Also set the LOCAL_RUN variable to anything,
  // this will make the following code to try to get
  // the AWS credentials from your local AWS profiles.
  if (EnvVars.get().localRun !== null) {
    clientConfig = {
      ...clientConfig,
      // DEPLOYMENT_ID is set by the CICD.
      // For local development set it in your local environment to
      // the Waffle deployment's ID.
      credentials: fromIni({ profile: EnvVars.get().deploymentId! }),
      // AWS_REGION is set by the CICD.
      // For local development set it in your local environment to
      // the Waffle deployment's AWS region.
      region: process.env.AWS_REGION,
    };
  }

  const client = new CognitoIdentityProviderClient(clientConfig);

  try {
    const response = await client.send(command);
    const { UserAttributes, Enabled, UserStatus } = response;
    if (UserAttributes === undefined) {
      return null;
    }
    const findStringAttribute = (name: string) => {
      for (const userAttribute of UserAttributes) {
        if (userAttribute.Name === name) {
          return userAttribute.Value;
        }
      }
      return undefined;
    };
    const user: User = {
      id: findStringAttribute("sub") as string,
      name: (findStringAttribute("name") as string) || null,
      email: (findStringAttribute("email") as string) || null,
    };
    return user;
  } catch (err) {
    if (err instanceof UserNotFoundException) {
      console.warn("UsersWithCognito:getUserBySub: user not found");
      return null;
    }
    console.info("UsersWithCognito:getUserBySub: congito command failed", err);
    throw err;
  }
};
