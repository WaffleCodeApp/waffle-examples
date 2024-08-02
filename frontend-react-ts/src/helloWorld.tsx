import { useHelloWorldQuery } from "./backend-types-generated";
import { getApolloClient } from "./getApolloClient";

export const HelloWorld = () => {
  const { data, loading, error } = useHelloWorldQuery({
    client: getApolloClient(),
  });

  if (loading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>{error.message}</div>;
  }
  return <div>{data?.helloWorld || ""}</div>;
};
