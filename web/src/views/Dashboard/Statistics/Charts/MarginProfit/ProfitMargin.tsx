import React, { useEffect, useState } from "react";
import { getProfitMargin } from "@/services/user/metrics";
import { toast } from "sonner";
import { IProfitMargin } from "../../Types";
import TopMarginProduct from "./TopMarginProduct/TopMarginProduct";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { getAllCategories } from "@/services/user/category";
import { ICategory } from "@/types/interface";

const ProfitMargin: React.FC<{
  token: string | null;
  businessId: string | null;
}> = ({ token, businessId }) => {
  const [loading, setLoading] = useState(true);
  const [selectedInventory, setSelectedInventory] = useState<IProfitMargin>();
  const [profitMargin, setProfitMargin] = useState<IProfitMargin[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<ICategory | null>(
    null
  );
  const [categories, setCategories] = useState<ICategory[]>([]);

  const fetchProfitMargin = async () => {
    if (!token || !businessId) return;
    try {
      const profitMargin = await getProfitMargin(
        token,
        businessId,
        selectedCategory?.id ?? undefined,
      );
      if (profitMargin) setProfitMargin(profitMargin);
    } catch (e: unknown) {
      if (e instanceof Error) {
        console.warn("Error al traer el margen de ganancia", e.message);
        toast.error(`Error: ${e.message}`);
      } else {
        console.warn("Error al traer el margen de ganancia", e);
        toast.error("Error al traer el margen de ganancia");
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
    fetchProfitMargin();
  }, [token, businessId, selectedCategory]);

  useEffect(() => {
    if (profitMargin.length === 0) return;

    const foundInventory = profitMargin.find(
      (inv) => inv.inventoryId === selectedInventory?.inventoryId
    );

    if (foundInventory) {
      setSelectedInventory(foundInventory);
    } else {
      setSelectedInventory(profitMargin[0]);
    }
  }, [profitMargin]);

  return (
    <div className=" p-4 border rounded-md my-1 bg-custom-grisClarito">
      <div className="flex justify-between mb-2">
        <div>
          <h2 className="text-xl  font-bold">
            Productos Mayor y Menor Margen de Ganancia
          </h2>
          <h3 className="text-lg text-custom-textGris">
            Los productos con mayor margen de ganancia
          </h3>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">
              {selectedInventory?.inventoryName}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            {profitMargin.map((inventory) => (
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
      </div>
      {loading || !selectedInventory ? (
        <span className="text-center">Cargando metricas...</span>
      ) : (
        <>
          <TopMarginProduct products={selectedInventory?.topHighMargin ?? []} />
          <h3 className="text-lg text-custom-textGris">
            Los productos con menor margen de ganancia
          </h3>
          <TopMarginProduct products={selectedInventory?.topLowMargin ?? []} />
        </>
      )}
    </div>
  );
};

export default ProfitMargin;
