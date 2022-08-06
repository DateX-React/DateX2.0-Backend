import { makeExecutableSchema } from "@graphql-tools/schema";

import { graphql } from "graphql";
import typeDefs from "../src/graphql/typedefs";
import resolvers from "../src/graphql/resolvers";

const schema = makeExecutableSchema({ typeDefs, resolvers });

export const GraphQLTestClient = async (
  query: any,
  variables?: any
) => {
  const results = await graphql({
    schema,
    source: query,
    variableValues: variables,
  });

  return results;
};
