import BreadCrumb from "@/components/BreadCrumb";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";


const page = ({ params }: { params: { subject: string } }) => {

    const breadcrumbItems = [
        { title: "Dashboard", link: "/dashboard" },
        { title: "Class", link: "/class" },
        { title: params.subject, link: `/class/${params.subject}` },
        { title: "Join", link: `/class/${params.subject}/join` }
    ];
    return (
        // <ScrollArea className="h-full pb-12">
        <div className="flex-1 space-y-4  p-4 pt-4">
            <BreadCrumb items={breadcrumbItems} />
            <div className="flex items-start justify-between">
                <Heading title={`Join ${params.subject.toUpperCase()}`} description='' />
            </div>
            <Separator />
            {/* <div className=" p-2">
                <Tabs defaultValue="stream" className="space-y-4">
                    <div className=" flex justify-between">

                        <TabsList>
                            <TabsTrigger value="stream">Stream</TabsTrigger>
                            <TabsTrigger value="people">
                                People
                            </TabsTrigger>
                        </TabsList>
                        <CreateStreamDialogBox sub_name={params.subject} />
                    </div>
                    <TabsContent value="stream" className="space-y-4">
                        <ScrollArea className="h-screen">
                            <div className=" space-y-4 mb-4">
                                <div className=" space-y-2">
                                    <Heading title={"Stream"} description='' />
                                    <Separator />
                                </div>
                                <div className="flex space-x-4 w-full">
                                    <StreamCard sub_name={params.subject} />
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

            </div> */}
        </div>
        // </ScrollArea>
    )
}

export default page