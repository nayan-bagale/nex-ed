
import { Files } from "@/database/schema";

export interface SubjectsT {
  id: string;
  name: string;
  description: string;
  teacher_name: string;
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

