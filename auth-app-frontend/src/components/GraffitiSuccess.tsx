import { motion } from "framer-motion";

export default function GraffitiSuccess({ show }: { show: boolean }) {
  if (!show) return null;

  return (
    <motion.div
      initial={{ scale: 0, rotate: -10, opacity: 0 }}
      animate={{ scale: 1, rotate: 0, opacity: 1 }}
      exit={{ scale: 0, opacity: 0 }}
      transition={{ type: "spring", stiffness: 200, damping: 15 }}
      className="fixed inset-0 flex items-center justify-center z-50 pointer-events-none"
    >
      <div className="relative">
        {/* Glow splashes */}
        <div className="absolute -top-10 -left-10 w-32 h-32 bg-pink-500/40 blur-3xl rounded-full" />
        <div className="absolute top-10 -right-10 w-32 h-32 bg-cyan-400/40 blur-3xl rounded-full" />

        <div className="bg-background/80 backdrop-blur-xl border border-border px-10 py-6 rounded-xl shadow-2xl">
          <h1 className="text-3xl font-extrabold tracking-wider bg-gradient-to-r from-pink-500 to-cyan-400 bg-clip-text text-transparent">
            Account Created!
          </h1>
          <p className="text-center text-muted-foreground mt-2">
            Welcome to the system.
          </p>
        </div>
      </div>
    </motion.div>
  );
}
