import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import {
  UsersIcon,
  HomeIcon,
  SearchIcon,
  MapPinIcon,
  MedicalIcon,
  BellIcon,
  FileTextIcon,
  SettingsIcon,
} from "@/components/icons";
import DashboardHome from "@/components/DashboardHome";
import DashboardParticipants from "@/components/DashboardParticipants";
import DashboardReport from "@/components/DashboardReport";
import Location from "@/components/Location"
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RootState } from "@/store/appStore";
import { selectDrawerStatus } from "@/features/drawer/drawerSlice";
import { useEffect } from "react";
import Setting from "@/components/Setting";
import { profileResponse, useProfile } from "@/features/profile/useProfile";

export default function Component() {
  const url = import.meta.env.VITE_API_URL;
  const defaultAvatar = `${url}/static/avatar.jpeg`;
  const userName = localStorage.getItem("userName") || "";
  const navigate = useNavigate();
  let userProfile: profileResponse = {
    avatarUrl: defaultAvatar,
    name: " ",
    bio: " ",
    role: " ",
    additionalDetails: " ",
  };
  const profile = useProfile(userName);
  if (profile.data != undefined) {
    userProfile = {
      ...profile.data,
      avatarUrl: url + "/" + profile.data.avatarUrl,
    };
  }
  const drawerStatus = useSelector<RootState, boolean>(selectDrawerStatus);
  const [buttonData, setButtonData] = useState({
    home: true,
    participants: false,
    location: false,
    reports: false,
    settings: false,
  });
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  useEffect(() => {
    if (userName === "") {
      navigate("/login");
    }
    if (profile.isError) {
      navigate("/login");
    }
  }, []);
  return (
    <>
      <div
        className={`grid w-full ${drawerStatus ? "" : "min-h-screen"
          } lg:grid-cols-[280px_1fr]`}
      >
        <div
          className={`border-r bg-gray-100/40 lg:block dark:bg-gray-800/40 ${isMenuOpen ? "block" : "hidden"
            }`}
        >
          <div className="flex h-full max-h-screen flex-col gap-2">
            <div className="flex h-[60px] items-center border-b px-6">
              <Link className="flex items-center gap-2 font-semibold" to="#">
                <MedicalIcon className="h-6 w-6" />
                <span className="">Crowd Source</span>
              </Link>
              <Button className="ml-auto h-8 w-8" size="icon" variant="outline">
                <BellIcon className="h-4 w-4" />
                <span className="sr-only">Toggle notifications</span>
              </Button>
            </div>
            <div className="flex-1 overflow-auto py-2">
              <nav className="grid items-start px-4 text-sm font-medium">
                <Link
                  className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-gray-900  text-gray-900 dark:text-gray-50 dark:hover:text-gray-50 ${buttonData.home ? "bg-gray-100 dark:bg-gray-800" : ""
                    }`}
                  to="#"
                  onClick={() =>
                    setButtonData({
                      home: true,
                      participants: false,
                      location: false,
                      reports: false,
                      settings: false,
                    })
                  }
                >
                  <HomeIcon className="h-4 w-4" />
                  Home
                </Link>
                <Link
                  className={`flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50 ${buttonData.participants
                    ? "bg-gray-100 dark:bg-gray-800"
                    : ""
                    }`}
                  to="#"
                  onClick={() =>
                    setButtonData({
                      home: false,
                      participants: true,
                      reports: false,
                      location: false,
                      settings: false,
                    })
                  }
                >
                  <UsersIcon className="h-4 w-4" />
                  Participants
                </Link>
                <Link
                  className={`flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50 ${buttonData.reports ? "bg-gray-100 dark:bg-gray-800" : ""
                    }`}
                  to="#"
                  onClick={() =>
                    setButtonData({
                      home: false,
                      participants: false,
                      reports: true,
                      location: false,
                      settings: false,
                    })
                  }
                >
                  <FileTextIcon className="h-4 w-4" />
                  Reports
                </Link>
                <Link
                  className={`flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50 ${buttonData.location ? "bg-gray-100 dark:bg-gray-800" : ""
                    }`}
                  to="#"
                  onClick={() =>
                    setButtonData({
                      home: false,
                      participants: false,
                      reports: false,
                      location: true,
                      settings: false,
                    })
                  }
                >
                  <MapPinIcon className="h-4 w-4" />
                  Locations
                </Link>
                <Link
                  className={`flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50 ${buttonData.settings ? "bg-gray-100 dark:bg-gray-800" : ""
                    }`}
                  to="#"
                  onClick={() =>
                    setButtonData({
                      home: false,
                      participants: false,
                      reports: false,
                      location: false,
                      settings: true,
                    })
                  }
                >
                  <SettingsIcon className="h-4 w-4" />
                  Settings
                </Link>
              </nav>
            </div>
          </div>
        </div>
        <div className="flex flex-col">
          <header className="flex h-14 items-center gap-4 border-b bg-gray-100/40 px-6 dark:bg-gray-800/40">
            <Button className="lg:hidden" onClick={toggleMenu}>
              <MedicalIcon className="h-6 w-6" />
              <span className="sr-only">Toggle menu</span>
            </Button>
            <h1 className="text-lg font-semibold">Dashboard</h1>
            <form className="ml-auto flex-1">
              <div className="relative">
                <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500 dark:text-gray-400" />
                <Input
                  className="w-full bg-white shadow-none appearance-none pl-8 md:w-2/3 lg:w-1/3 dark:bg-gray-950"
                  placeholder="Search"
                  type="search"
                />
              </div>
            </form>
            <Button
              className="rounded-full border border-gray-200 w-8 h-8 dark:border-gray-800"
              size="icon"
              variant="ghost"
              onClick={() =>
                setButtonData({
                  home: false,
                  participants: false,
                  reports: false,
                  location: false,
                  settings: true,
                })
              }
            >
              <img
                alt="Avatar"
                className="rounded-full"
                height="32"
                src={
                  profile.data?.avatarUrl
                    ? url + "/" + profile.data.avatarUrl
                    : defaultAvatar
                }
                style={{
                  aspectRatio: "32/32",
                  objectFit: "cover",
                }}
                width="32"
              />
              <span className="sr-only">Toggle user menu</span>
            </Button>
          </header>

          {buttonData.home ? <DashboardHome profile={userProfile} /> : <></>}
          {buttonData.participants ? <DashboardParticipants /> : <></>}
          {buttonData.location ? <Location /> : <></>}
          {buttonData.reports ? <DashboardReport /> : <></>}
          {buttonData.settings ? <Setting /> : <></>}
        </div>
      </div>
    </>
  );
}
