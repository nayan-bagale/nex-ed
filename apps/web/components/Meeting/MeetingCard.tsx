'use client'

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Separator } from "../ui/separator";
import { Button } from "../ui/button";
import { Edit, Trash, MoreVerticalIcon } from "lucide-react";
import { AlertModal } from "../Modal/Alert-Modal";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useState } from "react";

const Menu = () => {
    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);

    const onConfirm = async () => { };
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
        </>
    )
}

const MeetingCard = () => {
    return (
        <Card className=" w-fit">
            <CardHeader>
                <div className=" flex justify-between gap-4">
                    <div className=" space-y-2">
                        <CardTitle>
                            DLT - Lecture 2
                        </CardTitle>

                        <CardDescription>Sub: DLT</CardDescription>
                    </div>
                    <div className=" self-start -mt-1 ">
                        <Menu />
                    </div>
                </div>
            </CardHeader>
            <Separator className=" -mt-2 mb-2" />
            <CardContent className=" space-y-2">
                <h3>Prof. Nayan Bagale</h3>
                <div className=" flex justify-between text-sm text-muted-foreground">
                    <p>Date:</p>
                    <p>10/10/2021</p>
                </div>
                <div className=" flex justify-between text-sm text-muted-foreground">
                    <p>Time:</p>
                    <p>10:00 AM</p>
                </div>
                <div className=" flex justify-between text-sm text-muted-foreground">
                    <p>Duration:</p>
                    <p>1hr</p>
                </div>
                <div className=" flex justify-between text-sm text-muted-foreground">
                    <p>Camera:</p>
                    <p>Always On</p>
                </div>
                <div className=" flex justify-between text-sm text-muted-foreground">
                    <p>Visibility:</p>
                    <p>Private</p>
                </div>
            </CardContent>
            <Separator className=" -mt-2 mb-2" />
            <CardFooter>
                <Button variant="default" className="w-full mt-2">Join</Button>
            </CardFooter>
        </Card>

    )
}

export default MeetingCard;