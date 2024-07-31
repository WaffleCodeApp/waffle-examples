import { Authenticator, useAuthenticator } from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";
import { Amplify } from "aws-amplify";
import { HelloWorld } from "./helloWorld";
import { HelloFromContainer } from "./helloFromContainer";

Amplify.configure({
  Auth: {
    Cognito: {
      // The following env vars are populated by the CICD pipeline
      userPoolId: process.env.REACT_APP_AWS_USER_POOL_ID as string,
      identityPoolId: process.env
        .REACT_APP_AWS_COGNITO_IDENTITY_POOL_ID as string,
      userPoolClientId: process.env
        .REACT_APP_AWS_USER_POOL_WEB_CLIENT_ID as string,
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
