import { AvatarImage, AvatarFallback, Avatar } from "@/components/ui/avatar";
import {
  DrawerOverlay,
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerFooter,
} from "@/components/ui/drawer";
import { MailIcon, PhoneIcon } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store/appStore";
import { openDrawer, closeDrawer } from "@/features/drawer/drawerSlice";
import { useGetProfiles, getProfileResponse } from "@/features/profile/useProfile";

export default function Component() {
  const apiUrl = import.meta.env.VITE_API_URL;
  const dispatch = useDispatch<AppDispatch>();
  const userName = localStorage.getItem("userName") || "";
  const profiles = useGetProfiles(userName);
  const [participants, setParticipants] = useState<getProfileResponse[]>([]);
  const [selectedParticipant, setSelectedParticipant] = useState({

    id: 0,
    name: "",
    role: "",
    avatarUrl: "",
    bio: "",
    email: "",
    number: "",
    additionalDetails: "",
  });

  const handleOpenDrawer = (participant: getProfileResponse) => {
    dispatch(openDrawer());
    setSelectedParticipant(participant);
  };
  const handleCloseDrawer = () => {
    setSelectedParticipant({
      id: 0,
      name: "",
      role: "",
      avatarUrl: "",
      bio: "",
      email: "",
      number: "",
      additionalDetails: "",
    });
    dispatch(closeDrawer());
  };
  useEffect(() => {
    if (profiles.data != undefined) {
      setParticipants(profiles.data);
      console.log(profiles.data)
    }
  }, []);
  return (
    <>
      <div className="flex-1 p-6">
        <div className="container mx-auto">
          <h1 className="text-3xl font-bold mb-6 ">Participants</h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {participants.map((participant) => (
              <div
                key={participant.id}
                onClick={() => handleOpenDrawer(participant)}
                className="bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-shadow cursor-pointer"
              >
                <div className="p-4">
                  <div className="flex items-center space-x-4">
                    <Avatar>
                      <AvatarImage
                        alt={participant.name}
                        src={`${apiUrl}/${participant.avatarUrl}`}
                        className="rounded-full"
                        height="32"
                        style={{
                          aspectRatio: "32/32",
                          objectFit: "cover",
                        }}
                        width="32"

                      />
                      <AvatarFallback>
                        {participant.name
                          .split(" ")
                          .map((word) => word[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="text-lg font-medium">
                        {participant.name}
                      </h3>
                      <p className="text-gray-500 dark:text-gray-400">
                        {participant.role}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Drawer
        open={selectedParticipant.id !== 0}
      >
        <DrawerOverlay />
        <DrawerContent className=" bg-sky-200 w-full max-w-full overflow-y-auto">
          <Button
            variant="outline"
            onClick={handleCloseDrawer}
            className="absolute top-4 right-4"
          >
            Close
          </Button>
          <DrawerHeader className="py-4 px-6">
            <div className="flex items-center space-x-6">
              <Avatar className="h-20 w-20">
                <AvatarImage
                  alt={selectedParticipant.name}
                  src={`${apiUrl}/${selectedParticipant.avatarUrl}`}
                  className="rounded-full"
                  height="70"
                  style={{
                    aspectRatio: "70/70",
                    objectFit: "cover",
                  }}
                  width="70"


                />
                <AvatarFallback>
                  {selectedParticipant.name
                    .split(" ")
                    .map((word) => word[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <div>
                <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
                  {selectedParticipant.name}
                </h2>
                <p className="text-gray-500 dark:text-gray-400">
                  {selectedParticipant.role}
                </p>
              </div>
            </div>
          </DrawerHeader>
          <div className="p-6 space-y-8 overflow-y-auto max-h-96">
            <div>
              <h3 className="text-lg font-medium mb-2 text-gray-800 dark:text-white">
                Bio
              </h3>
              <p className="text-gray-500 dark:text-gray-400">
                {selectedParticipant.bio}
              </p>
            </div>
            <div>
              <h3 className="text-lg font-medium mb-2 text-gray-800 dark:text-white">
                Contact
              </h3>
              <div className="space-y-2">
                <p className="text-gray-500 dark:text-gray-400">
                  <MailIcon className="w-5 h-5 inline-block mr-2" />
                  {selectedParticipant.email}
                </p>
                <p className="text-gray-500 dark:text-gray-400">
                  <PhoneIcon className="w-5 h-5 inline-block mr-2" />
                  {selectedParticipant.number}
                </p>
              </div>
            </div>
            <div>
              <h3 className="text-lg font-medium mb-2 text-gray-800 dark:text-white">
                Additional Details
              </h3>
              <p className="text-gray-500 dark:text-gray-400">
                {selectedParticipant.additionalDetails}
              </p>
            </div>
          </div>
          <DrawerFooter className="py-4 px-6">
            <Button variant="outline" onClick={handleCloseDrawer}>
              Close
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
}
