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
import { subject_stream } from "@/components/Store/class";
import { useSession } from "next-auth/react";
import cryptoRandomString from "crypto-random-string";




export const formSchema = z
    .object({
        text: z.string().min(10, { message: "Text must be atleast 10 characters" }).max(250, { message: "Text must be less than 100 characters" }),
        file: z.any()
            .refine((file) => {
                console.log(file)
                return file?.length >= 1
            }, `Max image size is 5MB.`)

    })


export type UserFormValue = z.infer<typeof formSchema>;

function formatDate(date: Date) {
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const month = months[date.getMonth()];
    const day = date.getDate();
    const year = date.getFullYear();
    return `${month} ${day}, ${year}`;
}


export default function ClassStreamCreatePostForm({ sub_name }: { sub_name: string }) {
    const { data: session } = useSession();
    const [loading, setLoading] = useState(false);

    const setSubjectStream = useSetRecoilState(subject_stream);

    const defaultValues: UserFormValue = {
        text: "",
        file: "",
    };
    const form = useForm<UserFormValue>({
        resolver: zodResolver(formSchema),
        defaultValues,
    });

    const onSubmit = async (data: UserFormValue) => {
        setLoading(true);
        console.log(data)
        setSubjectStream((subject_stream) => {

            const subject_stream1 = subject_stream.filter((stream) => stream.subject_name.toLowerCase() === sub_name.toLowerCase());

            console.log(subject_stream1)

            return (
                [...subject_stream, {
                    id: cryptoRandomString({ length: 10 }),
                    subject_id: 1,
                    subject_name: sub_name,
                    stream: [
                        // ...subject_stream1[0]?.stream,
                        {
                            id: cryptoRandomString({ length: 10 }),
                            text: data.text,
                            file: data.file,
                            teacher: session?.user?.name as string || "Teacher",
                            date: formatDate(new Date())
                        },
                    ]
                }]

            )
        })
        form.reset(defaultValues);
        toast.success("Post Created Successfully!");
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
                        name="text"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Text</FormLabel>
                                <FormControl>
                                    <Textarea
                                        placeholder="text..."
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
                        name="file"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>File</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="text..."
                                        className="resize-none"
                                        type="file"
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
                        Create Post
                    </Button>
                </form>
            </Form>
        </>
    );
}
