import BreadCrumb from "@/components/BreadCrumb";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";

import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import ProfileForm from "@/components/Profile/Profile";

function Settings() {

    const breadcrumbItems = [
        { title: "Dashboard", link: "/dashboard" },
        { title: "Settings", link: "/settings" },
    ];

    return (
        <div className="flex-1 space-y-4  p-4 pt-6">
            <BreadCrumb items={breadcrumbItems} />
            <div className="">
                <Heading title='Settings' description='Manage your account settings and set e-mail preferences.' />
            </div>
            <Separator />
            <div className=" p-2">

            <Accordion type="single" collapsible>
                <AccordionItem value="item-1">
                    <AccordionTrigger>Profile</AccordionTrigger>
                    <AccordionContent>
                            <ProfileForm />
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2">
                    <AccordionTrigger>Appearence</AccordionTrigger>
                    <AccordionContent>
                            
                    </AccordionContent>
                </AccordionItem>
            </Accordion>
            </div>
        </div>
    );
}

export default Settings;