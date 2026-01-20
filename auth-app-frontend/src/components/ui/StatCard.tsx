import { motion } from 'framer-motion';

const StatCard = ({ title, value, icon, glow }: any) => {
  const glowMap: any = {
    cyan: "shadow-cyan-500/30",
    purple: "shadow-purple-500/30",
    green: "shadow-green-500/30",
    pink: "shadow-pink-500/30",
  };

  return (
    <motion.div
      whileHover={{ scale: 1.03 }}
      className={`rounded-xl p-6 bg-background/60 backdrop-blur-xl border border-border shadow-xl ${glowMap[glow]}`}
    >
      <div className="flex justify-between items-center">
        <div>
          <p className="text-muted-foreground text-sm">{title}</p>
          <h3 className="text-2xl font-bold mt-1">{value}</h3>
        </div>
        <div className="text-muted-foreground">{icon}</div>
      </div>
    </motion.div>
  );
};

export default StatCard