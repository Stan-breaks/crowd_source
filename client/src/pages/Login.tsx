import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Loader from "@/components/Loader";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLogin } from "@/features/login/useLogin";

export default function Component() {
  const [user, setUser] = useState({ email: "", password: "" });
  const navigate = useNavigate();
  const login = useLogin();
  const submitLogin = () => {
    login.mutate(user, {
      onSuccess: () => {
        navigate("/home");
      },
      onError: (error: Error) => {
        console.log(error);
      },
    });
  };
  return (
    <>
      {login.isPending ? (
        <Loader />
      ) : (
        <div className="flex items-center min-h-screen px-4">
          <div className="w-full max-w-sm mx-auto space-y-6">
            <div className="space-y-2 text-center">
              <h1 className="text-3xl font-bold">Login</h1>
              <p className="text-gray-500 dark:text-gray-400">
                Enter your email below to login to your account
              </p>
              {login.isError && (
                <div className="text-red-500">Invalid password or email</div>
              )}
            </div>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  placeholder="m@example.com"
                  required
                  type="email"
                  value={user.email}
                  onChange={(e) => setUser({ ...user, email: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                  <Link
                    className="ml-auto inline-block text-sm underline"
                    to="/ForgotPassword"
                  >
                    Forgot your password?
                  </Link>
                </div>
                <Input
                  id="password"
                  required
                  type="password"
                  value={user.password}
                  onChange={(e) =>
                    setUser({ ...user, password: e.target.value })
                  }
                />
              </div>
              <Button className="w-full" type="submit" onClick={submitLogin}>
                Login
              </Button>
              <Button className="w-full" variant="outline">
                Login with Google
              </Button>
            </div>
            <div className="mt-4 text-center text-sm">
              Don't have an account?
              <Link className="underline" to="/SignUp">
                Sign up
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
