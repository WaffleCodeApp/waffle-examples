declare global {
  namespace NodeJS {
    interface ProcessEnv {
      LOCAL_RUN?: string;
      AWS_REGION?: string;
      DEPLOYMENT_ID?: string;
      SERVICE_SECRET_ARN?: string;
      PIPELINE_ID?: string;
      ALERTS_TOPIC_ARN?: string;
      ALERT_DELIVERY_LAMBDA_TS_SERVICE_SECRET_ARN?: string;
    }
  }
}
