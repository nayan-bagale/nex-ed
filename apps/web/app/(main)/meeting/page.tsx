import BreadCrumb from "@/components/BreadCrumb";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import ScheduleDialog from "@/components/Meeting/DialogBox/ScheduleDialog";
import RoleChekerServer from "@/components/utils/RoleChekerServer";
import { get_subject_by_teacher_id } from "@/action/meetingAction";


async function page() {

    const breadcrumbItems = [
        { title: "Dashboard", link: "/dashboard" },
        { title: "Meeting", link: "/meeting" },
    ];

    const subjects = await get_subject_by_teacher_id();

    return (
        <>
            <BreadCrumb items={breadcrumbItems} />
            <div className="flex items-start justify-between">
                <Heading title='Meeting' description='' />
                <div className=" space-x-2">
                    {/* <InstantDialog /> */}
                    <RoleChekerServer>
                        <ScheduleDialog subjects={subjects} />
                    </RoleChekerServer>
                </div>
            </div>
            <Separator />

        </>

    );
}

export default page;