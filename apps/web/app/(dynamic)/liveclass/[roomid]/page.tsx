import { authOptions } from "@/components/utils/options";
import { getServerSession } from "next-auth";
import dynamic from "next/dynamic";
import ClassLoading from "@/components/Templates/Loading/ClassLoading";
import { get_schedule_meeting_by_id } from "@/action/meetingAction";
import { redirect } from "next/navigation";


const Room = dynamic(
  () => import("@/components/Liveclass_V1/_Room"),
  {
    ssr: false,
    loading: () => <ClassLoading />,
  }
)


const page = async({ params }: { params: { roomid: string } }) => {
  const session = await getServerSession(authOptions);
  const res = await get_schedule_meeting_by_id(params.roomid);

  if(!res.ok || !res.data) {
    redirect('/not-found')
  }

  return (
    <div>
      <Room roomid={params.roomid} user={session?.user} meeting={res?.data} />
    </div>
  );
}

export default page