import ThemeToggle from "@/components/Layout/ThemeToggle/DarkModeToggle";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { LogOut, Settings, User } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

// import { useSession, signOut } from "next-auth/react";

import Link from "next/link";
import { getServerSession } from "next-auth";
import { authOptions } from "@/components/utils/options";
import SignOutButton from "@/components/SignOutButton";

export async function UserNav() {
  const session = await getServerSession(authOptions);

  return session ? (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-8 w-8 rounded-full">
          <Avatar className="h-8 w-8">
            <AvatarImage
              src={session.user?.image ?? ""}
              alt={session.user?.name ?? ""}
            />
            <AvatarFallback>
              <User />
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">
              {session.user?.name}
            </p>
            <p className="text-xs leading-none text-muted-foreground">
              {session.user?.email}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem asChild>
            <Link href="/profile" className="flex items-center w-full">
              <User className="mr-2 h-4 w-4" />
              Profile
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Settings className="mr-2 h-4 w-4" />
            Settings
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <SignOutButton/>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuLabel>
          <ThemeToggle />
        </DropdownMenuLabel>
      </DropdownMenuContent>
    </DropdownMenu>
  ) : (
    <Skeleton className="h-8 w-8 rounded-full" />
  );
}
