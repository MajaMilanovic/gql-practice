import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
// const { addMocksToSchema } = require("@graphql-tools/mock");
// const { makeExecutableSchema } = require("@graphql-tools/schema");
// https://stackoverflow.com/questions/65873101/node-requires-file-extension-for-import-statement
import { typeDefs } from "./schema.js";
import { resolvers } from "./resolvers.js";
import { TrackAPI } from "./datasources/track-api.js";
// const mocks = require("./mocks");

/** NOTES:
 * 🚀 schema property = another way of initializing an Apollo Server, which is useful for building federated subgraphs
 * or if we're using functions like makeExecutableSchema
 */

/**
 * SERVER PURPOSES:
 * Receive an incoming GraphQL query from our client
 * Validate that query against our newly created schema
 * Populate the queried schema fields with mocked data ( will use libs for mocks)
 * Return the populated fields as a response
 */

// SETUP WITH MOCKS
// async function startApolloServer() {
//   const appServer = new ApolloServer({
//     /**
//      * makeExecutableSchema({ typeDefs }) => generating an executable schema from our typeDefs,
//      * addMocksToSchema => instructing Apollo Server to populate every queried schema field with a placeholder
//      */
//     schema: addMocksToSchema({
//       schema: makeExecutableSchema({ typeDefs }),
//       mocks,
//     }),
//   });
//   const { url } = await startStandaloneServer(appServer);
//   console.log(`
//   🚀  Server is running!
//   📭  Query at ${url}
// `);
// }

async function startApolloServer() {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
  });
  const { url } = await startStandaloneServer(server, {
    // server options
    context: async () => {
      // this object becomes our resolver's contextValue, the third positional argument
      return {
        /**
         * Returning the dataSources object will make our RestDataSource API
         * available to all resolvers from their contextValue parameter.
         */
        dataSources: {
          trackAPI: new TrackAPI(),
        },
      };
    },
  });
  console.log(`
        🚀  Server is running
        📭  Query at ${url}
      `);
}

startApolloServer();
