import { QueryFunction, UseMutationResult, useMutation, useQuery } from "@tanstack/react-query";

export interface LocationResponse {
  address: string;
  city: string;
  state: string;
  country: string;
}

interface PostResponse {
  message: string;
}

const apiUrl = import.meta.env.VITE_API_URL;

const fetchLocation: QueryFunction<LocationResponse> = async () => {
  const token = localStorage.getItem("token");
  if (!token) {
    throw new Error("token not found")
  }
  const response = await fetch(`${apiUrl}/location`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
  if (!response.ok) {
    throw new Error("Error with fetching");
  }
  return response.json()
}
export const useGetLocations = () => {
  return useQuery({
    queryKey: ["profileSettings"],
    queryFn: fetchLocation,
  });
};

const postLocation = async (data: { userName: string, locations: LocationResponse }): Promise<Promise> => {

}


const postReports = async (data: {
  userName: string;
  reports: ReportsResponse;
}): Promise<PostResponse> => {
  const token = localStorage.getItem("token");
  const response = await fetch(`${apiUrl}report/${data.userName}`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "content-Type": "application/json",
    },
    body: JSON.stringify(data.reports),
  });
  if (!response.ok) {
    throw new Error("post failed");
  }
  return response.json();
};


