import { useQuery } from "@tanstack/react-query";
export interface PictureResponse {
  pictures: [_id: string, url: string];
}

const apiUrl = import.meta.env.VITE_API_URL;

const fetchPictures = async () => {
  const token = localStorage.getItem("token");
  if (!token) {
    throw new Error("token not found");
  }
  const response = await fetch(`${apiUrl}/profile/picture`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (!response.ok) {
    throw new Error("fetch failed");
  }
  return response.json();
};

export const usePictures = () => {
  return useQuery<PictureResponse>({
    queryKey: ["pictures"],
    queryFn: fetchPictures,
  });
};
