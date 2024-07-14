import { useMutation, UseMutationResult } from "@tanstack/react-query";
const apiUrl = import.meta.env.VITE_API_URL;

interface LoginResponse {
  user: {
    id: string;
    username: string;
  };
  token: string;
}

interface LoginCredentials {
  email: string;
  password: string;
}

const loginUser = async (credentials: LoginCredentials) => {
  const response = await fetch(`${apiUrl}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
  });
  if (!response.ok) {
    throw new Error("Login failed");
  }
  return response.json();
};

export const useLogin = (): UseMutationResult<
  LoginResponse,
  Error,
  LoginCredentials,
  unknown
> => {
  return useMutation({
    mutationFn: loginUser,
    onSuccess: (data: LoginResponse) => {
      localStorage.clear();
      localStorage.setItem("token", data.token);
      localStorage.setItem("userName", data.user.username);
    },
    onError: (error: Error) => {
      throw new Error(error.message);
    },
  });
};
