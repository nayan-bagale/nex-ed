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
import { ScrollArea } from "@/components/ui/scroll-area";


const ScheduleDialog = () => {
    return (
        <Dialog>
            <DialogTrigger>
                <div className="bg-primary text-primary-foreground hover:bg-primary/90 inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-8 p-1 ">
                    <CalendarClock className="mr-2 h-4 w-4" /> Schedule
                </div>
            </DialogTrigger>
            <DialogContent className=" h-[85%]">
                <DialogHeader>
                    <DialogTitle>Schedule Meeting</DialogTitle>
                    {/* <DialogDescription>
                        This action cannot be undone. This will permanently delete your account
                        and remove your data from our servers.
                    </DialogDescription> */}
                    <Separator />
                    
                </DialogHeader>
                    <ScrollArea>
                        <ScheduleMeetingForm />
                    </ScrollArea>
            </DialogContent>
        </Dialog>

    )
}

export default ScheduleDialog