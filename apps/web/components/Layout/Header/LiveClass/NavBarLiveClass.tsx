import { cn } from "@/lib/utils";
import { MobileSidebar } from "@/components/Layout/Sidebar/MobileSideBar";
import { UserNav } from "../AvatarOptions";
import CreateJoin from "../CreateJoin";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import ShareButton from "@/components/Liveclass_V1/ShareButton";
import ConnectionStatus from "../ConnectionStatus";
import MiddleData from "./MiddleData";


export default function Header() {
    return (
        <div className="fixed top-0 left-0 right-0 supports-backdrop-blur:bg-background/60 border-b bg-background/95 backdrop-blur z-20">
            <nav className="h-14 flex items-center justify-between px-4">
                <div className="flex h-[60%] items-center gap-2 md:gap-4">
                    <ShareButton />
                    <Separator orientation="vertical" />
                    <MiddleData/>
                </div>
                <div className="flex h-[60%] items-center gap-2 md:gap-4">
                    <ConnectionStatus/>
                    <Separator orientation="vertical" />
                    <UserNav />
                </div>
            </nav>
        </div>
    );
}
