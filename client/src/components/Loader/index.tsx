import { CardContent, Card } from "@/components/ui/card";
import { ActivityIcon } from "@/components/icons";

export default function Component() {
  return (
    <div className="flex justify-center items-center h-screen">
      <Card className="w-full max-w-sm">
        <CardContent className="p-4">
          <div className="flex flex-col items-center space-y-2 animate-pulse">
            <ActivityIcon className="w-12 h-12 animate-spin" />
            <div className="grid gap-1 text-center">
              <p className="text-sm font-medium">Loading</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
