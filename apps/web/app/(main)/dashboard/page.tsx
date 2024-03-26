import { Button } from "@/components/ui/button"
import Link from "next/link"


const page = async () => {

  return (
    <div>
      <Link href={'/liveclass'}>

      <Button>Live Class</Button>
      </Link>
      
    </div>
  )
}

export default page