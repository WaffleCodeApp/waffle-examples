import {
  AdminGetUserCommand,
  CognitoIdentityProviderClient,
  CognitoIdentityProviderClientConfig,
  UserNotFoundException,
} from "@aws-sdk/client-cognito-identity-provider";
import { fromIni } from "@aws-sdk/credential-providers";
import { User } from "resolver_context";

export class Users {
  private static clientConfig: CognitoIdentityProviderClientConfig = {};
  private static client: CognitoIdentityProviderClient;
  private static userPoolId: string;

  public static setLocalAwsProfile(profile: string, region: string) {
    Users.clientConfig = {
      credentials: fromIni({ profile }),
      region,
    };
  }

  public static setUserPoolId(userPoolId: string) {
    Users.userPoolId = userPoolId;
  }

  private static getClient(): CognitoIdentityProviderClient {
    if (!Users.client) {
      Users.client = new CognitoIdentityProviderClient(Users.clientConfig);
    }
    return Users.client;
  }

  async getUserBySub(sub: string): Promise<User | null> {
    const command = new AdminGetUserCommand({
      UserPoolId: Users.userPoolId,
      Username: sub,
    });
    try {
      const response = await Users.getClient().send(command);
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
      console.info(
        "UsersWithCognito:getUserBySub: congito command failed",
        err,
      );
      throw err;
    }
  }
}
