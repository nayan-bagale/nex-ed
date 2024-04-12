import * as z from "zod";

export const formSchema = z
  .object({
    email: z.string().email({ message: "Enter a valid email address" }),
    password: z.string().min(8, { message: "At least 8 letters" }),
    confirm_password: z.string().min(8, { message: "At least 8 letters" }),
    firstname: z.string().min(3, { message: "At least 3 letters" }),
    lastname: z.string().min(3, { message: "At least 3 letters" }),
    role: z.enum(["student", "teacher"]),
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

export type UserFormValue = z.infer<typeof formSchema>;
