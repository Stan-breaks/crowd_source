import {
  QueryFunction,
  UseMutationResult,
  useMutation,
  useQuery,
} from "@tanstack/react-query";
export interface PostResponse {
  message: string;
}
export interface GetReportsResponse {
  disease: string;
  trend: string;
  trendColor: string;
  mortalityRate: string;
  cases: string;
  location: string;
}
export interface ReportsResponse {
  disease: string;
  numberOfCases: number;
  address: string;
  numberOfDeaths: number;
  approximatedPopulationCloseBy: number;
  description: string;
}
const apiUrl = import.meta.env.VITE_API_URL;

const fetchReports: QueryFunction<GetReportsResponse[]> = async () => {
  const token = localStorage.getItem("token");
  if (!token) {
    throw new Error("token not found");
  }
  const response = await fetch(`${apiUrl}/report`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (!response.ok) {
    throw new Error("Error with fetching");
  }
  return response.json();
};

const postReports = async (data: {
  userName: string;
  report: ReportsResponse;
}): Promise<PostResponse> => {
  const token = localStorage.getItem("token");
  const response = await fetch(`${apiUrl}/report/${data.userName}`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "content-Type": "application/json",
    },
    body: JSON.stringify(data.report),
  });
  if (!response.ok) {
    throw new Error("post failed");
  }
  return response.json();
};

export const usePostReports = (): UseMutationResult<
  PostResponse,
  Error,
  { userName: string; report: ReportsResponse },
  unknown
> => {
  return useMutation({
    mutationFn: postReports,

  });
};
export const useGetReports = (userName: string) => {
  return useQuery({
    queryKey: ["reports", userName],
    queryFn: fetchReports,
  });
};
