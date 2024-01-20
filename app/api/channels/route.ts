import { currentProfile } from "@/lib/current-profile"
import { db } from "@/lib/db"
import { MemberRole } from "@prisma/client"
import { NextResponse } from "next/server"

export async function POST (
    req: Request,
)
{
    try {
        const profile = await currentProfile()

        const {name, type} = await req.json()

        const {searchParams} = new URL(req.url)

        const serverID = searchParams.get("serverId")

        if(!profile)
        {
            return new NextResponse("Unauthorized", {status: 401})
        }

        if(!serverID)
        {
            return new NextResponse("server Id missing", {status: 400});
        }

        //if the user bypassed the front end and send the name as general
        if(name === "general")
        {
            return new NextResponse("Name cannot be 'general'", {status: 400})
        }

        //both admin and moderator can add new channels
        const server = await db.server.update({
            where: {
                id: serverID,
                members: {
                    some: {
                        profileId: profile.id,
                        role: {
                            in: [MemberRole.ADMIN, MemberRole.MODERATOR]
                        }
                    }
                }
                },

                data: {
                    channels: {
                        create: {
                            profileId: profile.id,
                            name,
                            type,
                        }
                    }
                }
            }
        )

        return NextResponse.json(server)

    } catch (error: any) {
        console.log("CHANNELS POST", error)
        return new NextResponse("Internal error", {status: 500})
        
    }
}