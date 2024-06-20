import { ApolloServer } from "@apollo/server";
import { startServerAndCreateNextHandler } from "@as-integrations/next";
import { makeExecutableSchema } from "@graphql-tools/schema";
import {
  ApolloServerPluginLandingPageLocalDefault,
  ApolloError,
} from "apollo-server-core";
import jwt from "jsonwebtoken";
import { headers } from "next/headers";
import resolvers from "../../../apollo/server/resolvers";
import typeDefs from "../../../apollo/server/typeDefs";

import { prisma } from "../../../lib/prisma";
const schema = makeExecutableSchema({ typeDefs, resolvers });

const getMe = async (req) => {
  const token = headers().get("authorization");
  if (!token) return new Error("Not authenticated");
  try {
    const me = jwt.verify(token, process.env.JWT_SECRET_KEY, (err, res) => {
      if (err) {
        console.log("token expired");
        throw new ApolloError("Invalid or expired token.", "UNAUTHENTICATED");
      }
      return res;
    });
    return { me };
  } catch (error) {
    console.log("error msg : " + error.message);
    // throw new ApolloError("Invalid or expired token.", "UNAUTHENTICATED");
  }
};

const apolloServer = new ApolloServer({
  schema,
  plugins: [ApolloServerPluginLandingPageLocalDefault({ embed: true })],
  formatError: (error) => {
    const message = error.message
      .replace("SequelizeValidationError: ", "")
      .replace("Validation error: ", "")
      .replace("Context creation failed: ", "")
      .replace("Unexpected error value: ", "");
    return { ...error, message };
  },
});

const handler = startServerAndCreateNextHandler(apolloServer, {
  context: async ({ req, res }) => {
    // const me = await getMe(req);
    return {
      // me,
      prisma,
    };
  },
});

export { handler as GET, handler as POST };
