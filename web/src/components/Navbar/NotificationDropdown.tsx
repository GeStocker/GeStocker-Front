import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import React from "react";
import { FaRegBell } from "react-icons/fa6";
import { Button } from "../ui/button";

const NotificationDropdown = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
      <Button variant="outline" size="icon" className="rounded-full">
          <FaRegBell />
      </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="border-1 px-3 py-1 rounded-md mt-1 bg-background w-80"
      >
        <DropdownMenuLabel className="font-semibold">
          Notificaciones
        </DropdownMenuLabel>
        <div className="border-t border-custom-GrisOscuro my-1 " />
        <DropdownMenuItem>
          <span className="text-custom-textGris">No hay notificaciones para mostrar</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default NotificationDropdown;
