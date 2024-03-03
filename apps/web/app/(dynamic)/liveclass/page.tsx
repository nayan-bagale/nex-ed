import { authOptions } from "@/components/utils/options";
import { getServerSession } from "next-auth";
import dynamic from "next/dynamic";
import ClassLoading from "@/components/Loading/ClassLoading";
import Sidebar from "@/components/Layout/Sidebar/SideBar";
import NavBar from "@/components/Layout/Header/NavBar";



const CreateRoom = dynamic(() => import('@/components/Liveclass/_CreateRoom'), {
  ssr: false,
  loading: () => <ClassLoading />,
})

const page = async() => {

const session = await getServerSession(authOptions);
console.log(session?.user)

  return (
    <>
      <header>
        <NavBar />
      </header>
      <div className="flex h-screen overflow-hidden">
        <Sidebar />
        <main className="w-full pt-16 p-2">
          <CreateRoom user={session?.user} />
        </main>
      </div>
    </>
  );
};

export default page;
