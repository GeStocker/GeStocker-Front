"use client"
import React, { useEffect, useState } from "react";
import { IBusinessProduct } from "../types";
import { getBusinessProducts } from "@/services/user/superadmin";
import { toast } from "sonner";
import { useAuth } from "@/context/AuthContext";
import ButtonBack from "@/components/ui/ButtonBack";
import { useSearchParams } from "next/navigation";

const BusinessProducts:React.FC<{businessId: string}>= ({businessId}) => {
  const [products, setProducts] = useState<IBusinessProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const { token } = useAuth();
  const searchParams = useSearchParams();
    const businessName = searchParams.get('name') || 'Sin nombre';

  const fetchProducts = async () => {
    if (!token) return;
    try {
      const products = await getBusinessProducts(token, businessId);
      setProducts(products);
    } catch (error) {
        console.warn(error);
        toast.error("No se pudo traer los productos del negocio");
    } finally {
        setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [token]);

  return (
    <div className="p-4">
      <div className="flex flex-col">
        <div className="flex justify-between flex-row">
        <div className="mb-6">
          <h1 className="text-4xl font-bold mb-2">{`Productos de ${businessName}`}</h1>
          <h2 className="text-xl text-custom-textGris">
            Todos los Productos del Negocio
          </h2>
        </div>
        <ButtonBack/>
        </div>
        <div className="grid grid-cols-3 text-lg gap-1 text-center p-2 bg-custom-grisClarito ">
          <span className="text-custom-textSubtitle border-r border-custom-GrisOscuro">
            ID Producto
          </span>
          <span className="text-custom-textSubtitle border-r border-custom-GrisOscuro">
            Nombre Producto
          </span>
          <span className="text-custom-textSubtitle">
            Descripcion del Producto
          </span>
        </div>
        {loading ? <span>Cargando lista de productos</span> : products.length > 0 ? (
          products.map((p) => {
            return (
              <div
                key={p.id}
                className="grid grid-cols-3 text-base gap-1 text-center p-4"
              >
                <span className="break-words">{p.id}</span>
                <span className="break-words">{p.name}</span>
                <span className="break-words">{p.description}</span>
              </div>
            );
          })
        ) : (
          <span className="text-center">No hay productos para mostrar</span>
        )}
      </div>
    </div>
  );
};

export default BusinessProducts;
