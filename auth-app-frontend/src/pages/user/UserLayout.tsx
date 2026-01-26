import useAuth from "@/auth/store";
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

const UserLayout = () => {
  const user = useAuth((state) => state.user);
  const checkLogin = useAuth((state) => state.checkLogin);
  const navigate = useNavigate();

  if (!user) return null;

  const getGreeting = (name?: string) => {
    const hour = new Date().getHours();
    const base = name ? `, ${name}` : "";

    if (hour < 12) return `Good morning${base} 🌅`;
    if (hour < 18) return `Good afternoon${base} ☀️`;
    return `Good evening${base} 🌙`;
  };

  if (!checkLogin()) return <Navigate to={"/login"} />;

  return (
    <div className="p-10 flex flex-col items-center gap-8">
      
      {/* Header Section */}
      <div className="flex flex-col gap-4 items-center text-center">
        {/* Greeting */}
        <div className="flex flex-col gap-1">
          <h1 className="text-2xl md:text-3xl font-semibold tracking-tight">
            {getGreeting(user.name)}
          </h1>
          <p className="text-sm text-muted-foreground">
            Welcome to your dashboard
          </p>
        </div>

        {/* Status Row */}
        {/* <div className="flex flex-wrap gap-2 items-center justify-center">
          <Badge className="bg-green-500/90 hover:bg-green-500">
            Active
          </Badge>
          <Badge variant="secondary">
            Provider: {user.provider}
          </Badge>
          <Badge variant="outline">
            Secure Session
          </Badge>
        </div> */}

        {/* Quick Actions */}
        <div className="flex flex-wrap gap-3 mt-2">
          <Button
            size="sm"
            variant="outline"
            onClick={() => navigate("/user/edit")}
          >
            Edit Profile
          </Button>

          <Button
            size="sm"
            variant="outline"
            onClick={() => navigate("/user/security")}
          >
            Security
          </Button>

          <Button
            size="sm"
            variant="outline"
            onClick={() => navigate("/user/settings")}
          >
            Settings
          </Button>
        </div>
      </div>

      {/* Child routes render here */}
      <Outlet />
    </div>
  );
};

export default UserLayout;
