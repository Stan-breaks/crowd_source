import { QueryFunction, useQuery } from "@tanstack/react-query";

export interface profileResponse {
  avatarUrl: string;
  name: string;
  role: string;
  bio: string;
  additionalDetails: string;
}

const apiUrl = import.meta.env.VITE_API_URL;

const fetchProfile: QueryFunction<profileResponse, [string, string]> = async ({
  queryKey,
}) => {
  const [_key, userName] = queryKey;
  const token = localStorage.getItem("token");
  if (!token) {
    throw new Error("No token found");
  }
  const response = await fetch(`${apiUrl}/profile/${userName}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (!response.ok) {
    throw new Error("Error with fetching");
  }
  return response.json();
};

export const useProfile = (userName: string) => {
  return useQuery<profileResponse, Error, profileResponse, [string, string]>({
    queryKey: ["profileData", userName],
    queryFn: fetchProfile,
  });
};
