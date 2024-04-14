"use client";
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";

import { toast } from "sonner";

import * as z from "zod";



export const formSchema = z
    .object({
        join: z.string().min(3, { message: "At least 3 letters" }),
    })


export type UserFormValue = z.infer<typeof formSchema>;


export default function InstantJoinMeetingForm() {
    const [loading, setLoading] = useState(false);

    const defaultValues: UserFormValue = {
        join: "",

    };
    const form = useForm<UserFormValue>({
        resolver: zodResolver(formSchema),
        defaultValues,
    });


    const onSubmit = async (data: UserFormValue) => {
        setLoading(true);
        console.log(data)
        form.reset(defaultValues);
        toast.success("User Created Successfully");
        setLoading(false);
    };

    return (
        <>
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-4 w-full"
                >

                    <FormField
                        control={form.control}
                        name="join"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Join Id</FormLabel>
                                <FormControl>
                                    <Input
                                        type="text"
                                        placeholder="Join Id..."
                                        disabled={loading}
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <Button disabled={loading} className="ml-auto w-full" type="submit">
                        Join Meeting
                    </Button>
                </form>
            </Form>
        </>
    );
}
