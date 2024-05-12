import CalenderGraph from "@/components/Dashboard/Teacher/CalenderGraph";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";


function lectures() {
  return (
      <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <div>
                  <CardTitle>
                      Lectures
                  </CardTitle>
                  <CardDescription>
                      You taken 20 lectures this month.
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
              <CalenderGraph />

          </CardContent>
      </Card>
  )
}

export default lectures