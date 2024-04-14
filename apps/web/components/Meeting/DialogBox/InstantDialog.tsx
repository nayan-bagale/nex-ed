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
                <Button>
                    <PictureInPicture2 className="mr-2 h-4 w-4" /> Instant
                </Button>
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