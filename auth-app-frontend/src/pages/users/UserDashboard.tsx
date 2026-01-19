import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { ShieldCheck, Activity, Key, User } from "lucide-react";

const UserDashboard = () => {
  return (
    <div className="w-full max-w-5xl mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      <StatCard title="Security Status" value="Strong" icon={<ShieldCheck />} />
      <StatCard title="Active Sessions" value="2" icon={<Activity />} />
      <StatCard title="API Keys" value="3" icon={<Key />} />
      <StatCard title="Profile Complete" value="85%" icon={<User />} />
    </div>
  );
};

const StatCard = ({ title, value, icon }: any) => (
  <motion.div
    whileHover={{ scale: 1.03 }}
    className="bg-background/60 backdrop-blur-xl border shadow-lg rounded-xl p-6"
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

export default UserDashboard;
