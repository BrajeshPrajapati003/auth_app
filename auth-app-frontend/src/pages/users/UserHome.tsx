import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ShieldCheck, Activity, Key, User } from "lucide-react";
import { useState, type ReactNode } from "react";
import { getCurrentUser } from "@/services/AuthService";
import useAuth from "@/auth/store";
import type UserT from '@/models/User'
import toast from "react-hot-toast";

const UserHome = () => {

  const user = useAuth(state => state.user);
  const [user1, setUser1] = useState<UserT | null>(null);

  const getUserData = async()=>{
    try {
      const user1 = await getCurrentUser(user?.email);

      setUser1(user1);
      toast.success("You are able to access secured APIs");
    } catch (error) {
      console.log(error);
      toast.error("Error in getting data");
    }
  }

  return (
    <div className="w-full max-w-5xl mx-auto px-4 py-10 space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4"
      >
        <div>
          <h1 className="text-2xl font-semibold">Welcome back 👋</h1>
          <p className="text-muted-foreground text-sm mt-1">
            Manage your account, security, and activity from here.
          </p>
        </div>
        <Button>Update Profile</Button>
      </motion.div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <StatCard title="Security" value="Strong" icon={<ShieldCheck />} />
        <StatCard title="Active Sessions" value={2} icon={<Activity />} />
        <StatCard title="API Keys" value={3} icon={<Key />} />
        <StatCard title="Profile" value="85%" icon={<User />} />
      </div>

      {/* Simple CTA */}
      <div className="text-center">
          <Button variant="outline" onClick={()=> getUserData()}>Get current user</Button>
          <p>{user1?.name}</p>
        </div>

    </div>
  );
};

// ✅ Properly typed props
interface StatCardProps {
  title: string;
  value: string | number;
  icon: ReactNode;
}

const StatCard = ({ title, value, icon }: StatCardProps) => (
  <motion.div
    whileHover={{ y: -4 }}
    transition={{ type: "spring", stiffness: 300 }}
  >
    <Card className="h-full">
      <CardContent className="p-5 flex justify-between items-center">
        <div>
          <p className="text-muted-foreground text-sm">{title}</p>
          <h3 className="text-xl font-semibold mt-1">{value}</h3>
        </div>
        <div className="text-muted-foreground">{icon}</div>
      </CardContent>
    </Card>
  </motion.div>
);

export default UserHome;