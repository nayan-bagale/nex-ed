import { get_subject_Action, join_subject_Action } from "@/action/subject_Action";
import BreadCrumb from "@/components/BreadCrumb";
import JoinForm from "@/components/Class/Join/JoinForm";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";


const page = async ({ params }: { params: { subject_id: string } }) => {
    if(params.subject_id.length !== 10) return <div>Invalid Id</div>;
    const subject = await get_subject_Action(params.subject_id);
    if (!subject) {
        return <div>Not Found</div>;
    }


    const breadcrumbItems = [
        { title: "Dashboard", link: "/dashboard" },
        { title: "Class", link: "/class" },
        { title: subject.name, link: `/class/${params.subject_id}` },
        { title: "Join", link: `/class/${params.subject_id}/join` }
    ];
    
    return (
        // <ScrollArea className="h-full pb-12">
        <div className="flex-1 space-y-4  p-4 pt-4">
            {/* <BreadCrumb items={breadcrumbItems} /> */}
            <div className="flex items-start justify-between">
                <Heading title={`Join ${subject.name}`} description={`${subject.description}`} />
            </div>
            <Separator />
            <div className="flex flex-col space-y-4">
                <div className="flex flex-col space-y-4">
                    <div className="flex items-center justify-between">
                        <h2>Teacher:</h2>
                        <h3>Prof. {subject.teacher}</h3>
                    </div>
                    <div className="flex items-center justify-between">
                        <h2>Join Code</h2>
                        <h3>{subject.id}</h3>
                    </div>
                </div>
            </div>
            <Separator />
            <JoinForm id={subject.id} />
        </div>
        // </ScrollArea>
    )
}

export default page