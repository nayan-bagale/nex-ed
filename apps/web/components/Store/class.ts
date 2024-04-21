"use client";

import { Files } from "@/database/schema";
import { atom } from "recoil";

export interface SubjectsT {
  id: string;
  name: string;
  description: string;
  teacher: string;
  total_students: number;
}

export interface Subject_streamT {
  id: string;
  subject_id: string;
  text: string;
  files: Files[];
  teacher: string;
  date: string;
  profile: string;
}


export const subjects = atom({
  key: "subjects",
  default: [] as SubjectsT[],
});

export const subject_stream = atom({
  key: "subject_stream",
  default: [] as Subject_streamT[],
});
