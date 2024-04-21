"use server";

import { db } from "@/database/db";
import {
  teachershassubjects,
  subjects,
} from "@/database/schema";
import { SubjectsT } from "@/components/Store/class";
import { getServerSession } from "next-auth";
import { authOptions } from "@/components/utils/options";
import { eq } from "drizzle-orm";

export async function create_subject_Action(data: SubjectsT) {
  const session = await getServerSession(authOptions);
  try {
    if (!session || session.user.role !== "teacher") {
      return false;
    }
    const subject = await db.insert(subjects).values({
      id: data.id,
      name: data.name,
      description: data.description,
    });
    const teacher = await db.insert(teachershassubjects).values({
      teacher_id: session?.user?.id as string,
      subject_id: data.id,
    });

    // console.log(subject, teacher);

    return true;
  } catch (error: unknown) {
    console.log(error);
    return false;
  }
}

export async function delete_subject_Action(id: string) {
  const session = await getServerSession(authOptions);
  console.log(id);
  try {
    if (!session || session.user.role !== "teacher") {
      return false;
    }
    const subject = await db.delete(subjects).where(eq(subjects.id, id));
    const teacher = await db
      .delete(teachershassubjects)
      .where(eq(teachershassubjects.subject_id, id));

    // console.log(subject, teacher);

    return true;
  } catch (error: unknown) {
    console.log(error);
    return false;
  }
}

export async function get_subjects_Action() {
  const session = await getServerSession(authOptions);
  try {
    if (!session) {
      return false;
    }

    if (session.user.role === "teacher" || session.user.role === "admin") {
      const res = await db
        .select()
        .from(subjects)
        .leftJoin(
          teachershassubjects,
          eq(subjects.id, teachershassubjects.subject_id)
        )
        .where(eq(teachershassubjects.teacher_id, session.user.id));

      const subjects_pro = res.map((subject) => {
        return {
          id: subject.subjects.id,
          name: subject.subjects.name,
          description: subject.subjects.description,
          teacher: session.user.name as string,
          total_students: 0,
        };
      });

      
      return subjects_pro;
    } else if (session.user.role === "student") {
      // const res = await db
      //   .select()
      //   .from(subjects)
      //   .leftJoin(
      //     studenthassubjects,
      //     eq(subjects.id, studenthassubjects.subject_id)
      //   )
      //   .leftJoin(
      //     teachershassubjects,
      //     eq(subjects.id, teachershassubjects.subject_id)
      //   )
      //   .where(eq(studenthassubjects.student_id, session.user.id));

      // const subjects_pro = res.map((subject) => {
      //   return {
      //     id: subject.subjects.id,
      //     name: subject.subjects.name,
      //     description: subject.subjects.description,
      //     teacher: "",
      //     total_students: 0,
      //   };
      // });
      return true
    }else{
      return false
    }


  } catch (error: unknown) {
    console.log(error);
    return false;
  }
}

export async function get_subject_Action(id: string) {
  const session = await getServerSession(authOptions);
  try {
    if (!session) {
      return false;
    }

    if (session.user.role === "teacher" || session.user.role === "admin" || session.user.role === "student") {
      const res = await db
        .select()
        .from(subjects)
        .where(eq(subjects.id, id));

      const subject = res.map((subject) => {
        return {
          id: subject.id,
          name: subject.name,
          description: subject.description,
          teacher: session.user.name as string,
          total_students: 0,
        };
      });

      return subject[0];

    }else{
      return false
    }

  } catch (error: unknown) {
    console.log(error);
    return false;
  }
}
