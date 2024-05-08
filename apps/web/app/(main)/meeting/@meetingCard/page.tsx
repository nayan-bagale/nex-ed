import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import RoleCheckerClient from '@/components/utils/RoleCheckerClient'
import { convert24To12 } from '@/components/utils/TimeFormatter'
import { Separator } from '@/components/ui/separator'
import Link from 'next/link'
import React, { Suspense } from 'react'
import { Button } from '@/components/ui/button'
import { getCachedMeeting } from '@/action/meetingAction'
import { MeetingMenu } from "@/components/Meeting/MeetingsMenu"
import { Skeleton } from "@/components/ui/skeleton"

const meetingCard = async () => {
    const fetchmeetings = async () => {
        const res = await getCachedMeeting();
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
            return pro_data;
        }
    }
    const meetings = await fetchmeetings();

    if(!meetings) {
        return (
            <div className=" flex justify-center items-center">
                <h1 className=" text-2xl font-bold text-muted-foreground">No Meetings</h1>
            </div>
        )
    }

    return (
        <div className="h-full p-2 gap-4 flex flex-col">
            <div className=" flex flex-wrap gap-6 justify-center md:justify-start">
                {
                    meetings?.map((meeting) => (
                        <Card key={meeting.id} className=" w-[18rem]">
                            <CardHeader>
                                <div className=" flex justify-between gap-4">
                                    <div className=" space-y-2">
                                        <CardTitle>
                                            {meeting.title}
                                        </CardTitle>

                                        <CardDescription>Sub: {meeting.subject_id}</CardDescription>
                                    </div>
                                    <RoleCheckerClient>
                                        <div className=" self-start -mt-1 ">
                                            <Suspense fallback={<Skeleton className=" w-2 h-4" />}>
                                                <MeetingMenu id={meeting.id} />
                                            </Suspense>
                                        </div>
                                    </RoleCheckerClient>
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
                                    <p>{convert24To12(meeting.starttime)}</p>
                                </div>
                                <div className=" flex justify-between text-sm text-muted-foreground">
                                    <p>Duration:</p>
                                    <p>{+meeting.endtime.split(':')[0] - +meeting.starttime.split(':')[0]} hr</p>
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
        </div>
    )
}

export default meetingCard