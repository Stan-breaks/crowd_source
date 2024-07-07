import { useQuery } from "@tanstack/react-query";

 interface profileResponse {
  avatarUrl: string;
  name: string;
  role: string;
  bio: string;
  additionalDetails: string;
}

const apiUrl = import.meta.env.VITE_API_URL;

const fetchProfile = async (): Promise<profileResponse> => {
  const token = localStorage.getItem("token");
  if (!token) {
    throw new Error("No token found");
  }
  const response = await fetch(`${apiUrl}/profile`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (!response.ok) {
    throw new Error("Error with fetching");
  }
  return response.json();
};

export const useProfile = () => {
  return useQuery<profileResponse, Error>({
    queryKey: ["profileData"],
    queryFn: fetchProfile,
  });
};
