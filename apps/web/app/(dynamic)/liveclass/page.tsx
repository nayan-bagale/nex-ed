"use client";

// import ChatRoom from "@/components/Chat/ChatRoom";
import { Button } from "@/components/ui/button";

import dynamic from "next/dynamic";
// import BasicVideoCall from "@/components/AgoraTest/BasicVideoCall";
// import RTC from "@/components/WebRTC/RTC";
// import dynamic from "next/dynamic";
import Link from "next/link";


const CreateRoom = dynamic(() => import('@/components/Liveclass/CreateRoom'), {
  ssr: false
})

// const BasicVideoCall = dynamic(
//   () => import("@/components/AgoraTest/BasicVideoCall"),
//   {
//     ssr: false,
//   }
// );

// const RTC = dynamic(() => import('@/components/WebRTC/RTC'), {
//     ssr: false
// })


const page = () => {


  return (
    <>
      <CreateRoom />
    </>
  );
};

export default page;
