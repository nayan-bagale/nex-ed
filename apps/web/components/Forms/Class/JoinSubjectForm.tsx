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
import { useSession } from "next-auth/react";
import { join_subject_Action } from "@/action/subject_Action";


export const formSchema = z
    .object({
        subject_id: z.string().min(10, { message: "Text must be atleast 10 characters" }).max(10, { message: "Text must be atmost 10 characters" }),
    })


export type UserFormValue = z.infer<typeof formSchema>;


export default function JoinSubjectForm() {

    const [loading, setLoading] = useState(false);

    const defaultValues: UserFormValue = {
        subject_id: "",
    };
    const form = useForm<UserFormValue>({
        resolver: zodResolver(formSchema),
        defaultValues,
    });

    const handlesubmit = async (data: string) => {
        const res = await join_subject_Action(data);
        if (!res) throw new Error('Failed to join subject.');
        form.reset(defaultValues);
        console.log(res);
        return res;
    }

    const onSubmit = async (data: UserFormValue) => {
        setLoading(true);

        toast.promise(handlesubmit(data.subject_id), {
            loading: 'Joining Subject...',
            success: (msg) => msg.message,
            error: (msg) => msg.message,
        })

        setLoading(false);
    };

    return (
        <>
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-4 w-full px-2"
                >

                    <FormField
                        control={form.control}
                        name="subject_id"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Subject Id</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="Enter Subject Id..."
                                        className="resize-none"
                                        {...field}
                                    />
                                </FormControl>
                                <FormDescription>
                                    Atmost 10 characters long.
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <Button disabled={loading} className="ml-auto w-full" type="submit">
                        Add Subject
                    </Button>
                </form>
            </Form>
        </>
    );
}
