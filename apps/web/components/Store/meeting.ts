import { atom } from "recoil";

interface visibility {
  visibility: 'public' | 'private'
}

interface instantMeetingT extends visibility {
    id: string;
    title: string;
    date: string;
    host_id:string;
}

export const instantMeeting = atom({
  key: "instantMeeting",
  default: [] as instantMeetingT[],
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



