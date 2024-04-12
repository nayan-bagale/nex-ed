"use server";

import { db } from "@/database/db";
import { resetpasswordTokens, users } from "@/database/schema";
import { eq } from "drizzle-orm";
import nodemailer from "nodemailer";
import cryptoRandomString from "crypto-random-string";

export async function forgotpassAction(email: string) {
  try {
    const user = await db.select().from(users).where(eq(users.email, email));
    if(user.length === 0) {
      return false;
    }
    // console.log(user);

    const token = cryptoRandomString({ length: 64, type: "url-safe" });

    const insertToken = await db.insert(resetpasswordTokens).values({
      user_id: user[0].id,
      token: token,
      expires: new Date(Date.now() + 1000 * 60 * 60 * 24),
    });

    var transport = nodemailer.createTransport({
      host: "live.smtp.mailtrap.io",
      port: 587,
      auth: {
        // user: "demo",
        // pass: "demo",
      },
    });

    const html = ` Click to reset <a href="${process.env.NEXT_PUBLIC_ORIGIN_URL!}/forgot-password/reset/${token}">reset password</a>`;

    const info = await transport.sendMail({
      // TODO: Send email to user
      from: '"Maddison Foo Koch 👻" <nvbagale@gmail.com>', // sender address
      to: email, // list of receivers
      subject: "Hello ✔", // Subject line
      text: "Hello world?", // plain text body
      html: html, // html body
    });

    console.log("Message sent: %s", info.messageId);

    return token;
  } catch (error: unknown) {
    console.log(error);
    return false;
  }
}
