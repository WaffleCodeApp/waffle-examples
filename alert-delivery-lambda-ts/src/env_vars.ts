export interface EnvVar {
  localRun: string | null;
  awsRegion: string | null;
  deploymentId: string | null;
  stackId: string | null;
  serviceSecretName: string | null;
  alertsTopicName: string | null;
}

const stringOrNull = (s: string | undefined): string | null =>
  s === "" ? null : s || null;

export class EnvVars {
  static envVar: EnvVar;

  static get(): EnvVar {
    if (!EnvVars.envVar) {
      EnvVars.envVar = {
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
        serviceSecretName: stringOrNull(process.env.SERVICE_SECRET_ARN),
        alertsTopicName: stringOrNull(process.env.ALERTS_TOPIC_ARN),
      };
    }
    return EnvVars.envVar;
  }
}
