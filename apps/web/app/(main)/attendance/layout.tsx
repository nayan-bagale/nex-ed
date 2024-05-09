import AttendanceProvider from "@/components/Attendance/ContextAPI";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function Layout({
    children,
}: {
    children: React.ReactNode
}) {

    return (
        <ScrollArea className="h-full pb-12">
            <AttendanceProvider>
                {children}
            </AttendanceProvider>
        </ScrollArea>
    )
}