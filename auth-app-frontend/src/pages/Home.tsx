import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function Home() {
  return (
    <div className="bg-background text-foreground transition-colors duration-300">
      {/* HERO */}
      <section className="min-h-screen flex flex-col justify-center items-center text-center px-6">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-5xl md:text-7xl font-bold tracking-tight"
        >
          Next-Gen Authentication
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="mt-6 max-w-2xl text-muted-foreground"
        >
          Secure, fast, and frictionless authentication for modern applications.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="mt-10 flex gap-4"
        >
          <Button size="lg">Get Started</Button>
          <Button size="lg" variant="outline">
            View Demo
          </Button>
        </motion.div>
      </section>

      {/* FEATURES */}
      <section className="py-24 px-6">
        <h2 className="text-4xl font-bold text-center">Features</h2>

        <div className="mt-16 grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
          {[
            ["Multi-Factor Auth", "Extra layers of security"],
            ["JWT Tokens", "Stateless & scalable"],
            ["RBAC", "Fine-grained permissions"],
            ["Session Control", "Manage logins in real-time"],
          ].map(([title, desc], i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <Card className="backdrop-blur-xl">
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold">{title}</h3>
                  <p className="mt-2 text-muted-foreground">{desc}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="py-24 px-6 bg-muted/50 rounded-sm">
        <h2 className="text-4xl font-bold text-center">How It Works</h2>

        <div className="mt-16 grid md:grid-cols-3 gap-10 max-w-6xl mx-auto text-center">
          {["Sign Up", "Verify", "Secure Access"].map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.2 }}
            >
              <h3 className="text-xl font-semibold">{step}</h3>
              <p className="mt-2 text-muted-foreground">
                Simple, fast, and secure.
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-6 text-center">
        <motion.h2
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="text-4xl font-bold"
        >
          Start Securing Your App Today
        </motion.h2>

        <p className="mt-4 text-muted-foreground">
          Trusted by developers worldwide.
        </p>

        <div className="mt-8">
          <Button size="lg" className="bg-gradient-to-br from bg-cyan-500 via-cyan-500 to-blue-300">Create Free Account</Button>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-10 text-center text-muted-foreground">
        © {new Date().getFullYear()} Auth App. All rights reserved.
      </footer>
    </div>
  );
}
