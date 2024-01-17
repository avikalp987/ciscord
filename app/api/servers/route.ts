import { currentProfile } from "@/lib/current-profile"
import { db } from "@/lib/db"
import { MemberRole } from "@prisma/client"
import { NextResponse } from "next/server"
import { v4 as uuidv4 } from "uuid"

export async function POST(req: Request){

    try {
        
        //getting the req values
        const { name, imageUrl } = await req.json()

        //getting the current file
        const profile = await currentProfile()

        //if there is no profile
        if(!profile)
        {
            return new NextResponse("UNAUTHORIZED", {status: 401})
        }

        //if there is a profile we need to create our server
        const server = await db.server.create({
            data: {
                profileId: profile.id,
                name: name,
                imageUrl: imageUrl,
                inviteCode: uuidv4(),
                channels: {
                    create: [
                        {
                            name: "general",
                            profileId: profile.id
                        }
                    ]
                },
                members: {
                    create: [
                        {
                            profileId: profile.id,
                            role: MemberRole.ADMIN,
                        }
                    ]
                }
            }
        })

        return NextResponse.json(server)


    } catch (error: any) {
        console.log("[SERVERS_POST]", error)
        return new NextResponse("Internal server error", { status: 500 })
    }
}