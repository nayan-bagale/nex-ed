import BreadCrumb from "@/components/BreadCrumb";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import Card_ from "@/components/Class/Card";
import AddSubjectDialog from "@/components/Class/AddSubjectDialog";
import { ScrollArea } from "@/components/ui/scroll-area";


function Class_() {

    const breadcrumbItems = [
        { title: "Dashboard", link: "/dashboard" },
        { title: "Class", link: "/class" },
    ];

    return (
        // <ScrollArea className="h-full pb-12">
            <div className="flex-1 space-y-4  p-4 pt-4">
                <BreadCrumb items={breadcrumbItems} />
                <div className="flex items-start justify-between">
                    <Heading title='Class' description='Manage your subjects.' />
                    <AddSubjectDialog />
                </div>
                <Separator />
                <div className=" p-2">
                    <Card_ />

                </div>
            </div>
        // </ScrollArea> 

    );
}

export default Class_;