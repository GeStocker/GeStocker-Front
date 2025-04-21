import React, { useEffect, useState } from "react";
import { getInventoryEficiency } from "@/services/user/metrics";
import { toast } from "sonner";
import { IInventoryEfficiency } from "../../Types";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { getAllCategories } from "@/services/user/category";
import { ICategory } from "@/types/interface";
import TopEfficiencyProduct from "./TopEfficiencyProduct/TopEfficiencyProduct";

const InventoryEfficiency: React.FC<{
  token: string | null;
  businessId: string | null;
}> = ({ token, businessId }) => {
  const [loading, setLoading] = useState(true);
  const [selectedInventory, setSelectedInventory] =
    useState<IInventoryEfficiency>();
  const [dataEfficiency, setDataEfficiency] = useState<IInventoryEfficiency[]>(
    []
  );
  const [selectedCategory, setSelectedCategory] = useState<ICategory | null>(
    null
  );
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [selectedDays, setSelectedDays] = useState(30);

  const daysOptions = [30, 60, 90];

  const fetchInventoryEfficiency = async () => {
    if (!token || !businessId) return;
    try {
      const dataEfficiency = await getInventoryEficiency(
        token,
        businessId,
        selectedDays,
        selectedCategory?.id ?? undefined
      );
      if (dataEfficiency) setDataEfficiency(dataEfficiency);
    } catch (e: unknown) {
      if (e instanceof Error) {
        console.warn("Error al traer metricas de eficiencia", e.message);
        toast.error(`Error: ${e.message}`);
      } else {
        console.warn("Error al traer metricas de eficiencia", e);
        toast.error("Error al traer metricas de eficiencia");
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
    fetchInventoryEfficiency();
  }, [token, businessId, selectedCategory, selectedDays]);

  useEffect(() => {
    if (dataEfficiency.length === 0) return;

    const foundInventory = dataEfficiency.find(
      (inv) => inv.inventoryId === selectedInventory?.inventoryId
    );

    if (foundInventory) {
      setSelectedInventory(foundInventory);
    } else {
      setSelectedInventory(dataEfficiency[0]);
    }
  }, [dataEfficiency]);

  return (
    <div className=" p-4 border rounded-md my-1 bg-custom-grisClarito">
      <div className="flex justify-between mb-2">
        <div>
          <h2 className="text-xl  font-bold">Eficiencia del Inventario</h2>
          <h3 className="text-lg text-custom-textGris">
            Los productos con una alta eficiencia
          </h3>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">
              {selectedInventory?.inventoryName}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            {dataEfficiency.map((inventory) => (
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
      {loading || !selectedInventory ? (
        <span className="text-center">Cargando metricas...</span>
      ) : (
        <>
          <TopEfficiencyProduct
            products={selectedInventory?.topHighEfficiency ?? []}
          />
          <h3 className="text-lg text-custom-textGris">
            Los productos con una baja eficiencia
          </h3>
          <TopEfficiencyProduct
            products={selectedInventory.topLowEfficiency ?? []}
          />
        </>
      )}
    </div>
  );
};

export default InventoryEfficiency;
