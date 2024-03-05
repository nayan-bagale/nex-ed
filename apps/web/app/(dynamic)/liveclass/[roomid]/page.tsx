import { authOptions } from "@/components/utils/options";
import { getServerSession } from "next-auth";
import dynamic from "next/dynamic";
import ClassLoading from "@/components/Loading/ClassLoading";
// import Room from "@/components/Liveclass/_Room";


const Room = dynamic(
  () => import("../../../../components/Liveclass/_Room"),
  {
    ssr: false,
    loading: () => <ClassLoading />,
  }
)


const page = async({ params }: { params: { roomid: string } }) => {
  const session = await getServerSession(authOptions);
  return (
    <div>
      <Room roomid={params.roomid} user={session?.user} />
    </div>
  );
}

export default page