import BreadCrumb from "@/components/BreadCrumb";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import Card_ from "@/components/Class/Card";
import AddSubjectDialog from "@/components/Class/AddSubjectDialog";

function Class_() {

    const breadcrumbItems = [
        { title: "Dashboard", link: "/dashboard" },
        { title: "Class", link: "/class" },
    ];

    return (
        <div className="flex-1 space-y-4  p-4 pt-6">
            <BreadCrumb items={breadcrumbItems} />
            <div className="flex items-start justify-between">
                <Heading title='Class' description='Manage your subjects.' />
                <AddSubjectDialog />
            </div>
            <Separator />
            <div className=" p-2">
                <Card_/>
                
            </div>
        </div>
    );
}

export default Class_;