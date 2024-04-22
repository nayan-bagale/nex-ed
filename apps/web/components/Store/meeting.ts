import { atom } from "recoil";

interface visibility {
  visibility: 'public' | 'private'
}

interface instantCreateT extends visibility {
    id: string;
    title: string;
}

export const instantCreate = atom({
  key: "instantCreate",
  default: {} as instantCreateT,
});

interface scheduleMeetingT extends visibility {
  id: string;
  title: string;
  subject_id: string;
  date: string;
  starttime: string;
  endtime: string;
  teacher: string;
  cameraAlwaysOn: boolean;
}

export const scheduleMeeting = atom({
  key: "scheduleMeeting",
  default: [] as scheduleMeetingT[],
});



