import {
  timestamp,
  text,
  pgTable,
  serial,
  json,
  integer,
  primaryKey,
  boolean,
  date,
} from "drizzle-orm/pg-core";
import type { AdapterAccount } from "@auth/core/adapters";

export const users = pgTable("user", {
  id: text("id").notNull().primaryKey(),
  name: text("name"),
  email: text("email").notNull(),
  emailVerified: timestamp("emailVerified", { mode: "date" }),
  image: text("image"),
  password: text("password"),
  role: text("role"),
});

export const accounts = pgTable(
  "account",
  {
    userId: text("userId")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    type: text("type").$type<AdapterAccount["type"]>().notNull(),
    provider: text("provider").notNull(),
    providerAccountId: text("providerAccountId").notNull(),
    refresh_token: text("refresh_token"),
    access_token: text("access_token"),
    expires_at: integer("expires_at"),
    token_type: text("token_type"),
    scope: text("scope"),
    id_token: text("id_token"),
    session_state: text("session_state"),
  },
  (account) => ({
    compoundKey: primaryKey({
      columns: [account.provider, account.providerAccountId],
    }),
  })
);

export const sessions = pgTable("session", {
  sessionToken: text("sessionToken").notNull().primaryKey(),
  userId: text("userId")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  expires: timestamp("expires", { mode: "date" }).notNull(),
});

export const verificationTokens = pgTable(
  "verificationToken",
  {
    identifier: text("identifier").notNull(),
    token: text("token").notNull(),
    expires: timestamp("expires", { mode: "date" }).notNull(),
  },
  (vt) => ({
    compoundKey: primaryKey({ columns: [vt.identifier, vt.token] }),
  })
);

export const resetpasswordTokens = pgTable(
  "resetpasswordToken",
  {
    user_id: text("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
    token: text("token").notNull(),
    expires: timestamp("expires", { mode: "date" }).notNull(),
  }
);

export const subjects = pgTable("subjects", {
  id: text("id").notNull().primaryKey(),
  name: text("name").notNull(),
  description: text("description"),
  teacher_name: text("teacher_name").notNull(),
  teacher_id: text("teacher_id").notNull().references(() => users.id, { onDelete: "cascade" }),
});

export const studenthassubjects = pgTable(
  "student_has_subject",
  {
    student_id: text("student_id").notNull().references(() => users.id, { onDelete: "cascade" }),
    subject_id: text("subject_id").notNull().references(() => subjects.id, { onDelete: "cascade" }),
    enrolled: boolean("enrolled").notNull().default(false),
  },
  (shs) => ({
    compoundKey: primaryKey({ columns: [shs.student_id, shs.subject_id] }),
  })
);

export const teachershassubjects = pgTable(
  "teacher_has_subject",
  {
    teacher_id: text("teacher_id").notNull().references(() => users.id, { onDelete: "cascade" }),
    subject_id: text("subject_id").notNull().references(() => subjects.id, { onDelete: "cascade" }),
  },
  (ths) => ({
    compoundKey: primaryKey({ columns: [ths.teacher_id, ths.subject_id] }),
  })
);

export interface Files {
  name: string;
  url: string;
  size: number;
}

export const stream = pgTable("stream", {
  id: text("id").notNull().primaryKey(),
  subject_id: text("subject_id").notNull().references(() => subjects.id, { onDelete: "cascade" }),
  teacher_id: text("teacher_id").notNull().references(() => users.id, { onDelete: "cascade" }),
  date: date("date").notNull(),
  description: text("description").notNull(),
  deleted: boolean("deleted").notNull().default(false),
  files: json("files").$type<Files[]>(),
});


export const schedule_meeting = pgTable("schedule_meeting", {
  id: text("id").notNull().primaryKey(),
  teacher_id: text("teacher_id").notNull().references(() => users.id, { onDelete: "cascade" }),
  teacher_name: text("teacher_name").notNull(),
  subject_id: text("subject_id").notNull().references(() => subjects.id, { onDelete: "cascade" }),
  subject_name: text("subject_name").notNull(),
  title: text("title").notNull(),
  date: date("date").notNull(),
  start_time: text("start_time").notNull(),
  end_time: text("end_time").notNull(),
  camera: boolean("camera").notNull().default(false),
  visibility: boolean("visibility").notNull().default(false),
  done: boolean("done").notNull().default(false),
});

export type schedule_meetingT = typeof schedule_meeting.$inferSelect;

// instant meeting needs to be removed
export const instant_meeting = pgTable("instant_meeting", {
  id: text("id").notNull().primaryKey(),
  host_role: text("host_role").notNull(),
  host_id: text("host_id").notNull().references(() => users.id, { onDelete: "cascade" }),
  title: text("title").notNull(),
  date: date("date").notNull(),
  start_time: text("start_time").notNull(),
  end_time: text("end_time").notNull(),
  done: boolean("done").notNull().default(false),
});

export type instant_meetingT = typeof instant_meeting.$inferSelect;
// end of instant meeting

export const attendance = pgTable("attendance", {
  id: text("id").notNull().primaryKey(),
  date: date("date").notNull(),
  subject_id: text("subject_id").notNull().references(() => subjects.id, { onDelete: "cascade" }),
  subject_name: text("subject_name").notNull(),
  teacher_id: text("teacher_id").notNull().references(() => users.id, { onDelete: "cascade" }),
  teacher_name: text("teacher_name").notNull(),
  mode: text("mode").notNull().$type<"Offline" | "Online">(),
  total_students: integer("total_students").notNull(),
  percentage: integer("percentage").notNull(),
});

export type attendanceT = typeof attendance.$inferSelect;

export const attended = pgTable("attended", {
  id: serial("id").notNull().primaryKey(),
  attendance_id: text("attendance_id")
    .notNull()
    .references(() => attendance.id, { onDelete: "cascade" }),
  student_id: text("student_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  status: text("status").notNull().$type<"Present" | "Absent">(),
});

export type attendedT = typeof attended.$inferSelect;