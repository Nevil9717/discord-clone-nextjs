import { currentUser, redirectToSignIn } from "@clerk/nextjs/server";

import { prisma } from "@/lib/prisma";

export const initialProfile = async () => {
  const user = await currentUser();
  if (!user) return redirectToSignIn();

  const profile = await prisma.profile.findUnique({
    where: { clerkId: user.id },
  });
  if (profile) return profile;

  const newProfile = await prisma.profile.create({
    data: {
      clerkId: user.id,
      email: user.emailAddresses[0].emailAddress,
      name: `${user.firstName} ${user.lastName}`,
      imageUrl: user.imageUrl,
    },
  });
  return newProfile;
};
