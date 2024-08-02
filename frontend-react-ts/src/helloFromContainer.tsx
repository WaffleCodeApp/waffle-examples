import { useHelloFromContainerQuery } from "./backend-types-generated";
import { getApolloClient } from "./getApolloClient";

export const HelloFromContainer = () => {
  const { data, loading, error } = useHelloFromContainerQuery({
    client: getApolloClient(),
  });

  if (loading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>{error.message}</div>;
  }
  return <div>{data?.helloFromContainer || ""}</div>;
};
