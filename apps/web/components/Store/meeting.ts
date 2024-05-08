

interface visibility {
  visibility: 'public' | 'private'
}

interface instantMeetingT extends visibility {
    id: string;
    title: string;
    date: string;
    host_id:string;
}


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





