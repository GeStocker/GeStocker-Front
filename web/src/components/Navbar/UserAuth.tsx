"use client";
import Link from "next/link";
import React from "react";
import { CgSpinner } from "react-icons/cg";
import { Button } from "../ui/button";
import { routes } from "@/routes/routes";
import { useAuth } from "@/context/AuthContext";
import MenuMyProfile from "./MenuMyProfile";
// import NotificationDropdown from "./NotificationDropdown";
import ModalContacto from "../ModalContact/ModalContact";
import { ToggleTheme } from "../ui/ToggleTheme";

const UserAuth = () => {
  const { isAuth } = useAuth();

  if (isAuth === null) {
    return (
      <div className="animate-spin mr-8">
        <CgSpinner className="size-6" />
      </div>
      
    );
  }
  if (isAuth) {
    return (
      <div className="w-2/3 flex h-16 gap-4 items-center justify-end px-4 md:px-6 ">
        <ToggleTheme/>
        {/* <NotificationDropdown/> */}
        <MenuMyProfile/>
      </div>
    );
  }
  return (
    <div className="w-2/3 flex h-16 items-center justify-between px-6">
      <nav className="hidden gap-6 lg:flex">
        <Link href={routes.productDetails} className="text-sm font-medium hover:underline">
          Características
        </Link>
        <Link href={routes.productDetails} className="text-sm font-medium hover:underline">
          Precios
        </Link>
        <ModalContacto type="text" text="Contacto" className="font-medium"/>
      </nav>
      <div className="flex gap-4 absolute right-2">
      <ToggleTheme/>
        <Link href={routes.login}>
          <Button variant="outline">Iniciar sesión</Button>
        </Link>
        <Link href={routes.register}>
          <Button>Registrarse</Button>
        </Link>
      </div>
    </div>
  );
};

export default UserAuth;
