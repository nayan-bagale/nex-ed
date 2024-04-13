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
import InstantMeetingForm from "@/components/Forms/Meeting/instant-form";


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
                    <DialogTitle>Are you absolutely sure?</DialogTitle>
                    <DialogDescription>
                        This action cannot be undone. This will permanently delete your account
                        and remove your data from our servers.
                    </DialogDescription>
                </DialogHeader>
                <InstantMeetingForm />
            </DialogContent>
        </Dialog>

    )
}

export default InstantDialog