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
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "@/store/appStore";
import { selectDrawerStatus } from "@/features/drawer/drawerSlice";
import { openDrawer, closeDrawer } from "@/features/drawer/drawerSlice";

export default function Component() {
  const drawerStatus = useSelector<RootState, boolean>(selectDrawerStatus);
  const dispatch = useDispatch<AppDispatch>();
  const participants = [
    {
      id: 1,
      name: "Olivia Davis",
      role: "Project Manager",
      avatar: "/avatars/01.png",
      bio: "Olivia is an experienced project manager with a strong background in leading cross-functional teams to deliver successful projects. She is known for her excellent communication skills and ability to navigate complex stakeholder relationships.",
      email: "olivia.davis@example.com",
      phone: "+1 (555) 123-4567",
      additionalDetails:
        "Olivia has a Bachelor's degree in Project Management and is a certified Project Management Professional (PMP). She has over 8 years of experience in the industry and has successfully delivered numerous projects for clients in the technology and healthcare sectors.",
    },
    {
      id: 2,
      name: "Ethan Smith",
      role: "Software Engineer",
      avatar: "/avatars/02.png",
      bio: "Ethan is a talented software engineer with a passion for building innovative solutions to complex problems. He is known for his strong technical skills and ability to work effectively in fast-paced environments.",
      email: "Ethan@gmail.com",
      phone: "+1 (555) 987-6543",
      additionalDetails:
        "Ethan has a Bachelor's degree in Computer Science and has over 5 years of experience in software development. He has worked on a wide range of projects, from mobile applications to large-scale enterprise systems.",
    },
  ];

  const [selectedParticipant, setSelectedParticipant] = useState({
    id: 0,
    name: "",
    role: "",
    avatar: "",
    bio: "",
    email: "",
    phone: "",
    additionalDetails: "",
  });

  const handleOpenDrawer = (participant) => {
    dispatch(openDrawer());
    setSelectedParticipant(participant);
    console.log(drawerStatus);
  };
  const handleCloseDrawer = () => {
    setSelectedParticipant({
      id: 0,
      name: "",
      role: "",
      avatar: "",
      bio: "",
      email: "",
      phone: "",
      additionalDetails: "",
    });
    dispatch(closeDrawer());
    console.log(drawerStatus);
  };
  console.log(drawerStatus);
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
                        src={participant.avatar}
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
        className=" bg-opacity-90 gray"
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
                  src={selectedParticipant.avatar}
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
                  {selectedParticipant.phone}
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
