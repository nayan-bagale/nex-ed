'use client'

import { usePathname } from "next/navigation";
import { RWebShare } from "react-web-share";
import { Link } from "lucide-react";


const ShareButton = () => {
    const path = usePathname();
    return (
        <RWebShare
            data={{
                text: "Join the class",
                title: "Join the class",
                url: process.env.NEXT_PUBLIC_ORIGIN_URL! + path,
            }}
        >
            <button>
                <Link size={24} />
            </button>
        </RWebShare>
    );
};
export default ShareButton;