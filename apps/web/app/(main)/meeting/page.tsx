import BreadCrumb from "@/components/BreadCrumb";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import InstantDialog from "@/components/Meeting/DialogBox/InstantDialog";
import ScheduleDialog from "@/components/Meeting/DialogBox/ScheduleDialog";

function Class_() {

    const breadcrumbItems = [
        { title: "Dashboard", link: "/dashboard" },
        { title: "Meeting", link: "/meeting" },
    ];

    return (
        <div className="flex-1 space-y-4  p-4 pt-6">
            <BreadCrumb items={breadcrumbItems} />
            <div className="flex items-start justify-between">
                <Heading title='Meeting' description='' />
                <div className=" space-x-2">

                    <InstantDialog />
                    <ScheduleDialog />
                </div>
            </div>
            <Separator />
            <div className=" p-2">

            </div>
        </div>
    );
}

export default Class_;