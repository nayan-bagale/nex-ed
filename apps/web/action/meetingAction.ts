"use server";

import { authOptions } from "@/components/utils/options";
import { db } from "@/database/db";
import {
  instant_meeting,
  schedule_meeting,
  studenthassubjects,
  subjects,
  teachershassubjects,
  users,
} from "@/database/schema";
import { and, eq } from "drizzle-orm";
import { getServerSession } from "next-auth";
import { revalidateTag, unstable_cache } from "next/cache";

export async function get_subject_by_teacher_id() {
  const session = await getServerSession(authOptions);
  if (!session) {
    return {
      ok: false,
      message: "You need to be logged in to perform this action",
    };
  }

  if (session.user.role !== "teacher" && session.user.role !== "admin") {
    return {
      ok: false,
      message: "You need to be a teacher to perform this action",
    };
  }

  try {
    const res = await db
      .select()
      .from(subjects)
      .leftJoin(
        teachershassubjects,
        eq(subjects.id, teachershassubjects.subject_id)
      )
      .where(eq(teachershassubjects.teacher_id, session.user.id));

    // console.log(res)
    return {
      ok: true,
      data: res.map((item) => ({
        name: item.subjects.name,
        id: item.subjects.id,
      })),
    };
  } catch (error: unknown) {
    console.log(error);
    return {
      ok: false,
      message: "An error occurred while fetching the subject",
    };
  }
}

export async function add_schedule_meeting(data: any) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return {
      ok: false,
      message: "You need to be logged in to perform this action",
    };
  }

  if (session.user.role !== "teacher" && session.user.role !== "admin") {
    return {
      ok: false,
      message: "You need to be a teacher to perform this action",
    };
  }

  try {
    const res = await db
      .insert(schedule_meeting)
      .values({
        ...data,
        teacher_id: session.user.id,
        teacher_name: session.user.name,
        visibility: data.visibility === "public" ? true : false,
        done: false,
      })
      .returning();

    revalidateTag("get_schedule_meeting");

    console.log(res);
    return {
      ok: true,
      message: "Meeting scheduled successfully",
    };
  } catch (e: unknown) {
    console.log(e);
    return {
      ok: false,
      message: "An error occurred while scheduling the meeting",
    };
  }
}

// export const getCachedMeeting = unstable_cache(
//   get_schedule_meeting,
//   ["get_schedule_meeting"],
//   {
//     tags: ["get_schedule_meeting"],
//   }
// );

export async function get_schedule_meeting() {
  const session = await getServerSession(authOptions);
  if (!session) {
    return {
      ok: false,
      message: "You need to be logged in to perform this action",
    };
  }

  if (
    session.user.role !== "teacher" &&
    session.user.role !== "admin" &&
    session.user.role !== "student"
  ) {
    return {
      ok: false,
      message: "You need to be a teacher to perform this action",
    };
  }

  try {
    if (session.user.role === "teacher" || session.user.role === "admin") {
      const res = await db
        .select()
        .from(schedule_meeting)
        .where(eq(schedule_meeting.teacher_id, session.user.id));
      return {
        ok: true,
        data: res,
      };
    } else if (session.user.role === "student") {
      const res = await db
        .select()
        .from(schedule_meeting)
        .leftJoin(
          studenthassubjects,
          eq(studenthassubjects.student_id, session.user.id)
        )
        .where(eq(schedule_meeting.subject_id, studenthassubjects.subject_id));

      return {
        ok: true,
        data: res.map((item) => item.schedule_meeting),
      };
    }
  } catch (e: unknown) {
    console.log(e);
    return {
      ok: false,
      message: "An error occurred while fetching the schedule meeting",
    };
  }
}

