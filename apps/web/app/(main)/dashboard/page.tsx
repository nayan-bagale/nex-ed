import RadarChartDash from "@/components/Dashboard/Teacher/RadarChart"
import { CalendarDateRangePicker } from "@/components/DatePickerRange"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import Link from "next/link"
import { Book, PanelsTopBottom, Users2 } from "lucide-react"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import CalenderGraph from "@/components/Dashboard/Teacher/CalenderGraph"
import RecentActivity from "@/components/Dashboard/Teacher/RecentActivity"


const page = async () => {

  return (
    <ScrollArea className="h-full pb-12">
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
        <div className="grid gap-4 lg:grid-cols-2">
          <div className="grid gap-4 lg:grid-cols-2">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Total Students
                </CardTitle>
                <Users2 className="h-4 w-4" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">45</div>
                <p className="text-xs text-muted-foreground">
                  +20.1% from last month
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Subjects
                </CardTitle>
                <Book className="h-4 w-4" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">8</div>
                <p className="text-xs text-muted-foreground">
                  +180.1% from last month
                </p>
              </CardContent>
            </Card>
            <div className="grid gap-4 lg:col-span-2">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <div>
                    <CardTitle>
                      Lectures
                    </CardTitle>
                    <CardDescription>
                      You taken 20 lectures this month.
                    </CardDescription>
                  </div>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    className="h-4 w-4 text-muted-foreground"
                  >
                    <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
                  </svg>
                </CardHeader>
                <CardContent>
                  <CalenderGraph />

                </CardContent>
              </Card>
            </div>
          </div>
          <Card className="">
            <CardHeader>
              <CardTitle>Overview</CardTitle>
            </CardHeader>
            <CardContent className="pl-2">
              <RadarChartDash />
            </CardContent>
            
          </Card>
        </div>
        <div className="grid gap-4 grid-cols-1 ">
          <Card className="col-span-4">
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>
                You made 265 sales this month.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <RecentActivity/>
            </CardContent>
          </Card>
        </div>
      </div>
    </ScrollArea>

  )
}

export default page