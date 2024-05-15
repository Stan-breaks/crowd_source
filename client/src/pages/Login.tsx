import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Loader from "@/components/Loader";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "@/store/appStore";
import { setUserName, selectUserName } from "@/features/user/userSlice";
import { useEffect } from "react";

export default function Component() {
  const dispatch = useDispatch<AppDispatch>();
  const userName = useSelector<RootState, string>(selectUserName);
  const [user, setUser] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const navigate = useNavigate();

  const submitLogin = async () => {
    setLoading(true);
    try {
      const response = await fetch("http://127.0.0.0:3000/auth/login", {
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify(user),
      });
      const data = await response.json();
      if (data.userName) {
        await new Promise((resolve) => setTimeout(resolve, 2000));
        setLoading(false);
        dispatch(setUserName(data.userName));
        navigate("/home");
      } else {
        throw new Error("Invalid response from the server");
      }
    } catch (err) {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      setLoading(false);
      setError(true);
      console.log(err);
    }
  };

  useEffect(() => {
    if (userName !== "") {
      navigate("/home");
    }
  }, []);
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className="flex items-center min-h-screen px-4">
          <div className="w-full max-w-sm mx-auto space-y-6">
            <div className="space-y-2 text-center">
              <h1 className="text-3xl font-bold">Login</h1>
              <p className="text-gray-500 dark:text-gray-400">
                Enter your email below to login to your account
              </p>
              {error && (
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
