import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import useAuth from "@/auth/store";


const NavItem = ({ to, label }: { to: string; label: string }) => (
  <NavLink
    to={to}
    className="relative group px-2 py-1 text-sm text-muted-foreground hover:text-foreground transition-colors"
  >
    <span className="relative z-10">{label}</span>

    {/* Hover underline */}
    <span
      className="
        absolute left-0 -bottom-1 h-[2px] w-0 
        bg-cyan-500 
        transition-all duration-300 
        group-hover:w-full
      "
    />
  </NavLink>
);

const Navbar = () => {

  const checkLogin = useAuth((state) => state.checkLogin);
  const user = useAuth((state) => state.user);
  const logout = useAuth((state) => state.logout);
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = async ()=> {
    await logout();
    navigate("/", {
      replace: true,
      state: {from: location.pathname},
    });
  };

  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="sticky top-0 z-50 backdrop-blur-xl bg-background/70 border-b border-border shadow-sm"
    >
      <div className="flex flex-col gap-4 md:flex-row md:gap-0 md:h-14 py-5 md:py-0 justify-between items-center px-6">
        {/* Brand */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="flex items-center gap-2 cursor-pointer select-none"
        >
          <img src="/auth-app-logo.svg" className="h-8 w-8" alt="Auth App" />

          <a href="/" className="text-base tracking-tight font-semibold">
            Auth App
          </a>
        </motion.div>

        {/* Links */}
        {checkLogin() ? (
          <div className="flex gap-4 items-center">
            <NavLink to={"/user"}>{user?.name}</NavLink>

            <Button
              size="sm"
              className="bg-gradient-to-r from-indigo-600 to-cyan-500 hover:from-cyan-500 hover:to-indigo-600 transition-all shadow-md hover:shadow-cyan-500/40"
              onClick={()=> {
                handleLogout();
              }}
            >
              Logout
            </Button>
        </div>
        ) : <>
        <div className="flex gap-4 items-center">
          <NavItem to="/" label="Home" />
          
          <NavLink to="/login">
            <Button
              variant="outline"
              size="sm"
              className="transition-all hover:scale-105 hover:shadow-md"
            >
              Login
            </Button>
          </NavLink>

          <NavLink to="/signup">
            <Button
              size="sm"
              className="bg-gradient-to-r from-indigo-600 to-cyan-500 hover:from-cyan-500 hover:to-indigo-600 transition-all shadow-md hover:shadow-cyan-500/40"
            >
              Signup
            </Button>
          </NavLink>
        </div>
        </>}
      </div>
    </motion.nav>
  );
};

export default Navbar;
