
import { InitialModal } from "@/components/modals/initial-modal";
import { db } from "@/lib/db";
import { initialProfile } from "@/lib/initial-profile";
import { redirect } from "next/navigation";

const SetupPage = async () => {

    //getting the initial profile
    const profile = await initialProfile()

    //finding the server of which this profile is a member of
    const server = await db.server.findFirst({
        where: {
            members: {
                some: {
                    profileId: profile.id
                }
            }
        }
    })

    //if the user is a part of a server
    if(server)
    {
        return redirect(`/servers/${server.id}`)
    }

    //if the user is not a part of any server
    return <InitialModal />
}
 
export default SetupPage;