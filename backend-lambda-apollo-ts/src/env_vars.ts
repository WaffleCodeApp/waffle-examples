export type EnvVar = {
  localRun: string | null;
  awsRegion: string | null;
  deploymentId: string | null;
  pipelineId: string | null;
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
      localRun: stringOrNull(process.env.LOCAL_RUN),
      awsRegion: stringOrNull(process.env.AWS_REGION), // This is only used for local dev
      deploymentId: stringOrNull(process.env.DEPLOYMENT_ID),
      pipelineId: stringOrNull(process.env.PIPELINE_ID),
      serviceSecretArn: stringOrNull(process.env.SERVICE_SECRET_ARN),
      userPoolId: stringOrNull(process.env.USER_POOL_ID),
      cognitoRegion: stringOrNull(process.env.COGNITO_REGION),
      identityPoolId: stringOrNull(process.env.IDENTITY_POOL_ID),
      alertsTopicArn: stringOrNull(process.env.ALERTS_TOPIC_ARN),
    };
  }
}
