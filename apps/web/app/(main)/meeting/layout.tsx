import { ScrollArea } from "@/components/ui/scroll-area";

export default function Layout({
    meetingCard,
    children,
}: {
    meetingCard: React.ReactNode
    children: React.ReactNode
}) {
    const breadcrumbItems = [
        { title: "Dashboard", link: "/dashboard" },
        { title: "Meeting", link: "/meeting" },
    ];
    return (
        <ScrollArea className="h-full pb-12">
            <div className="flex-1 h-full space-y-4 p-4 ">
                {children}
                {meetingCard}
            </div>
        </ScrollArea>
    )
}