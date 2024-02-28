import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import axios from "axios";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSignin = () => {
    window.location.href = "/signin";
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const res = await axios.post("http://127.0.0.1:8000/api/token/", {
        username,
        password,
      });
      sessionStorage.setItem("accessToken", res.data.access);
      sessionStorage.setItem("refreshToken", res.data.refresh);
    } catch (error) {
      console.log(error);
    }
    window.location.href = "/"
  };

  return (
    <div className="h-screen bg-zinc-300">
      <h1 className="text-center py-12">Login!</h1>

      <form
        className="py-12 px-4 shadow-2xl rounded-xl max-w-md mx-auto"
        onSubmit={(e) => handleSubmit(e)}
      >
        <h2 className="text-center mb-4">Enter username and password</h2>
        <div>
          <Label>Username</Label>
          <Input type="text" onChange={(e) => setUsername(e.target.value)} data-test="username-login" />
        </div>
        <div>
          <Label>Password</Label>
          <Input
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            data-test="password-login"
          />
        </div>
        <Button className="mt-4 mb-1" type="submit">
          Login
        </Button>
        <p className="text-sm text-right">
          Don't have an account yet?{" "}
          <span
            onClick={handleSignin}
            className="text-blue-500 hover:cursor-pointer hover:underline"
          >
            Sign in!
          </span>
        </p>
      </form>
    </div>
  );
}
