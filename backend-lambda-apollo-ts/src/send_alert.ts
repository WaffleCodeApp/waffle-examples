import {
  SNSClient,
  PublishCommand,
  PublishInput,
  SNSClientConfig,
} from "@aws-sdk/client-sns";
import { fromIni } from "@aws-sdk/credential-providers";

export const publishAlert = async (alert: string): Promise<void> => {
  // This function publishes a message to the SNS topic
  // that's set up by Waffle for the deployment, for
  // delivering generic alerts. These alerts include notifications
  // from AWS services when anomalies are detected in the operations.
  // How the alerts are delivered, depends on your set up. By default
  // they are sent out as emails to the email address(es) that were
  // defined for the deployment. If you have a listener deployed,
  // then the messages can be delivered to other channels, like Slack.
  const publishInput: PublishInput = {
    Message: alert,
    // ALERTS_TOPIC_ARN is set by the CICD.
    // For local development set it in your local environment to
    // the arn of the Waffle deployment's alert SNS topic.
    TopicArn: process.env.ALERTS_TOPIC_ARN,
  };
  let clientConfig: SNSClientConfig = {};
  // For local development set up a local AWS profile
  // with the deployment's ID as the profile name.
  // Also set the LOCAL_RUN variable to anything,
  // this will make the following code to try to get
  // the AWS credentials from your local AWS profiles.
  if (process.env.LOCAL_RUN != undefined) {
    clientConfig = {
      ...clientConfig,
      // DEPLOYMENT_ID is set by the CICD.
      // For local development set it in your local environment to
      // the Waffle deployment's ID.
      credentials: fromIni({ profile: process.env.DEPLOYMENT_ID }),
      // AWS_REGION is set by the CICD.
      // For local development set it in your local environment to
      // the Waffle deployment's AWS region.
      region: process.env.AWS_REGION,
    };
  }
  const snsClient = new SNSClient(clientConfig);
  const command = new PublishCommand(publishInput);
  const output = await snsClient.send(command);
  console.info(`Message published with id: ${output.MessageId}`);
};
