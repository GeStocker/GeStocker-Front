import { routes } from "@/routes/routes";
import Link from "next/link";
import React from "react";
import UserAuth from "./UserAuth";

const Navbar = () => {
  return (
    <header className="border-b bg-background">
      <div className="w-full flex h-16 items-center justify-between px-4 md:px-6">
        <Link href={routes.home} className="flex items-center gap-1 font-bold">
          <img src="logo.png" alt="Logo GeStocker" className="h-6 w-6" />
          <span>GeStocker</span>
        </Link>
        <UserAuth />
      </div>
    </header>
  );
};

export default Navbar;
