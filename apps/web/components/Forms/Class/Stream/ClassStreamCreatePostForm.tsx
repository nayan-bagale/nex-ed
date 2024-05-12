"use client";
import React, { useState } from "react";
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
import { useSession } from "next-auth/react";
import cryptoRandomString from "crypto-random-string";
import { MultiFileDropzone, FileState } from "./MultiFileDropzone";
import { create_stream_Action } from "@/action/stream_Action";
import { formatDate } from "@/components/utils/DateFormatter";
import { useEdgeStore } from "@/lib/edgestore";
import { Files } from "@/database/schema";





export const formSchema = z
    .object({
        text: z.string().min(10, { message: "Text must be atleast 10 characters" }).max(250, { message: "Text must be less than 100 characters" }),
        files: z.any().optional()

    })


export type UserFormValue = z.infer<typeof formSchema>;


export default function ClassStreamCreatePostForm({ sub_id }: { sub_id: string }) {
    const { data: session } = useSession();
    const [loading, setLoading] = useState(false);
    const [fileStates, setFileStates] = useState<FileState[]>([]);
    const { edgestore } = useEdgeStore();
    // console.log(stream)

    const defaultValues: UserFormValue = {
        text: "",
        files: undefined
    };
    const form = useForm<UserFormValue>({
        resolver: zodResolver(formSchema),
        defaultValues,
    });



    const uploadFiles = async () => {
        function updateFileProgress(key: string, progress: FileState['progress']) {
            setFileStates((fileStates) => {
                const newFileStates = structuredClone(fileStates);
                const fileState = newFileStates.find(
                    (fileState) => fileState.key === key,
                );
                if (fileState) {
                    fileState.progress = progress;
                }
                return newFileStates;
            });
        }
        let files:Files[] = []
        await Promise.all(
            fileStates.map(async (addedFileState) => {
                try {
                    const res = await edgestore.publicFiles.upload({
                        file: addedFileState.file,
                        onProgressChange: async (progress) => {
                            updateFileProgress(addedFileState.key, progress);
                            if (progress === 100) {
                                // wait 1 second to set it to complete
                                // so that the user can see the progress bar at 100%
                                await new Promise((resolve) => setTimeout(resolve, 1000));
                                updateFileProgress(addedFileState.key, 'COMPLETE');
                            }
                        },
                    });

                    files.push({
                        name: addedFileState.file.name,
                        url: res.url,
                        size: addedFileState.file.size as number
                    });

                    console.log(res);
                } catch (err) {
                    updateFileProgress(addedFileState.key, 'ERROR');
                }
            }),
        );

        return files;
    }

    const handleSubmit = async (data: UserFormValue) => {
        setLoading(true);
        console.log(data)
        const files = await uploadFiles();
        const pro_data = {
            id: cryptoRandomString({ length: 10 }),
            subject_id: sub_id,
            text: data.text,
            files: files,
            teacher: session?.user?.name as string,
            date: formatDate(new Date()),
            profile: session?.user?.image as string
        }

        const res = await create_stream_Action(pro_data);
        if (!res) {
            setLoading(false);
            throw Error("Something went wrong!")
        }

        form.reset(defaultValues);
        toast.success("Post Created Successfully!");
        setLoading(false);
    }

    const onSubmit = async (data: UserFormValue) => {
        toast.promise(handleSubmit(data), {
            loading: "Creating Post...",
            success: "Post Created Successfully!",
            error: "Failed to create post!"
        })
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
                                        disabled={loading}
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
                        name="files"
                        render={() => (
                            <FormItem>
                                <FormLabel>Files</FormLabel>
                                <FormControl>
                                    <MultiFileDropzone
                                        value={fileStates}
                                        className="w-full"
                                        onChange={(files) => {
                                            setFileStates(files);
                                        }}
                                        dropzoneOptions={{
                                            maxFiles: 2,
                                        }}
                                        disabled={loading}
                                        onFilesAdded={async (addedFiles) => {
                                            setFileStates([...fileStates, ...addedFiles]);

                                        }}
                                    />
                                </FormControl>
                                <FormDescription>
                                    Maximum 2 files.
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <Button disabled={loading} size={'sm'} className="ml-auto w-full" type="submit">
                        Create Post
                    </Button>
                </form>
            </Form>
        </>
    );
}
