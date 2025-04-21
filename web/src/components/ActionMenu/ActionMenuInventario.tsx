"use client";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { IoIosMore } from "react-icons/io";

interface ActionMenuProps {
  product_id: string;
    onEdit: () => void;
}

const ActionMenu = ({ product_id, onEdit }: ActionMenuProps) => {
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button className="p-2 rounded-full hover:bg-gray-100">
            <IoIosMore className="w-5 h-5" />
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-40">
          <DropdownMenuItem onClick={() => console.log(onEdit, product_id)}>
            Editar
            </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};

export default ActionMenu;
