'use client'

import React, { useState } from 'react'
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { instantMeeting } from '../Store/meeting';
import { Separator } from '@/components/ui/separator';
import Link from "next/link";
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '../ui/card';
import RoleCheckerClient from '../utils/RoleCheckerClient';
import { AlertModal } from "../Modal/Alert-Modal";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from 'sonner';
import { Edit, MoreVerticalIcon, Trash } from 'lucide-react';
import { useSession } from 'next-auth/react';
import { delete_instant_meeting } from '@/action/meetingAction';

const Menu = ({ id }: { id: string }) => {
    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);
    const setInstantMeeting = useSetRecoilState(instantMeeting);


    const handleDelete = async () => {
        const res = await delete_instant_meeting(id);
        if (!res.ok) {
            setOpen(false);
            throw new Error(res.message);
        }
        setInstantMeeting((prev) => prev.filter((meeting) => meeting.id !== id));

        setOpen(false);

        return res.message;

    }

    const onConfirm = async () => {
        setLoading(true);
        toast.promise(handleDelete(), {
            loading: 'Deleting...',
            success: (res) => res,
            error: (err) => err.message
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
                    <Separator className='mb-1' />
                    <DropdownMenuItem onClick={() => setOpen(true)}>
                        <Trash className="mr-2 h-4 w-4" /> Delete
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </>
    )
}

const InstantCard = () => {
    const intantMeetings = useRecoilValue(instantMeeting);
    const { data: session } = useSession();

    return (
        <div className=' flex flex-wrap gap-4'>
            {intantMeetings.map((meeting) => {
                return (
                    <Card key={meeting.id} className=" w-[18rem]">
                        <CardHeader>
                            <div className=" flex justify-between gap-4">
                                <div className=" space-y-2">
                                    <CardTitle>
                                        {meeting.title}
                                    </CardTitle>
                                </div>
                                {meeting.host_id === session?.user.id && (<div className=" self-start -mt-1 ">
                                    <Menu id={meeting.id} />
                                </div>)}

                            </div>
                        </CardHeader>
                        <Separator className=" -mt-2 mb-2" />
                        <CardContent className=" space-y-2">
                            {/* <h3>Prof. {meeting.teacher}</h3> */}
                            <div className=" flex justify-between text-sm text-muted-foreground">
                                <p>Date:</p>
                                <p>{meeting.date}</p>
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
                )
            })}
        </div>
    )
}

export default InstantCard