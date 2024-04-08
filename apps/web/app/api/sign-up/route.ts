// import { prisma } from "@/lib/prisma";
import { hash } from "bcrypt";
import { error } from "console";
import { NextResponse } from "next/server";
import { USERS } from "@/data/constants";
import { db } from "@/database/db";
import { eq } from "drizzle-orm";
import { users } from "@/database/schema";
import {
  formSchema,
  UserFormValue,
} from "@/components/Forms/Auth/schema/sign-up-zod-schema";

export async function POST(req: Request) {
  function validateFormData(formData: any) {
    try {
      // Validate the form data against the schema
      const validatedData = formSchema.parse(formData);
      return validatedData; // Valid data
    } catch (error: unknown) {
      // Handle validation errors (e.g., log, return error response)
      console.error("Validation error:", error.message);
      throw new Error("Invalid form data");
    }
  }

  try {
    const submittedData = (await req.json()) as {
      firstname: string;
      lastname: string;
      email: string;
      password: string;
    };

    // console.log(firstname, lastname, email, password);

    // throw Error("Not implemented yet");
    // const user = USERS.find((user) => user.email === email);

    try {
      const validatedData = validateFormData(submittedData);
      // Proceed with further processing (e.g., save to database)
      console.log("Valid data:", validatedData);
    } catch (error: unknown) {
      // Handle validation error (e.g., return error response to client)
      console.error("Error:", error);
      return new NextResponse(
        JSON.stringify({
          status: "error",
          message: "Invalid form data",
        }),
        { status: 400 }
      );
    }

    const user = await db.select().from(users).where(eq(users.email, submittedData.email));

    if (user.length > 0) {
      return NextResponse.json(
        {
          ok: false,
          message: "Email already exists",
        },
        { status: 203 }
      );
    }

    const hashedPassword = await hash(submittedData.password, 12); 

    const insertedData = await db.insert(users).values({
      id:crypto.randomUUID(),
      name: `${submittedData.firstname} ${submittedData.lastname}`,
      email: submittedData.email,
      emailVerified: null,
      image:"",
      password:hashedPassword
    }).returning()
    
    console.log(insertedData);

    return NextResponse.json(
      {
        message: "Successfully Signed Up",
        ok: true,
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.log(error)
    return new NextResponse(
      JSON.stringify({
        status: "error",
        message: error.message,
      }),
      { status: 500 }
    );
  }
}
