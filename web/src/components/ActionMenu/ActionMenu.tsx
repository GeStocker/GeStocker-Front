"use client"
import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuItem,
  } from "@/components/ui/dropdown-menu";
  import { IoIosMore } from "react-icons/io";

  interface ActionMenuProps {
    onEdit: () => void; 
  }
  
const ActionMenu =({ onEdit }: ActionMenuProps) => {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button className="p-2 rounded-full hover:bg-gray-100">
            <IoIosMore className="w-5 h-5" />
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-40">
          <DropdownMenuItem  onClick={onEdit}>
            Editar
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => console.log("Duplicar")}>
            Duplicar
          </DropdownMenuItem>
          <DropdownMenuItem
            className="text-red-500"
            onClick={() => console.log("Eliminar")}
          >
            Eliminar
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }
  
  export default ActionMenu;
  