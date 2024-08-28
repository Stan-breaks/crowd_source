import {
  CardTitle,
  CardDescription,
  CardHeader,
  CardContent,
  Card,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import Loader from "@/components/Loader";
import { useState } from "react";

export default function Component() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const submitEmail = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        "http://127.0.0.0:3000/auth/forgotPassword",
        {
          headers: {
            "Content-Type": "application/json",
          },
          method: "POST",
          body: JSON.stringify({ email }),
        },
      );
      const data = await response.json();
      if (data.message) {
        await new Promise((resolve) => setTimeout(resolve, 2000));
        setLoading(false);
        console.log(data);
      } else {
        throw new Error("Invalid response from the server");
      }
    } catch (err) {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      setLoading(false);
      setError(true);
    }
  };

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className="flex items-center justify-center min-h-screen">
          <Card className="max-w-sm">
            <CardHeader className="space-y-1">
              <CardTitle className="text-2xl font-bold">
                Forgot password
              </CardTitle>
              <CardDescription>
                Enter your email below to receive a password reset link
              </CardDescription>
            </CardHeader>
            <CardContent>
              {error && <div className="text-red-500">Invalid email</div>}
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    placeholder="m@example.com"
                    required
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <Button className="w-full" onClick={submitEmail}>
                  Submit
                </Button>
              </div>
              <div className="mt-4 text-center text-sm">
                <Link className="underline" to="#">
                  Back to login
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </>
  );
}
