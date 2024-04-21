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
