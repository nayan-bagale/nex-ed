'use client'
import { delete_stream_Action } from "@/action/stream_Action";
import { AlertModal } from "@/components/Modal/Alert-Modal"
import { Button } from "@/components/ui/button";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useEdgeStore } from "@/lib/edgestore";
import { Edit, MoreVertical, Trash } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export const Menu = ({ id }: { id: string }) => {
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const { edgestore } = useEdgeStore();


    const handleDelete = async () => {
        setLoading(true);
        const res = await delete_stream_Action(id);
        if (!res.ok) {
            setLoading(false);
            setOpen(false);
            return;
        }

        if (Array.isArray(res?.data?.files) && res?.data?.files.length !== 0) {
            await Promise.all(
                res?.data?.files.map(async (file) => {
                    try {
                        await edgestore.publicFiles.delete({
                            url: file.url,
                        });
                        console.log('done')
                    } catch (e: unknown) {
                        console.log(e)
                    }
                })
            );
        }

        setLoading(false);
        setOpen(false);
    }

    const onConfirm = async () => {
        toast.promise(handleDelete(), {
            loading: "Deleting...",
            success: "Deleted",
            error: (err) => {
                return err.message
            },
        });
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
                        <MoreVertical className="h-4 w-4" />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Actions</DropdownMenuLabel>

                    <DropdownMenuItem
                        onClick={() => console.log("Edit")}
                    >
                        <Edit className="mr-2 h-4 w-4" /> Update
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setOpen(true)}>
                        <Trash className="mr-2 h-4 w-4" /> Delete
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </>)
}