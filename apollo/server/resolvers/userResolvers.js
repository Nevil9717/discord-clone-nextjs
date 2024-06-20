import { auth, currentUser } from "@clerk/nextjs/server";

const getUsers = async () => {
  try {
    const { userId } = auth();
    console.log("🚀 ~ file: userResolvers.js:6 ~ getUsers ~ userId:", userId);
    const user = await currentUser();
    console.log("🚀 ~ file: userResolvers.js:6 ~ getUsers ~ user:", user);
    return "users";
  } catch (error) {
    return new Error(error);
  }
};

export const userResolvers = {
  Query: {
    getUsers,
  },
};
