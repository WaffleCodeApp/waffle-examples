import {
  GetParameterCommand,
  SSMClient,
  SSMClientConfig,
} from "@aws-sdk/client-ssm";
import { fromIni } from "@aws-sdk/credential-providers";

export class Parameters {
  private static clientConfig: SSMClientConfig = {};
  private static client: SSMClient;
  private static deploymentId: string;

  public static setLocalAwsProfile(profile: string, region: string) {
    Parameters.clientConfig = {
      credentials: fromIni({ profile }),
      region,
    };
  }

  public static setDeploymentId(deploymentId: string) {
    Parameters.deploymentId = deploymentId;
  }

  private static getClient(): SSMClient {
    if (!Parameters.client) {
      Parameters.client = new SSMClient(Parameters.clientConfig);
    }
    return Parameters.client;
  }

  public async getEcsServiceHostname(
    pipelineId: string,
  ): Promise<string | null> {
    if (!Parameters.deploymentId) {
      throw new Error("Parameters.setDeploymentId have to be called first");
    }
    const command = new GetParameterCommand({
      Name: `/${Parameters.deploymentId}/ecs/${pipelineId}/albDnsName`,
    });
    const response = await Parameters.getClient().send(command);
    return response.Parameter?.Value || null;
  }

  // NOTE: acessing the secret of a database that holds the db's credentials would be
  // similar, the param name is:
  // `/${Parameters.deploymentId}/db/${databaseId}/secretName`
}
