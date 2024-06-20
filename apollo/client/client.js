"use client";

import { ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";

const GRAPHQL_ENDPOINT = "/api/graphql";

// Create an HTTP link
const httpLink = createHttpLink({
  uri: GRAPHQL_ENDPOINT,
  credentials: "include",
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem("token") || "";
  return {
    headers: {
      ...headers,
      Authorization: token,
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

export default client;
