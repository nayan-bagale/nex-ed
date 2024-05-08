'use client'

import { delete_subject_Action, leave_subject_Action } from "@/action/subject_Action";
import { AlertModal } from "../Modal/Alert-Modal";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useState } from "react";
import { Edit, Trash, MoreVertical, Share2, BookX } from "lucide-react";
import { Separator } from "../ui/separator";
import { Button } from "../ui/button";
import { toast } from "sonner";
import ShareButton from "./ShareButton";


export const MenuT = ({ subject }: { subject: any }) => {
    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);


    const handledelete = async () => {
        setLoading(true);
        const res = await delete_subject_Action(subject.id);
        if (!res) {
            setLoading(false);
            throw new Error("Failed to Delete Subject");
        }
        setOpen(false);
        setLoading(false);
    }

    const onConfirm = async () => {
        toast.promise(handledelete(), {
            loading: 'Adding Subject...',
            success: 'Subject Added Successfully!',
            error: 'Failed to Add Subject'
        })

    };
    return (<>
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
                    <MoreVertical className="h-6 w-6" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                <Separator className=" mb-1" />

                <DropdownMenuItem
                    onClick={() => console.log("Edit")}
                >
                    <ShareButton subject={subject} />
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setOpen(true)}>
                    <Trash className="mr-2 h-4 w-4" /> Delete
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu></>)
}
export const MenuS = ({ subject }: { subject: any }) => {
    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);
    
    const handledelete = async () => {
        setLoading(true);
        const res = await leave_subject_Action(subject.id);
        if (!res.ok) {
            setLoading(false);
            throw new Error("Failed to Delete Subject");
        }
        
        setOpen(false);
        setLoading(false);
    }

    const onConfirm = async () => {
        toast.promise(handledelete(), {
            loading: 'Leaving Subject...',
            success: 'Subject Left Successfully!',
            error: 'Failed to Leave Subject'
        })

    };
    return (<>
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
                    <MoreVertical className="h-6 w-6" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                <Separator className=" mb-1" />
                <DropdownMenuItem
                    onClick={() => console.log("Edit")}
                >
                    <ShareButton subject={subject} />
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setOpen(true)}>
                    <BookX className="mr-2 h-4 w-4" /> Unenroll
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu></>)
}