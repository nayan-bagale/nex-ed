import { Metadata } from "next";
import Link from "next/link";
import UserAuthForm from "@/components/Forms/Auth/sign-up-form";
import { Button } from "@/components/ui/button";
import ResetPasswordForm from "@/components/Forms/Auth/reset-pass-form";
import { resetpasswordTokens } from "@/database/schema";
import { db } from "@/database/db";
import { eq } from "drizzle-orm";
import { redirect } from "next/navigation";


export const metadata: Metadata = {
    title: "Authentication",
    description: "Authentication forms built using the components.",
};

async function checkToken(params: { token: string }) {
    try {
        const token = await db.select().from(resetpasswordTokens).where(eq(resetpasswordTokens.token, params.token));
        if (token.length === 0 || token[0].expires < new Date()) {
            return false;
        }
        return true;
    } catch (e: unknown) {
        console.log(e)
        return false;
    }
}

export default async function AuthenticationPage({ params }: { params: { token: string } }) {
    if(!await checkToken(params)) {
        redirect("/sign-in");
    }
    return (
        <>
            <div className="relative h-screen flex-col items-center justify-center md:grid lg:max-w-none lg:px-0">
                <div className="p-4 lg:p-8 h-full flex items-center">
                    <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
                        <div className="flex flex-col space-y-2 text-center">
                            <h1 className="text-2xl font-semibold tracking-tight">Nex-Ed</h1>
                            <h2>Reset Password</h2>
                        </div>
                        <ResetPasswordForm token={params.token} />
                    </div>
                </div>
            </div>
        </>
    );
}
