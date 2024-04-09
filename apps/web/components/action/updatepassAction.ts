'use server'

import { db } from "@/database/db"
import { resetpasswordTokens, users } from "@/database/schema"
import { eq } from "drizzle-orm"
import { hash } from "bcrypt"

type ResetFormValue = {
    password: string
    confirm_password: string
    token: string
}
const sleep = (delay:number) => new Promise((resolve) => setTimeout(resolve, delay));
export async function updatePassword(data: ResetFormValue) {
    try{
        console.log(data)
        const token = await db.select().from(resetpasswordTokens).where(eq(resetpasswordTokens.token, data.token))

        const hashPassword = await hash(data.password, 12)
        
        await db.update(users).set({password: hashPassword}).where(eq(users.id, token[0].user_id))

        const deleted = await db.delete(resetpasswordTokens).where(eq(resetpasswordTokens.token, data.token)).returning()
        
        return true

    }catch(e: unknown) {
        console.log(e)
        return false
    }
}