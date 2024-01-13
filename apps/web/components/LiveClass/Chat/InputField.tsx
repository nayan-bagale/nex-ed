"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send } from "lucide-react";


const InputField = () => {

  return (
    <div className="flex flex-row items-center w-full mt-2 gap-2">
      <Input className="w-full" placeholder="Message..." />
      <Button className=" px-2" variant='secondary'>
        <Send />
      </Button>
    </div>
  );
};

export default InputField;
