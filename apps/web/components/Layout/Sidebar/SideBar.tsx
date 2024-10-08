import { authOptions } from "@/components/utils/options";
import { ItemsSideBar } from "./ItemsSideBar";
import { StudentnavItems, TeachernavItems } from "@/data/data";
import { cn } from "@/lib/utils";
import { getServerSession } from "next-auth";

export default async function Sidebar() {
 const session = await getServerSession(authOptions)

  return (
    <nav
      className={cn(`relative hidden h-screen border-r pt-16 md:block w-72`)}
    >
      <div className="space-y-4 py-4">
        <div className="px-3 py-2">
          <div className="space-y-1">
            <h2 className="mb-2 px-4 text-xl font-semibold tracking-tight">
              Overview
            </h2>
            <ItemsSideBar items={session?.user.role === 'teacher' ? TeachernavItems : StudentnavItems} />
          </div>
        </div>
      </div>
    </nav>
  );
}
