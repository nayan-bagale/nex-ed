import * as z from "zod";

export const formSchema_signin = z.object({
  email: z.string().email({ message: "Enter a valid email address" }),
  password: z.string().min(8, { message: "At least 8 letters" }),
});

export type UserFormValue_signin = z.infer<typeof formSchema_signin>;
