import dynamic from "next/dynamic";


const CreateRoom = dynamic(() => import('../../../components/Liveclass/CreateRoom'), {
  ssr: false
})

const page = () => {


  return (
    <>
      <CreateRoom />
    </>
  );
};

export default page;
