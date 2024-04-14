import { atom } from "recoil";

interface subjects {
  id: string;
  name: string;
  description: string;
  teacher: string;
  total_students: number;
}


interface subject_stream {
  id: string;
  subject_id: string;
  subject_name: string;
  stream: {
    id: string;
    text: string;
    file: string;
    teacher: string;
    date: string;
  }[] | [];
}

export const subjects = atom({
  key: "subjects",
  default: [
    {
      id: '1',
      name: "DLT",
      description: "Final Year (2023-24) Sec: B",
      teacher: "Nayan Bagale",
      total_students: 99,
    },
  ] as subjects[],
});


export const subject_stream = atom({
  key: "subject_stream",
  default: [
    {
        id: "1",
        subject_id: '1',
        subject_name: "DLT",
      stream: [
        {
            id: '1',
          text: "Students who were absent in the UT 1 have to submit whole question paper in the form of assignment on or before 26th March 2024. Question paper is attached below.",
          file: "file",
          teacher: "Nayan Bagale",
          date: "Mar 24, 2023",
        },
      ],
    },
  ] as subject_stream[],
});
