import BreadCrumb from "@/components/BreadCrumb";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import AddSubjectDialog from "@/components/Class/AddSubjectDialog";
import JoinDialog from "@/components/Class/Join/JoinDialog";
import { authOptions } from "@/components/utils/options";
import { getServerSession } from "next-auth";
import { ScrollArea } from "@/components/ui/scroll-area";
import SubjectCard from "@/components/Class/SubjectCard";


async function Class_() {
    const breadcrumbItems = [
        { title: "Dashboard", link: "/dashboard" },
        { title: "Class", link: "/class" },
    ];
    const session = await getServerSession(authOptions);


    return (
        <>
            <ScrollArea className="h-full pb-12">
                <div className="flex-1 space-y-4  p-4 pt-4">
                    <BreadCrumb items={breadcrumbItems} />
                    <div className="flex items-start justify-between">
                        <Heading title='Class' description='Manage your subjects.' />
                        {
                            session?.user.role === 'teacher' ? (
                                <AddSubjectDialog />
                            ) : (
                                <JoinDialog />
                            )
                        }
                    </div>
                    <Separator />
                    <SubjectCard/>
                </div>
            </ScrollArea>
        </>

    );
}

export default Class_;