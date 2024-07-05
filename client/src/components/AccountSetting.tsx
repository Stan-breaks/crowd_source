import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useState, useEffect } from "react";

export default function Component() {
  const [avatar, setAvatar] = useState<boolean>(false);
  const [userData, setUserData] = useState({
    avatarUrl: "",
    name: "",
    role: "",
    bio: "",
    additionalDetails: "",
  });
  return (
    <div className="w-full max-w-3xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <h2 className="text-lg font-medium mb-4">Avatar</h2>
          <div className="flex items-center gap-4">
            <Avatar className="h-20 w-20">
              <AvatarImage src="/placeholder-user.jpg" />
              <AvatarFallback>JP</AvatarFallback>
            </Avatar>
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
                      <Avatar className="h-16 w-16" key={avatar.id}>
                        <AvatarImage src={avatar.url} />
                        <AvatarFallback>{avatar.name}</AvatarFallback>
                      </Avatar>
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
            <Input id="name" defaultValue="Jared Palmer" />
          </div>
          <div>
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" defaultValue="example@acme.inc" />
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
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <Label htmlFor="phone">Phone</Label>
              <Input id="phone" defaultValue="+1 (555) 555-5555" />
            </div>
            <div>
              <Label htmlFor="website">Website</Label>
              <Input id="website" defaultValue="https://example.com" />
            </div>
            <div>
              <Label htmlFor="location">Location</Label>
              <Input
                id="locationJared Palmer"
                defaultValue="San Francisco, CA"
              />
            </div>
            <div>
              <Label htmlFor="job-title">Job Title</Label>
              <Input id="job-title" defaultValue="Software Engineer" />
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
