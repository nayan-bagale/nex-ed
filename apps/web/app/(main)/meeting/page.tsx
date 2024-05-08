import BreadCrumb from "@/components/BreadCrumb";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import ScheduleDialog from "@/components/Meeting/DialogBox/ScheduleDialog";
import RoleChekerServer from "@/components/utils/RoleChekerServer";


function page() {

    const breadcrumbItems = [
        { title: "Dashboard", link: "/dashboard" },
        { title: "Meeting", link: "/meeting" },
    ];

    return (
        <>
            <BreadCrumb items={breadcrumbItems} />
            <div className="flex items-start justify-between">
                <Heading title='Meeting' description='' />
                <div className=" space-x-2">
                    {/* <InstantDialog /> */}
                    <RoleChekerServer>
                        <ScheduleDialog />
                    </RoleChekerServer>
                </div>
            </div>
            <Separator />

        </>

    );
}

export default page;