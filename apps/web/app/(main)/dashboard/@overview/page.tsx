import { getOverview } from "@/action/dashboardAction";
import RadarChartDash from "@/components/Dashboard/Teacher/RadarChart";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

const overview = async () => {
    const data = await getOverview();
    if(!data.ok || !data.data) {
        return <div>{data.message}</div>
    }

    const processedData:any = [];

    for(const month in data.data) {
        processedData.push({
            name: month,
            Present: data.data[month].present,
            Absent: data.data[month].absent,
            amt: data.data[month].total,
        })
    }

    // console.log(processedData)


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
              <RadarChartDash data={processedData} />
          </CardContent>
      </Card>
  )
}

export default overview