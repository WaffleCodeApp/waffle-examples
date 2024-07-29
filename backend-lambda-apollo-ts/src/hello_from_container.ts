import createClient from "openapi-fetch";
import { paths } from "./container_openapi";
import { getServiceURL } from "get_service_url";

export const helloFromContainer = async (): Promise<string> => {
  const baseUrl = await getServiceURL("fastapicontainer");
  if (!baseUrl) {
    throw new Error("fastapicontainer url is unknown");
  }
  const { GET } = createClient<paths>({ baseUrl });
  const { data, error } = await GET("/hello_world");
  if (error) {
    throw new Error("request failed");
  }
  return data;
};
