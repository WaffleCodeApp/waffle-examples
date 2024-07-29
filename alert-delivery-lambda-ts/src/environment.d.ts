declare global {
  namespace NodeJS {
    interface ProcessEnv {
      LOCAL_RUN?: string;
      AWS_REGION?: string;
      DEPLOYMENT_ID?: string;
      SERVICE_SECRET_ARN?: string;
      STACK_ID?: string;
      ALERTS_TOPIC_ARN?: string;
    }
  }
}
