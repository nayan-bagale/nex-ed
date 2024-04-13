import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export function Teachers() {
    return (
        <div className="space-y-8 px-2">
            <div className="flex items-center">
                <Avatar className="h-9 w-9">
                    <AvatarImage src="/avatars/01.png" alt="Avatar" />
                    <AvatarFallback>NB</AvatarFallback>
                </Avatar>
                <div className="ml-4 space-y-1">
                    <p className="text-sm font-medium leading-none">Prof. Nayan Bagale</p>
                    <p className="text-sm text-muted-foreground">
                        nvbagale@gmai.com
                    </p>
                </div>
                {/* <div className="ml-auto font-medium">+$1,999.00</div> */}
            </div>
        </div>
    );
}