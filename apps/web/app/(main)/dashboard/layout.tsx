import { ScrollArea } from "@/components/ui/scroll-area";

export default function Layout({

    lectures,
    overview,
    studnsub,
    recentActivity,
    todos,
    children,
}: {
    lectures: React.ReactNode
    recentActivity: React.ReactNode
    studnsub: React.ReactNode
    overview: React.ReactNode
    todos: React.ReactNode
    children: React.ReactNode
}) {

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
                    <div className="grid gap-4 grid-cols-1">
                        {/* Overview Cards */}

                    {overview}

                    </div>
                    <div className="grid gap-4 lg:grid-cols-1">
                        {/* {todos} */}

                        <div className="grid gap-4 lg:grid-cols-2">
                            {/* student and subjects cards */}
                        {studnsub}

                        </div>
                        {/* Lectures Card */}

                        {lectures}
                    </div>

                </div>
                <div className="grid gap-4 grid-cols-1 ">
                    {/* Recent Activity Card */}
                    {recentActivity}
                </div>
            </div>
            {/* {children} */}
        </ScrollArea>
    )
}