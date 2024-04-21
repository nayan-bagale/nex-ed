"use server";

import { db } from "@/database/db";
import { stream, users } from "@/database/schema";
import { Subject_streamT } from "@/components/Store/class";
import { getServerSession } from "next-auth";
import { authOptions } from "@/components/utils/options";
import { eq } from "drizzle-orm";
import { profile } from "console";

export async function create_stream_Action(data: Subject_streamT) {
  const session = await getServerSession(authOptions);
  if (session?.user.role !== "teacher") {
    return false;
  }

  try {
    const res = await db
      .insert(stream)
      .values({
        id: data.id,
        subject_id: data.subject_id,
        teacher_id: session.user.id as string,
        date: data.date,
        description: data.text,
        deleted: false,
        files: data.files,
      })
      .returning();

    // console.log(res);

    return true;
  } catch (error: unknown) {
    console.log(error);
    return false;
  }
}

export async function get_stream_Action(subject_id: string) {
    const session = await getServerSession(authOptions);
    if (session?.user?.role !== "teacher" && session?.user?.role !== "student" && session?.user?.role !== "admin") {
      return [];
    }
  try {
    const data = await db
      .select()
      .from(stream)
      .leftJoin(users, eq(users.id, stream.teacher_id))
      .where(eq(stream.subject_id, subject_id));

    // console.log(data);

    return data.map((d) => ({
      id: d?.stream?.id,
      subject_id: d?.stream?.subject_id,
      text: d?.stream?.description,
      files: d?.stream?.files || [],
      teacher: d?.user?.name as string,
      date: d?.stream?.date,
      profile: d?.user?.image,
    }));
  } catch (error: unknown) {
    console.log(error);
    return [];
  }
}

export async function delete_stream_Action(id: string) {
  const session = await getServerSession(authOptions);
  if (session?.user.role !== "teacher") {
    return false;
  }

  try {
    const res = await db
      .delete(stream)
      .where(eq(stream.id, id)).returning();

    if(res[0]?.files?.length ?? 0 <= 0){
      return true;
    }


    return true;
  } catch (error: unknown) {
    console.log(error);
    return false;
  }
}