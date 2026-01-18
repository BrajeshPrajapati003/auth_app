import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Github, Mail } from "lucide-react";

export default function Login() {
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
            <div className="mt-6 space-y-3">
              <Button
                variant="outline"
                className="w-full flex gap-2 py-5 sm:py-6 text-sm sm:text-base"
                onClick={() =>
                  (window.location.href =
                    "http://localhost:8080/oauth2/authorization/google")
                }
              >
                <Mail className="w-5 h-5" />
                Continue with Google
              </Button>

              <Button
                variant="outline"
                className="w-full flex gap-2 py-5 sm:py-6 text-sm sm:text-base"
                onClick={() =>
                  (window.location.href =
                    "http://localhost:8080/oauth2/authorization/github")
                }
              >
                <Github className="w-5 h-5" />
                Continue with GitHub
              </Button>
            </div>

            {/* Divider */}
            <div className="flex items-center my-6">
              <div className="flex-1 h-px bg-border" />
              <span className="px-3 text-xs sm:text-sm text-muted-foreground">
                or
              </span>
              <div className="flex-1 h-px bg-border" />
            </div>

            {/* Email / Password Form */}
            <form className="space-y-5 sm:space-y-6">
              <div className="space-y-2">
                <Label>Email</Label>
                <Input type="email" placeholder="neo@matrix.com" />
              </div>

              <div className="space-y-2">
                <Label>Password</Label>
                <Input type="password" placeholder="••••••••" />
              </div>

              <Button className="w-full text-base sm:text-lg py-5 sm:py-6">
                Access System
              </Button>
            </form>

            <p className="text-center text-xs sm:text-sm text-muted-foreground mt-6">
              New here?{" "}
              <span className="text-primary cursor-pointer hover:underline">
                Create an account
              </span>
            </p>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
