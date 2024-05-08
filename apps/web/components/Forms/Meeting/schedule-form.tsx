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
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

import { Calendar } from "@/components/ui/calendar"

import { toast } from "sonner";
import {  CalendarIcon } from "lucide-react";
import * as z from "zod";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { Switch } from "@/components/ui/switch";
import { useSession } from "next-auth/react";
import { useSetRecoilState } from "recoil";
import { scheduleMeeting } from "@/components/Store/meeting";
import cryptoRandomString from "crypto-random-string";
import SelectItemsFetch from "./select-items-fetch";
import { add_schedule_meeting } from "@/action/meetingAction";



export const formSchema = z
    .object({
        title: z.string().min(3, { message: "At least 3 letters" }),
        subject_id: z.string(),
        starttime: z.string(),
        endtime: z.string(),
        date: z.string(),
        cameraAlwaysOn: z.boolean(),
        visibility: z.string(),

    }).refine(
        (values) => {
            return values.starttime < values.endtime;
        },
        {
            message: "Start time should be less than end time",
            path: ["starttime"],
        }
).refine(
    (values) => {
        return values.starttime < values.endtime;
    },
    {
        message: "End time should be greater than end time",
        path: ["endtime"],
    }
).refine(
        (values) => {
        return values.subject_id !== '' && values.subject_id !== null;
        },
        {
            message: "Select a subject",
            path: ["subject_id"],
        }
    );


export type UserFormValue = z.infer<typeof formSchema>;


export default function ScheduleMeetingForm() {
    const [loading, setLoading] = useState(false);
    const {data:session} = useSession();
    const setMeetings = useSetRecoilState(scheduleMeeting);

    const defaultValues: UserFormValue = {
        title: "",
        subject_id: "",
        date: new Date().toDateString(),
        starttime: "",
        endtime: "",
        cameraAlwaysOn: false,
        visibility: "private",

    };
    const form = useForm<UserFormValue>({
        resolver: zodResolver(formSchema),
        defaultValues,
    });

    const handleSubmit = async (data: UserFormValue) => {
        setLoading(true);
        console.log(data)
        const pro_data = {
            id: cryptoRandomString({ length: 10 }),
            title: data.title,
            subject_id: data.subject_id,
            date: data.date,
            start_time: data.starttime,
            end_time: data.endtime,
            camera: data.cameraAlwaysOn,
            visibility: data.visibility,
        }
        const res = await add_schedule_meeting(pro_data);

        // setMeetings((prev) => [
        //     ...prev,
        //     {
        //         ...data,
        //         visibility: data.visibility === "public" ? "public" : "private",
        //         teacher: session?.user?.name || "Nayan Bagale",
        //         id: cryptoRandomString({ length: 10 }),
        //     },
        // ]);
        form.reset(defaultValues);
        toast.success("User Created Successfully");
        setLoading(false);
    }


    const onSubmit = async (data: UserFormValue) => {
        setLoading(true);
        toast.promise(handleSubmit(data), {
            loading: "Creating Meeting...",
            success: "Meeting Created Successfully",
            error: "Failed to Create Meeting",
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
                        name="subject_id"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Subject</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select a Subject" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        <SelectItemsFetch/>
                                        <SelectItem value="demo">demo</SelectItem>
                                    </SelectContent>
                                </Select>
                                <FormDescription>
                                    You can select demo subject if you want to test the application
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="date"
                        render={({ field }) => (
                            <FormItem className="flex flex-col">
                                <FormLabel>Select Date</FormLabel>
                                <Popover>
                                    <PopoverTrigger asChild>
                                        <FormControl>
                                            <Button
                                                variant={"outline"}
                                                className={cn(
                                                    "w-[240px] pl-3 text-left font-normal",
                                                    !field.value && "text-muted-foreground"
                                                )}
                                            >
                                                {field.value ? (
                                                    format(field.value, "PPP")
                                                ) : (
                                                    <span>Pick a date</span>
                                                )}
                                                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                            </Button>
                                        </FormControl>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-auto p-0" align="start">
                                        <Calendar
                                            mode="single"
                                            selected={new Date(field.value)}
                                            onSelect={field.onChange}
                                            disabled={(date) =>
                                                new Date(date.getTime() + (1 * 24 * 60 * 60 * 1000)) < new Date()
                                            }
                                            initialFocus
                                        />
                                    </PopoverContent>
                                </Popover>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <div className="flex gap-2">
                        <FormField
                            control={form.control}
                            name="starttime"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Start Time</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="time"
                                            min="0:00"
                                            max="24:00"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="endtime"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>End Time</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="time"
                                            min="0:00"
                                            max="24:00"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>

                    <FormField
                        control={form.control}
                        name="cameraAlwaysOn"
                        render={({ field }) => (
                            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                                <div className="space-y-0.5">
                                    <FormLabel className="text-base">Camera Always On</FormLabel>
                                    <FormDescription>
                                        If you enable this option, your camera will be always on during the
                                        meeting.
                                    </FormDescription>
                                </div>
                                <FormControl>
                                    <Switch
                                        checked={field.value}
                                        onCheckedChange={field.onChange}
                                        aria-readonly
                                    />
                                </FormControl>
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="visibility"
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
                                                <RadioGroupItem value="private" />
                                            </FormControl>
                                            <FormLabel className="font-normal">
                                                Only students who enrolled in the subject
                                            </FormLabel>
                                        </FormItem>
                                        <FormItem className="flex items-center space-x-3 space-y-0">
                                            <FormControl>
                                                <RadioGroupItem value="public" />
                                            </FormControl>
                                            <FormLabel className="font-normal">
                                                Public Anyone with the link
                                            </FormLabel>
                                        </FormItem>
                                    </RadioGroup>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <Button disabled={loading} className="ml-auto w-full" type="submit">
                        Schedule
                    </Button>
                </form>
            </Form>
        </>
    );
}
