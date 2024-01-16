import { currentUser, redirectToSignIn } from "@clerk/nextjs"

import { db } from "@/lib/db"

export const initialProfile = async () => {
    //getting the current user using the clerk api
    const user = await currentUser()

    //if there is no user present
    if(!user)
    {
        return redirectToSignIn()
    }

    //finding our profile model
    const profile = await db.profile.findUnique({
        where: {
            userId: user.id
        }
    })

    //if the profile is found simply return the profile
    if(profile)
    {
        return profile
    }

    //if there is no profile present, create a new one
    const newProfile = await db.profile.create({
        data: {
            userId: user.id,
            name: `${user.firstName} ${user.lastName}`,
            imageUrl: user.imageUrl,
            email: user.emailAddresses[0].emailAddress,
        }
    })

    //after creating the new profile return the new profile
    return newProfile
}