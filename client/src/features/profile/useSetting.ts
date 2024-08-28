import {
  QueryFunction,
  UseMutationResult,
  useMutation,
  useQuery,
} from "@tanstack/react-query";
export interface SettingsResponse {
  avatarUrl: string;
  name: string;
  role: string;
  number: string;
  email: string;
  bio: string;
  additionalDetails: string;
}

export interface PostResponse {
  message: string;
}

const apiUrl = import.meta.env.VITE_API_URL;

const fetchSettings: QueryFunction<
  SettingsResponse,
  [string, string]
> = async ({ queryKey }) => {
  const [, userName] = queryKey;
  const token = localStorage.getItem("token");
  if (!token) {
    throw new Error("token not found");
  }
  const response = await fetch(`${apiUrl}/profile/settings/${userName}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (!response.ok) {
    throw new Error("Error with fetching");
  }
  return response.json();
};

const postSettings = async (data: {
  userName: string;
  settings: SettingsResponse;
}): Promise<PostResponse> => {
  const token = localStorage.getItem("token");
  const response = await fetch(`${apiUrl}/profile/settings/${data.userName}`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "content-Type": "application/json",
    },
    body: JSON.stringify(data.settings),
  });
  if (!response.ok) {
    throw new Error("post failed");
  }
  return response.json();
};

export const usePostSettings = (): UseMutationResult<
  PostResponse,
  Error,
  { userName: string; settings: SettingsResponse },
  unknown
> => {
  return useMutation({
    mutationFn: postSettings,
  });
};
export const useGetSettings = (userName: string) => {
  return useQuery({
    queryKey: ["profileSettings", userName],
    queryFn: fetchSettings,
  });
};
