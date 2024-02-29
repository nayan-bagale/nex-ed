import dynamic from "next/dynamic";

const Room = dynamic(
  () => import("@/components/Liveclass/Room"),
  {
    ssr: false
  }
)


const page = ({ params }: { params: { roomid: string } }) => {

  return (
    <div>
      <Room roomid={params.roomid} />
    </div>
  );
}

export default page