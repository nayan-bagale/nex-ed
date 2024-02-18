import dynamic from "next/dynamic";


// const Room = dynamic(() => import('@/components/WebRTC/Room'), {
//   ssr: false
// })
const Chatting = dynamic(
  () => import("@/components/Chat/Room"),
  {
    ssr: false
  }
)


// const Peerjs = dynamic(() => import('@/components/PeerJs/PeerJsDemo'),{
//     ssr: false
// })

// const AgoraRTC = dynamic(() => import('@/components/AgoraTest/BasicVideoCall'), {
//   ssr: false
// })

const page = ({ params }: { params: { roomid: string } }) => {

  return (
    <div>
      {/* <Room roomid={params.roomid} /> */}
      {/* <Peerjs/> */}
      {/* <AgoraRTC/> */}
      <Chatting roomid={params.roomid}/>
    </div>
  );
}

export default page