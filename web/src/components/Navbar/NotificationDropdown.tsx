import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import React from "react";
import { FaRegBell } from "react-icons/fa6";

const NotificationDropdown = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <div className=" border rounded-full p-1">
          <FaRegBell className="size-6 cursor-pointer" />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="border-1 border-stone-500 px-3 py-1 rounded-md mt-1 bg-white w-80"
      >
        <DropdownMenuLabel className="font-semibold">
          Notificaciones
        </DropdownMenuLabel>
        <div className="border-t border-stone-300 my-1 " />
        <DropdownMenuItem>
          <span className="text-custom-textGris">No hay notificaciones para mostrar</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default NotificationDropdown;
