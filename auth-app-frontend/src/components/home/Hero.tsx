// components/home/Hero.tsx
import { Button } from "@/components/ui/button";

export default function Hero() {
  return (
    <section className="min-h-screen flex flex-col justify-center items-center text-center px-6 bg-gradient-to-br from-black via-zinc-900 to-indigo-950 text-white">
      <h1 className="text-5xl md:text-7xl font-bold tracking-tight">
        Secure. Seamless. Smart Authentication.
      </h1>

      <p className="mt-6 max-w-2xl text-zinc-400">
        Experience next-gen authentication with multi-factor security, lightning-fast login, and zero friction.
      </p>

      <div className="mt-10 flex gap-4">
        <Button size="lg">Get Started</Button>
        <Button size="lg" variant="outline">
          View Demo
        </Button>
      </div>
    </section>
  );
}
