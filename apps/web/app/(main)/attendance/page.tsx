import BreadCrumb from "@/components/BreadCrumb";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { DatePickerDemo } from "@/components/Attendance/DatePicker";
import { ComboboxDemo } from "@/components/Attendance/SubSelect";
import { UserClient } from "@/components/tables/Attendance-Tables/Client";
import { users } from "@/data/data";


const page = () => {
    const breadcrumbItems = [
        { title: "Dashboard", link: "/dashboard" },
        { title: "Attendance", link: "/attendance" },
    ];

    return (
        <div className="flex-1 space-y-4  p-4 pt-6">
            <BreadCrumb items={breadcrumbItems} />
            <div className="flex items-start justify-between">
                <Heading title='Attendance' description='' />
                {/* <Button><Plus className="mr-2 h-4 w-4" /> Add New</Button> */}
            </div>
            <Separator />
            <div className=" p-2 space-y-3">
                <div className=" flex flex-col md:flex-row space-y-3 md:space-y-0 md:space-x-4">
                    <DatePickerDemo />
                    <ComboboxDemo />
                </div>

                <UserClient data={users} />
            </div>
        </div>
    );
}

export default page