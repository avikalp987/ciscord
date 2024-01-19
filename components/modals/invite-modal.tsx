"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { useModal } from "@/hooks/use-modal-store";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Check, Copy, RefreshCw } from "lucide-react";
import { useOrigin } from "@/hooks/use-origin";
import { useState } from "react";
import axios from "axios";


export const InviteModal = () => {

    const { isOpen, onClose, type, data , onOpen} = useModal()

    const origin = useOrigin()

    const isModalOpen = isOpen && type=="invite"
    const {server}  = data

    const [copied, setCopied] = useState(false)
    const [isLoading,setIsLoading] = useState(false)

    const inviteUrl = `${origin}/invite/${server?.inviteCode}`

    const onCopy = () => {
        navigator.clipboard.writeText(inviteUrl)
        setCopied(true)

        setTimeout(() => {
            setCopied(false)
        },2000)
    }

    const onNew = async () => {
        try {
            
            setIsLoading(true)
            const response = await axios.patch(`/api/servers/${server?.id}/invite-code`)

            //updating the server data
            onOpen("invite", { server: response.data })

        } catch (error: any) {
            console.log(error)
        } finally {
            setIsLoading(false)
        }
    }
    
    
    return ( 
        <Dialog
            open={isModalOpen}
            onOpenChange={onClose}
        >
            <DialogContent className="bg-white text-black p-0 overflow-hidden">
                <DialogHeader className="pt-8 px-6">
                    <DialogTitle className="text-2xl text-center font-bold">
                        Invite Friends
                    </DialogTitle>

                </DialogHeader>

                <div className="p-6">
                    <Label className="uppercase text-xs font-bold text-zinc-500 dark:text-secondary/70">
                        Server invite link
                    </Label>

                    <div className="flex items-center mt-2 gap-x-2">
                        <Input 
                            disabled={isLoading}
                            value={inviteUrl}
                            className="bg-zinc-300/50 border-0 focus-visible:ring-0 text-black focus-visible:ring-offset-0"
                        />

                        <Button
                            disabled={isLoading}
                            size={"icon"}
                            onClick={onCopy}
                        >
                            {copied ? <Check className="h-4 w-4"/> : <Copy className="w-4 h-4"/>}
                            
                        </Button>
                    </div>

                    <Button
                        disabled={isLoading}
                        variant={"link"}
                        size={"sm"}
                        className="text-xs text-zinc-500 mt-4"
                        onClick={onNew}
                    >
                        Generte a new link
                        <RefreshCw className="w-4 h-4 ml-2"/>
                    </Button>
                </div>

            </DialogContent>
        </Dialog>
     );
}