import BreadCrumb from "@/components/BreadCrumb";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { DatePickerDemo } from "@/components/Attendance/DatePicker";
import { ComboboxDemo } from "@/components/Attendance/SubSelect";
import { UserClient } from "@/components/tables/Attendance-Tables/Client";
import { users } from "@/data/data";
import { ScrollArea } from "@/components/ui/scroll-area";
import { getStudents } from "@/action/studentsAction";


const page = async () => {
    const breadcrumbItems = [
        { title: "Dashboard", link: "/dashboard" },
        { title: "Attendance", link: "/attendance" },
    ];

    const students = await getStudents();
    console.log(students)


    return (
        
        // <ScrollArea>
        <div className="flex-1 space-y-4 p-0 md:p-4 pt-3 md:pt-6">
            <BreadCrumb items={breadcrumbItems} />
            <div className="flex items-start justify-between">
                <Heading title='Attendance' description='' />
                {/* <Button><Plus className="mr-2 h-4 w-4" /> Add New</Button> */}
            </div>
            <Separator />
            <div className=" p-2 space-y-3">
                
                    {/* <DatePickerDemo />
                    <ComboboxDemo /> */}


                <UserClient data={students.data as any} />
            </div>
        </div>
        // </ScrollArea>
    );
}

export default page