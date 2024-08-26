import { Button } from "@/components/ui/button";
import { CardContent, Card, CardHeader, CardFooter, CardTitle, CardDescription } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { DownloadIcon } from "@/components/icons";
import { healthData } from "@/features/data";
import { useState, useEffect } from "react";
import { ReportsResponse, GetReportsResponse, usePostReports, useGetReports } from "@/features/report/useReport";
import { LocationResponse, useGetLocations } from "@/features/location/useLocation";

export default function Component() {
  const [report, setReport] = useState<ReportsResponse>({ disease: "", numberOfCases: 0, numberOfDeaths: 0, description: "", approximatedPopulationCloseBy: 0, address: "" })
  const [reports, setReports] = useState<GetReportsResponse[]>([]);
  const [showReport, setShowReport] = useState<boolean>(true);
  const [location, setLocation] = useState<boolean>(true);
  const [locations, setLocations] = useState<LocationResponse[]>([]);
  const handleMakeReport = () => {
    setShowReport(!showReport);
  };
  const getLocations = useGetLocations();
  const postReports = usePostReports();
  const username = localStorage.getItem("userName") || ""
  const getReports = useGetReports(username);
  const submitReport = () => {
    postReports.mutate({ userName: username, report: report }, {
      onSuccess: () => {
        window.location.reload();
      }
    });
    console.log(report)
    setReport({ disease: "", numberOfCases: 0, numberOfDeaths: 0, description: "", approximatedPopulationCloseBy: 0, address: "" })
  }
  useEffect(() => {
    if (healthData.length === 0) {
      setLocation(false);
    }
    if (getLocations.data != undefined) {
      setLocations(getLocations.data)
    }
    if (getReports.data != undefined) {
      setReports(getReports.data)
    }
  }, []);
  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-8 md:px-6 md:py-12">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6 md:mb-8">
        <div className="space-y-2">
          <h1 className="text-2xl font-bold">
            {showReport ? <>Health Report</> : <>Make a health report</>}
          </h1>
          <p className="text-gray-500 dark:text-gray-400">
            {showReport ? (
              <>View health data based on your location.</>
            ) : (
              <>Make a health report based on your location.</>
            )}
          </p>
          {!location && (
            <p className="text-red-500 dark:text-red-400">
              Navigate to the locations and setup you location.
            </p>
          )}
        </div>
        <div className="flex items-center space-x-4">
          <Button variant="outline" onClick={handleMakeReport}>
            {showReport ? "Report" : "Cancel Report"}
          </Button>
          {showReport && (
            <Button variant="outline">
              <DownloadIcon className="w-5 h-5 mr-2" />
              Download Report
            </Button>
          )}
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {showReport ? (
          <>
            {reports.map((item, index) => (
              <Card key={index}>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-bold">{item.disease}</h3>
                    <div
                      className={`bg-${item.trendColor}-100 text-${item.trendColor}-600 px-2 py-1 rounded-md text-xs font-medium dark:bg-${item.trendColor}-900/20 dark:text-${item.trendColor}-400`}
                    >
                      {item.trend}
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-500 dark:text-gray-400">
                        Cases
                      </span>
                      <span className="font-medium">{item.cases}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-500 dark:text-gray-400">
                        Mortality Rate
                      </span>
                      <span className="font-medium">{item.mortalityRate}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </>
        ) : (
          <>
            <Card className="w-full max-w-4xl mx-auto">
              <CardHeader>
                <CardTitle className="text-xl sm:text-2xl">Report Disease Outbreak</CardTitle>
                <CardDescription className="text-sm sm:text-base">Please provide the following details to help us address the situation.</CardDescription>
              </CardHeader>
              <CardContent className="grid gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="disease">Disease Name</Label>
                  <Input id="disease" placeholder="Enter the disease name" value={report.disease} onChange={(e) => setReport({ ...report, disease: e.target.value })} />
                </div>
                <div className="flex">
                  <select
                    className="border border-300 rounded-lg px-2 py-1 w-full h-10"
                    value={report.address} onChange={(e) => setReport({ ...report, address: e.target.value })}
                  >
                    {locations.map((item, index) =>
                      <option key={index} value={`${item.address}, ${item.city}, ${item.state}`}>
                        {`${item.address}, ${item.city}, ${item.state}, ${item.country}`}
                      </option>
                    )}
                  </select>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="cases">Reported Cases</Label>
                    <Input id="cases" type="number" placeholder="Number of reported cases" value={report.numberOfCases} onChange={(e) => setReport({ ...report, numberOfCases: Number(e.target.value) })} />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="deaths">Reported Deaths</Label>
                    <Input id="deaths" type="number" placeholder="Number of reported Deaths" value={report.numberOfDeaths} onChange={(e) => setReport({ ...report, numberOfDeaths: Number(e.target.value) })} />
                  </div>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="population">Affected Population Size</Label>
                  <Input id="population" type="number" placeholder="Approximate population size" value={report.approximatedPopulationCloseBy} onChange={(e) => setReport({ ...report, approximatedPopulationCloseBy: Number(e.target.value) })} />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="description">Situation Description</Label>
                  <Textarea
                    id="description"
                    className="min-h-[100px] bg-slate-800 text-slate-200 border border-slate-700 rounded-md p-4 w-full resize-none"
                    rows={4}
                    placeholder="Provide details about the outbreak and its impact"
                    value={report.description}
                    onChange={(e) => setReport({ ...report, description: e.target.value })}
                  />
                </div>
              </CardContent>
              <CardFooter className="flex justify-end">
                <Button type="submit" className="w-full sm:w-auto" onClick={submitReport}>Report Outbreak</Button>
              </CardFooter>
            </Card></>
        )}
      </div>
    </div >
  );
}
