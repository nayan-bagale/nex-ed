"use client";
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import * as z from "zod";
import { updatePassword } from "@/components/action/updatepassAction";


export const formSchema = z
    .object({
        password: z.string().min(8, { message: "At least 8 letters" }),
        confirm_password: z.string().min(8, { message: "At least 8 letters" }),
    }).refine(
        (values) => {
            return values.password === values.confirm_password;
        },
        {
            message: "Passwords do not match",
            path: ["confirm_password"],
        }
    );

type ResetFormValue = z.infer<typeof formSchema>;


export default function ResetPasswordForm({ token }: { token: string }) {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const defaultValues = {
        password: "",
        confirm_password: "",
    };
    const form = useForm<ResetFormValue>({
        resolver: zodResolver(formSchema),
        defaultValues,
    });

    const onSubmit = async (data: ResetFormValue) => {

        setLoading(true);
        toast.promise(updatePassword({ ...data, token }), {
            loading: "Updating Password...",
            success: async (data) => {
                if (data) {
                    setError(false);
                    router.push("/sign-in");
                    return "Password Updated Successfully!";
                } else {
                    setError(true);
                    toast.error("Failed to update password");
                }
            },
            error: (error) => {
                console.log(error);
                setError(true);
                return "Something went wrong";
            },
        });
        setLoading(false);
    };

    return (
        <>
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-4 w-full"
                >
                    {/* {error && (
                        <Alert variant="destructive">
                            <AlertCircle className="h-4 w-4" />
                            <AlertTitle>Failed</AlertTitle>
                            <AlertDescription>Email Already Exists!</AlertDescription>
                        </Alert>
                    )} */}
                    <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Password</FormLabel>
                                <FormControl>
                                    <Input
                                        type="password"
                                        placeholder="Enter your password..."
                                        disabled={loading}
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="confirm_password"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Confirm Password</FormLabel>
                                <FormControl>
                                    <Input
                                        type="text"
                                        placeholder="Confirm your password..."
                                        disabled={loading}
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button disabled={loading} className="ml-auto w-full" type="submit">
                        Reset Password
                    </Button>
                </form>
            </Form>
        </>
    );
}
