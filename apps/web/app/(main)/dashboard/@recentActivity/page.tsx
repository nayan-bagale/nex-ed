import RecentActivity from "@/components/Dashboard/Teacher/RecentActivity";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

const recentActivity = () => {
  return (
      <Card className="col-span-4">
          <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>
                  You made 265 sales this month.
              </CardDescription>
          </CardHeader>
          <CardContent>
              <RecentActivity />
          </CardContent>
      </Card>
  )
}

export default recentActivity