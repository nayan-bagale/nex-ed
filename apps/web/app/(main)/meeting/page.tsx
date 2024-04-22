import BreadCrumb from "@/components/BreadCrumb";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import InstantDialog from "@/components/Meeting/DialogBox/InstantDialog";
import ScheduleDialog from "@/components/Meeting/DialogBox/ScheduleDialog";
import MeetingCard from "@/components/Meeting/MeetingCard";
import { ScrollArea } from "@/components/ui/scroll-area";
import { getServerSession } from "next-auth";
import { authOptions } from "@/components/utils/options";
import RoleChekerServer from "@/components/utils/RoleChekerServer";

function Class_() {
    const session = getServerSession(authOptions);

    const breadcrumbItems = [
        { title: "Dashboard", link: "/dashboard" },
        { title: "Meeting", link: "/meeting" },
    ];

    return (
        <ScrollArea className="h-full pb-12">
            <div className="flex-1 h-full space-y-4 p-4 ">
                <BreadCrumb items={breadcrumbItems} />
                <div className="flex items-start justify-between">
                    <Heading title='Meeting' description='' />
                    <div className=" space-x-2">
                        <InstantDialog />
                        <RoleChekerServer>
                            <ScheduleDialog />
                        </RoleChekerServer>
                    </div>
                </div>
                <Separator />
                <div className="h-full p-2">
                    <MeetingCard />
                </div>
            </div>
        </ScrollArea>

    );
}

export default Class_;