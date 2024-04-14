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
import { Edit, MoreHorizontal, Trash, MoreVertical } from "lucide-react"
import { AlertModal } from "@/components/Modal/Alert-Modal"

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { useState } from "react";
import { Separator } from "@/components/ui/separator"
import { subject_stream } from "@/components/Store/class";
import { useRecoilValue } from "recoil";

const Menu = () => {
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
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

export const StreamCard = ({ sub_name }: { sub_name: string }) => {
    const streams = useRecoilValue(subject_stream);
    console.log(streams.filter((streams) => streams.subject_name.toLowerCase() === sub_name.toLowerCase()))

    return (
        <div className=" flex flex-col gap-4">{
            streams.filter((streams) => streams.subject_name.toLowerCase() === sub_name.toLowerCase()).map((stream: any) => {
                return (
                    <Card key={stream.id} className=" w-full lg:w-[60%]">
                        <CardHeader>
                            {/* <CardTitle>Card Title</CardTitle> */}

                            <div className="flex items-center">
                                <Avatar className="h-9 w-9">
                                    <AvatarImage src="/avatars/01.png" alt="Avatar" />
                                    <AvatarFallback>NB</AvatarFallback>
                                </Avatar>
                                <div className="ml-4 space-y-1">
                                    <p className="text-sm font-medium leading-none">Prof. {stream.teacher}</p>
                                    <p className="text-sm text-muted-foreground">
                                        {stream.date}
                                    </p>
                                </div>
                                <div className="ml-auto self-start font-medium">
                                    <Menu />
                                </div>
                            </div>
                            <Separator />
                        </CardHeader>
                        <CardContent>
                            <p>{stream.text}</p>
                        </CardContent>
                        {/* <CardFooter>
                            <CardDescription>
                                <a href="#" className="text-primary-foreground">
                                    Download File
                                </a>
                            </CardDescription>
                        </CardFooter> */}
                    </Card>
                )
            }
            )
        }

        </div>
    )
}
