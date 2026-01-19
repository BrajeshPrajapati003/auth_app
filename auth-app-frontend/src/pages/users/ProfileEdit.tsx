import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { useNavigate } from "react-router";
import toast from "react-hot-toast";
import useAuth from "@/auth/store";
import { updateUserProfile } from "@/services/UserService";

const ProfileEdit = () => {
  const user = useAuth((state) => state.user);
  const updateUser = useAuth((state) => state.updateUser);
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: user?.name || "",
    image: user?.image || "",
  });

  const [loading, setLoading] = useState(false);

  if (!user) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.name.trim()) {
      toast.error("Name cannot be empty");
      return;
    }

    try {
      setLoading(true);
      const updatedUser = await updateUserProfile(user.id, form);
      updateUser(updatedUser);
      toast.success("Profile updated!");
      navigate("/user/profile");
    } catch (err) {
      toast.error("Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-2xl mt-10">
      <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
        <Card className="bg-background/60 backdrop-blur-xl border shadow-xl">
          <CardContent className="p-8 space-y-6">
            <h1 className="text-2xl font-bold">Edit Profile</h1>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-2">
                <Label>Name</Label>
                <Input
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                />
              </div>

              <div className="space-y-2">
                <Label>Avatar URL</Label>
                <Input
                  name="image"
                  value={form.image}
                  onChange={handleChange}
                />
              </div>

              <div className="space-y-2">
                <Label>Email</Label>
                <Input value={user.email} disabled />
              </div>

              <div className="space-y-2">
                <Label>Provider</Label>
                <Input value={user.provider} disabled />
              </div>

              <div className="flex gap-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => navigate("/user/profile")}
                >
                  Cancel
                </Button>

                <Button
                  type="submit"
                  disabled={loading}
                  className="bg-indigo-600 hover:bg-cyan-500"
                >
                  {loading ? "Saving..." : "Save Changes"}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default ProfileEdit;
