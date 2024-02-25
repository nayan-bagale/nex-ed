import dynamic from "next/dynamic";


// const Room = dynamic(() => import('@/components/WebRTC/Room'), {
//   ssr: false
// })
const Room = dynamic(
  () => import("@/components/Liveclass/Room"),
  {
    ssr: false
  }
)

// const Liveclass = dynamic(() => import('@/components/Liveclass/LiveClass'), {
//  ssr: false
// });


// const Peerjs = dynamic(() => import('@/components/PeerJs/PeerJsDemo'),{
//     ssr: false
// })

// const AgoraRTC = dynamic(() => import('@/components/AgoraTest/BasicVideoCall'), {
//   ssr: false
// })

const page = ({ params }: { params: { roomid: string } }) => {

  return (
    <div>
      <Room roomid={params.roomid} />
      {/* <Peerjs/> */}
      {/* <AgoraRTC/> */}
      {/* <Chatting roomid={params.roomid}/> */}
      {/* <Liveclass roomid={params.roomid}/> */}
    </div>
  );
}

export default page