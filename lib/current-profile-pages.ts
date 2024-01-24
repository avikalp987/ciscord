import { getAuth } from "@clerk/nextjs/server"
import { db } from "./db"
import { NextApiRequest } from "next"

export const currentProfilePages = async (req: NextApiRequest) => {
    //getting the userID
    const {userId} = getAuth(req)

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