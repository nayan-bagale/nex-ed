import BreadCrumb from "@/components/BreadCrumb";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import Card_ from "@/components/Class/Card";

function Class_() {

    const breadcrumbItems = [
        { title: "Dashboard", link: "/dashboard" },
        { title: "Class", link: "/class" },
    ];

    return (
        <div className="flex-1 space-y-4  p-4 pt-6">
            <BreadCrumb items={breadcrumbItems} />
            <div className="flex items-start justify-between">
                <Heading title='Class' description='Manage your account settings and set e-mail preferences.' />
                <Button><Plus className="mr-2 h-4 w-4" /> Add New</Button>
            </div>
            <Separator />
            <div className=" p-2">
                <Card_/>
                
            </div>
        </div>
    );
}

export default Class_;