import { Metadata } from "next";
import Link from "next/link";
import UserAuthForm from "@/components/Forms/Auth/sign-in-form";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import GoogleSignInButton from "@/components/GoogleAuthButton";


export const metadata: Metadata = {
  title: "Authentication",
  description: "Authentication forms built using the components.",
};

export default async function AuthenticationPage() {
  return (
    <>
      <div className="relative h-screen flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
        <div className="relative hidden h-full flex-col bg-muted p-10 text-white dark:border-r lg:flex">
          <div className="absolute inset-0 bg-zinc-900" />
          <div className="relative z-20 flex items-center text-lg font-medium">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="mr-2 h-6 w-6"
            >
              <path d="M15 6v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3" />
            </svg>
            Nex-Ed
          </div>
          <div className="relative z-20 mt-auto">
            <blockquote className="space-y-2">
              <p className="text-xl">
                &ldquo;Virtual classroom in today's digitally interconnected
                landscape, Beyond a digital substitute for traditional
                education, Empowering education in the tech-driven world
                .&rdquo;
              </p>
              {/* <footer className="text-sm">Sofia Davis</footer> */}
            </blockquote>
          </div>
        </div>
        <div className="p-4 lg:p-8 h-full flex items-center">
          <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
            <div className="flex flex-col space-y-2 text-center">
              <h1 className="text-2xl font-semibold tracking-tight">Nex-Ed</h1>
              <p className="text-sm  text-muted-foreground">
                Nex-Ed is a Virtual Classroom Platform.
              </p>
            </div>
            <UserAuthForm />
            <Button className="ml-auto w-full" variant="outline">
              Forgot password?
            </Button>
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
            </div>
            <GoogleSignInButton/>
            <div className="flex flex-col space-y-2 text-center">
              <p className="text-sm  text-muted-foreground">
                Don't have an account?
                <Link href={'/sign-up'}>
                  <Button variant="link" className=" px-2 ">
                    Sign Up
                  </Button>
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
