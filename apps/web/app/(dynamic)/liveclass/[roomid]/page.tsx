'use client'

// import BasicVideoCall from "@/components/AgoraTest/BasicVideoCall";
import LiveClass from "@/components/LiveClass/LiveClass";
import dynamic from "next/dynamic";

const BasicVideoCall = dynamic(() => import('@/components/AgoraTest/BasicVideoCall'), {
  ssr: false
})

const page = () => {
  return (
    // <LiveClass />
    <BasicVideoCall />
  );
}

export default page