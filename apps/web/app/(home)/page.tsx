import { Button } from "@/components/ui/button";
import { getServerSession } from "next-auth";
import Link from "next/link";
import { authOptions } from "../../components/utils/options";
import Lamp from "@/components/Home/Lamp";
import Sparkles from "@/components/Home/Sparkles";
import { BackgroundBeams } from "@/components/ui/background-beam";
import { GlowingStarsBackgroundCardPreview } from "@/components/Home/GlowingCard";

export default async function Home() {
  const session = await getServerSession(authOptions);

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
        <div className="h-[calc(100vh-4rem)] w-full rounded-md bg-neutral-950 relative flex flex-col items-center justify-center antialiased">
          <div className="max-w-3xl mx-auto p-4">
            <h1 className="relative z-10 text-4xl md:text-7xl  bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-600  text-center font-sans font-bold">
              Welcome to Nex-Ed
            </h1>
            <p></p>
            <p className="text-neutral-500 max-w-lg mx-auto my-2 text-sm text-center relative z-10">
              Discover a new era of learning, Seamlessly connect students and educators worldwide for
              real-time interactive lessons. Enjoy the flexibility of
              personalized learning resources and engage in collaborative
              activities. Embrace inclusivity and global collaboration as
              education transcends traditional boundaries. Step into the future
              of education with our innovative Nex-Ed.
            </p>
          </div>
          <BackgroundBeams className=" bg-inherit" />
        </div>
            {/* <GlowingStarsBackgroundCardPreview /> */}
      </section>
    </main>
  );
}
