import { initialProfile } from "@/lib/initial-profile";

import { InitialModal } from "@/components/modals/initial-modal";

import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";

const setupPage = async () => {
  const profile = await initialProfile();
  console.log("🚀 ~ setupPage ~ profile", profile);

  const server = await prisma.server.findFirst({
    where: {
      members: {
        some: {
          profileId: profile.id,
        },
      },
    },
  });
  if (server) return redirect(`/servers/${server.id}`);

  return <InitialModal />;
};

export default setupPage;
