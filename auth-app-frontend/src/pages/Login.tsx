import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { useState, type FormEvent } from "react";
import type LoginData from "@/models/LoginData";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";
import { Alert, AlertTitle } from "@/components/ui/alert";
import axios from "axios";
import { AlertTriangle } from "lucide-react";
import { Spinner } from "@/components/ui/spinner";
import useAuth from "@/auth/store";
import OAuth2Buttons from "@/components/OAuth2Buttons";

export default function Login() {
  const [loginData, setLoginData] = useState<LoginData>({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState<boolean>(false);

  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();
  const login = useAuth((state) => state.login);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLoginData({
      ...loginData,
      [event.target.name]: event.target.value,
    });
    if (error) setError(null);
    // console.log(event.target.value);
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    // Validation
    if (loginData.email.trim() == "") {
      toast.error("Email is required!");
      return;
    }
    if (loginData.password.trim() == "") {
      toast.error("Password is required!");
      return;
    }

    // Server call for login
    // console.log(event.target);
    // console.log(loginData);

    try {
      setLoading(true);
      // const userInfo = await loginUser(loginData);

      // Login function: useAuth
      // const userInfo = await login(loginData);
      await login(loginData);

      toast.success("Login Success...");
      // console.log(userInfo);

      // Save the current logged in user information in localstorage

      navigate("/user");
    } catch (error: unknown) {
      console.error(error);

      if (axios.isAxiosError(error)) {
        // Server responded with a status code
        if (error.response) {
          const status = error.response.status;
          const message =
            error.response.data?.message ||
            error.response.data?.error ||
            "Something went wrong";

          if (status === 400) {
            toast.error(message || "Invalid input");
          } else if (status === 401) {
            toast.error("Invalid email or password");
          } else if (status === 403) {
            toast.error("You are not allowed to access this");
          } else if (status === 404) {
            toast.error("Service not found");
          } else if (status === 500) {
            toast.error("Server error. Please try again later.");
          } else {
            toast.error(message);
          }
          setError(message);
        }

        // Request made but no response (server down, CORS, network)
        else if (error.request) {
          toast.error(
            "Server unreachable. Check your internet or try again later.",
          );
          setError("Server unreachable");
        }

        // Something else happened
        else {
          toast.error("Unexpected error occurred.");
          setError("Unexpected error");
        }
      } else {
        // Non-Axios error
        toast.error("Something went wrong");
        setError("Unknown error");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background text-foreground relative overflow-hidden px-4 sm:px-6">
      {/* Glow Background */}
      <div className="absolute inset-0">
        <div className="absolute -top-40 -left-40 w-[280px] sm:w-[400px] h-[280px] sm:h-[400px] bg-purple-500/30 rounded-full blur-[120px]" />
        <div className="absolute top-1/3 -right-40 w-[280px] sm:w-[400px] h-[280px] sm:h-[400px] bg-cyan-400/30 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 left-1/3 w-[280px] sm:w-[400px] h-[280px] sm:h-[400px] bg-pink-500/20 rounded-full blur-[120px]" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 40, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="relative z-10 w-full max-w-[90%] sm:max-w-md md:max-w-lg"
      >
        <Card className="bg-background/60 backdrop-blur-xl border border-border shadow-2xl">
          <CardContent className="p-6 sm:p-8">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center tracking-wider">
              Welcome Back
            </h1>

            <p className="text-center text-muted-foreground mt-2 text-sm sm:text-base">
              Enter the system. Stay secure.
            </p>

            {/* OAuth Buttons */}
            <OAuth2Buttons />

            {/* Divider */}
            <div className="flex items-center my-6">
              <div className="flex-1 h-px bg-border" />
              <span className="px-3 text-xs sm:text-sm text-muted-foreground">
                or
              </span>
              <div className="flex-1 h-px bg-border" />
            </div>

            {/* Error Section */}
            {error && (
              <Alert variant={"destructive"} className="my-4">
                <AlertTriangle />
                <AlertTitle>{error}</AlertTitle>
              </Alert>
            )}

            {/* Email / Password Form */}
            <form className="space-y-5 sm:space-y-6" onSubmit={handleSubmit}>
              <div className="space-y-2">
                <Label>Email</Label>
                <Input
                  type="email"
                  placeholder="Enter your email"
                  name="email"
                  value={loginData.email}
                  onChange={handleInputChange}
                />
              </div>

              <div className="space-y-2">
                <Label>Password</Label>
                <Input
                  type="password"
                  placeholder="Enter your password"
                  name="password"
                  value={loginData.password}
                  onChange={handleInputChange}
                />
              </div>

              <Button
                className="
    w-full text-base sm:text-lg py-5 sm:py-6 flex items-center justify-center gap-2
    bg-indigo-600
    hover:bg-cyan-500
    active:bg-pink-600
    hover:scale-[1.02]
    active:scale-[0.97]
    transition-all duration-200
    shadow-lg hover:shadow-cyan-500/40 cursor-pointer
  "
                disabled={loading}
              >
                {loading ? (
                  <>
                    <Spinner className="size-4 animate-spin" />
                    Logging in...
                  </>
                ) : (
                  "Access System"
                )}
              </Button>
            </form>

            <p className="text-center text-xs sm:text-sm text-muted-foreground mt-6">
              New here?{" "}
              <a
                href="/signup"
                className="text-primary cursor-pointer hover:underline"
              >
                Create an account
              </a>
            </p>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
