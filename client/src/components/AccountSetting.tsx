import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/store/appStore";
import {
  SettingsResponse,
  useGetSettings,
  usePostSettings,
} from "@/features/profile/useSetting";
import { usePictures } from "@/features/profile/usePictures";

export default function Component() {
  const url = import.meta.env.VITE_API_URL;
  const [avatar, setAvatar] = useState<boolean>(false);
  const [userData, setUserData]: SettingsResponse = useState({
    avatarUrl: "",
    name: "",
    number: "",
    email: "",
    role: "",
    bio: "",
    additionalDetails: "",
  });
  const userName = useSelector((state: RootState) => state.user.userName);
  const profile = useGetSettings(userName);
  const pictures = usePictures();
  const data = pictures.data;
  useEffect(() => {
    if (profile.data != undefined) {
      const userProfile = profile.data;
      setUserData(userProfile);
    }
  }, [profile.data]);
  return (
    <div className="w-full max-w-3xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <h2 className="text-lg font-medium mb-4">Avatar</h2>
          <div className="flex itemse-center gap-4">
            <img
              alt={userData.avatarUrl}
              className="rounded-full h-20 w-20"
              src={url + "/" + userData.avatarUrl}
              style={{
                aspectRatio: "80/80",
                objectFit: "cover",
              }}
            />

            <div>
              <Button variant="outline" onClick={() => setAvatar(!avatar)}>
                Change Avatar
              </Button>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                Select from available avatars
              </p>
              {avatar && (
                <div className="mt-4">
                  <div className="grid grid-cols-3 gap-4">
                    {data.map((avatar) => (
                      <img
                        key={avatar._id}
                        alt={avatar.url}
                        className="rounded-full"
                        height="80"
                        src={url + "/" + avatar.url}
                        style={{
                          aspectRatio: "80/80",
                          objectFit: "cover",
                        }}
                        width="80"
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 space-y-6">
          <div>
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              value={userData.name}
              onChange={(e) =>
                setUserData({ ...userData, name: e.target.value })
              }
            />
          </div>
          <div>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={userData.email}
              onChange={(e) =>
                setUserData({ ...userData, email: e.target.value })
              }
            />
          </div>
          <div>
            <Label htmlFor="phone">Phone</Label>
            <Input
              id="phone"
              value={userData.number}
              onChange={(e) =>
                setUserData({ ...userData, number: e.target.value })
              }
            />
          </div>
          <div>
            <Label htmlFor="job-title">Job Title</Label>
            <Input
              id="job-title"
              value={userData.role}
              onChange={(e) => setUserData(e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="bio">Bio</Label>
            <Textarea
              id="bio"
              className="min-h-[100px] bg-slate-800 text-slate-200 border border-slate-700 rounded-md p-4 w-full resize-none"
              rows={4}
              defaultValue="I'm a software engineer, and I love to code!"
            />
          </div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 space-y-6 col-span-full">
          <h2 className="text-lg font-medium">Additional Details</h2>
          <div>
            <div>
              <Textarea
                id="about"
                className="min-h-[100px] bg-slate-800 text-slate-200 border border-slate-700 rounded-md p-4 w-full resize-none"
                rows={4}
                value={userData.additionalDetails}
                onChange={(e) =>
                  setUserData({
                    ...userData,
                    additionalDetails: e.target.value,
                  })
                }
              />
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-end mt-8">
        <Button className="ml-auto">Save Changes</Button>
      </div>
    </div>
  );
}
