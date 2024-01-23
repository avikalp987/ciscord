import { db } from "./db"

export const getOrCreateConversation = async (memberOneId: string, memberTwoId: string) => {
    let conversation = await findConverstion(memberOneId, memberTwoId) || await findConverstion(memberTwoId, memberOneId)

    //if conversation is not present then create a new conversation
    if(!conversation)
    {
        conversation = await createNewConversation(memberOneId, memberTwoId)
    }

    return conversation
}

const findConverstion = async (memberOneId: string, memberTwoId: string) => {
    
    try {
        return await db.conversation.findFirst({
            where: {
                AND: [
                    {
                        memberOneId: memberOneId
                    },
                    {
                        memberTwoId: memberTwoId
                    }
                ]
            },
            include: {
                memberOne: {
                    include: {
                        profile: true
                    }
                },
                memberTwo: {
                    include: {
                        profile: true
                    }
                }
            }
        })
    } catch (error) {
        return null
    }

}


const createNewConversation = async (memberOneId: string, memberTwoId: string) => {

    try {
        return await db.conversation.create({
            data: {
                memberOneId,
                memberTwoId,
            },
            include: {
                memberOne: {
                    include: {
                        profile: true
                    }
                },
                memberTwo: {
                    include: {
                        profile: true
                    }
                }
            }
        })
    } catch (error) {
        return null
    }

}