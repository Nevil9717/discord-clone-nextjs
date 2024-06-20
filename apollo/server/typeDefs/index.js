import { mergeTypeDefs } from "@graphql-tools/merge";

import { userTypeDefs } from "./userTypeDefs";

const typeDefs = mergeTypeDefs([userTypeDefs]);

export default typeDefs;
