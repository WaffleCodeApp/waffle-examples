import { ApolloServer } from "@apollo/server";
import { ResolverContext } from "./resolver_context";
import { resolvers } from "./resolvers";
import { mergeTypeDefs } from "@graphql-tools/merge";
import { loadFilesSync } from "@graphql-tools/load-files";

export const server = new ApolloServer<ResolverContext>({
  typeDefs: mergeTypeDefs(
    // this is only one graphql file now, but could add more:
    loadFilesSync("./backend.graphql", {
      recursive: true,
      extensions: ["graphql"],
    }),
  ),
  resolvers,
});
