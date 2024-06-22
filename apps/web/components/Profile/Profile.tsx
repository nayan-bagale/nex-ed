"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"


import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { useSession } from "next-auth/react";
import DialogBox from "./DialogBox/DialogBox";
import { updateprofileAction } from '@/action/updateprofileAction';
import { useState } from "react";
import { useEdgeStore } from "@/lib/edgestore";
import { SingleImageDropzone } from "./SingleImageDropZone";

const profileFormSchema = z.object({
    image: z.any(),
    firstname: z.string().min(3, { message: "At least 3 letters" }),
    lastname: z.string().min(3, { message: "At least 3 letters" }),
    role: z.enum(["student", "teacher"]),
    email: z.string(),
});

export type ProfileFormValues = z.infer<typeof profileFormSchema>;

function ProfileForm() {

    const [file, setFile] = useState<File>();
    const [loading, setLoading] = useState(false);
    const { edgestore } = useEdgeStore();

    const { data: session, update } = useSession();

    // This can come from your database or API.
    const defaultValues: Partial<ProfileFormValues> = {
        firstname: session?.user?.name?.split(' ')[0] ?? '',
        lastname: session?.user?.name?.split(' ')[1] ?? '',
        email: session?.user?.email ?? '',
        image: session?.user?.image ?? '',
        role: session?.user?.role as "student" | "teacher" || "student",
    };

    const form = useForm<ProfileFormValues>({
        resolver: zodResolver(profileFormSchema),
        defaultValues,
        mode: "onChange",
    });

    const handleImage = async (data: ProfileFormValues) => {
        const fname = `${data.firstname} ${data.lastname}`

        if (file) {
            if (session?.user?.image) {
                try {
                    const fileUrl = session.user.image.replace(/-thumb\.(jpeg|png|jpg)$/, '.$1')
                    await edgestore.publicImages.delete({
                        url: fileUrl,
                    })
                } catch (e: unknown) {
                    console.log(e)
                }
            }

            const res = await edgestore.publicImages.upload({
                file: file as File,
                onProgressChange: (progress) => {
                    console.log(progress);
                },

            });

            console.log(res)

            if (res.thumbnailUrl) {
                data.image = res.thumbnailUrl;
                setFile(undefined);
            }

        }

        const $ = await updateprofileAction(data)
        if ($.ok) {
            update({ ...session, user: { ...session?.user, name: fname, role: data.role, image: data.image } })
        }
        return $;
    }

    async function onSubmit(data: ProfileFormValues) {
        setLoading(true);
        toast.promise(handleImage(data), {
            loading: "Updating profile...",
            success: async (updata) => {
                if (updata.ok) {
                    return updata.message
                }
                return updata.message;
            },
            error: async (error) => {
                console.log(error)
                return "Something went wrong";
            }
        });
        setLoading(false);

    }

    const img = session?.user?.image?.replace(/-thumb\.(jpeg|png|jpg)$/, '.$1');

    return (
        <div className=" m-2 p-4 max-w-screen-sm items-center flex ">
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 flex flex-col">
                    <FormField
                        control={form.control}
                        name="image"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Profile Image</FormLabel>
                                <FormControl>
                                    <SingleImageDropzone
                                        width={200}
                                        height={200}
                                        value={file || img || undefined}
                                        dropzoneOptions={{
                                            accept: {
                                                'image/jpeg': [],
                                                'image/png': []
                                            },
                                            maxSize: 4 * 1024 * 1024,
                                        }}
                                        onChange={(file) => {
                                            setFile(file);
                                        }}
                                        className="rounded-full"
                                        disabled={loading}
                                    />
                                </FormControl>
                                {/* <FormDescription>
                                    This is your public display name. It can be your real name or a
                                    pseudonym. You can only change this once every 30 days.
                                </FormDescription> */}
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <div className=" flex w-full gap-2">
                        <FormField
                            control={form.control}
                            name="firstname"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>First Name</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="text"
                                            placeholder="First Name"
                                            {...field}
                                            disabled={loading}

                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="lastname"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Last Name</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="text"
                                            placeholder="Last Name"
                                            {...field}
                                            disabled={loading}

                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
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
                                        disabled
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )} />

                    <FormField
                        control={form.control}
                        name="role"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Im a ..</FormLabel>
                                <FormControl>
                                    <RadioGroup
                                        onValueChange={field.onChange}
                                        defaultValue={field.value}
                                        className="flex space-x-1"
                                        disabled={loading}

                                    >
                                        <FormItem className="flex items-center space-x-3 space-y-0">
                                            <FormControl>
                                                <RadioGroupItem value="student" />
                                            </FormControl>
                                            <FormLabel className="font-normal">
                                                Student
                                            </FormLabel>
                                        </FormItem>
                                        <FormItem className="flex items-center space-x-3 space-y-0">
                                            <FormControl>
                                                <RadioGroupItem value="teacher" />
                                            </FormControl>
                                            <FormLabel className="font-normal">
                                                Teacher
                                            </FormLabel>
                                        </FormItem>
                                    </RadioGroup>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />


                    <Button type="submit"
                        disabled={loading}
                    >Update profile</Button>

                    <DialogBox email={session?.user?.email as string} />

                </form>
            </Form>
        </div>

    );
}

export default ProfileForm;