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
import { Plus } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import ClassStreamCreatePostForm from "@/components/Forms/Class/Stream/ClassStreamCreatePostForm";


const CreateStreamDialogBox = () => {
    return (
        <Dialog>
            <DialogTrigger>
                <Button>
                    <Plus className="mr-2 h-4 w-4" /> Add New
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Create Post</DialogTitle>
                    {/* <DialogDescription>
                        This action cannot be undone. This will permanently delete your account
                        and remove your data from our servers.
                    </DialogDescription> */}
                    <Separator />
                    <ScrollArea>

                        <ClassStreamCreatePostForm />
                    </ScrollArea>
                </DialogHeader>
            </DialogContent>
        </Dialog>

    )
}

export default CreateStreamDialogBox