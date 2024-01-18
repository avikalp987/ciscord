import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { ChannelType } from "@prisma/client";
import { channel } from "diagnostics_channel";
import { redirect } from "next/navigation";
import ServerHeader from "./server-header";

interface ServerSidebarProps{
    serverId: string
}

const ServerSidebar =async ({
    serverId
}: ServerSidebarProps) => {

    //fetch the current profile
    const profile = await currentProfile()

    if(!profile)
    {
        return redirect("/")
    }

    //fetching the server
    const server = await db.server.findUnique({
        where: {
            id: serverId,
        },
        include: {
            channels: {
                orderBy: {
                    createdAt: "asc"
                }
            },
            members: {
                include: {
                    profile: true
                },
                orderBy: {
                    role: "asc",
                }
            }
        }
    })


    //seperate text channels
    const textChannels = server?.channels.filter((channel) => channel.type===ChannelType.TEXT)

    //seperate the audio channel
    const audioChannels = server?.channels.filter((channel) => channel.type===ChannelType.AUDIO)

    //seperate the video channel
    const videoChannels = server?.channels.filter((channel) => channel.type === ChannelType.VIDEO)


    //getting our members and excluding ourselves
    const members = server?.members.filter((member) => member.profileId!==profile.id)


    if(!server)
    {
        return redirect("/")
    }


    //finding our role inside our server
    const role = server.members.find((member) => member.profileId===profile.id)?.role

    return ( 
        <div className="flex flex-col h-full text-primary w-full dark:bg-[#2b2d31] bg-[#F2F3F5]">
            <ServerHeader 
                server={server}
                role={role}
            />
        </div>
     );
}
 
export default ServerSidebar;