"use client";
import { getProductsWithoutSales } from "@/services/user/metrics";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import { IProductsWithoutSales } from "../Types";
import { format } from "date-fns";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

const WithoutSales: React.FC<{
  token: string | null;
  businessId: string | null;
}> = ({ token, businessId }) => {
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState<IProductsWithoutSales[]>([]);
  const [selectedDays, setSelectedDays] = useState(90);

  const daysOptions = [90, 7, 14, 30, 60, 180, 365];

  const fetchProductsWithoutSales = async () => {
    if (!token || !businessId) return;
    try {
      const products = await getProductsWithoutSales(token, businessId, selectedDays);
      if (products) setProducts(products);
    } catch (e: unknown) {
      if (e instanceof Error) {
        console.warn("Error al traer los productos sin ventas", e.message);
        toast.error(`Error: ${e.message}`);
      } else {
        console.warn("Error al traer los productos sin ventas", e);
        toast.error("Error al traer los productos sin ventas");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProductsWithoutSales();
  }, [token, businessId, selectedDays]);

  return (
    <div className=" p-4 border rounded-md my-1">
      <div className="flex justify-between">
        <div>
          <h2 className="text-xl  font-bold">Productos Menos Vendidos</h2>
          <h3 className="text-sm text-custom-textGris">
            Productos con menor volúmen de ventas en el último perido
          </h3>
        </div>
        <DropdownMenu>
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
      <div className="grid grid-cols-5 text-center text-base gap-1 bg-custom-grisClarito mt-4 items-center border border-custom-marronClarito">
        <span>Producto</span>
        <span>Stock Actual</span>
        <span>Inventario</span>
        <span>Ultima Venta</span>
        <span>Total de Ventas</span>
      </div>

      {loading ? (
        <span className="text-center">Cargando productos...</span>
      ) : products.length > 0 ? (
        products.map((p, index) => {
          return (
            <div
              key={index}
              className="grid grid-cols-5 text-base text-center gap-1 mt-1 border-b border-custom-marronClarito"
            >
              <span>{p.productName}</span>
              <span>{p.currentStock}</span>
              <span>{p.inventoryName}</span>
              <div>
                <span>{format(new Date(p.lastSaleDate), "yyyy-MM-dd")}</span>
                <br />
                <span>{`(${p.daysWithoutSales} días)`}</span>
              </div>    
              <span>{p.totalSales}</span>
            </div>
          );
        })
      ) : (
        <span className="text-center">No hay productos para mostrar</span>
      )}
    </div>
  );
};

export default WithoutSales;
