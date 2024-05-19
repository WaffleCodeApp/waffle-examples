declare global {
  namespace NodeJS {
    interface ProcessEnv {
      LOCAL_RUN?: string;
      AWS_REGION?: string;
      DEPLOYMENT_ID?: string;
      SERVICE_SECRET_ARN?: string;
      PIPELINE_ID?: string;
      ALERTS_TOPIC_ARN?: string;
      USER_POOL_ID?: string;
      COGNITO_REGION?: string;
      IDENTITY_POOL_ID?: string;
    }
  }
}
