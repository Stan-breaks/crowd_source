import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Link } from "react-router-dom";
import { useState,useEffect } from "react";
import countryCodes from "@/features/countryCode";
import Loader from "@/components/Loader";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "@/store/appStore";
import { setUserName, selectUserName } from "@/features/user/userSlice";


export default function Component() {
  const dispatch = useDispatch<AppDispatch>();
  const userName = useSelector<RootState, string>(selectUserName);
  const [user, setUser] = useState({
    userName: "",
    email: "",
    number: "",
    password: "",
    confirmPassword: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [prefix, setPrefix] = useState("+1");
  const navigate = useNavigate();

  if (userName !== "") {
    navigate("/home");
  }

  const submitSignUp = async () => {
    setLoading(true);
    try {
      if (user.password !== user.confirmPassword) {
        throw new Error("passwords don't match");
      } else if (user.number.length < 9 || user.number.length > 12) {
        throw new Error("phone number is not valid");
      } else {
        const response = await fetch("http://127.0.0.0:3000/auth/register", {
          headers: {
            "Content-Type": "application/json",
          },
          method: "POST",
          body: JSON.stringify(user),
        });
        const data = await response.json();
        if (data.code) {
          await new Promise((resolve) => setTimeout(resolve, 2000));
          setLoading(false);
          console.log(data);
          dispatch(setUserName(data.userName));
          navigate("/home");
        } else {
          throw new Error("User creation failed try again later");
        }
      }
    } catch (err) {
      console.log(err);
      await new Promise((resolve) => setTimeout(resolve, 2000));
      setLoading(false);
      setError(true);
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
              <h1 className="text-3xl font-bold">Sign Up</h1>
              <p className="text-gray-500 dark:text-gray-400">
                Enter your information to create an account
              </p>
              {error && (
                <div className="text-red-500">
                  verify your details and try again later!
                </div>
              )}
            </div>
            <div className="space-y-4">
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="userName">username</Label>
                    <Input
                      id="userName"
                      placeholder="Lee001"
                      required
                      value={user.userName}
                      onChange={(e) =>
                        setUser({ ...user, userName: e.target.value })
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="number">Number</Label>
                    <div className="flex">
                      <select
                        className="border border-300 rounded-lg px-2 py-1 w-40 h-10"
                        value={prefix}
                        onChange={(e) => setPrefix(e.target.value)}
                      >
                        {countryCodes.map((code) => (
                          <option key={code.code} value={code.code}>
                            {code.name} ({code.code})
                          </option>
                        ))}
                      </select>
                    </div>
                    <Input
                      id="number"
                      placeholder="712345678"
                      required
                      value={user.number}
                      onChange={(e) =>
                        setUser({ ...user, number: e.target.value })
                      }
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    placeholder="m@example.com"
                    required
                    type="email"
                    value={user.email}
                    onChange={(e) =>
                      setUser({ ...user, email: e.target.value })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    required
                    type="password"
                    value={user.password}
                    onChange={(e) => {
                      setUser({ ...user, password: e.target.value });
                    }}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">confirm Password</Label>
                  <Input
                    id="confirmPassword"
                    required
                    type="password"
                    value={user.confirmPassword}
                    onChange={(e) => {
                      setUser({ ...user, confirmPassword: e.target.value });
                    }}
                  />
                </div>
                <Button className="w-full" onClick={submitSignUp}>
                  Sign Up
                </Button>
              </div>
              <Separator className="my-8" />
              <div className="space-y-4">
                <Button className="w-full" variant="outline">
                  Sign up with Google
                </Button>
                <div className="mt-4 text-center text-sm">
                  Already have an account?
                  <Link className="underline" to="/Login">
                    Login
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
