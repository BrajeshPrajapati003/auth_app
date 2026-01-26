import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import useAuth from "@/auth/store";
import { setTheme } from "@/utils/theme";
import { deleteMyAccount, logoutUser } from "@/services/AuthService";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { Badge } from "@/components/ui/badge";

const UserSettings = () => {
  const user = useAuth((state) => state.user);

  const navigate = useNavigate();

  const handleDelete = async () => {
    try {
      await deleteMyAccount();
      logoutUser(); // Clear tokens + store
      navigate("/");
    } catch (error) {
      toast.error("Failed to delete account!");
    }
  };

  if (!user) return null;

  return (
    <div className="w-full max-w-3xl mt-10 space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-2xl font-semibold tracking-tight">Settings</h1>
        <p className="text-muted-foreground text-sm">
          Manage your account preferences and security
        </p>
      </motion.div>

      {/* Security */}
      <Card className="bg-background/60 backdrop-blur-xl">
        <CardContent className="p-6 space-y-4">
          <SectionTitle title="Security" />

          {user.provider === "LOCAL" && (
            <SettingRow
              title="Change Password"
              desc="Update your account password"
              action={
                <Button size="sm" variant="outline">
                  Change
                </Button>
              }
            />
          )}

          <SettingRow
            title="Logout from all sessions"
            desc="End all active logins on other devices"
            action={
              <Button size="sm" variant="outline">
                Logout All
              </Button>
            }
          />

          <div className="pt-4 border-t">
            <SettingRow
              title="Delete Account"
              desc="Permanently delete your account"
              action={
                <Button size="sm" variant="destructive" onClick={handleDelete}>
                  Delete
                </Button>
              }
            />
          </div>
        </CardContent>
      </Card>

      {/* Appearance */}
      <Card className="bg-background/60 backdrop-blur-xl">
        <CardContent className="p-6 space-y-4">
          <SectionTitle title="Appearance" />

          <SettingRow
            title="Theme"
            desc="Choose how the app looks"
            action={
              <div className="flex gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => setTheme("light")}
                >
                  Light
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => setTheme("dark")}
                >
                  Dark
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => setTheme("system")}
                >
                  System
                </Button>
              </div>
            }
          />
        </CardContent>
      </Card>

      {/* Status Row */}
      <div className="flex flex-wrap gap-2 items-center justify-center">
        <Badge className="bg-green-500/90 hover:bg-green-500">Active</Badge>
        <Badge variant="secondary">Provider: {user.provider}</Badge>
        <Badge variant="outline">Secure Session</Badge>
      </div>
    </div>
  );
};

const SectionTitle = ({ title }: { title: string }) => (
  <h2 className="text-lg font-medium tracking-tight">{title}</h2>
);

const SettingRow = ({
  title,
  desc,
  action,
}: {
  title: string;
  desc: string;
  action: React.ReactNode;
}) => (
  <div className="flex justify-between items-center gap-4">
    <div>
      <p className="font-medium">{title}</p>
      <p className="text-sm text-muted-foreground">{desc}</p>
    </div>
    {action}
  </div>
);

export default UserSettings;
