import {
  SecretsManager,
  SecretsManagerClientConfig,
} from "@aws-sdk/client-secrets-manager";
import { fromIni } from "@aws-sdk/credential-providers";
import { EnvVars } from "./env_vars";

export type Secret = {
  alertSlackWebhook: string | null;
};

const stringOrNull = (s: string | undefined): string | null =>
  s === "" ? null : s || null;

export const getAlertsSecret = async (): Promise<Secret> => {
  // This function looks up the secret that
  // has the credentials of Slack

  let clientConfig: SecretsManagerClientConfig = {};
  // For local development set up a local AWS profile
  // with the deployment's ID as the profile name.
  // Also set the LOCAL_RUN variable to anything,
  // this will make the following code to try to get
  // the AWS credentials from your local AWS profiles.
  if (EnvVars.get().localRun != undefined) {
    clientConfig = {
      ...clientConfig,
      credentials: fromIni({ profile: EnvVars.get().deploymentId! }),
      // AWS_REGION is set by the CICD.
      // For local development set it in your local environment to
      // the Waffle deployment's AWS region.
      region: EnvVars.get().awsRegion!,
    };
  }

  const client = new SecretsManager(clientConfig);
  const { SecretString } = await client.getSecretValue({
    SecretId: EnvVars.get().serviceSecretName,
  });
  if (SecretString === undefined) {
    console.error(
      "SecretString is undefined, the name or secret value might be wrong"
    );
    throw new Error("SecretString is undefined");
  }

  const fetchedSecrets = JSON.parse(SecretString);

  return {
    alertSlackWebhook: stringOrNull(fetchedSecrets.ALERT_SLACK_WEBHOOK),
  };
};
