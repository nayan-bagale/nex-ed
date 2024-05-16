import AttendanceProvider from "@/components/Attendance/ContextAPI";
import { ScrollArea } from "@/components/ui/scroll-area";
import { authOptions } from "@/components/utils/options";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function Layout({
    children,
}: {
    children: React.ReactNode
}) {

    const session = await getServerSession(authOptions);
    if (session?.user.role === "student") {
        redirect("/dashboard");
    }

    return (
        <ScrollArea className="h-full pb-12">
            <AttendanceProvider>
                {children}
            </AttendanceProvider>
        </ScrollArea>
    )
}