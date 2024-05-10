import { get_students } from "@/action/stream_Action";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export async function Students({ sub_id }: { sub_id: string }) {

    const res = await get_students(sub_id);
    if (!res.ok || !res?.data?.length) {
        return (
            <div className=" flex justify-center items-center w-full">
                <h1 className=" text-2xl font-bold text-muted-foreground">No students</h1>
            </div>
        );
    }

    return (res?.data?.map((s) =>{
        const fallback = s.name?.split(" ") as string[];

        return (<div className="space-y-8 px-2">
            <div className="flex items-center">
                <Avatar className="h-9 w-9">
                    <AvatarImage className=' object-cover' src={s.image as string} alt="Avatar" />
                    <AvatarFallback>{`${fallback[0]?.charAt(0) ?? ''}${fallback[1]?.charAt(0) ?? '' }`}</AvatarFallback>
                </Avatar>
                <div className="ml-4 space-y-1">
                    <p className="text-sm font-medium leading-none">{s.name}</p>
                    <p className="text-sm text-muted-foreground">
                        {s.email}
                    </p>
                </div>
                {/* <div className="ml-auto font-medium">+$1,999.00</div> */}
            </div>
        </div>)
        }
    )
    );
}