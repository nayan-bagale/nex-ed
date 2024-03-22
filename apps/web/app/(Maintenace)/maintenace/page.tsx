import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Home } from "lucide-react"
import Link from "next/link"

const page = () => {
  return (
      <div className='flex space-y-4 flex-col justify-center items-center h-screen bg-zinc-950 '>
          <h1 className=' text-white text-3xl md:text-4xl lg:text-5xl'> We'll back soon</h1>
          <Link href="/">
              <Button variant='secondary'>Continue to Nex-Ed</Button>
          </Link>
      </div>
  )
}

export default page