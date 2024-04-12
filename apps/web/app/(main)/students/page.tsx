import BreadCrumb from "@/components/BreadCrumb";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import {Plus} from "lucide-react";
import { UserClient } from "@/components/tables/Students-Tables/Client";
import { users } from "@/data/data";

function Students() {

  const breadcrumbItems = [
    { title: "Dashboard", link: "/dashboard" },
    { title: "Students", link: "/students" },
  ];

  return (
    <div className="flex-1 space-y-3  p-4 pt-6">
      <BreadCrumb items={breadcrumbItems} />
      <div className="flex items-start justify-between">
        <Heading title='Students' description='Manage Students (Client side table functionalities.)' />
        <Button><Plus className="mr-2 h-4 w-4" /> Add New</Button>
      </div>
      <Separator />
      <div className=" p-2 space-y-2">
        <UserClient data={users} />
      </div>
    </div>
  );
}

export default Students;