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

import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { add_instant_meeting } from "@/action/meetingAction";
import { useSession } from "next-auth/react";
import cryptoRandomString from "crypto-random-string";
import { hostname } from "os";
import { date } from "drizzle-orm/pg-core";
import { useSetRecoilState } from "recoil";
import { instantMeeting } from "@/components/Store/meeting";



export const formSchema = z
    .object({
        title: z.string().min(3, { message: "At least 3 letters" }),
        Visibility: z.string(),

    })


export type UserFormValue = z.infer<typeof formSchema>;


export default function InstantCreateMeetingForm() {
    const [loading, setLoading] = useState(false);
    const {data:session} = useSession();
    const setIntantMeeting = useSetRecoilState(instantMeeting);

    const defaultValues: UserFormValue = {
        title: "",
        Visibility: "public",

    };
    const form = useForm<UserFormValue>({
        resolver: zodResolver(formSchema),
        defaultValues,
    });

    const handleSubmit = async (data: UserFormValue) => {
        const pro_data = {
            id: cryptoRandomString({ length: 10 }),
            host_role: session?.user.role as string,
            host_id: session?.user.id as string,
            title: data.title,
            date: new Date().toDateString(),
            start_time: new Date().toTimeString().slice(0, 5),
            end_time: '00:00',
            done: false,
        }

        const res = await add_instant_meeting(pro_data);
        if (!res.ok) {
            throw new Error(res.message);
        }

        setIntantMeeting((prev) => ([...prev, {
            id: pro_data.id,
            title: pro_data.title,
            date: pro_data.date,
            visibility: data.Visibility as 'public' | 'private'
        }]));

        console.log(data)
        form.reset(defaultValues);

        return res.message;
    }

    const onSubmit = async (data: UserFormValue) => {
        setLoading(true);
        toast.promise(handleSubmit(data), {
            loading: 'Creating Meeting...',
            success: (e) => e,
            error: (e) => e.message
        });
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
                        name="title"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Title</FormLabel>
                                <FormControl>
                                    <Input
                                        type="text"
                                        placeholder="Title..."
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
                        name="Visibility"
                        render={({ field }) => (
                            <FormItem className="flex flex-col space-y-4 rounded-lg border p-4">
                                <FormLabel>Visibility</FormLabel>
                                <FormControl>
                                    <RadioGroup
                                        onValueChange={field.onChange}
                                        defaultValue={field.value}
                                        className="flex flex-col space-y-1"
                                    >
                                        <FormItem className="flex items-center space-x-3 space-y-0">
                                            <FormControl>
                                                <RadioGroupItem value="public" />
                                            </FormControl>
                                            <FormLabel className="font-normal">
                                                Public - Anyone can join
                                            </FormLabel>
                                        </FormItem>
                                    </RadioGroup>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button disabled={loading} className="ml-auto w-full" type="submit">
                        Create Meeting
                    </Button>
                </form>
            </Form>
        </>
    );
}
