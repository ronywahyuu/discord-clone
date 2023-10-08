import currentProfile from "@/lib/current-profile";
import { db } from "@/lib/db";
import { MemberRole } from "@prisma/client";
import { NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";
// import {currentProfile} from "@/lib/"
export async function POST(req: Request) {
  try {
    const { name, imageUrl } = await req.json();
    const profile = await currentProfile();

    if (!profile) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const server = await db.server.create({
      data: {
        profileId: profile.id,
        name,
        imageUrl,
        inviteCode: uuidv4(),
        channels: {
          create: [{ name: "general", profileId: profile.id }],
        },
        members: {
          create: [{ profileId: profile.id, role: MemberRole.ADMIN }],
        },
      },
    });

    return NextResponse.json(server);
    // return NextResponse.json({
    //   name,
    //   imageUrl,
    // });
  } catch (error) {
    console.log(error);
  }
}
