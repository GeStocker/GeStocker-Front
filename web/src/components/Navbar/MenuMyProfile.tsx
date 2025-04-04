"use client";
import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import { FaRegUser } from "react-icons/fa6";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { routes } from "@/routes/routes";
import { Button } from "../ui/button";

const MenuMyProfile = () => {
  const { resetUserData, userPicture } = useAuth();

  const onClickCloseSesion = () => {
    resetUserData();
    setTimeout(() => {
      window.location.reload();
    }, 500);
  };
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
      <Button variant="outline" size="icon" className="rounded-full">
        {userPicture ? (
          <img
            src={userPicture}
            alt="profile picture"
            className="h-9 w-9 rounded-full border border-custom-GrisOscuro"
          />
        ) : (
            <FaRegUser/>
        )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="border-1 border-custom-casiNegro px-3 py-1 rounded-md mt-1 bg-background"
      >
        <DropdownMenuLabel className="font-bold">Mi Cuenta</DropdownMenuLabel>
        <div className="border-t border-custom-GrisOscuro my-1 " />
        <DropdownMenuItem>
          <Link href={routes.dashboard} className="hover:text-stone-600">
            <span>Perfil</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Link href="#" className="hover:text-stone-600">
            <span>Configuracion</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Link href="#" className="hover:text-stone-600">
            <span>Facturacion</span>
          </Link>
        </DropdownMenuItem>
        <div className="border-t border-stone-300 my-1" />
        <DropdownMenuItem>
          <span
            onClick={onClickCloseSesion}
            className="cursor-pointer hover:text-red-600"
          >
            Cerrar Sesión
          </span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default MenuMyProfile;
