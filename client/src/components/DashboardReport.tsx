import { Button } from "@/components/ui/button";
import { CardContent, Card } from "@/components/ui/card";
import { DownloadIcon } from "@/components/icons";
import { healthData } from "@/features/data";
import { useState, useEffect } from "react";

export default function Component() {
  const [showReport, setShowReport] = useState<boolean>(true);
  const [location, setLocation] = useState<boolean>(true);
  const handleMakeReport = () => {
    setShowReport(!showReport);
  };
  console.log(healthData.length);

  useEffect(() => {
    if (healthData.length === 0) {
      setLocation(false);
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
            {healthData.map((item, index) => (
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
          <></>
        )}
      </div>
    </div>
  );
}
