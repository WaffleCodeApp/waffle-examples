import {
  GetParameterCommand,
  SSMClient,
  SSMClientConfig,
} from "@aws-sdk/client-ssm";
import { fromIni } from "@aws-sdk/credential-providers";
import { EnvVars } from "env_vars";

export const getServiceURL = async (
  stackId: string
): Promise<string | null> => {
  // This function looks up the URL of a backend stack
  // that's deployed using Waffle in the same environment.
  // The URL points to the application load balancer.
  // The URL is HTTP (not HTTPS), as in the Waffle deployments'
  // private VPC subnets the services use no SSL for
  // HTTP requests between each-other. Application load balancers
  // also listen to non-SSL HTTP.

  // DEPLOYMENT_ID is set by the CICD.
  // For local development set it in your local environment to
  // the Waffle deployment's ID.
  const command = new GetParameterCommand({
    Name: `/${EnvVars.get().deploymentId!}/ecs/${stackId}/albDnsName`,
  });
  let clientConfig: SSMClientConfig = {};
  // For local development set up a local AWS profile
  // with the deployment's ID as the profile name.
  // Also set the LOCAL_RUN variable to anything,
  // this will make the following code to try to get
  // the AWS credentials from your local AWS profiles.
  if (process.env.LOCAL_RUN != undefined) {
    clientConfig = {
      ...clientConfig,
      credentials: fromIni({ profile: EnvVars.get().deploymentId! }),
      // AWS_REGION is set by the CICD.
      // For local development set it in your local environment to
      // the Waffle deployment's AWS region.
      region: EnvVars.get().awsRegion!,
    };
  }

  const client = new SSMClient(clientConfig);
  const response = await client.send(command);
  return response.Parameter?.Value
    ? `http://${response.Parameter?.Value}`
    : null;
};
