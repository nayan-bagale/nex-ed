import ModeToggle from "@/components/Layout/ThemeToggle/DarkModeToggle";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <main className="">
      <div className="flex items-center w-[20rem] justify-between p-4">
      {/* <ModeToggle /> */}
      </div>
      <Link href="/sign-in">
        <Button>Sign In</Button>
      </Link>
    </main>
  );
}
