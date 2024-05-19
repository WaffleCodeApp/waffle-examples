import { Resolvers } from "resolver-types-generated";
import { ResolverContext } from "resolver_context";

export const resolvers: Resolvers = {
  Query: {
    helloWorld: async (
      _: any,
      __: any,
      contextValue: ResolverContext,
    ): Promise<string> => {
      if (!contextValue.user) {
        return "unauthorized";
      }
      return "Hello World";
    },
  },
};
