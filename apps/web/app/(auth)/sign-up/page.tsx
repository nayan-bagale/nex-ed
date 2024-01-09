import { Metadata } from "next";
import Link from "next/link";
import UserAuthForm from "@/components/Forms/Auth/sign-up-form";
import { Button } from "@/components/ui/button";


export const metadata: Metadata = {
  title: "Authentication",
  description: "Authentication forms built using the components.",
};

export default function AuthenticationPage() {
  return (
    <>
      <div className="relative h-screen flex-col items-center justify-center md:grid lg:max-w-none lg:px-0">
        <div className="p-4 lg:p-8 h-full flex items-center">
          <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
            <div className="flex flex-col space-y-2 text-center">
              <h1 className="text-2xl font-semibold tracking-tight">Nex-Ed</h1>
              <p className="text-sm text-muted-foreground">
                Enter your details below to create your account
              </p>
            </div>
            <UserAuthForm />
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
            </div>
            <div className="flex flex-col space-y-2 text-center">
              <p className="text-sm  text-muted-foreground">
                Have an account?
                <Link href={"/sign-in"}>
                  <Button variant="link" className=" px-2 ">
                    Sign In
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
