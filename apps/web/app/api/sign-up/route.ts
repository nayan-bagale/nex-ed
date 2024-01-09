// import { prisma } from "@/lib/prisma";
// import { hash } from "bcryptjs";
import { error } from "console";
import { NextResponse } from "next/server";

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
    return NextResponse.json(
      {
        message: "Successfully Signed Up",
        ok: true,
      },
      { status: 200 }
    );
    // return NextResponse.json(
    //   { error: "Internal Server Error" },
    //   { status: 400 }
    // );
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
