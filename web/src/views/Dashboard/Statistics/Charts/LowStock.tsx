"use client";
import { getLowStockMetrics } from "@/services/user/metrics";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import { ILowStockProduct } from "../Types";

const LowStock: React.FC<{
  token: string | null;
  businessId: string | null;
}> = ({ token, businessId }) => {
  const [loading, setLoading] = useState(true);
  const [lowProducts, setLowProducts] = useState<ILowStockProduct[]>([]);

  const fetchLowStockProducts = async () => {
    if (!token || !businessId) return;
    try {
      const lowProducts = await getLowStockMetrics(token, businessId);
      if (lowProducts) setLowProducts(lowProducts);
    } catch (e: unknown) {
      if (e instanceof Error) {
        console.warn("Error al traer los productos bajos de stock", e.message);
        toast.error(`Error: ${e.message}`);
      } else {
        console.warn("Error al traer los productos bajos de stock", e);
        toast.error("Error al traer los productos bajos de stock");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLowStockProducts();
  }, [token, businessId]);

  return <div className="p-4 border rounded-md my-1">
  <h2 className="text-xl  font-bold">
    Productos Stock Bajo
  </h2>
  <h3 className="text-sm text-custom-textGris">
    Productos con Stock Bajo 
  </h3>
  <div className="grid grid-cols-5 text-center text-base gap-1 bg-custom-grisClarito mt-4 items-center border border-custom-marronClarito">
    <span>Producto</span>
    <span>Stock Actual</span>
    <span>Inventario</span>
    <span>Stock requerido</span>
    <span>Demanda Semanal</span>
  </div>

    {loading ? <span className="text-center">Cargando productos...</span> : lowProducts.length > 0 ?
      lowProducts.map((p, index) => {
        return (
          <div key={index} className="grid grid-cols-5 text-base text-center gap-1 mt-1 border-b border-custom-marronClarito">
            <span>{p.productName}</span>
            <span>{p.currentStock}</span>
            <span>{p.inventoryName}</span>
            <span>{p.requiredStock}</span>
            <span>{p.weeklyDemand}</span>
          </div>
        );
      }) : <span className="text-center">No hay productos para mostrar</span>}

</div>;
};

export default LowStock;
