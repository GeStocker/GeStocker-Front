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

const InventoryView = () => {
  const { inventoryId } = useBusiness();
  const { token } = useAuth();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProductsInventory = async () => {
      if (!token || !inventoryId) return;

      try {
        console.log("Obteniendo productos para inventoryId:", inventoryId);
        const productsInventory = await getProductsByInventory(inventoryId, token);
        console.log("Productos del inventario:", productsInventory);
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
  }, [inventoryId, token]);

  const totalProducts = products.length;

  return (
    <div className="p-4 mr-16">
      <section className="flex justify-between items-center mb-10">
        <div className="flex flex-col">
          <h1 className="text-4xl font-semibold text-gray-800">Inventario</h1>
          <h3>Gestiona tus productos y controla tu stock</h3>
        </div>
        <div className="flex">
          <Button className="bg-white text-gray-800 border border-gray-300 mr-2">
            <FiShoppingCart />
            Registrar venta
          </Button>
          <Button>+ Añadir producto</Button>
        </div>
      </section>
      <section className="grid grid-cols-3 gap-4 mb-6">
        <StatCard title="Total de productos" value={totalProducts} description="Cantidad total en inventario" />
      </section>
      <section className="border border-gray-300 rounded-md">
        <div>
          <ProductTableInventory products={products} />
        </div>
      </section>
    </div>
  );
};

export default InventoryView;
