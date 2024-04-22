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
import Link from "next/link";
import { Button } from "../ui/button";
import { Edit, Trash, MoreVertical, Share2, BookX } from "lucide-react";
import { AlertModal } from "../Modal/Alert-Modal";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useEffect, useState } from "react";
import { useSetRecoilState, useRecoilValue } from "recoil";
import { subjects, subject_stream, SubjectsT } from "../Store/class";
import { ScrollArea } from "../ui/scroll-area";
import ShareButton from "./ShareButton";
import { delete_subject_Action, leave_subject_Action } from "@/action/subject_Action";
import { toast } from "sonner";
import { useSession } from "next-auth/react";


const MenuT = ({ id }: { id: string }) => {
    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);
    const setSubjects = useSetRecoilState(subjects);
    const setStream = useSetRecoilState(subject_stream)

    const handledelete = async () => {
        setLoading(true);
        const res = await delete_subject_Action(id);
        if (!res) {
            setLoading(false);
            throw new Error("Failed to Delete Subject");
        }
        setSubjects((prev) => prev.filter((subject) => subject.id !== id));
        setStream((prev) => prev.filter((stream) => stream.id !== id));
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
                    <ShareButton id={id} />
                </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setOpen(true)}>
                        <Trash className="mr-2 h-4 w-4" /> Delete
                    </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu></>)
}
const MenuS = ({ id }: { id: string }) => {
    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);
    const setSubjects = useSetRecoilState(subjects);
    const setStream = useSetRecoilState(subject_stream)

    const handledelete = async () => {
        setLoading(true);
        const res = await leave_subject_Action(id);
        if (!res.ok) {
            setLoading(false);
            throw new Error("Failed to Delete Subject");
        }
        setSubjects((prev) => prev.filter((subject) => subject.id !== id));
        setStream((prev) => prev.filter((stream) => stream.id !== id));
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
                    <ShareButton id={id} />
                </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setOpen(true)}>
                    <BookX className="mr-2 h-4 w-4" /> Unenroll
                    </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu></>)
}

const Card_ = ({ data }: { data: SubjectsT[] }) => {
    const setSubjects = useSetRecoilState(subjects);
    const {data:session} = useSession();

    useEffect(() => {
        setSubjects(data);
    }, [data]);

    const allsubjects = useRecoilValue(subjects)

    return (
        <ScrollArea>
            <div className=" flex gap-2 flex-wrap justify-center md:justify-start">{
                allsubjects.map((subject) => (
                    <Card className=" w-[18rem]">
                        <CardHeader>
                            <div className=" flex justify-between pr-2 ">
                                <div className=" space-y-2">
                                    <Link href={`/class/${subject.id}`} className=" hover:underline">
                                        <CardTitle>
                                            {subject.name}
                                        </CardTitle>
                                    </Link>

                                </div>
                                <div className=" self-start -mt-3 -mr-5">
                                    {session?.user.role === 'teacher' ? (<MenuT id={subject.id} />) : (<MenuS id={subject.id} />)}
                                </div>
                            </div>
                        </CardHeader>
                        {/* <Separator className=" -mt-2 mb-2" /> */}
                        <CardContent>
                            <CardDescription>{subject.description}</CardDescription>
                            <p className="text-sm text-muted-foreground">Prof. {subject.teacher}</p>
                        </CardContent>
                        <Separator className=" -mt-2 mb-2" />
                        <CardFooter>
                            <div className=" flex justify-between w-full">
                                <p className="text-sm">Total Students: </p>
                                <p className="text-sm">{subject.total_students >= 99 ? "+99" : subject.total_students.toString()}</p>
                            </div>
                        </CardFooter>
                    </Card>
                ))
            }
            </div>
        </ScrollArea>

    )
}

export default Card_;