// "use client";

import { Button } from "@/components/ui/button";
// import BasicVideoCall from "@/components/AgoraTest/BasicVideoCall";
// import LiveClass from "@/components/LiveClass/LiveClass";
// import RTC from "@/components/WebRTC/RTC";
// import dynamic from "next/dynamic";
import Link from "next/link";
// import { useEffect, useState } from "react";

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

//   useEffect(() => {
//     fetch("http://localhost:3000/api/rtc/demo/staff/465sda465sad46sd4654")
//       .then((res) => res.text())
//       .then((data) => {
//         setToken(data.token);
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//   });

  return (
    <>
      {/* // <LiveClass /> */}
      {/* <BasicVideoCall /> */}
      <Button variant="outline">
        <Link href={'/liveclass/asasdasdsadsda'}>Home</Link>
      </Button>
      {/* <h1>{token}</h1> */}
      {/* <Button>
                Generate
            </Button> */}
      {/* // <RTC /> */}
    </>
  );
};

export default page;
