"use client"
import React, { useEffect, useState } from "react";
import { IUserBusiness } from "../types";
import { getUserBusiness } from "@/services/user/superadmin";
import { toast } from "sonner";
import { useAuth } from "@/context/AuthContext";
import { useRouter, useSearchParams } from "next/navigation";
import { routes } from "@/routes/routes";
import ButtonBack from "@/components/ui/ButtonBack";

const UserBusiness:React.FC<{userId: string}>= ({userId}) => {
  const [business, setBusiness] = useState<IUserBusiness[]>([]);
  const [loading, setLoading] = useState(true);
  const { token } = useAuth();
  const searchParams = useSearchParams();
  const userName = searchParams.get('name') || 'Sin nombre';

  const router = useRouter()

  const fetchBusiness = async () => {
    if (!token) return;
    try {
      const business = await getUserBusiness(token, userId);
      setBusiness(business);
    } catch (error) {
        console.warn(error);
        toast.error("No se pudo traer los negocios del usuario");
    } finally {
        setLoading(false);
    }
  };

  const onClickGetInventories = (businessId: string, businessName:string) => {
    router.push(`${routes.superadminDashboard}/products/${businessId}?name=${encodeURIComponent(businessName)}`)
  }

  useEffect(() => {
    fetchBusiness();
  }, [token]);

  return (
    <div className="p-4">
      <div className="flex flex-col">
        <div className="flex justify-between flex-row">
        <div className="mb-6">
          <h1 className="text-4xl font-bold mb-2">{`Negocios de ${userName}`}</h1>
          <h2 className="text-xl text-custom-textGris">
            Todos los Negocios del Usuario
          </h2>
        </div>
        <ButtonBack/>
        </div>
        <div className="grid grid-cols-5 text-lg gap-1 text-center p-2 bg-custom-grisClarito ">
          <span className="text-custom-textSubtitle border-r border-custom-GrisOscuro">
            ID Negocio
          </span>
          <span className="text-custom-textSubtitle border-r border-custom-GrisOscuro">
            Nombre Negocio
          </span>
          <span className="text-custom-textSubtitle border-r border-custom-GrisOscuro">
            Descripcion del Negocio
          </span>
          <span className="text-custom-textSubtitle border-r border-custom-GrisOscuro">
            Productos Asociados al Negocio
          </span>
          <span className="text-custom-textSubtitle ">
            Inventarios Asociados al Negocio
          </span>
        </div>
        {loading ? <span>Cargando lista de negocios</span> : business.length > 0 ? (
          business.map((b) => {
            return (
              <div
                key={b.id}
                className="grid grid-cols-5 text-base gap-1 text-center p-4"
              >
                <span className="break-words">{b.id}</span>
                <span className="break-words">{b.name}</span>
                <span className="break-words">{b.description}</span>
                <span className="break-words">{b.productCount}</span>
                <div onClick={()=>{onClickGetInventories(b.id, b.name)}} className="cursor-pointer">
                <span className="break-words">{b.inventoryCount}</span>
                <br />
                <span className="hover:underline">Ver inventarios</span>
                </div>
              </div>
            );
          })
        ) : (
          <span className="text-center">No hay negocios para mostrar</span>
        )}
      </div>
    </div>
  );
};

export default UserBusiness;
