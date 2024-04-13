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
import { CalendarClock } from "lucide-react";
import ScheduleMeetingForm from "@/components/Forms/Meeting/schedule-form";
import { Separator } from "@/components/ui/separator";


const ScheduleDialog = () => {
    return (
        <Dialog>
            <DialogTrigger>
                <Button>
                    <CalendarClock className="mr-2 h-4 w-4" /> Schedule
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Schedule Meeting</DialogTitle>
                    {/* <DialogDescription>
                        This action cannot be undone. This will permanently delete your account
                        and remove your data from our servers.
                    </DialogDescription> */}
                    <Separator />
                    <ScheduleMeetingForm />
                </DialogHeader>
            </DialogContent>
        </Dialog>

    )
}

export default ScheduleDialog