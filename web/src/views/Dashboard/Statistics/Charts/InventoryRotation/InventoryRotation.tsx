import React, { useEffect, useState } from "react";
import { getInventoryRotation } from "@/services/user/metrics";
import { toast } from "sonner";
import { IInventoryRotationRate } from "../../Types";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { getAllCategories } from "@/services/user/category";
import { ICategory } from "@/types/interface";
import RotationProduct from "./RotationProduct";

const InventoryRotation: React.FC<{
  token: string | null;
  businessId: string | null;
}> = ({ token, businessId }) => {
  const [loading, setLoading] = useState(true);
  const [selectedInventory, setSelectedInventory] =
    useState<IInventoryRotationRate>();
  const [dataRotation, setDataRotation] = useState<IInventoryRotationRate[]>(
    []
  );
  const [selectedCategory, setSelectedCategory] = useState<ICategory | null>(
    null
  );
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [selectedDays, setSelectedDays] = useState(30);

  const daysOptions = [30, 60, 90];

  const fetchInventoryRotation = async () => {
    if (!token || !businessId) return;
    try {
      const dataRotation = await getInventoryRotation(
        token,
        businessId,
        selectedDays,
        selectedCategory?.id ?? undefined
      );
      if (dataRotation) setDataRotation(dataRotation);
    } catch (e: unknown) {
      if (e instanceof Error) {
        console.warn(
          "Error al traer metricas de rotacion de productos",
          e.message
        );
        toast.error(`Error: ${e.message}`);
      } else {
        console.warn("Error al traer metricas de rotacion de productos", e);
        toast.error("Error al traer metricas de rotacion de productos");
      }
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    if (!token) return;
    try {
      if (!businessId) return;
      const categories = await getAllCategories(businessId, token);
      setCategories(categories);
    } catch (e: unknown) {
      if (e instanceof Error) {
        console.warn("Error al traer las categorias:", e.message);

        toast.error(`Error: ${e.message}`);
      } else {
        console.warn("Error al traer las categorias:", e);
        toast.error("Error al traer las categorias");
      }
    }
  };

  useEffect(() => {
    fetchCategories();
    fetchInventoryRotation();
  }, [token, businessId, selectedCategory, selectedDays]);

  useEffect(() => {
    if (dataRotation.length === 0) return;

    const foundInventory = dataRotation.find(
      (inv) => inv.inventoryId === selectedInventory?.inventoryId
    );

    if (foundInventory) {
      setSelectedInventory(foundInventory);
    } else {
      setSelectedInventory(dataRotation[0]);
    }
  }, [dataRotation]);

  return (
    <div className=" p-4 border rounded-md my-1 bg-custom-grisClarito">
      <div className="flex justify-between mb-2">
        <div>
          <h2 className="text-xl  font-bold">
            Tasa de Rotacion del Inventario
          </h2>
          <h3 className="text-lg text-custom-textGris">
            Productos con mayor tasa de rotación
          </h3>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">
              {selectedInventory?.inventoryName}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            {dataRotation.map((inventory) => (
              <DropdownMenuItem
                key={inventory.inventoryId}
                onClick={() => setSelectedInventory(inventory)}
                className={
                  inventory.inventoryId === selectedInventory?.inventoryId
                    ? "font-bold bg-accent"
                    : ""
                }
              >
                {inventory.inventoryName}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="flex justify-between">
      <div className="mb-4 flex items-center gap-1">
        <DropdownMenu>
          <span>Categoria: </span>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">
              {selectedCategory?.name ?? "Todas"}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem onClick={() => setSelectedCategory(null)}>
              Todas
            </DropdownMenuItem>
            {categories.map((categoria) => (
              <DropdownMenuItem
                key={categoria.id}
                onClick={() => setSelectedCategory(categoria)}
                className={
                  categoria.id === selectedCategory?.id
                    ? "font-bold bg-accent"
                    : ""
                }
              >
                {categoria.name}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
        <DropdownMenu>
          <span className="ml-2">Periodo: </span>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">{`${selectedDays} días`}</Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            {daysOptions.map((days) => (
              <DropdownMenuItem
                key={days}
                onClick={() => setSelectedDays(days)}
                className={days === selectedDays ? "font-bold bg-accent" : ""}
              >
                {days}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
        <div>
          <div>
            <div className="flex items-center gap-1 ">
              <div className="w-3 h-3 rounded-full bg-[#EB5757]" />
              <span className="text-sm">Rotacion Baja</span>
            </div>
          </div>
          <div>
            <div className="flex items-center gap-1 ">
              <div className="w-3 h-3 rounded-full bg-[#F2C94C]" />
              <span className="text-sm">Rotacion Media</span>
            </div>
          </div>
          <div>
            <div className="flex items-center gap-1 ">
              <div className="w-3 h-3 rounded-full bg-[#6FCF97]" />
              <span className="text-sm">Rotacion Alta</span>
            </div>
          </div>
        </div>
        </div>
      {loading || !selectedInventory ? (
        <span className="text-center">Cargando metricas...</span>
      ) : (
        <>
          <RotationProduct products={selectedInventory.topHighRotation ?? []} />
          <h3 className="text-lg text-custom-textGris">
            Los productos con menor tasa de rotación
          </h3>
          <RotationProduct products={selectedInventory?.topLowRotation ?? []} />
        </>
      )}
    </div>
  );
};

export default InventoryRotation;
