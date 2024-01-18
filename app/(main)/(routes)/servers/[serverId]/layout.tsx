import ServerSidebar from "@/components/server/server-sidebar";
import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { redirectToSignIn } from "@clerk/nextjs";
import { redirect } from "next/navigation";

const ServerIdLayout = async ({
    children,
    params,
}: {
    children: React.ReactNode,
    params: {serverId: string}
}) => {

    //fetch the current profile
    const profile = await currentProfile()

    if(!profile)
    {
        return redirectToSignIn()
    }

    //find the server with this id
    const server = await db.server.findUnique({
        where: {
            id: params.serverId,
            members: {
                some: {
                    profileId: profile.id
                }
            }
        }
    })

    //if there is no server
    if(!server)
    {
        return redirect("/")
    }


    return ( 
        <div className="h-full">
            <div className="hidden md:flex h-full w-60 z-20 flex-col fixed inset-y-0">
                <ServerSidebar serverId={params.serverId} />
            </div>
            <main className="h-full md:pl-60">
                {children}
            </main>
        </div>
     );
}
 
export default ServerIdLayout;