'use client'

import { delete_schedule_meeting } from "@/action/meetingAction";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuLabel, DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { Separator } from "@/components/ui/separator"
import { MoreVerticalIcon, Trash } from "lucide-react";
import { useState } from "react";
import { Button } from "../ui/button";
import { toast } from "sonner";
import { AlertModal } from "../Modal/Alert-Modal";

export const MeetingMenu = ({ id }: { id: string }) => {
    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);

    const handleDelete = async () => {
        const res = await delete_schedule_meeting(id);
        if (!res.ok) {
            setOpen(false);
            throw new Error(res.message);
        }
        
        setOpen(false);
    }

    const onConfirm = async () => {
        setLoading(true);
        toast.promise(handleDelete(), {
            loading: 'Deleting...',
            success: 'Meeting Deleted',
            error: 'Error Deleting Meeting'
        });
        setLoading(false);
    };
    return (
        <>
            <AlertModal
                isOpen={open}
                onClose={() => setOpen(false)}
                onConfirm={onConfirm}
                loading={loading}
            />
            <DropdownMenu modal={false}>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-8 w-8 p-0">
                        <span className="sr-only">Open menu</span>
                        <MoreVerticalIcon className="h-6 w-6" />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                    <Separator className='mb-1' />
                    {/* <DropdownMenuItem
                        onClick={() => console.log("Edit")}
                    >
                        <Edit className="mr-2 h-4 w-4" /> Update
                    </DropdownMenuItem> */}
                    <DropdownMenuItem onClick={() => setOpen(true)}>
                        <Trash className="mr-2 h-4 w-4" /> Delete
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </>
    )
}