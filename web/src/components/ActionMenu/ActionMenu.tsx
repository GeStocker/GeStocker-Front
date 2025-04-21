"use client";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { IoIosMore } from "react-icons/io";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { deactivateProductBusiness } from "@/services/user/product";
import { useEffect, useState } from "react";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { useAuth } from "@/context/AuthContext";

interface ActionMenuProps {
  product_id: string;
  onEdit: () => void;
  onDelete: () => void;
}

const ActionMenu = ({ product_id,onEdit, onDelete}: ActionMenuProps) => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { token } = useAuth();

  useEffect(() => {
  }, [product_id, token]);

  const handleDeactivate = async () => {
    setIsLoading(true);
    try {
      if (!token) {
        toast.error("No se pudo autenticar. Intenta nuevamente.");
        return;
      }
      await deactivateProductBusiness(product_id, token);
      toast.success("Producto eliminado correctamente");
      onDelete();
      router.refresh();
    } catch (error) {
      console.error("Error al eliminar el producto:", error);
      toast.error("No se pudo eliminar el producto. Intenta nuevamente.");
    } finally {
      setIsLoading(false);
      setIsOpen(false);
    }
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button className="p-2 rounded-full hover:bg-gray-100">
            <IoIosMore className="w-5 h-5" />
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-40">
          <DropdownMenuItem onClick={() => onEdit()}>
            Editar
          </DropdownMenuItem>
          <DropdownMenuItem
            className="text-red-500"
            onClick={() => setIsOpen(true)}
          >
            Eliminar
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Diálogo de confirmación */}
      <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>¿Estás seguro, que deseas eliminar este producto?</AlertDialogTitle>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isLoading}>Cancelar</AlertDialogCancel>
            <AlertDialogAction 
              onClick={handleDeactivate}
              disabled={isLoading}
              className="bg-red-500 hover:bg-red-600"
            >
              {isLoading ? "Eliminando..." : "Eliminar"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default ActionMenu;