import createClient from "openapi-fetch";
import { paths } from "./container_openapi";
import { getServiceURL } from "get_service_url";

export const helloFromContainer = async (): Promise<string> => {
  // use the pipelineId of the backend deployed with
  // the ECS fargate Waffle template:
  const demoBackendPipelineId = "demobackend";
  const baseUrl = await getServiceURL(demoBackendPipelineId);
  if (!baseUrl) {
    throw new Error("demobackend url is unknown");
  }
  const { GET } = createClient<paths>({ baseUrl });
  const { data, error } = await GET("/hello_world");
  if (error) {
    throw new Error("request failed");
  }
  return data;
};
