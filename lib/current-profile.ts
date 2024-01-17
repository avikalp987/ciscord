import { auth } from "@clerk/nextjs"
import { db } from "./db"

export const currentProfile = async () => {
    //getting the userID
    const {userId} = auth()

    //if there is no user id
    if(!userId)
    {
        return null
    }

    const profile = await db.profile.findUnique({
        where: {
            userId: userId
        }
    })

    return profile;
}