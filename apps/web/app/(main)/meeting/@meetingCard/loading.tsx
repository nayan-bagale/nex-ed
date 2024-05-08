import { Skeleton } from "@/components/ui/skeleton"

const loading = () => {
    return (
        <div className=" flex flex-wrap gap-6 justify-center md:justify-start">
            <div className="flex flex-col space-y-3 ">
                <Skeleton className=" h-24 w-[250px] rounded-xl" />
                <div className="space-y-2">
                    <Skeleton className="h-5 w-[250px]" />
                    <div className=" flex justify-between">
                        <Skeleton className="h-4 w-16" />
                        <Skeleton className="h-4 w-24" />
                    </div>
                    <div className=" flex justify-between">
                        <Skeleton className="h-4 w-16" />
                        <Skeleton className="h-4 w-24" />
                    </div>
                    <div className=" flex justify-between">
                        <Skeleton className="h-4 w-16" />
                        <Skeleton className="h-4 w-24" />
                    </div>
                    <div className=" flex justify-between">
                        <Skeleton className="h-4 w-16" />
                        <Skeleton className="h-4 w-24" />
                    </div>
                    <div className=" flex justify-between">
                        <Skeleton className="h-4 w-16" />
                        <Skeleton className="h-4 w-24" />
                    </div>
                </div>
                <Skeleton className=" h-12 w-[250px] rounded-xl" />
            </div>
            <div className="flex flex-col space-y-3 ">
                <Skeleton className=" h-24 w-[250px] rounded-xl" />
                <div className="space-y-2">
                    <Skeleton className="h-5 w-[250px]" />
                    <div className=" flex justify-between">
                        <Skeleton className="h-4 w-16" />
                        <Skeleton className="h-4 w-24" />
                    </div>
                    <div className=" flex justify-between">
                        <Skeleton className="h-4 w-16" />
                        <Skeleton className="h-4 w-24" />
                    </div>
                    <div className=" flex justify-between">
                        <Skeleton className="h-4 w-16" />
                        <Skeleton className="h-4 w-24" />
                    </div>
                    <div className=" flex justify-between">
                        <Skeleton className="h-4 w-16" />
                        <Skeleton className="h-4 w-24" />
                    </div>
                    <div className=" flex justify-between">
                        <Skeleton className="h-4 w-16" />
                        <Skeleton className="h-4 w-24" />
                    </div>
                </div>
                <Skeleton className=" h-12 w-[250px] rounded-xl" />
            </div>
        </div>
    )
}

export default loading