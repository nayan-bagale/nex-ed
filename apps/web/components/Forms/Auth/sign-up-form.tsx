"use client";
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";

const formSchema = z
  .object({
    email: z.string().email({ message: "Enter a valid email address" }),
    password: z.string().min(8, { message: "At least 8 letters" }),
    confirm_password: z.string().min(8, { message: "At least 8 letters" }),
    firstname: z.string().min(3, { message: "At least 3 letters" }),
    lastname: z.string().min(3, { message: "At least 3 letters" }),
  })
  .refine(
    (values) => {
      return values.password === values.confirm_password;
    },
    {
      message: "Passwords do not match",
      path: ["confirm_password"],
    }
  );

type UserFormValue = z.infer<typeof formSchema>;

export default function UserAuthForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const defaultValues = {
    email: "",
    password: "",
    confirm_password: "",
    firstname: "",
    lastname: "",
    // orgId: "",
  };
  const form = useForm<UserFormValue>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  const onSubmit = async (data: UserFormValue) => {

    setLoading(true);
    toast.promise(
      fetch("/api/sign-up", {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
        // cache: "no-store",
      }),
      {
        loading: "Account creating...",
        success: async(data) => {
          const res:{message:string,ok:boolean} = await data.json();
          if (res?.ok) {
            console.log(res);
            router.push("/sign-in");
          } else {
            console.log(res);
            toast.error(res.message);
          }
          return "Account created";
        },
        error: (error) => {
          console.log(error);
          return "Something went wrong";
        },
      }
    );
    setLoading(false);
  };

  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-2 w-full"
        >
          <div className=" flex gap-2">
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
              name="lastname"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Last Name</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      placeholder="Last Name"
                      disabled={loading}
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
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    placeholder="Enter your email..."
                    disabled={loading}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* <FormField
            control={form.control}
            name="orgId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Organization Id</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    placeholder="Organization Id..."
                    disabled={loading}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          /> */}
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="Enter your password..."
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
            name="confirm_password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Confirm Password</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    placeholder="Confirm your password..."
                    disabled={loading}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button disabled={loading} className="ml-auto w-full" type="submit">
            Sign Up
          </Button>
        </form>
      </Form>
    </>
  );
}
