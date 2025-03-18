"use client";
import Link from "next/link";
import React from "react";
import { CgSpinner } from "react-icons/cg";
import { Button } from "../ui/button";
import { routes } from "@/routes/routes";
import { FaRegBell, FaRegUser } from "react-icons/fa6";

const UserAuth = () => {
  const isAuth = false;

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
        <div className=" border rounded-full p-1">
          <FaRegBell className="size-6 cursor-pointer" />
        </div>
        <div className=" border border-gray-950 rounded-full p-1 ">
          <FaRegUser className="size-6 cursor-pointer" />
        </div>
      </div>
    );
  }
  return (
    <div className="w-2/3 flex h-16 items-center justify-between px-4 md:px-6 ">
      <nav className="hidden gap-6 md:flex">
        <Link href="#" className="text-sm font-medium hover:underline">
          Características
        </Link>
        <Link href="#" className="text-sm font-medium hover:underline">
          Precios
        </Link>
        <Link href="#" className="text-sm font-medium hover:underline">
          Contacto
        </Link>
      </nav>
      <div className="flex gap-4">
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
