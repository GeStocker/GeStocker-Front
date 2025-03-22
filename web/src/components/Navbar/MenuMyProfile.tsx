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
import { useRouter } from "next/navigation";
import { routes } from "@/routes/routes";

const MenuMyProfile = () => {
  const { resetUserData } = useAuth();
  const router = useRouter();

  const onClickCloseSesion = () => {
    resetUserData();
    setTimeout(() => {
      router.push(routes.home);
    }, 500);
  };
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <div className=" border border-gray-950 rounded-full p-1">
          <FaRegUser className="size-6 cursor-pointer" />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="border-1 border-stone-500 px-3 py-1 rounded-md mt-1 bg-white"
      >
        <DropdownMenuLabel className="font-bold">Mi Cuenta</DropdownMenuLabel>
        <div className="border-t border-stone-300 my-1 " />
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
