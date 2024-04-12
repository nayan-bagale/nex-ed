import BreadCrumb from "@/components/BreadCrumb";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";


const page = ({ params }: { params: { subject: string } }) => {

    const breadcrumbItems = [
        { title: "Dashboard", link: "/dashboard" },
        { title: "Class", link: "/class" },
        { title: params.subject, link: "/class/subject"}
    ];
  return (
      <div className="flex-1 space-y-4  p-4 pt-6">
          <BreadCrumb items={breadcrumbItems} />
          <div className="flex items-start justify-between">
              <Heading title={params.subject.toUpperCase()} description='' />
              <Button><Plus className="mr-2 h-4 w-4" /> Add New</Button>
          </div>
          <Separator />
          <div className=" p-2">

          </div>
      </div>
  )
}

export default page