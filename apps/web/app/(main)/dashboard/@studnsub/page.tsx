
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Book, Users2 } from "lucide-react";

const studnsub = () => {

    

  return (
    <>
          <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                      Total Students
                  </CardTitle>
                  <Users2 className="h-4 w-4" />
              </CardHeader>
              <CardContent>
                  <div className="text-2xl font-bold">45</div>
                  <p className="text-xs text-muted-foreground">
                      +20.1% from last month
                  </p>
              </CardContent>
          </Card>
          <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                      Subjects
                  </CardTitle>
                  <Book className="h-4 w-4" />
              </CardHeader>
              <CardContent>
                  <div className="text-2xl font-bold">8</div>
                  <p className="text-xs text-muted-foreground">
                      +180.1% from last month
                  </p>
              </CardContent>
          </Card>
    </>
  )
}

export default studnsub