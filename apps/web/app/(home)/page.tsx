import { Button } from "@/components/ui/button";
import { getServerSession } from "next-auth";
import Link from "next/link";
import { authOptions } from "../api/auth/[...nextauth]/options";


export default async function Home() {

  const session = await getServerSession(authOptions)

  return (
    <main className=" h-full">
      <div className="fixed top-0 left-0 right-0 supports-backdrop-blur:bg-background/60 border-b bg-background/95 backdrop-blur z-20">
        <nav className="h-14 flex items-center justify-between px-4">
          <div className="block">
            <Link href="/">
              <h1>Nex-Ed</h1>
            </Link>
          </div>
          <div className="flex h-[60%] items-center gap-4">
            {session ? (
              <Link href="/dashboard">
                <Button variant="outline">
                  <h2>Dashboard</h2>
                </Button>
              </Link>
            ) : (
              <Link href="/sign-in">
                <Button variant="outline">Sign In</Button>
              </Link>
            )}
          </div>
        </nav>
      </div>

      <section className="pt-16">
        <h1 className="text-2xl text-center">Welcome to Nex-Ed</h1>
      </section>
    </main>
  );
}
