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
import { get_schedule_meeting_by_id } from "@/action/meetingAction";
import { useRouter } from "next/navigation";



export const formSchema = z
    .object({
        join: z.string().min(10, { message: "At least 10 letters" }).max(10, { message: "At most 10 letters" }),
    })


export type UserFormValue = z.infer<typeof formSchema>;


export default function InstantJoinMeetingForm() {
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const defaultValues: UserFormValue = {
        join: "",

    };
    const form = useForm<UserFormValue>({
        resolver: zodResolver(formSchema),
        defaultValues,
    });

    const handleSubmit = async (data: UserFormValue) => {
        const res = await get_schedule_meeting_by_id(data.join);
        if (!res.ok) {
            throw new Error(res.message);
        }
        form.reset(defaultValues);
        
        return res;
    }


    const onSubmit = async (data: UserFormValue) => {
        setLoading(true);
        toast.promise(handleSubmit(data), {
            loading: 'Joining...',
            success: () => {
                router.push(`/liveclass/${data.join}`);
                return 'Redirecting to meeting...';
            },
            error: (err) => {
                return err.message;
            }
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
