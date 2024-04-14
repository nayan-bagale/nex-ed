"use client";
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea"
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
import { useSetRecoilState } from "recoil";
import { subjects, subject_stream } from "@/components/Store/class";
import { useSession } from "next-auth/react";
import cryptoRandomString from "crypto-random-string";




export const formSchema = z
    .object({
        subject_name: z.string().min(3, { message: "Text must be atleast 3 characters" }),
        description: z.string().min(3, { message: "Text must be atleast 3 characters" }).max(100, { message: "Text must be atmost 100 characters" }),
    })


export type UserFormValue = z.infer<typeof formSchema>;


export default function AddSubjectForm() {

    const {data:session} = useSession();

    const [loading, setLoading] = useState(false);
    const setSubject = useSetRecoilState(subjects);

    const defaultValues: UserFormValue = {
        subject_name: "",
        description: "",
    };
    const form = useForm<UserFormValue>({
        resolver: zodResolver(formSchema),
        defaultValues,
    });


    const onSubmit = async (data: UserFormValue) => {
        setLoading(true);

        console.log(data)
        const sub_id = cryptoRandomString({ length: 10 })
        setSubject((subject) => (
            [...subject, {
                id: sub_id,
                name: data.subject_name,
                description: data.description,
                teacher: session?.user?.name as string || "Teacher",
                total_students: 0
            }]
        ))
        form.reset(defaultValues);
        toast.success("Subject Added Successfully!");
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
                        name="subject_name"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Subject Name</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="subject name..."
                                        className="resize-none"
                                        {...field}
                                    />
                                </FormControl>
                                {/* <FormDescription>
                                    You can <span>@mention</span> other users and organizations.
                                </FormDescription> */}
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="description"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Description</FormLabel>
                                <FormControl>
                                    <Textarea
                                        placeholder="description..."
                                        className="resize-none"
                                        {...field}
                                    />
                                </FormControl>
                                {/* <FormDescription>
                                    You can <span>@mention</span> other users and organizations.
                                </FormDescription> */}
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
