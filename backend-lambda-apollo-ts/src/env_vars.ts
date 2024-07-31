export type EnvVar = {
  localRun: string | null;
  awsRegion: string | null;
  deploymentId: string | null;
  stackId: string | null;
  serviceSecretArn: string | null;
  userPoolId: string | null;
  cognitoRegion: string | null;
  identityPoolId: string | null;
  alertsTopicArn: string | null;
};

const stringOrNull = (s: string | undefined): string | null =>
  s === "" ? null : s || null;

export class EnvVars {
  static get(): EnvVar {
    return {
      // Set LOCAL_RUN for local development, to use the
      // AWS credentials from local AWS profiles.
      localRun: stringOrNull(process.env.LOCAL_RUN),
      // The rest are set by the CICD during deployment.
      // For local development, use the same values as the
      // CICD, to be able to use services like authentication
      // parameter- or secret management from the deployment.
      awsRegion: stringOrNull(process.env.AWS_REGION),
      deploymentId: stringOrNull(process.env.DEPLOYMENT_ID),
      stackId: stringOrNull(process.env.PIPELINE_ID),
      serviceSecretArn: stringOrNull(process.env.SERVICE_SECRET_ARN),
      userPoolId: stringOrNull(process.env.USER_POOL_ID),
      cognitoRegion: stringOrNull(process.env.COGNITO_REGION),
      identityPoolId: stringOrNull(process.env.IDENTITY_POOL_ID),
      alertsTopicArn: stringOrNull(process.env.ALERTS_TOPIC_ARN),
    };
  }
}
