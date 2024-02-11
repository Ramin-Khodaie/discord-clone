import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";

interface InviteCodePageProps {
  params: {
    inviteCode: string;
  };
}

const InviteCodePage = async ({ params }: InviteCodePageProps) => {
  const profile = await currentProfile();
  console.log("🚀 ~ file: page.tsx:13 ~ InviteCodePage ~ profile:", profile)

  if (!profile) return redirect("/");

  if (!params.inviteCode) return redirect("/");

  const existingServer = await db.server.findFirst({
    where: {
      inviteCode: params.inviteCode,
      members: {
        some: {
          profileId: profile.id,
        },
      },
    },
  });
  console.log("🚀 ~ file: page.tsx:28 ~ InviteCodePage ~ existingServer:", existingServer)

  if (existingServer) return redirect(`/servers/${existingServer.id}`);

//   const server = await db.server.update({
//     //@ts-ignore
//     where: {
//       inviteCode: params.inviteCode,
//     },
//     data: {
//       members: {
//         create: [
//           {
//             name: profile.name,
//             profileId: profile.id,
//           },
//         ],
//       },
//     },
//   });

//   if (server) {
//     return redirect(`/servers/${server.id}`);
//   }

  return null;
};

export default InviteCodePage