'use client'

import { Button } from "@/components/ui/button"
import { useSession } from "next-auth/react"


const page = () => {
    const { data: session, update } = useSession();

    const handleclick = (role: string) => {
        update({ ...session, user: { ...session?.user, role: role }});

    }

    console.log(session);
    return (
        <div className='flex space-y-4 flex-col justify-center items-center h-screen bg-zinc-950 '>
            <h1 className=" text-white dark:text-black">Nex-Ed</h1>
            <div className=" space-x-4 font-semibold tracking-tight text-lg">
                <Button onClick={() => handleclick('student')} variant='secondary'>I'm a Student</Button>
                <Button onClick={() => handleclick('teacher')} variant='secondary'>I'm a Teacher</Button>
            </div>
        </div>
    )
}

export default page