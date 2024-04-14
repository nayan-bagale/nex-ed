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
    subject: string;
    date: Date;
    starttime: string;
    endtime: string;
    teacher: string;
    cameraAlwaysOn: boolean;
}

export const scheduleMeeting = atom({
    key:"scheduleMeeting",
    default: [
        {
            id: '1',
            title:'DLT - Lecture2',
            subject:'DLT',
            date: new Date(),
            starttime: '10:00',
            endtime:'12:00',
            teacher:'Nayan Bagale',
            cameraAlwaysOn: true,
            visibility:'private',
        }
    ] as scheduleMeetingT[]
})



