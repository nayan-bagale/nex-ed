'use client'

import { Share2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { RWebShare } from "react-web-share"
import useSubject from "../CustomHooks/useSubject";

interface Props {
    id:string;
}

const ShareButton = ({ id }:Props) => {
    const subject_data = useSubject(id);

    if(!subject_data){
        return null;
    }
    return (
        <RWebShare 
        data={{
                text: `${subject_data.name} - ${subject_data.description} by ${subject_data.teacher}`,
                url: `${process.env.NEXT_PUBLIC_ORIGIN_URL!}/class/${subject_data.id}/join`,
                title: `Click to Join ${subject_data.name}`
        }}
        >
            <p className=" flex items-center"> <Share2 className="mr-2 h-4 w-4" /> Invite</p>
        </RWebShare>
    )
}

export default ShareButton