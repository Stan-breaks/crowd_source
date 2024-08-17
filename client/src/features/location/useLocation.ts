import { QueryFunction, UseMutationResult, useMutation, useQuery } from "@tanstack/react-query";

export interface LocationResponse {
  id: number;
  address: string;
  city: string;
  state: string;
  country: string;
}

interface PostResponse {
  message: string;
}

const apiUrl = import.meta.env.VITE_API_URL;

const fetchLocation: QueryFunction<LocationResponse[]> = async () => {
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

const postLocation = async (data: { userName: string, location: LocationResponse }): Promise<PostResponse> => {
  const token = localStorage.getItem("token");
  const response = await fetch(`${apiUrl}/location/${data.userName}`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "content-Type": "application/json",
    },
    body: JSON.stringify(data.location)
  });
  if (!response.ok) {
    throw new Error("Problem with posting")
  }
  return response.json();
}

export const usePostLocation = (): UseMutationResult<
  PostResponse,
  Error,
  { userName: string; location: LocationResponse },
  unknown
> => {
  return useMutation({
    mutationFn: postLocation,
  });
};
