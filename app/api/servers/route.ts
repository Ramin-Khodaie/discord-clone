import { currentProfile } from "@/lib/current-profile";
import { v4 as uuidv4 } from 'uuid';
import { NextResponse } from "next/server";

import { db } from "@/lib/db";
import { MemberRole } from "@prisma/client";


export async function POST(req: Request) {
    try {
        const { name, imageUrl } = await req.json();
        const profile = await currentProfile();
        if (!profile) return new NextResponse('Unathorized', { status: 401 });



        const server = await db.server.create({
            data: {
                profileId: profile.id,
                name,
                imageUrl,
                inviteCode: uuidv4(),
                Channels: {
                    create: [
                        { name: 'general', profileId: profile.id }
                    ]
                },
                members: {
                    create: [
                        { profileId: profile.id, role: MemberRole.ADMIN, name: profile.name }
                    ]
                }

            }
        })
        return NextResponse.json(server)
    } catch (error) {
        console.log('[SERVER_REQUEST]', error);
        return new NextResponse('Internal Error', { status: 500 })
    }
}