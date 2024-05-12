import RadarChartDash from "@/components/Dashboard/Teacher/RadarChart";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

const overview = () => {
  return (
      <Card className="">
          <CardHeader>
              <CardTitle>Overview</CardTitle>
              <CardDescription>
                  <div className=" text-sm md:text-base flex justify-end gap-2">
                      <div className=" flex items-center gap-1">
                          <p>Absent</p>
                          <div className=" h-4 w-4 bg-primary rounded-sm"></div>
                      </div>
                      <div className=" text-sm md:text-base flex items-center gap-1">
                          <p>Present</p>
                          <div className=" h-4 w-4 bg-[#dddddd] rounded-sm"></div>
                      </div>
                  </div>
              </CardDescription>
          </CardHeader>
          <CardContent className="pl-2">
              <RadarChartDash />
          </CardContent>
      </Card>
  )
}

export default overview