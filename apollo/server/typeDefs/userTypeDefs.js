import { gql } from "graphql-tag";

export const userTypeDefs = gql`
  type User {
    _id: ID
    firstName: String
    lastName: String
    email: String
    password: String
  }
  type Query {
    getUsers: [User]
  }
`;
