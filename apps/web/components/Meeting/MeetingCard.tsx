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
import { useRecoilValue, useSetRecoilState } from "recoil";
import { scheduleMeeting } from "../Store/meeting";

const Menu = ({id}:{id:string}) => {
    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);
    const setMeeting = useSetRecoilState(scheduleMeeting);

    const onConfirm = async () => {
        setLoading(true);
        setMeeting((prev) => prev.filter((meeting) => meeting.id !== id));
        setOpen(false);
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
    const meetings = useRecoilValue(scheduleMeeting);

    return (
            <div className=" flex flex-wrap gap-6 justify-center md:justify-start">
                {
                    meetings.map((meeting) => (
                        <Card key={meeting.id} className=" w-[18rem]">
                            <CardHeader>
                                <div className=" flex justify-between gap-4">
                                    <div className=" space-y-2">
                                        <CardTitle>
                                            {meeting.title}
                                        </CardTitle>

                                        <CardDescription>Sub: {meeting.subject}</CardDescription>
                                    </div>
                                    <div className=" self-start -mt-1 ">
                                        <Menu id={meeting.id} />
                                    </div>
                                </div>
                            </CardHeader>
                            <Separator className=" -mt-2 mb-2" />
                            <CardContent className=" space-y-2">
                                <h3>Prof. {meeting.teacher}</h3>
                                <div className=" flex justify-between text-sm text-muted-foreground">
                                    <p>Date:</p>
                                    <p>{meeting.date.toDateString()}</p>
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
                                    <p>{meeting.cameraAlwaysOn ? 'Always On' : 'Off'}</p>
                                </div>
                                <div className=" flex justify-between text-sm text-muted-foreground">
                                    <p>Visibility:</p>
                                    <p>{meeting.visibility === 'private' ? "Private" : "Public"}</p>
                                </div>
                            </CardContent>
                            <Separator className=" -mt-2 mb-2" />
                            <CardFooter>
                                <Button variant="default" className="w-full mt-2">Join</Button>
                            </CardFooter>
                        </Card>
                    ))
                }

            </div>

    )
}

export default MeetingCard;