import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import { getServerSession } from "next-auth";
import dynamic from "next/dynamic";

const Room = dynamic(
  () => import("@/components/Liveclass/Room"),
  {
    ssr: false,
    loading: () => <p>Loading...</p>,
  }
)


const page = async({ params }: { params: { roomid: string } }) => {
  const session = await getServerSession(authOptions);
  return (
    <div>
      <Room roomid={params.roomid} user={session} />
    </div>
  );
}

export default page