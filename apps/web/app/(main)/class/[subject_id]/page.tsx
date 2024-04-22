'use client'

import BreadCrumb from "@/components/BreadCrumb";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Teachers } from "@/components/Class/People/Teachers";
import { Students } from "@/components/Class/People/Students";
import { StreamCard } from "@/components/Class/Stream/Card";
import CreateStreamDialogBox from "@/components/Class/Stream/DialogBox/CreateStream";
import ShareButton from "@/components/Class/ShareButton";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { subjects, SubjectsT } from "@/components/Store/class";
import { useEffect } from "react";
import { get_subject_Action } from "@/action/subject_Action";
import RoleCheckerClient from "@/components/utils/RoleCheckerClient";


const page = ({ params }: { params: { subject_id: string } }) => {
    const set_subjects = useSetRecoilState(subjects);
    const subjects_data = useRecoilValue(subjects);

    useEffect(() => {
        const fetchData = async () => {
            const data = await get_subject_Action(params.subject_id);
            set_subjects([data as SubjectsT]);
        }
        if (subjects_data.length === 0){
            fetchData();
        }
    }, [params.subject_id])

    const subject = subjects_data.find((sub) => sub.id === params.subject_id)
    

    const breadcrumbItems = [
        { title: "Dashboard", link: "/dashboard" },
        { title: "Class", link: "/class" },
        { title: subject?.name as string, link: `/class/${params.subject_id}` }
    ];

    

    return (
        <ScrollArea className="h-full">
        <div className="flex-1 space-y-4  p-4 pt-4">
            <BreadCrumb items={breadcrumbItems} />
            <div className="flex items-start justify-between">
                    <Heading title={subject?.name as string} description={subject?.description as string} />
                <div className="flex items-center justify-center space-x-4">
                    {/* <ShareButton subject={id} /> */}
                </div>
            </div>
            <Separator />
            <div className=" p-2">
                <Tabs defaultValue="stream" className="space-y-4">
                    <div className=" flex justify-between">

                        <TabsList>
                            <TabsTrigger value="stream">Stream</TabsTrigger>
                            <TabsTrigger value="people">
                                People
                            </TabsTrigger>
                        </TabsList>
                        <RoleCheckerClient>
                            
                            <CreateStreamDialogBox sub_id={params.subject_id} />
                        </RoleCheckerClient>
                    </div>
                    <TabsContent value="stream" className="space-y-4">
                        <ScrollArea className="h-screen">
                            <div className=" space-y-4 mb-4">
                                <div className=" space-y-2">
                                    <Heading title={"Stream"} description='' />
                                    <Separator />
                                </div>
                                <div className="flex space-x-4 w-full">
                                        <StreamCard sub_id={params.subject_id} />
                                </div>
                            </div>
                        </ScrollArea>
                    </TabsContent>
                    <TabsContent value="people" className="space-y-4">
                        <ScrollArea className="h-screen">
                            <div className=" space-y-4 mb-4">
                                <div className=" space-y-2">
                                    <Heading title={"Teachers"} description='' />
                                    <Separator />
                                </div>
                                <Teachers />
                            </div>
                            <div className=" space-y-4 mb-4">
                                <div className=" space-y-2">
                                    <Heading title={"Students"} description='' />
                                    <Separator />
                                </div>
                                <Students />
                            </div>
                        </ScrollArea>
                    </TabsContent>
                </Tabs>

            </div>
        </div>
        </ScrollArea>
    )
}

export default page