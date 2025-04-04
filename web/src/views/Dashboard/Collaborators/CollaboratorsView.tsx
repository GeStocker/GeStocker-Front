"use client";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";
import { routes } from "@/routes/routes";
// import { useBusiness } from "@/context/BusinessContext";
// import { useBusiness } from "@/context/BusinessContext";
import { getCollaboratorsByBusiness } from "@/services/user/collaborator";
import { ICollaborator } from "@/types/interface";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { HiOutlineMagnifyingGlass } from "react-icons/hi2";
import { toast } from "sonner";

const CollaboratorsView = () => {
  const [collaborators, setCollaborators] = useState<ICollaborator[]>([]);
//   const { businessId } = useBusiness();
  const { token } = useAuth();
  const [businessId, setBusinessId] = useState("")

  const fetchCollaborators = async () => {
    if (!businessId || !token) return;
    try {
      const collaborators = await getCollaboratorsByBusiness(token, businessId);
      setCollaborators(collaborators);
    } catch (error) {
      console.warn(error);
      toast.error("No se pudo traer a los colaboradores");
    }
  };

  useEffect(() => {
    const businessId = localStorage.getItem("selectedBusinessId")
    if (businessId) setBusinessId(businessId)
    fetchCollaborators();
  }, [token, businessId]);

  return (
    <div className="p-4">
      <div className="flex justify-between">
        <div className="mb-8">
          <h1 className="text-4xl font-bold">Colaboradores</h1>
          <h2 className="text-xl text-custom-textGris">
            Gestiona los usuarios que tienen acceso al sistema
          </h2>
        </div>
        <Link href={routes.createCollaborator}>
          <Button size="lg">Añadir colaborador</Button>
        </Link>
      </div>
      <div className="p-4 border rounded-md gap-1 flex flex-col">
        <h2 className="text-xl font-bold leading-6 mb-4">
          Lista de colaboradores
        </h2>

        <div className="flex items-center border rounded-md p-2 w-1/3">
          <HiOutlineMagnifyingGlass className="mr-2" />
          <input
            type="text"
            placeholder="Buscar colaborador"
            className="w-full outline-none"
          />
        </div>
        <div className="grid grid-cols-4 text-lg gap-1 text-center p-2 bg-custom-grisClarito ">
          <span className="text-custom-textSubtitle border-r border-custom-GrisOscuro">Colaborador</span>
          <span className="text-custom-textSubtitle border-r border-custom-GrisOscuro">Mail</span>
          <span className="text-custom-textSubtitle border-r border-custom-GrisOscuro">Estado</span>
          <span className="text-custom-textSubtitle">Inventario asignado</span>
        </div>
        {collaborators.length > 0 ? (
          collaborators.map((c) => {
            return (
              <div key={c.id} className="grid grid-cols-4 text-lg gap-1 text-center p-4">
                <span>{c.username}</span>
                <span>{c.email}</span>
                <span className={`text-center font-semibold ${
                    c.isActive ? "text-green-600" : "text-red-600"
                  }`}>{c.isActive ? "Activo" : "Inactivo"}</span>
                <span>{c.inventory.name}</span>
              </div>
            );
          })
        ) : (
          <span className="text-center">No hay colaboradores para mostrar</span>
        )}
      </div>
    </div>
  );
};

export default CollaboratorsView;
