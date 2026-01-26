import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Github, Mail, User, AlertTriangle } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import type RegisterData from "@/models/RegisterData";
import { registerUser } from "@/services/AuthService";
import { useNavigate } from "react-router-dom";
import confetti from "canvas-confetti";
import { Alert, AlertTitle } from "@/components/ui/alert";
import { Spinner } from "@/components/ui/spinner";
import axios from "axios";

export default function Signup() {
  const [data, setData] = useState<RegisterData>({
    name: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();

  const fireGraffitiConfetti = () => {
    confetti({
      particleCount: 120,
      spread: 80,
      origin: { y: 0.6 },
      colors: ["#00ffee", "#ff00cc", "#8a2be2", "#00ccff"],
    });
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setData((value) => ({
      ...value,
      [event.target.name]: event.target.value,
    }));

    if (error) setError(null);
  };

  const handleFormSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (data.name.trim() === "") {
      toast.error("Name is required!");
      return;
    }
    if (data.email.trim() === "") {
      toast.error("Email is required!");
      return;
    }
    if (data.password.trim() === "") {
      toast.error("Password is required!");
      return;
    }

    try {
      setLoading(true);
      const result = await registerUser(data);
      console.log(result);

      fireGraffitiConfetti();
      toast.success("User registered successfully!");

      setData({
        name: "",
        email: "",
        password: "",
      });

      navigate("/login");
    } catch (err: unknown) {
      console.error(err);

      if (axios.isAxiosError(err)) {
        if (err.response) {
          const message =
            err.response.data?.message ||
            err.response.data?.error ||
            "Something went wrong";
          setError(message);
          toast.error(message);
        } else if (err.request) {
          setError("Server unreachable");
          toast.error("Server unreachable. Try again later.");
        } else {
          setError("Unexpected error");
          toast.error("Unexpected error occurred");
        }
      } else {
        setError("Unknown error");
        toast.error("Something went wrong");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background text-foreground relative overflow-hidden px-4 sm:px-6">
      {/* Glow Background */}
      <div className="absolute inset-0">
        <div className="absolute -top-40 -left-40 w-[300px] sm:w-[400px] h-[300px] sm:h-[400px] bg-indigo-500/30 rounded-full blur-[120px]" />
        <div className="absolute top-1/3 -right-40 w-[300px] sm:w-[400px] h-[300px] sm:h-[400px] bg-cyan-400/30 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 left-1/3 w-[300px] sm:w-[400px] h-[300px] sm:h-[400px] bg-pink-500/20 rounded-full blur-[120px]" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 40, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="relative z-10 w-full max-w-[90%] sm:max-w-md md:max-w-lg"
      >
        <Card className="bg-background/60 backdrop-blur-xl border border-border shadow-2xl">
          <CardContent className="p-8">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center tracking-wider">
              Create Account
            </h1>

            <p className="text-center text-muted-foreground mt-2">
              Join the future of secure access.
            </p>

            {/* OAuth Signup */}
            <div className="mt-6 space-y-3">
              <Button
                variant="outline"
                className="w-full text-base sm:text-lg py-5 sm:py-6"
                onClick={() =>
                  (window.location.href =
                    "http://localhost:8080/oauth2/authorization/google")
                }
              >
                <Mail className="w-5 h-5" />
                Sign up with Google
              </Button>

              <Button
                variant="outline"
                className="w-full text-base sm:text-lg py-5 sm:py-6"
                onClick={() =>
                  (window.location.href =
                    "http://localhost:8080/oauth2/authorization/github")
                }
              >
                <Github className="w-5 h-5" />
                Sign up with GitHub
              </Button>
            </div>

            {/* Divider */}
            <div className="flex items-center my-6">
              <div className="flex-1 h-px bg-border" />
              <span className="px-3 text-sm text-muted-foreground">or</span>
              <div className="flex-1 h-px bg-border" />
            </div>

            {/* Error */}
            {error && (
              <Alert variant="destructive" className="my-4">
                <AlertTriangle className="h-4 w-4" />
                <AlertTitle>{error}</AlertTitle>
              </Alert>
            )}

            {/* Register Form */}
            <form className="space-y-5" onSubmit={handleFormSubmit}>
              <div className="space-y-2">
                <Label>Full Name</Label>
                <div className="relative">
                  <User className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                  <Input
                    type="text"
                    placeholder="Enter your full name"
                    className="pl-10"
                    name="name"
                    value={data.name}
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Email</Label>
                <Input
                  type="email"
                  placeholder="Enter your email"
                  name="email"
                  value={data.email}
                  onChange={handleInputChange}
                />
              </div>

              <div className="space-y-2">
                <Label>Password</Label>
                <Input
                  type="password"
                  placeholder="Enter password"
                  name="password"
                  value={data.password}
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
                    Creating...
                  </>
                ) : (
                  "Create Account"
                )}
              </Button>
            </form>

            <p className="text-center text-sm text-muted-foreground mt-6">
              Already have an account?{" "}
              <a href="/login" className="text-primary cursor-pointer hover:underline">
                Login
              </a>
            </p>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
