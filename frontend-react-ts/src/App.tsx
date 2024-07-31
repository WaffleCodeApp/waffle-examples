import { Authenticator, useAuthenticator } from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";
import { Amplify } from "aws-amplify";
import { HelloWorld } from "./helloWorld";
import { HelloFromContainer } from "./helloFromContainer";

Amplify.configure({
  Auth: {
    Cognito: {
      // The following env vars are populated by the CICD pipeline
      userPoolClientId: process.env.REACT_APP_AWS_USER_POOL_CLIENT_ID as string,
      userPoolId: process.env.REACT_APP_AWS_USER_POOL_ID as string,
    },
  },
});

const { Provider: AuthenticatorProvider } = Authenticator;

const AuthCheck = () => {
  const { authStatus } = useAuthenticator((context) => [context.authStatus]);
  if (authStatus === "configuring") {
    return <div>Loading...</div>;
  } else if (authStatus !== "authenticated") {
    return <Authenticator />;
  }
  return (
    <>
      <HelloWorld />
      <HelloFromContainer />
    </>
  );
};

function App() {
  return (
    <AuthenticatorProvider>
      <AuthCheck />
    </AuthenticatorProvider>
  );
}

export default App;