export async function get_schedule_meeting_by_id(id: string) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return {
      ok: false,
      message: "You need to be logged in to perform this action",
    };
  }

  if (
    session.user.role !== "teacher" &&
    session.user.role !== "admin" &&
    session.user.role !== "student"
  ) {
    return {
      ok: false,
      message: "You need to be a teacher to perform this action",
    };
  }

  try {
    const res = await db
      .select()
      .from(schedule_meeting)
      .where(eq(schedule_meeting.id, id));
    if (res.length === 0) {
      return {
        ok: false,
        message: "Meeting not found",
      };
    }

    if (res[0].done) {
      return {
        ok: false,
        message: "Meeting has ended",
      };
    }

    if (
      (session.user.id === res[0].teacher_id &&
        session.user.role === "teacher") ||
      session.user.role === "admin"
    ) {
      return {
        ok: true,
        data: res[0],
      };
    }

    if (session.user.role === "teacher") {
      const res_sub = await db
        .select()
        .from(teachershassubjects)
        .leftJoin(subjects, eq(teachershassubjects.subject_id, subjects.id))
        .where(eq(teachershassubjects.teacher_id, session.user.id));

      if (res_sub.length === 0) {
        return {
          ok: false,
          message: "You are not authorized to view this meeting",
        };
      }

      return {
        ok: true,
        data: res[0],
      };
    } else if (session.user.role === "student") {
      const res_sub = await db
        .select()
        .from(studenthassubjects)
        .leftJoin(subjects, eq(studenthassubjects.subject_id, subjects.id))
        .where(eq(studenthassubjects.student_id, session.user.id));

      if (res_sub.length === 0) {
        return {
          ok: false,
          message: "You are not authorized to view this meeting",
        };
      }
      return {
        ok: true,
        data: res[0],
      };
    }
    return {
      ok: false,
      message: "You are not authorized to view this meeting",
    };
  } catch (e: unknown) {
    console.log(e);
    return {
      ok: false,
      message: "An error occurred while fetching the schedule meeting",
    };
  }
}

export async function delete_schedule_meeting(id: string) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return {
      ok: false,
      message: "You need to be logged in to perform this action",
    };
  }

  if (session.user.role !== "teacher" && session.user.role !== "admin") {
    return {
      ok: false,
      message: "You need to be a teacher to perform this action",
    };
  }

  try {
    const res = await db
      .delete(schedule_meeting)
      .where(eq(schedule_meeting.id, id))
      .returning();

    // console.log(res);
    revalidateTag("get_schedule_meeting");
    return {
      ok: true,
      message: "Meeting deleted successfully",
    };
  } catch (e: unknown) {
    console.log(e);
    return {
      ok: false,
      message: "An error occurred while deleting the meeting",
    };
  }
}

export async function add_instant_meeting(data: any) {
  const session = await getServerSession(authOptions);
  console.log(data);
  if (!session) {
    return {
      ok: false,
      message: "You need to be logged in to perform this action",
    };
  }

  try {
    await db.insert(instant_meeting).values(data);
    return {
      ok: true,
      message: "Meeting created successfully",
    };
  } catch (e: unknown) {
    console.log(e);
    return {
      ok: false,
      message: "An error occurred while creating the meeting",
    };
  }
}

export async function get_instant_meeting() {
  const session = await getServerSession(authOptions);
  if (!session) {
    return {
      ok: false,
      message: "You need to be logged in to perform this action",
    };
  }

  try {
    const res = await db.select().from(instant_meeting);
    return {
      ok: true,
      data: res,
    };
  } catch (e: unknown) {
    console.log(e);
    return {
      ok: false,
      message: "An error occurred while fetching the meeting",
    };
  }
}

export async function get_instant_meeting_by_id(id: string) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return {
      ok: false,
      message: "You need to be logged in to perform this action",
    };
  }

  try {
    const res = await db
      .select()
      .from(instant_meeting)
      .where(eq(instant_meeting.id, id));
    if (res.length === 0) {
      return {
        ok: false,
        message: "Meeting not found",
      };
    }

    return {
      ok: true,
      data: res[0],
    };
  } catch (e: unknown) {
    console.log(e);
    return {
      ok: false,
      message: "An error occurred while fetching the meeting",
    };
  }
}

export async function delete_instant_meeting(id: string) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return {
      ok: false,
      message: "You need to be logged in to perform this action",
    };
  }

  try {
    await db
      .delete(instant_meeting)
      .where(
        and(
          eq(instant_meeting.id, id),
          eq(instant_meeting.host_id, session.user.id)
        )
      );
    return {
      ok: true,
      message: "Meeting deleted successfully",
    };
  } catch (e: unknown) {
    console.log(e);
    return {
      ok: false,
      message: "An error occurred while deleting the meeting",
    };
  }
}
