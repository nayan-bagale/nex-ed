'use client'

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button";
import { PictureInPicture2 } from "lucide-react";
import InstantCreateMeetingForm from "@/components/Forms/Meeting/instant-create-form";
import InstantJoinMeetingForm from "@/components/Forms/Meeting/instant-join-form";
import { Separator } from "@/components/ui/separator";


const InstantDialog = () => {
    return (
        <Dialog>
            <DialogTrigger>
                <div className="bg-primary text-primary-foreground hover:bg-primary/90 inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-10 px-2 py-2">
                    <PictureInPicture2 className="mr-2 h-4 w-4" /> Instant
                </div>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Create or Join a meeting instantly</DialogTitle>
                    <DialogDescription>
                        You can create a meeting instantly or join a meeting by entering the meeting Id.
                    </DialogDescription>
                </DialogHeader>
                <InstantCreateMeetingForm />
                <Separator/>
                <InstantJoinMeetingForm />
            </DialogContent>
        </Dialog>

    )
}

export default InstantDialog