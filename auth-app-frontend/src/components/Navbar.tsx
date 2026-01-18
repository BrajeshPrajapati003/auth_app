import React from "react";
import { Button } from "./ui/button";
import { NavLink } from "react-router";

const Navbar = () => {
  return (
    <nav className="flex flex-col gap-4 md:flex-row md:gap-0 md:h-14 py-5 md:py-0 border dark:border-b border-gray-700 justify-around items-center">
      {/* brand */}
      <div className="font-semibold">
        <span className="inline-block text-center mr-1 h-6 w-6 rounded-md bg-gradient-to-br from-primary to-primary/40">
          {"A"}
        </span>
        <span className="text-base tracking-tight">Auth App</span>
      </div>

      <div className="flex gap-4 items-center">
        <NavLink to={"/"}>Home</NavLink>
        <NavLink to={"/login"}>
          <Button variant={"outline"} size={"sm"} className="cursor-pointer">
            Login
          </Button>
        </NavLink>
        <NavLink to={"/signup"}>
          <Button variant={"outline"} size={"sm"} className="cursor-pointer">
            Signup
          </Button>
        </NavLink>
      </div>
    </nav>
  );
};

export default Navbar;
