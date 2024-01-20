import { cn } from "@/lib/utils";
import { Avatar, AvatarImage } from "./ui/avatar";

interface UserAvatarProps {
    src?: string,
    className?: string,
}

const UserAvatar = ({
    src,
    className
}: UserAvatarProps) => {
    return ( 
        <Avatar>
            <AvatarImage
                src={src}
                className={cn(
                    "h-7 w-7 md:h-10 md:w-10",
                    className
                )}
            >

            </AvatarImage>
        </Avatar>
     );
}
 
export default UserAvatar;