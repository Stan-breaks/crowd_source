import {
  CardTitle,
  CardDescription,
  CardContent,
  Card,
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
    <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
      <div className="grid gap-4">
        <Card>
          <CardContent className="flex items-center gap-4">
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
            <div className="grid gap-1.5">
              <CardTitle className="text-2xl font-bold text-white">
                {profile.name}
              </CardTitle>
              <CardDescription className="text-gray-200">
                {profile.role}
              </CardDescription>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 grid gap-4">
            <h3 className="text-lg font-semibold">Bio</h3>
            <p className="text-gray-500">{profile.bio}</p>
            <Separator />
            <h3 className="text-lg font-semibold">Additional Details</h3>
            <p className="text-gray-500">{profile.additionalDetails}</p>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
