import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-background text-foreground">
      
      {/* Background Grid Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.06)_1px,transparent_0)] [background-size:40px_40px] opacity-20 dark:opacity-10" />

      {/* Floating Blur Orbs */}
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl" />
      <div className="absolute top-1/2 -right-40 w-96 h-96 bg-indigo-500/20 rounded-full blur-3xl" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 max-w-3xl px-6 text-center"
      >
        {/* Badge */}
        <div className="mb-4 inline-block rounded-full border px-4 py-1 text-xs tracking-wide text-muted-foreground backdrop-blur">
          ⚡ Modern Auth Platform
        </div>

        {/* Heading */}
        <h1 className="text-4xl md:text-6xl font-bold leading-tight tracking-tight">
          Authentication,
          <br />
          <span className="bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent">
            done right.
          </span>
        </h1>

        {/* Subheading */}
        <p className="mt-6 text-muted-foreground text-base md:text-lg">
          A secure, modern authentication system with OAuth, JWT, role-based
          access, and a futuristic UI.
        </p>

        {/* Buttons */}
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button
            size="lg"
            onClick={() => navigate("/signup")}
            className="rounded-xl px-8"
          >
            Get Started
          </Button>

          <Button
            size="lg"
            variant="outline"
            onClick={() => navigate("/login")}
            className="rounded-xl px-8"
          >
            Login
          </Button>
        </div>

        {/* Features */}
        <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 text-left">
          <Feature title="OAuth Ready" desc="Google & GitHub login out of the box." />
          <Feature title="JWT Secure" desc="Stateless, scalable authentication." />
          <Feature title="RBAC" desc="Role-based access control." />
          <Feature title="Modern UI" desc="Minimal, fast, responsive." />
          <Feature title="Admin Panel" desc="User & role management." />
          <Feature title="Developer First" desc="Built for devs, by devs." />
        </div>

        {/* Footer */}
        <p className="mt-20 text-xs text-muted-foreground">
          Built with ❤️ using React, Spring Boot & OAuth2
        </p>
      </motion.div>
    </div>
  );
};

const Feature = ({ title, desc }: { title: string; desc: string }) => {
  return (
    <div className="rounded-xl border bg-background/40 p-5 backdrop-blur-md hover:shadow-lg transition">
      <h3 className="font-semibold">{title}</h3>
      <p className="mt-1 text-sm text-muted-foreground">{desc}</p>
    </div>
  );
};

export default Home;
