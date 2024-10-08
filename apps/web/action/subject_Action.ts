"use server";

import { db } from "@/database/db";
import {
  teachershassubjects,
  subjects,
  studenthassubjects,
  users,
} from "@/database/schema";
import { SubjectsT } from "@/components/Store/class";
import { getServerSession } from "next-auth";
import { authOptions } from "@/components/utils/options";
import { and, count, countDistinct, eq } from "drizzle-orm";
import { revalidatePath, revalidateTag, unstable_cache } from "next/cache";

export async function create_subject_Action(data: SubjectsT) {
  const session = await getServerSession(authOptions);
  try {
    if (!session || session.user.role !== "teacher") {
      return {
        ok: false,
        message: "Unauthorized",
      };
    }
    const subject = await db.insert(subjects).values({
      id: data.id,
      name: data.name,
      description: data.description,
      teacher_name: session?.user?.name as string,
      teacher_id: session?.user?.id as string,
    });
    const teacher = await db.insert(teachershassubjects).values({
      teacher_id: session?.user?.id as string,
      subject_id: data.id,
    });

    // console.log(subject, teacher);
    revalidateTag("subjects_data");

    return {
      ok: true,
      data: {},
    };
  } catch (error: unknown) {
    console.log(error);
    return {
      ok: false,
      message: "Unexpected Error Occured",
    };
  }
}

export async function delete_subject_Action(id: string) {
  const session = await getServerSession(authOptions);
  console.log(id);
  try {
    if (!session || session.user.role !== "teacher") {
      return {
        ok: false,
        message: "Unauthorized",
      };
    }
    const subject = await db.delete(subjects).where(eq(subjects.id, id));
    const teacher = await db
      .delete(teachershassubjects)
      .where(eq(teachershassubjects.subject_id, id));

    // console.log(subject, teacher);
    revalidateTag("subjects_data");

    return {
      ok: true,
      data: {},
    };
  } catch (error: unknown) {
    console.log(error);
    return {
      ok: false,
      message: "Unexpected Error Occured",
    };
  }
}

// export const getSubjects = unstable_cache(
//  async(id) => get_subjects_Action(id),
//   ["subjects_data"],
//   { tags: ["subjects_data"] }
// );

export async function getTotalStudents(id: string) {
  try {
    const res = await db
      .select({ value: count() })
      .from(studenthassubjects)
      .where(eq(studenthassubjects.subject_id, id));

    // console.log(res);

    return {
      ok: true,
      data: res[0].value,
    };
  } catch (error: unknown) {
    console.log(error);
    return { ok: false, message: "Unexpected Error Occured" };
  }
}

export async function getSubjects(id: string) {
  const session = await getServerSession(authOptions);

  try {
    if (!session) {
      return {
        ok: false,
        message: "Unauthorized",
      };
    }

    if (session.user.role === "teacher" || session.user.role === "admin") {
      const res = await db
        .select()
        .from(subjects)
        .leftJoin(
          teachershassubjects,
          eq(subjects.id, teachershassubjects.subject_id)
        )
        .where(eq(teachershassubjects.teacher_id, id));

      const subjects_pro = res.map((subject) => {
        return {
          id: subject.subjects.id,
          name: subject.subjects.name,
          description: subject.subjects.description,
          teacher_name: subject.subjects.teacher_name,
          total_students: 0,
        };
      });

      return {
        ok: true,
        data: subjects_pro,
      };
    } else if (session.user.role === "student") {
      const res = await db
        .select()
        .from(subjects)
        .leftJoin(
          studenthassubjects,
          eq(subjects.id, studenthassubjects.subject_id)
        )
        .where(eq(studenthassubjects.student_id, id));

      const subjects_pro = res.map((subject) => {
        return {
          id: subject.subjects.id,
          name: subject.subjects.name,
          description: subject.subjects.description,
          teacher_name: subject.subjects.teacher_name,
          total_students: 0,
        };
      });
      return {
        ok: true,
        data: subjects_pro,
      };
    } else {
      return {
        ok: false,
        message: "Unauthorized",
      };
    }
  } catch (error: unknown) {
    console.log(error);
    return {
      ok: false,
      message: "Unexpected Error Occured",
    };
  }
}

