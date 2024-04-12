import React, { FC } from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";

import { toast } from "sonner";

import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import * as z from "zod";
import { changepassAction } from "@/components/action/changepassAction";

export const formSchema = z
    .object({

        old_password: z.string().min(8, { message: "At least 8 letters" }),
        password: z.string().min(8, { message: "At least 8 letters" }),
        confirm_password: z.string().min(8, { message: "At least 8 letters" }),
    })
    .refine(
        (values) => {
            return values.password === values.confirm_password;
        },
        {
            message: "Passwords do not match",
            path: ["confirm_password"],
        }
    ).refine(
        (values) => {
            return values.old_password !== values.password;
        },
        {
            message: "New password must be different from old password",
            path: ["password"],
        }
    );


export type UserFormValue = z.infer<typeof formSchema>;


const DialogBox:FC<{email: string}> = ({email}) => {
    const defaultValues: UserFormValue = {
        old_password: '',
        password: '',
        confirm_password: '',

    };
    const form = useForm<UserFormValue>({
        resolver: zodResolver(formSchema),
        defaultValues,
    });

    const onSubmit = async (data: UserFormValue) => {
        toast.promise(changepassAction(data, email), {
            loading: "Updating password...",
            success: async (data) => {
                if (data === "Password updated successfully") {
                    form.reset();
                }
                return data;
            },
            error: (error) => {
                return "Something went wrong";
            },
        });

    };

    return (
        <Dialog>
            <DialogTrigger className=" h-10 px-4 py-2 inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground">Reset Password</DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Are you absolutely sure?</DialogTitle>
                    <DialogDescription>
                        This action cannot be undone. This will permanently delete your account
                        and remove your data from our servers.
                    </DialogDescription>
                </DialogHeader>
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="space-y-2 w-full"
                    >
                        <FormField
                            control={form.control}
                            name="old_password"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Old Password</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="password"
                                            placeholder="Enter your password..."
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="password"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>New Password</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="password"
                                            placeholder="Enter your password..."
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="confirm_password"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Confirm Password</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="text"
                                            placeholder="Confirm your password..."
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <DialogFooter>
                            <Button type='submit'>Save</Button>
                        </DialogFooter>
                    </form>
                </Form>

            </DialogContent>
        </Dialog>
    )
}

export default DialogBox