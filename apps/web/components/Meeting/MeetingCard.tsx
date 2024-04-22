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
import { useEffect, useState } from "react";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { scheduleMeeting } from "../Store/meeting";
import { delete_schedule_meeting, get_schedule_meeting } from "@/action/meetingAction";
import { toast } from "sonner";
import Link from "next/link";

const Menu = ({ id }: { id: string }) => {
    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);
    const setMeeting = useSetRecoilState(scheduleMeeting);

    const handleDelete = async () => {
        const res = await delete_schedule_meeting(id);
        if (!res.ok) {
            setOpen(false);
            throw new Error(res.message);
        }
        setMeeting((prev) => prev.filter((meeting) => meeting.id !== id));
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

    const [meetings, setMeetings] = useRecoilState(scheduleMeeting);
    useEffect(() => {
        const fetchmeetings = async () => {
            const res = await get_schedule_meeting();
            if (res && res?.ok) {
                const pro_data = res?.data?.map((meeting) => {
                    return {
                        id: meeting.id,
                        title: meeting.title,
                        subject_id: meeting.subject_id,
                        date: meeting.date,
                        starttime: meeting.start_time,
                        endtime: meeting.end_time,
                        teacher: meeting.teacher_id,
                        cameraAlwaysOn: meeting.camera,
                        visibility: meeting.visibility ? 'public' : 'private' as 'public' | 'private',
                    }
                })
                if (pro_data !== undefined) {
                    setMeetings((prev) => [...prev, ...pro_data])
                }
            }
        }
        fetchmeetings();
    }, [])

    if (meetings.length === 0) {
        return (
            <div className=" flex justify-center items-center">
                <h1 className=" text-2xl font-bold text-muted-foreground">No Meetings</h1>
            </div>
        )
    }

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

                                    <CardDescription>Sub: {meeting.subject_id}</CardDescription>
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
                                <p>{meeting.date}</p>
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
                            <Link className="w-full" href={`/liveclass/${meeting.id}`}>
                                <Button variant="default" className="w-full mt-2">Join</Button>
                            </Link>
                        </CardFooter>
                    </Card>
                ))
            }

        </div>

    )
}

export default MeetingCard;