import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import { getServerSession } from "next-auth";
import dynamic from "next/dynamic";


const CreateRoom = dynamic(() => import('@/components/Liveclass/CreateRoom'), {
  ssr: false,
  loading: () => <p>Loading...</p>,
})

const page = async() => {

const session = await getServerSession(authOptions);

  return (
    <>
      <CreateRoom user={session?.user} />
    </>
  );
};

export default page;
