'use client'

import { Share2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { RWebShare } from "react-web-share"
// import useSubject from "../CustomHooks/useSubject";

interface Props {
    subject: any;
}

const ShareButton = ({ subject }: Props) => {
    // 
    return (
        <RWebShare
            data={{
                text: `${subject.name} - ${subject.description} by ${subject.teacher}`,
                url: `${process.env.NEXT_PUBLIC_ORIGIN_URL!}/class/${subject.id}/join`,
                title: `Click to Join ${subject.name}`
            }}
        >
            <p className=" flex items-center"> <Share2 className="mr-2 h-4 w-4" /> Invite</p>
        </RWebShare>
    )
}

export default ShareButton