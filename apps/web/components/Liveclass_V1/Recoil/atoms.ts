import { schedule_meetingT } from "@/database/schema";
import { atom } from "recoil";

export const meetingDetails = atom({
  key: "meetingDetails",
  default: {} as schedule_meetingT,
});
