"use server";

import { authOptions } from "@/components/utils/options";
import { MONTHS } from "@/data/constants";
import { db } from "@/database/db";
import { attendance, attended, studenthassubjects, subjects } from "@/database/schema";
import { count, eq } from "drizzle-orm";
import { getServerSession } from "next-auth";

export async function getOverview() {
  const session = await getServerSession(authOptions);
  if (!session) {
    return {
      ok: false,
      message: "You are not logged in",
    };
  }
  if (session.user.role !== "teacher" && session.user.role !== "admin") {
    return {
      ok: false,
      message: "You are not authorized to access this page",
    };
  }

  try {
    const res = await db
      .select()
      .from(attendance)
      .where(eq(attendance.teacher_id, session.user.id));

    const obj: {
      [key: string]: {
        subject_id: string;
        total_strudents: number;
        percentage: number;
      }[];
    } = {};

    res.forEach((e) => {
      const month = MONTHS[parseInt(e.date.split("-")[1]) - 1];
      const data = {
        subject_id: e.subject_id,
        total_strudents: e.total_students,
        percentage: e.percentage,
      };
      obj[month] = obj[month] ? [...obj[month], data] : [data];
    });

    // console.log(obj);
    const result: {
      [key: string]: {
        total: number;
        present: number;
        absent: number;
        percentage: number;
      };
    } = {};

    for (const month in obj) {
      const total = obj[month].reduce((acc, e) => acc + e.total_strudents, 0);
      const absent = obj[month].reduce(
        (acc, e) => acc + (e.total_strudents * (100 - e.percentage)) / 100,
        0
      );
      const present = total - absent;
      const p = (present / total) * 100;
      //   console.log(p, total, present, absent);
      result[month] = {
        total,
        present,
        absent,
        percentage: p,
      };
    }

    return {
      ok: true,
      data: result,
    };
  } catch (e: unknown) {
    console.error(e);
    return {
      ok: false,
      message: "An error occurred while fetching data",
    };
  }

  return {
    ok: true,
    message: "Attendance added successfully",
  };
}

export async function getLectures() {
  const session = await getServerSession(authOptions);
  if (!session) {
    return {
      ok: false,
      message: "You are not logged in",
    };
  }
  try {
    if (session.user.role === "teacher" || session.user.role === "admin") {
      const res = await db
        .select()
        .from(attendance)
        .where(eq(attendance.teacher_id, session.user.id));
      const obj: {
        [key: string]: {
          subject_id: string;
          // total_strudents: number;
          subject_name: string;
          percentage: number;
        }[];
      } = {};

      res.forEach((e) => {
        const data = {
          subject_id: e.subject_id,
          subject_name: e.subject_name,
          // total_strudents: e.total_students,
          percentage: e.percentage,
        };
        obj[e.date] = obj[e.date] ? [...obj[e.date], data] : [data];
      });

      // console.log(obj)

      return {
        ok: true,
        data: obj,
      };
    } else if (session.user.role === "student") {
      const res = await db
        .select()
        .from(attended)
        .leftJoin(attendance, eq(attended.attendance_id, attendance.id))
        .where(eq(attended.student_id, session.user.id));
      // console.log(res);
      const obj: {
        [key: string]: {
          subject_id: string;
          subject_name: string;
          status: string;
        }[];
      } = {};

      res.forEach((e) => {
        const data = {
          subject_id: e.attendance?.subject_id!,
          subject_name: e.attendance?.subject_name!,
          status: e.attended.status
        };

        const date = e.attendance?.date
        if(!date) return
        obj[date] = obj[date]
          ? [...obj[date], data]
          : [data];
      });

      // console.log(obj)

      return {
        ok: true,
        data: obj,
      };
    } else {
      return {
        ok: false,
        message: "You are not authorized to access this page",
      };
    }
  } catch (e: unknown) {
    console.error(e);
    return {
      ok: false,
      message: "An error occurred while fetching data",
    };
  }
}

export async function getSubjects(){
  const session = await getServerSession(authOptions);
  if (!session) {
    return {
      ok: false,
      message: "You are not logged in",
    };
  }
  try{
    const res = await db.select({count: count()}).from(subjects).where(eq(subjects.teacher_id, session.user.id));

    return {
      ok: true,
      data: res[0].count
    }
  }catch(e: unknown){
    console.error(e);
    return {
      ok: false,
      message: "An error occurred while fetching data",
    };
  }
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
        const stud = await db
          .select({count: count()})
          .from(subjects)
          .leftJoin(studenthassubjects, eq(subjects.id, studenthassubjects.subject_id))
          .where(eq(subjects.teacher_id, session.user.id));

    return {
      ok: true,
      data: stud[0].count,

    }

  } catch (e: unknown) {
    console.error(e);
    return {
      ok: false,
      message: "An error occurred while fetching students",
    };
  }
}

