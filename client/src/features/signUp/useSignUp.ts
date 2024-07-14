import { useMutation, UseMutationResult } from "@tanstack/react-query";

const apiUrl = import.meta.env.VITE_API_URL;

interface SignUpResponse {
  user: {
    id: string;
    username: string;
  };
  token: string;
}

interface SignUpCredentials {
  userName: string;
  email: string;
  number: string;
  password: string;
  confirmPassword: string;
}

const signUpUser = async (credentials: SignUpCredentials) => {
  const response = await fetch(`${apiUrl}/auth/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
  });
  if (!response.ok) {
    throw new Error("Sign up failed");
  }
  return response.json();
};

export const useSignUp = (): UseMutationResult<
  SignUpResponse,
  Error,
  SignUpCredentials,
  unknown
> => {
  return useMutation({
    mutationFn: signUpUser,
    onSuccess: (data: SignUpResponse) => {
      localStorage.clear();
      localStorage.setItem("token", data.token);
      localStorage.setItem("userName", data.user.username);
    },
  });
};
