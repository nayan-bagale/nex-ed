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
import { Edit, Trash, MoreVertical } from "lucide-react";
import { AlertModal } from "../Modal/Alert-Modal";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useState } from "react";
import { useSetRecoilState, useRecoilValue } from "recoil";
import { subjects, subject_stream } from "../Store/class";
import { ScrollArea } from "../ui/scroll-area";


const Menu = ({ id }: { id: string }) => {
    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);
    const setSubjects = useSetRecoilState(subjects);
    const setStream = useSetRecoilState(subject_stream)

    const onConfirm = async () => {
        setLoading(true);
        setSubjects((prev) => prev.filter((subject) => subject.id !== id));
        setStream((prev) => prev.filter((stream) => stream.id !== id));
        setOpen(false);
        setLoading(false);
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

                <DropdownMenuItem
                    onClick={() => console.log("Edit")}
                >
                    <Edit className="mr-2 h-4 w-4" /> Update
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setOpen(true)}>
                    <Trash className="mr-2 h-4 w-4" /> Delete
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu></>)
}

const Card_ = () => {

    const allsubjects = useRecoilValue(subjects)

    return (
        <ScrollArea>
            <div className=" flex gap-2 flex-wrap justify-center md:justify-start">{
                allsubjects.map((subject) => (
                    <Card className=" w-[18rem]">
                        <CardHeader>
                            <div className=" flex justify-between pr-2 ">
                                <div className=" space-y-2">
                                    <Link href={`/class/${subject.name.toLowerCase()}`} className=" hover:underline">
                                        <CardTitle>
                                            {subject.name}
                                        </CardTitle>
                                    </Link>

                                </div>
                                <div className=" self-start -mt-3 -mr-5">
                                    <Menu id={subject.id} />
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