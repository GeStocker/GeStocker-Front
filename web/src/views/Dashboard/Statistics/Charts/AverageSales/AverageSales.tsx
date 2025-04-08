import React, { useEffect, useState } from "react";
import { getAverageSales } from "@/services/user/metrics";
import { toast } from "sonner";
import { IAverageSales } from "../../Types";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { getAllCategories } from "@/services/user/category";
import { ICategory } from "@/types/interface";
import ProductsPieChart from "./ProductsPieChart/ProductsPieChart";

const AverageSales: React.FC<{
  token: string | null;
  businessId: string | null;
}> = ({ token, businessId }) => {
  const [loading, setLoading] = useState(true);
  const [selectedInventory, setSelectedInventory] = useState<IAverageSales>();
  const [averageSales, setAverageSales] = useState<IAverageSales[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<ICategory | null>(
    null
  );
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [sortBy, setSortBy] = useState<"daily"|"monthly">("daily")

  const fetchAverageSales = async () => {
    if (!token || !businessId) return;
    try {
      const averageSales = await getAverageSales(
        token,
        businessId,
        sortBy,
        selectedCategory?.id ?? undefined,
      );
      if (averageSales) setAverageSales(averageSales);
    } catch (e: unknown) {
      if (e instanceof Error) {
        console.warn("Error al traer las ventas promedio", e.message);
        toast.error(`Error: ${e.message}`);
      } else {
        console.warn("Error al traer las ventas promedio", e);
        toast.error("Error al traer las ventas promedio");
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
    fetchAverageSales();
  }, [token, businessId, selectedCategory, sortBy]);

  useEffect(() => {
      if (averageSales.length === 0) return;
  
      const foundInventory = averageSales.find(
        (inv) => inv.inventoryId === selectedInventory?.inventoryId
      );
  
      if (foundInventory) {
        setSelectedInventory(foundInventory);
      } else {
        // Si no está más (por filtro de categoría, por ejemplo), seleccionamos el primero
        setSelectedInventory(averageSales[0]);
      }
    }, [averageSales]);

  return (<div className=" p-4 border rounded-md my-1 bg-custom-grisClarito">
    <div className="flex justify-between mb-2">
      <div>
        <h2 className="text-xl  font-bold">
          Productos Mayor y Menor Promedio de Ventas
        </h2>
        <h3 className="text-lg text-custom-textGris">
        Los productos con mayor promedio de ventas
        </h3>
      </div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline">
            {selectedInventory?.inventoryName}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          {averageSales.map((inventory) => (
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
          <span className="ml-2">Ordenar por: </span>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">
              {sortBy === "daily" ? "Diario" : "Mensual"}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem onClick={() => setSortBy("daily")}>
              Diario
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setSortBy("monthly")}>
              Mensual
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
    </div>
    {loading || !selectedInventory ? (
      <span className="text-center">Cargando metricas...</span>
    ) : (
      <>
        <ProductsPieChart products={selectedInventory?.topHighAvgSales ?? []} />
        <h3 className="text-lg text-custom-textGris">
          Los productos con menor promedio de ventas
        </h3>
        <ProductsPieChart products={selectedInventory?.topLowAvgSales ?? []} />
      </>
    )}
  </div>)
};


export default AverageSales