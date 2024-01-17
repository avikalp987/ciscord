import { auth } from "@clerk/nextjs"
import { createUploadthing, type FileRouter } from "uploadthing/next";
 
const f = createUploadthing();
 
const handleAuth = () => {
    //getting the user id
    const {userId} = auth()

    if(!userId)
    {
        throw new Error("UNAUTHORIZED")
    }

    //if the user id is present return the user id
    return {userId: userId}
}
 
// FileRouter for your app, can contain multiple FileRoutes
export const ourFileRouter = {

    //uploading the server image
    serverImage: f({image: {maxFileSize: "4MB", maxFileCount: 1}})
    .middleware(() => handleAuth())
    .onUploadComplete(() => {}),

    //uploading the message file
    messageFile: f(["image", "pdf"])
    .middleware(() => handleAuth())
    .onUploadComplete(()=>{}),

} satisfies FileRouter;
 
export type OurFileRouter = typeof ourFileRouter;