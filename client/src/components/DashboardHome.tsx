import {
  CardTitle,
  CardDescription,
  CardContent,
  Card,
  CardHeader,
} from "@/components/ui/card";
import {
  UserIcon,
  MapPinIcon,
  CalendarIcon,
  MessageSquareIcon,
  UsersIcon,
} from "@/components/icons";
import { Separator } from "@/components/ui/separator";
import { profileResponse } from "@/features/profile/useProfile";

interface Props {
  profile: profileResponse;
}

const url = import.meta.env.VITE_API_URL;

export default function Component({ profile }: Props) {
  return (
    <main className="flex-1 p-4 md:p-10 bg-gray-100">
      <Card className="w-full max-w-3xl mx-auto bg-white shadow-lg rounded-lg">
        <CardHeader className="bg-black p-6 rounded-t-lg">
          <div className="flex items-center gap-4">
            <img
              alt="Avatar"
              className="rounded-full"
              height="80"
              src={profile.avatarUrl}
              style={{
                aspectRatio: "80/80",
                objectFit: "cover",
              }}
              width="80"
            />
            <div className="grid gap-1">
              <h2 className="text-2xl font-bold text-white">{profile.name}</h2>
              <p className="text-gray-200">{profile.role}</p>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-6 grid gap-4">
          <div className="grid gap-2">
            <h3 className="text-lg font-semibold">Bio</h3>
            <p className="text-gray-500">{profile.bio}</p>
          </div>
          <Separator />
          <div className="grid gap-2">
          <h3 className="text-lg font-semibold">Additional Details</h3>
          <p className="text-gray-500">{profile.additionalDetails}</p>
          </div>
        </CardContent>
      </Card>
    </main>
  );
}
