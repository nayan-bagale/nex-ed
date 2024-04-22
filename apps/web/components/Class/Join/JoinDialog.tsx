'use client'

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Plus } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import JoinSubjectForm from "@/components/Forms/Class/JoinSubjectForm";


const JoinDialog = () => {
    return (
        <Dialog>
            <DialogTrigger>
                <div className="bg-primary text-primary-foreground hover:bg-primary/90 inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-10 px-4 py-2">
                    <Plus className="mr-2 h-4 w-4" /> Join Class
                </div>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Join Subject</DialogTitle>
                    <DialogDescription>
                        Enroll to new subject.
                    </DialogDescription>
                    <Separator />
                    <ScrollArea>
                        <JoinSubjectForm />
                    </ScrollArea>
                </DialogHeader>
            </DialogContent>
        </Dialog>

    )
}

export default JoinDialog