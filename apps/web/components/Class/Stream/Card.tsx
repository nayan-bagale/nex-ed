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

import { useEffect, useState } from "react";
import { Separator } from "@/components/ui/separator"
import { subject_stream, Subject_streamT } from "@/components/Store/class";
import { useRecoilState, useSetRecoilState } from "recoil";
import { get_stream_Action, delete_stream_Action } from "@/action/stream_Action"
import Image from "next/image"
import Link from "next/link"
import { toast } from "sonner"
import { useEdgeStore } from "@/lib/edgestore"
import RoleCheckerClient from "@/components/utils/RoleCheckerClient"

const Menu = ({ id }: { id: string }) => {
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const { edgestore } = useEdgeStore();
    const setStream = useSetRecoilState(subject_stream);

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

        setStream((old) => old.filter((stream) => stream.id !== id));
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

export const StreamCard = ({ sub_id }: { sub_id: string }) => {
    const [streams, setStream] = useRecoilState(subject_stream);

    useEffect(() => {
        const fetchData = async () => {
            const data = await get_stream_Action(sub_id);
            setStream(data as Subject_streamT[]);
        }
        fetchData();
    }, [sub_id])


    return (
        <div className=" flex flex-col gap-4">{
            streams.filter((streams) => streams.subject_id === sub_id).map((stream) => {
                return (
                    <Card key={stream.id} className=" w-full">
                        <CardHeader>
                            {/* <CardTitle>Card Title</CardTitle> */}

                            <div className="flex items-center">
                                <Avatar className="h-9 w-9">
                                    <AvatarImage className=" object-cover" src={stream.profile} alt="Avatar" />
                                    <AvatarFallback>NB</AvatarFallback>
                                </Avatar>
                                <div className="ml-4 space-y-1">
                                    <p className="text-sm font-medium leading-none">Prof. {stream.teacher}</p>
                                    <p className="text-sm text-muted-foreground">
                                        {stream.date}
                                    </p>
                                </div>
                                <RoleCheckerClient>
                                    <div className="ml-auto self-start font-medium">
                                        <Menu id={stream.id} />
                                    </div>
                                </RoleCheckerClient>
                            </div>
                            <Separator />
                        </CardHeader>
                        <CardContent>
                            <p className="mb-3">{stream.text}</p>
                            {stream.files.length !== 0 && (
                                <>
                                    <div className="flex flex-wrap gap-2">
                                        <StreamFiles files={stream.files} />
                                    </div>
                                </>)}
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


const StreamFiles = ({ files }: { files: { size: number, name: string, url: string }[] }) => {
    return (
        <div className="flex flex-col gap-4">
            {files.map((file) => {
                const ext = file.name.split('.').pop();
                if (ext === 'pdf' || ext === 'docx' || ext === 'doc' || ext === 'ppt' || ext === 'pptx' || ext === 'xls' || ext === 'xlsx') {
                    return (
                        <Link key={file.name} href={file.url} className="">
                            {file.name} <span></span>
                        </Link>
                    )
                } else if (ext === 'jpg' || ext === 'jpeg' || ext === 'png' || ext === 'gif') {
                    return (<div key={file.name} className=' flex flex-col gap-1'>
                        <Link href={file.url} className="">
                            <Image src={file.url} alt={file.name} width={300} height={300} />
                            {file.name}
                        </Link>
                    </div>
                    )
                }

                return (
                    <a key={file.name} href={file.url} className="text-primary-foreground">
                        {file.name}
                    </a>
                )
            }
            )}
        </div>
    )
}