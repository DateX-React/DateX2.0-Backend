import "reflect-metadata";
import express from "express";
import http from "http";
import { ApolloServer } from "apollo-server-express";
import { ApolloServerPluginDrainHttpServer } from "apollo-server-core";

import { AppDataSource } from "./data-source/AppDataSource";
import typeDefs from "./graphql/typedefs";
import resolvers from "./graphql/resolvers";
import { PORT } from "./config";

const startServer = async () => {
  const app = express();
  const httpServer = http.createServer(app);

  const server = new ApolloServer({
    typeDefs,
    resolvers,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
    context: ({ req }) => ({ req }),
  });

  await server.start();
  server.applyMiddleware({
    app,
  });

  AppDataSource.initialize().then(() => {
    console.log("⚡ Connected to Postgres");
  });

  await new Promise((resolve) =>
    httpServer.listen({ port: PORT }, resolve)
  );
  console.log(
    `🚀 Server ready at http://localhost:${PORT}${server.graphqlPath}`
  );
};

startServer();
