// import { prisma } from "@/lib/prisma";
// import { hash } from "bcryptjs";
import { error } from "console";
import { NextResponse } from "next/server";
import { USERS } from "@/data/constants";

export async function POST(req: Request) {
  try {
    const { firstname, lastname, email, password } = (await req.json()) as {
      firstname: string;
      lastname: string;
      email: string;
      password: string;
    };

    console.log(firstname, lastname, email, password);

    // throw Error("Not implemented yet");
    const user = USERS.find((user) => user.email === email);

    if (user) {
      return NextResponse.json(
        {
          ok: false,
          message: "Email already exists",
        },
        { status: 203 }
      );
    }

    return NextResponse.json(
      {
        message: "Successfully Signed Up",
        ok: true,
      },
      { status: 200 }
    );
  } catch (error: any) {
    return new NextResponse(
      JSON.stringify({
        status: "error",
        message: error.message,
      }),
      { status: 500 }
    );
  }
}
