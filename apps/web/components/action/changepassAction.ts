'use server'

import { db } from "@/database/db";
import { UserFormValue, formSchema } from "../Profile/DialogBox/DialogBox";
import { users } from "@/database/schema";
import { eq } from "drizzle-orm";
import { compare, hash } from "bcrypt";

export async function changepassAction(data: UserFormValue, email:string) {
    try{
        const userData = await db.select().from(users).where(eq(users.email, email));

        if(userData.length === 0 && !userData[0].password) return "User not found";
        const isOldMatch = await compare(data.old_password, userData[0].password as string);
        console.log(userData[0].password);
        console.log(isOldMatch)
        if(!isOldMatch) return "Old password is incorrect";

        const hashedPassword = await hash(data.password, 12);

        const updata = await db.update(users).set({password: hashedPassword}).where(eq(users.email, email)).returning();
        console.log(updata)

        return "Password updated successfully";
    }catch(err){
        console.log(err);
        return "Something went wrong";
    }
//   console.log(data,email);
}