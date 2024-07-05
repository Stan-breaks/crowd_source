import { useQuery } from "@tanstack/react-query";

interface profileResponse {
  avatarUrl: string;
  name: string;
  role: string;
  bio: string;
  additionalDetails: string;
}

const apiUrl = import.meta.env.VITE_API_URL;

const fetchProfile = async () => {
  const token = localStorage.getItem("token");
  if (!token) {
    throw new Error("No token found");
  }
  const response = await fetch(`${apiUrl}/`);
};
