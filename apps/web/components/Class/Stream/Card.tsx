'use client'

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Edit, MoreHorizontal, Trash } from "lucide-react"
import { AlertModal } from "@/components/Modal/Alert-Modal"
import router from "next/router"

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Separator } from "@/components/ui/separator"

export const StreamCard = () => {
    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);

    const onConfirm = async () => { };
    return (
        <Card className=" w-full lg:w-[60%]">
            <CardHeader>
                {/* <CardTitle>Card Title</CardTitle> */}

                <div className="flex items-center">
                    <Avatar className="h-9 w-9">
                        <AvatarImage src="/avatars/01.png" alt="Avatar" />
                        <AvatarFallback>NB</AvatarFallback>
                    </Avatar>
                    <div className="ml-4 space-y-1">
                        <p className="text-sm font-medium leading-none">Prof. Nayan Bagale</p>
                        <p className="text-sm text-muted-foreground">
                            Mar 24, 2023
                        </p>
                    </div>
                    <div className="ml-auto self-start font-medium">
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
                                    <MoreHorizontal className="h-4 w-4" />
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
                    </div>
                </div>
                <Separator />
            </CardHeader>
            <CardContent>
                <p>Students who were absent in the UT 1 have to submit whole question paper in the form of assignment on or before 26th March 2024.

                    Question paper is attached below.t</p>
            </CardContent>
            {/* <CardFooter>
                <p>Card Footer</p>
            </CardFooter> */}
        </Card>

    )
}
