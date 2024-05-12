"use server";

import { authOptions } from "@/components/utils/options";
import { db } from "@/database/db";
import { attendance, attended } from "@/database/schema";
import { eq } from "drizzle-orm";
import cryptoRandomString from "crypto-random-string";
import { getServerSession } from "next-auth";

export async function addAttendace(data: any) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return {
      ok: false,
      message: "Unauthorized",
    };
  }

  try {
    const newData = {
      ...data,
      teacher_name: session?.user.name,
      teacher_id: session?.user.id,
    };
    console.log(newData);

    const res = await db
      .insert(attendance)
      .values({
        id: cryptoRandomString({ length: 10 }),
        date: newData.date,
        subject_id: newData.subject_id,
        subject_name: newData.subject_name,
        teacher_name: newData.teacher_name,
        teacher_id: newData.teacher_id,
        mode: newData.mode as "Offline" | "Online",
        total_students: newData.total_students,
        percentage: newData.percentage,
      })
      .returning();

      console.log(res)

    const students = newData.students.map((student: any) => ({
      attendance_id: res[0].id,
      student_id: student.student_id,
      status: student.status as "Present" | "Absent",
    }));

    const result = await db.insert(attended).values(students).returning();

    console.log(result);

    return {
      ok: true,
      message: "Attendance added successfully",
    };
  } catch (e: unknown) {
    console.log(e);
    return {
      ok: false,
      message: "Something went wrong",
    };
  }
}

export async function getAttedanceDate(){
  const session = await getServerSession(authOptions);
  if (!session) {
    return {
      ok: false,
      message: "Unauthorized",
    };
  }

  try {
    const res = await db
      .select()
      .from(attendance)
      .where(eq(attendance.teacher_id, session?.user.id))
      // .limit(30);

      const obj:{[key: string]: string[]} = {}
 
      res.forEach(e => {
        obj[e.subject_id] = obj[e.subject_id]
          ? [...obj[e.subject_id], e.date]
          : [e.date];
      });

    return {
      ok: true,
      data: obj,
    };
    
  } catch (e: unknown) {
    console.log(e);
    return {
      ok: false,
      message: "Something went wrong",
    };
  }
}