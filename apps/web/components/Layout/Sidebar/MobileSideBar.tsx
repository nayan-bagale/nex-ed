"use client";
// import { DashboardNav } from "@/components/dashboard-nav";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { StudentnavItems, TeachernavItems } from "@/data/data";
import { MenuIcon } from "lucide-react";
import { useState } from "react";

import { ItemsSideBar } from "./ItemsSideBar";
import Link from "next/link";
import { Separator } from "@/components/ui/separator";
import { useSession } from "next-auth/react";

// import { Playlist } from "../data/playlists";

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {
  // playlists: Playlist[];
}

export function MobileSidebar({ className }: SidebarProps) {
  const [open, setOpen] = useState(false);
  const {data:session} = useSession();

  return (
    <>
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <MenuIcon />
        </SheetTrigger>
        <SheetContent side="left" className="!px-0">
          <div className="absolute top-3 left-4 ">
            <Link href="/" className="font-semibold tracking-tight text-lg">
              Nex-Ed
            </Link>
          </div>
          <Separator className="mt-5"/>
          <div className="space-y-4 py-5">
            <div className="px-3 py-2">
              <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
                Overview
              </h2>
              <div className="space-y-1">
                <ItemsSideBar items={session?.user.role === 'teacher' ? TeachernavItems : StudentnavItems} setOpen={setOpen} />
              </div>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
}
