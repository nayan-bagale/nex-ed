"use server";

import { authOptions } from "@/components/utils/options";
import { MONTHS } from "@/data/constants";
import { db } from "@/database/db";
import {
  attendance,
  attended,
  studenthassubjects,
  subjects,
  users,
} from "@/database/schema";
import { arrayContained, eq } from "drizzle-orm";
import { getServerSession } from "next-auth";

async function getSubjectsByTeacherId(teacherId: string) {
  const subject = await db
    .select()
    .from(subjects)
    .where(eq(subjects.teacher_id, teacherId));

  return subject.map((s) => {
    return {
      id: s.id,
      subject_name: s.name,
    };
  });
}

export async function getStudents() {
  const session = await getServerSession(authOptions);
  if (
    !session ||
    (session.user.role !== "teacher" && session.user.role !== "admin")
  ) {
    return {
      ok: false,
      message: "Unauthorized",
    };
  }
  try {
    const sub = await getSubjectsByTeacherId(session.user.id);
    // console.log(sub);

    const data = await Promise.all(
      sub.map(async (s) => {
        const student = await db
          .select()
          .from(users)
          .leftJoin(
            studenthassubjects,
            eq(users.id, studenthassubjects.student_id)
          )
          .where(eq(studenthassubjects.subject_id, s.id));
        return student;
      })
    );

    return {
      ok: true,
      data: data.flat(1).map((d, i) => {
        return {
          id: i + 1,
          student_id: d.user.id,
          name: d.user.name,
          email: d.user.email,
          image: d.user.image,
          subject_name: sub.find(
            (s) => s.id === d.student_has_subject?.subject_id
          )?.subject_name,
          subject_id: d.student_has_subject?.subject_id,
        };
      }),
    };
  } catch (e: unknown) {
    console.error(e);
    return {
      ok: false,
      message: "An error occurred while fetching students",
    };
  }
}

export async function getStudentData(studentId: string) {
  const session = await getServerSession(authOptions);
  if (!session || session.user.role !== "teacher") {
    return {
      ok: false,
      message: "Unauthorized",
    };
  }

  try {
    const student = await db
      .select()
      .from(attended)
      .leftJoin(attendance, eq(attended.attendance_id, attendance.id))
      .where(eq(attended.student_id, studentId));
    const obj: {
      [key: string]: {
        subject_id: string;
        present: number;
        absent: number;
      }[];
    } = {};

            student.forEach((e) => {
              if(!e?.attendance?.date) return;
              const month = MONTHS[parseInt(e?.attendance?.date.split("-")[1]) - 1];
              const data = {
                subject_id: e.attendance.subject_id,
                present: e.attended.status === "Present" ? 1 : 0,
                absent: e.attended.status === "Absent" ? 1 : 0,
              };
              obj[month] = obj[month] ? [...obj[month], data] : [data];
            });

            const result: {
              name: string;
              Present: number;
              Absent: number;
              total: number;
            }[] = [];
            for (const key in obj) {
              const present = obj[key].reduce((acc, cur) => acc + cur.present, 0);
              const absent = obj[key].reduce((acc, cur) => acc + cur.absent, 0);
              result.push({
                name: key,
                Present: present,
                Absent: absent,
                total: 30 - (present + absent),
              });
            }
        
    return {
      ok: true,
      data: result,
    };
  } catch (e: unknown) {
    console.error(e);
    return {
      ok: false,
      message: "An error occurred while fetching students",
    };
  }
}
