"use server";

import { db } from "@/database/db";
import { stream, users } from "@/database/schema";
import { Subject_streamT } from "@/components/Store/class";
import { getServerSession } from "next-auth";
import { authOptions } from "@/components/utils/options";
import { eq } from "drizzle-orm";
import { revalidateTag, unstable_cache } from "next/cache";

export async function create_stream_Action(data: Subject_streamT) {
  const session = await getServerSession(authOptions);
  if (session?.user.role !== "teacher") {
    return {
      ok: false,
      message: "You are not authorized to create a stream",
    };
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
    revalidateTag("stream_data");
    // console.log(res);

    return {
      data: res[0],
      ok: true,
    };
  } catch (error: unknown) {
    console.log(error);
    return {
      ok: false,
      message: "An error occurred",
    };
  }
}

export const getSubjects = unstable_cache(
  async (id) => get_stream_Action(id),
  ["stream_data"],
  { tags: ["stream_data"] }
);

async function get_stream_Action(subject_id: string) {
  const session = await getServerSession(authOptions);
  if (
    session?.user?.role !== "teacher" &&
    session?.user?.role !== "student" &&
    session?.user?.role !== "admin"
  ) {
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
    return {
      ok: false,
      message: "You are not authorized to delete this stream",
    };
  }

  try {
    const res = await db.delete(stream).where(eq(stream.id, id)).returning();
    revalidateTag("stream_data");
    return {
      data: res[0],
      ok: true,
    };
  } catch (error: unknown) {
    console.log(error);
    return {
      ok: false,
    };
  }
}
