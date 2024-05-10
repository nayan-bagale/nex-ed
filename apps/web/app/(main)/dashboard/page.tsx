import RadarChartDash from "@/components/Dashboard/Teacher/RadarChart"
import { CalendarDateRangePicker } from "@/components/DatePickerRange"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@radix-ui/react-scroll-area"
import Link from "next/link"


const page = async () => {

  return (

    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">
          Hi, Welcome back 👋
        </h2>
        <div className="hidden md:flex items-center space-x-2">
          {/* <CalendarDateRangePicker />
          <Button>Download</Button> */}
        </div>
      </div>
      <div className="flex space-x-4">
        <div className="flex-1">
          <div className="flex items-center justify-between">
            <p className="text-sm text-muted-foreground">Total Students</p>
            <p className="text-lg font-semibold">45</p>
          </div>
          <div className="flex items-center justify-between">
            <p className="text-sm text-muted-foreground">Total Teachers</p>
            <p className="text-lg font-semibold">5</p>
          </div>
        </div>
        <div className="flex-1">
          <div className="flex items-center justify-between">
            <p className="text-sm text-muted-foreground">Total Subjects</p>
            <p className="text-lg font-semibold">8</p>
          </div>
          <div className="flex items-center justify-between">
            <p className="text-sm text-muted-foreground">Total Classes</p>
            <p className="text-lg font-semibold">3</p>
          </div>
        </div>
      </div>
      <div className=" h-full w-full">
        <RadarChartDash />
      </div>
    </div>


  )
}

export default page