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
import { forgotpassAction } from "@/components/action/forgotpassAction";


export const formSchema = z
    .object({
        email: z.string().email({ message: "Enter a valid email address" }),
    })

export type UserFormValue = z.infer<typeof formSchema>;


export default function ForgotPasswordForm() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const defaultValues = {
        email: "",
    };
    const form = useForm<UserFormValue>({
        resolver: zodResolver(formSchema),
        defaultValues,
    });

    const onSubmit = async (data: UserFormValue) => {
        setLoading(true);
        toast.promise(forgotpassAction(data.email), {
            loading: "Sending Email...",
            success: async (data) => {
                if (data) {
                    setError(false);
                    return "Email sent successfully!";
                } else {
                    setError(true);
                    toast.error("Email not found!");
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
                    {error && (
                        <Alert variant="destructive">
                            <AlertCircle className="h-4 w-4" />
                            <AlertTitle>Failed</AlertTitle>
                            <AlertDescription>Email Not Found!</AlertDescription>
                        </Alert>
                    )}
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                    <Input
                                        type="email"
                                        placeholder="Enter your email..."
                                        disabled={loading}
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button disabled={loading} className="ml-auto w-full" type="submit">
                        Continue
                    </Button>
                </form>
            </Form>
        </>
    );
}
