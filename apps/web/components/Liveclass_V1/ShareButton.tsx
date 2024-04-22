'use client'

import { usePathname } from "next/navigation";
import { RWebShare } from "react-web-share";
import { Link } from "lucide-react";
import { Button } from "../ui/button";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"



const ShareButton = () => {
    const path = usePathname();

    return (<>
        <div className=' block md:hidden'>
        <TooltipProvider >
            <Tooltip>
                <TooltipTrigger><RWebShare
                    data={{
                        text: "Join the class",
                        title: "Join the class",
                        url: process.env.NEXT_PUBLIC_ORIGIN_URL! + path,
                    }}
                >
                        <Link className="h-4 w-4" />
                </RWebShare></TooltipTrigger>
                <TooltipContent>
                    <p>Room Id:</p>
                    <p>{path.split('/')[2]}</p>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
        </div>
        <div className=" hidden md:flex text-sm md:text-base items-center ">
            <p>RoomId:</p>
            <RWebShare
                data={{
                    text: "Join the class",
                    title: "Join the class",
                    url: process.env.NEXT_PUBLIC_ORIGIN_URL! + path,
                }}
            >
                <Button className=" gap-1" variant='link' size='sm'>
                    <p>{path.split('/')[2]}</p>
                    <Link className="h-4 w-4" />
                </Button>
            </RWebShare>
        </div>
    </>
    );
};
export default ShareButton;