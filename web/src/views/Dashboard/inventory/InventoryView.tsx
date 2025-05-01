"use client";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { FiShoppingCart } from "react-icons/fi";
import StatCard from "@/components/StatCard/StatCard";
import ProductTableInventory from "@/components/ProductTable/ProductTableInventory";
import { useBusiness } from "@/context/BusinessContext";
import { useAuth } from "@/context/AuthContext";
import { getProductsByInventory } from "@/services/user/inventory_product";
import { toast } from "sonner";
import { IStockProduct } from "@/types/interface";
import Link from "next/link";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

const InventoryView = () => {
  const { inventoryId, inventories} = useBusiness();
  const { token } = useAuth();
  const [products, setProducts] = useState<IStockProduct[]>([]);
  const [filters, setFilters] = useState({
    search: "",
    categoryIds: [],
  });
  const { saveBusinessId, businessId } = useBusiness();

  useEffect(() => {
    const business = localStorage.getItem("selectedBusinessId");
    if (business) saveBusinessId(business);
    const fetchProductsInventory = async () => {
      if (!token || !inventoryId) return;
      try {
        const productsInventory = await getProductsByInventory(
          inventoryId,
          token,
          filters
        );
        setProducts(productsInventory);
      } catch (e: unknown) {
        if (e instanceof Error) {
          console.warn("Error al traer los productos:", e.message);
          toast.error(`Error: ${e.message}`);
        } else {
          console.warn("Error al traer los productos:", e);
          toast.error("Error al traer los productos");
        }
      }
    };

    fetchProductsInventory();
  }, [inventoryId, token, filters, businessId]);

  const handleSearchChange = (value: string): void => {
        setFilters({ ...filters, search: value });
      };
    
  const currentInventory = inventories.find(inv => inv.id === inventoryId) || inventories[0];

  const totalProducts = products.length;
  const outOfStockProducts = products.filter((p) => p.stock <= 0).length;
  const totalInventoryValue = products
    .reduce((sum, product) => sum + (Number(product.price) * Number(product.stock)), 0)
    .toLocaleString('es-ES', { style: 'currency', currency: 'USD' });

  return (
    <div className="p-4 mr-16">
      <section className="flex flex-wrap gap-3 justify-between items-center mb-10">
        <div className="flex flex-col">
        <h1 className="text-4xl font-semibold text-custom-casiNegro">Inventario del {currentInventory?.name || "sin nombre"}</h1>
          <h3>Gestiona tus productos y controla tu stock</h3>
        </div>
        <div className="flex gap-4">
          <Link href={"/dashboard/inventory/sellProducts"}>
            <Button variant="outline">
              <FiShoppingCart />
              Registrar venta
            </Button>
          </Link>
          <Link href={"/dashboard/inventory/createProduct"}>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button className="flex">
                    + Añadir productos
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Añadir productos al inventario</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </Link>
        </div>
      </section>
      <section className="grid md:grid-cols-3 gap-4 mb-6">
        <StatCard
          title="Total de productos"
          value={totalProducts}
          description="Cantidad total en inventario"
        />
        <StatCard
          title="Productos sin stock"
          value={outOfStockProducts}
          description="Productos agotados"
        />
        <StatCard
          title="Valor del inventario"
          value={totalInventoryValue}
          description="Total valor del stock"
        />
      </section>
      <section className="border border-custom-grisClarito rounded-md">
        <div>
          <ProductTableInventory
            products={products}
            onSearchChange={handleSearchChange}
            searchValue={filters.search}
          />
        </div>
      </section>
    </div>
  );
};

export default InventoryView;
