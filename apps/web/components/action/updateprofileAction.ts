"use server";

import { db } from "@/database/db";
import { ProfileFormValues } from "../Profile/Profile";
import { users } from "@/database/schema";
import { eq } from "drizzle-orm";

export async function updateprofileAction(data: ProfileFormValues) {
  try {
    const user = await db
      .update(users)
      .set({
        name: `${data.firstname} ${data.lastname}`,
        role: data.role,
        email: data.email,
      })
      .where(eq(users.email, data.email))
      .returning();

      console.log(user)

    return {
        ok: true,
        message: "Profile updated successfully",
    };
  } catch (e) {
    console.log(e);
    return {
        ok: false,
        message: "Profile update failed",
    };
  }
}
