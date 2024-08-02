import { EnvVars } from "env_vars";
import { helloFromContainer } from "./hello_from_container";
import { Resolvers } from "./resolver-types-generated";
import { ResolverContext } from "./resolver_context";
import { publishAlert } from "./send_alert";

export const resolvers: Resolvers = {
  Query: {
    helloWorld: async (
      _: any,
      __: any,
      contextValue: ResolverContext
    ): Promise<string> => {
      if (!contextValue.user) {
        return "unauthorized";
      }
      const msg = `Hello World from ${EnvVars.get().stackId}!`;
      // The following also triggers a message
      // to be sent as an alert. If you have
      // the alerts-delivery stack deployed, then
      // you can get it delivered to Slack for example.
      await publishAlert(msg);
      return msg;
    },
    helloFromContainer: async (
      _: any,
      __: any,
      contextValue: ResolverContext
    ): Promise<string> => {
      if (!contextValue.user) {
        return "unauthorized";
      }
      return await helloFromContainer();
    },
  },
};
