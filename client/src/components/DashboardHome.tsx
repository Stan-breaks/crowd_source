import {
  CardTitle,
  CardDescription,
  CardContent,
  Card,
  CardHeader,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
  UserIcon,
  MapPinIcon,
  CalendarIcon,
  MessageSquareIcon,
} from "@/components/icons";

export default function Component() {
  console.log(" ");
  return (
    <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
      <div className="grid gap-4">
        <Card>
          <CardContent className="flex items-center gap-4">
            <img
              alt="Avatar"
              className="rounded-full"
              height="80"
              src="http://localhost:3000/static/avatar.jpeg"
              style={{
                aspectRatio: "80/80",
                objectFit: "cover",
              }}
              width="80"
            />
            <div className="grid gap-1.5">
              <CardTitle>Dr. Jane Smith</CardTitle>
              <CardDescription>Chief Medical Officer</CardDescription>
            </div>
            <Button className="ml-auto w-8 h-8" size="icon">
              <MessageSquareIcon className="w-4 h-4" />
              <span className="sr-only">Message</span>
            </Button>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="grid gap-2">
            <div className="flex items-center gap-2">
              <UserIcon className="h-6 w-6" />
              <div className="text-sm">
                <div className="font-semibold">Dr. Jane Smith</div>
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  Chief Medical Officer
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <MapPinIcon className="h-6 w-6" />
              <div className="text-sm">
                <div className="font-semibold">Acme Hospital</div>
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  123 Main St, Pleasantville, CA
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <CalendarIcon className="h-6 w-6" />
              <div className="text-sm">
                <div className="font-semibold">Next Clinical check up</div>
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  10:00 AM - June 30, 2023
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      <Card>
        <CardHeader className="flex items-center gap-4">
          <CardTitle>Participants</CardTitle>
          <Button size="sm">Export</Button>
        </CardHeader>
        <CardContent className="p-4">
          <Table className="table-auto w-full">
            <TableHeader>
              <TableRow>
                <TableHead className="text-left">#</TableHead>
                <TableHead className="text-left">Participant</TableHead>
                <TableHead className="text-left">Gender</TableHead>
                <TableHead className="text-left">Age</TableHead>
                <TableHead className="text-left">Condition</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell>1</TableCell>
                <TableCell>John Doe</TableCell>
                <TableCell>Male</TableCell>
                <TableCell>35</TableCell>
                <TableCell>Diabetes</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </main>
  );
}
