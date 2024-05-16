import { getLectures } from "@/action/dashboardAction";
import CalenderGraphTeacher from "@/components/Dashboard/Teacher/CalenderGraph";
import CalenderGraphStudent from "@/components/Dashboard/Students/CalenderGraph";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { authOptions } from "@/components/utils/options";
import { getServerSession } from "next-auth";


async function lectures() {
    const session = await getServerSession(authOptions);
    const data = await getLectures();
    if(!data.ok || !data.data){
        return <p>Something went wrong</p>
    }
    const dates = Object.keys(data.data).map((d) => ({date: d, count: 1 }))

  return session?.user.role === 'teacher' ? (
      <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <div>
                  <CardTitle>
                      Lectures
                  </CardTitle>
                  <CardDescription>
                      Click on the red squares to view the lectures taken on that day
                  </CardDescription>
              </div>
              <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  className="h-4 w-4 text-muted-foreground"
              >
                  <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
              </svg>
          </CardHeader>
          <CardContent>
              <CalenderGraphTeacher dates={dates}  data={data.data as any}/>
          </CardContent>
      </Card>
  ):(
          <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <div>
                      <CardTitle>
                          Lectures
                      </CardTitle>
                      <CardDescription>
                          Click on the red squares to view the lectures attended on that day
                      </CardDescription>
                  </div>
                  <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      className="h-4 w-4 text-muted-foreground"
                  >
                      <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
                  </svg>
              </CardHeader>
              <CardContent>
                  <CalenderGraphStudent dates={dates} data={data.data as any} />
              </CardContent>
          </Card>
  )
}

export default lectures