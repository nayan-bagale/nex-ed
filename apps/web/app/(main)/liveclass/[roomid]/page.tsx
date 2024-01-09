

const page = () => {
  return (
    <div className="flex flex-col h-screen w-full">
      <div className="flex bg-slate-400 h-[10%] w-full">
        <div>buttons</div>
      </div>
      <div className="flex w-full h-full bg-slate-300">
        <div className=" flex h-full flex-col w-[70%] bg-slate-500">
          <div className=" flex">peoples</div>
          <div>main speacker</div>
          <div>buttons</div>
        </div>
        <div className="w-[30%] h-full bg-slate-800">chat side</div>
      </div>
    </div>
  );
}

export default page