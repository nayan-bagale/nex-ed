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
import {  SubjectsT } from "@/components/Store/class";
import { useSession } from "next-auth/react";
import cryptoRandomString from "crypto-random-string";
import { create_subject_Action } from "@/action/subject_Action";




export const formSchema = z
    .object({
        subject_name: z.string().min(3, { message: "Text must be atleast 3 characters" }),
        description: z.string().min(3, { message: "Text must be atleast 3 characters" }).max(100, { message: "Text must be atmost 100 characters" }),
    })


export type UserFormValue = z.infer<typeof formSchema>;


export default function AddSubjectForm() {

    const {data:session} = useSession();

    const [loading, setLoading] = useState(false);

    const defaultValues: UserFormValue = {
        subject_name: "",
        description: "",
    };
    const form = useForm<UserFormValue>({
        resolver: zodResolver(formSchema),
        defaultValues,
    });

    const handlesubmit = async (data: any) => {
            const res = await create_subject_Action(data);
            if(!res) throw new Error("Failed to Add Subject");
            form.reset(defaultValues);
            
    }

    const onSubmit = async (data: UserFormValue) => {
        setLoading(true);

        const newSub = {
            id: cryptoRandomString({ length: 10 }),
            name: data.subject_name,
            description: data.description,
            total_students: 0
        }
        toast.promise(handlesubmit(newSub),{
            loading: 'Adding Subject...',
            success: 'Subject Added Successfully!',
            error: 'Failed to Add Subject'
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

                    <Button disabled={loading} size={'sm'} className="ml-auto w-full" type="submit">
                        Add Subject
                    </Button>
                </form>
            </Form>
        </>
    );
}