export async function get_subject_Action(id: string) {
  const session = await getServerSession(authOptions);
  try {
    if (!session) {
      return {
        ok: false,
        message: "Unauthorized",
      };
    }

    if (
      session.user.role === "teacher" ||
      session.user.role === "admin" ||
      session.user.role === "student"
    ) {
      const res = await db.select().from(subjects).where(eq(subjects.id, id));

      const subject = res.map((subject) => {
        return {
          id: subject.id,
          name: subject.name,
          description: subject.description,
          teacher: session.user.name as string,
          total_students: 0,
        };
      });

      return {
        ok: true,
        data: subject,
      };
    } else {
      return {
        ok: false,
        message: "Unauthorized",
      };
    }
  } catch (error: unknown) {
    console.log(error);
    return {
      ok: false,
      message: "Unexpected Error Occured",
    };
  }
}

export async function join_subject_Action(id: string) {
  const session = await getServerSession(authOptions);
  if (
    !session ||
    (session.user.role !== "student" &&
      session.user.role !== "admin" &&
      session.user.role !== "teacher")
  ) {
    return {
      ok: false,
      message: "Unauthorized",
    };
  }

  const subject = await db.select().from(subjects).where(eq(subjects.id, id));
  if (subject.length === 0) {
    return {
      ok: false,
      message: "Subject Not Found",
    };
  }

  try {
    if (session.user.role === "teacher") {
      const res = await db
        .select()
        .from(teachershassubjects)
        .leftJoin(subjects, eq(subjects.id, teachershassubjects.subject_id))
        .where(
          and(
            eq(teachershassubjects.teacher_id, session.user.id),
            eq(teachershassubjects.subject_id, id)
          )
        );

      if (res.length > 0) {
        return {
          ok: false,
          message: "Already Joined",
        };
      }

      const insert = await db
        .insert(teachershassubjects)
        .values({
          teacher_id: session?.user?.id as string,
          subject_id: id,
        })
        .returning();
      revalidateTag("subjects_data");

      return {
        ok: true,
        message: "Joined Successfully",
      };
    } else if (session.user.role === "student") {
      const res = await db
        .select()
        .from(studenthassubjects)
        .leftJoin(subjects, eq(subjects.id, studenthassubjects.subject_id))
        .where(
          and(
            eq(studenthassubjects.student_id, session.user.id),
            eq(studenthassubjects.subject_id, id)
          )
        );

      console.log(res, id, subject);
      if (res.length > 0) {
        return {
          ok: false,
          message: "Already Joined",
        };
      }

      const insert = await db
        .insert(studenthassubjects)
        .values({
          student_id: session?.user?.id as string,
          subject_id: id,
          enrolled: true,
        })
        .returning();
        
        revalidatePath("/class");
      // revalidateTag("subjects_data");

      return {
        ok: true,
        message: "Joined Successfully",
      };
    }

    return {
      ok: false,
      message: "Failed to Join",
    };
  } catch (error: unknown) {
    console.log(error);
    return {
      ok: false,
      message: "Unexpected Error Occured",
    };
  }
}

export async function leave_subject_Action(id: string) {
  const session = await getServerSession(authOptions);
  if (
    !session ||
    (session.user.role !== "student" &&
      session.user.role !== "admin" &&
      session.user.role !== "teacher")
  ) {
    return {
      ok: false,
      message: "Unauthorized",
    };
  }

  const subject = await db.select().from(subjects).where(eq(subjects.id, id));
  if (subject.length === 0) {
    return {
      ok: false,
      message: "Subject Not Found",
    };
  }

  try {
    if (session.user.role === "student") {
      const check = await db
        .select()
        .from(studenthassubjects)
        .where(
          and(
            eq(studenthassubjects.subject_id, id),
            eq(studenthassubjects.student_id, session.user.id)
          )
        );

      if (check.length === 0) {
        return {
          ok: false,
          message: "Not Enrolled",
        };
      }

      const res = await db
        .delete(studenthassubjects)
        .where(
          and(
            eq(studenthassubjects.subject_id, id),
            eq(studenthassubjects.student_id, session.user.id)
          )
        )
        .returning();
      revalidateTag("subjects_data");

      return {
        ok: true,
        message: "Left Successfully",
      };
    }

    return {
      ok: false,
      message: "Not Allowed",
    };
  } catch (error: unknown) {
    console.log(error);
    return {
      ok: false,
      message: "Unexpected Error Occured",
    };
  }
}
