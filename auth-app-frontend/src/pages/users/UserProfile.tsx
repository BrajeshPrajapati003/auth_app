import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import useAuth from "@/auth/store";
import { useNavigate } from "react-router";

const Profile = () => {
  const user = useAuth((state) => state.user);
  const navigate = useNavigate();

  if (!user) return null;

  return (
    <div className="w-full max-w-3xl mt-10">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <Card className="bg-background/60 backdrop-blur-xl border shadow-xl">
          <CardContent className="p-8 space-y-6">
            {/* Header */}
            <div className="flex justify-between items-center">
              <h1 className="text-2xl font-bold">User Profile</h1>
              <Button onClick={() => navigate("/user/profile/edit")}>
                Edit
              </Button>
            </div>

            {/* Avatar */}
<div className="flex items-center gap-4">
  {user.image ? (
    <img
      src={user.image}
      alt="Profile"
      className="h-20 w-20 rounded-full object-cover border shadow hover:shadow-cyan-500/40 transition"

    />
  ) : (
    <div className="h-20 w-20 rounded-full bg-gradient-to-br from-indigo-500 to-cyan-400 flex items-center justify-center text-white text-2xl font-bold">
      {user.name?.charAt(0)?.toUpperCase() || "U"}
    </div>
  )}

  <div>
    <h2 className="text-xl font-semibold">
      {user.name || "Unnamed User"}
    </h2>
    <p className="text-muted-foreground">{user.email}</p>
  </div>
</div>


            {/* Info Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Info label="User ID" value={user.id} />
              <Info label="Provider" value={user.provider} />
              <Info label="Provider ID" value={user.providerId || "N/A"} />
              <Info
                label="Account Status"
                value={
                  user.enable ? (
                    <Badge className="bg-green-500">Active</Badge>
                  ) : (
                    <Badge variant="destructive">Disabled</Badge>
                  )
                }
              />
              <Info
                label="Created At"
                value={formatDate(user.createdAt)}
              />
              <Info
                label="Updated At"
                value={formatDate(user.updatedAt)}
              />
            </div>

            {/* Roles */}
            {user.roles && user.roles.length > 0 && (
              <div>
                <p className="text-sm text-muted-foreground mb-2">Roles</p>
                <div className="flex flex-wrap gap-2">
                  {user.roles.map((role) => (
                    <Badge key={role.name}>{role.name}</Badge>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

const Info = ({ label, value }: any) => (
  <div className="flex flex-col gap-1">
    <span className="text-xs text-muted-foreground">{label}</span>
    <span className="text-sm font-medium break-all">{value}</span>
  </div>
);

const formatDate = (date?: string) => {
  if (!date) return "N/A";
  return new Date(date).toLocaleString();
};

export default Profile;
