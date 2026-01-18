import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Github, Mail, User } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import type RegisterData from "@/models/RegisterData"; // IMP: export default type
import {registerUser} from "@/services/AuthService";
import { useNavigate } from "react-router";
// import GraffitiSuccess from "@/components/GraffitiSuccess";
import confetti from "canvas-confetti";


export default function Signup() {

  const [data, setData] = useState<RegisterData>({
    name: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState<boolean>(false);

  const [error, setError] = useState(null);

  // const [showGraffiti, setShowGraffiti] = useState(false);

  const fireGraffitiConfetti = () => {
  confetti({
    particleCount: 120,
    spread: 80,
    origin: { y: 0.6 },
    colors: ["#00ffee", "#ff00cc", "#8a2be2", "#00ccff"],
  });
};


  // Handle input change
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log(event.target.name);
    console.log(event.target.value);

    setData((value) => ({
      ...value,
      [event.target.name]: event.target.value,
    }));
  };

  const navigate = useNavigate();

  // Handle form submission
  const handleFormSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    console.log(data);

    // Handle Form validations
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

    // Form submit for registration
    try {
      const result = await registerUser(data);
      console.log(result);
      // setShowGraffiti(true);

      fireGraffitiConfetti();

      
      toast.success("User register successfully...");

      // setTimeout(()=> {
      //   setShowGraffiti(false); // or dashboard
      // }, 2000);
      
      setData({
        name: "",
        email: "",
        password: "",
      });
      
//      Navigate to the login page
        navigate("/login");

    } catch (error) {
      console.log(error);
      toast.error("Error in registering the user");
    }
  };

  return (
    <>

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

            {/* Register Form */}
            <form className="space-y-5" onSubmit={handleFormSubmit}>
              <div className="space-y-2">
                <Label>Full Name</Label>
                <div className="relative">
                  <User className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                  <Input
                    type="text"
                    placeholder="Neo Anderson"
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
                  placeholder="neo@matrix.com"
                  name="email"
                  value={data.email}
                  onChange={handleInputChange}
                />
              </div>

              <div className="space-y-2">
                <Label>Password</Label>
                <Input
                  type="password"
                  placeholder="••••••••"
                  name="password"
                  value={data.password}
                  onChange={handleInputChange}
                />
              </div>

              <Button className="w-full text-lg py-6"
              disabled={loading}
              >
                {loading ? "Creating" : "Create Account"}</Button>
            </form>

            <p className="text-center text-sm text-muted-foreground mt-6">
              Already have an account?{" "}
              <span className="text-primary cursor-pointer hover:underline">
                Login
              </span>
            </p>
          </CardContent>
        </Card>
      </motion.div>
    </div>
    </>
    
  );
}
