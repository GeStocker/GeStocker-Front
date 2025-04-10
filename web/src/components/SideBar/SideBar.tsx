"use client";
import { useAuth } from "@/context/AuthContext";
import { useBusiness } from "@/context/BusinessContext";
import { getAllBusiness } from "@/services/user/business";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { BiBarChart } from "react-icons/bi";
import { DiAptana } from "react-icons/di";
import { FiUsers } from "react-icons/fi";
import { toast } from "sonner";
import { Button } from "../ui/button";
import { routes } from "@/routes/routes";
import BusinessSelect from "../BusinessSelect/BusinessSelect";
import { usePathname, useRouter } from "next/navigation";
import InventoryList from "../InventoryList/InventoryList";
import { MdBusinessCenter } from "react-icons/md";
import ChatWidget from "../Chat/ChatWidget";
import { getUserIdFromToken } from "@/helpers/getUserIdFromToken";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../ui/tooltip";

const SideBar = () => {
  const {
    businessId,
    businessList,
    saveBusinessId,
    setBusinessList,
    resetBusiness,
  } = useBusiness();

  const { token, getUserRol } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const rol = getUserRol();
  const [userId, setUserId] = useState("");
  const [isLoading, setIsLoading] = useState(true);


  const getBusinessLimit = () => {
    switch(rol) {
      case "basic": return 1;
      case "professional": return 3;
      case "business": return Infinity; 
      default: return 0;
    }
  };

  const hasReachedBusinessLimit = businessList?.length >= getBusinessLimit();
  
  const getInventoryLimitPerBusiness = () => {
    switch(rol) {
      case "basic": return 1;
      case "professional": return 5;
      case "business": return Infinity; 
      default: return 0;
    }
  };

  const countInventoriesForCurrentBusiness = () => {
    if (!businessId || !businessList || !Array.isArray(businessList)) return 0;
    
    const currentBusiness = businessList.find(business => business.id === businessId);
    return currentBusiness?.inventories?.length || 0;
  };
  
  const currentBusinessInventories = countInventoriesForCurrentBusiness();
  const inventoryLimitPerBusiness = getInventoryLimitPerBusiness(); 
  const hasReachedInventoryLimit = currentBusinessInventories >= inventoryLimitPerBusiness;
  
  const isBusinessRoute = () => {
    return /^\/dashboard\/(business|inventory|createInventory|collaborators|registerCollaborator|statistics|configuration)(\/[^/]+)*$/.test(
      pathname
    );
  };

  useEffect(() => {
    if (isBusinessRoute() && businessId) {
      router.push(`/dashboard/business/${businessId}`);
    }
    setIsLoading(false);
  }, []);

  const fetchBusiness = async () => {
    if (!token || rol === "COLLABORATOR") return;
    try {
      const businessList = await getAllBusiness(token);
      setBusinessList(businessList);

      if (isBusinessRoute()) {
        const storedBusinessId =
          localStorage.getItem("selectedBusinessId") || "";
        if (storedBusinessId && storedBusinessId !== businessId) {
          saveBusinessId(storedBusinessId);
        }
      }
    } catch (e: unknown) {
      if (e instanceof Error) {
        console.warn("Error al traer los negocios:", e.message);
        toast.error(`Error: ${e.message}`);
      } else {
        console.warn("Error al traer los negocios:", e);
        toast.error("Error al traer los negocios");
      }
    }
  };

  useEffect(() => {
    fetchBusiness();
    if (!token) return;
    const user = getUserIdFromToken(token);
    if (user) setUserId(user);
  }, [token]);

  useEffect(() => {
    if (!isBusinessRoute() && businessId) {
      resetBusiness();
    }
  }, [pathname]);

  const handleBusinessChange = async (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const selectedId = e.target.value;
    if (!selectedId) return;

    saveBusinessId(selectedId);
    router.push(`/dashboard/business/${selectedId}`);

    if (pathname?.startsWith("/dashboard/business/")) {
      router.refresh();
    }
  };

  return (
    <>
      {isLoading ? (
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
      ) : (
        <div
          className={`flex flex-col bg-custom-grisClarito w-56 h-screen p-3 shrink-0 ${
            rol === "COLLABORATOR" && "hidden"
          }`}
        >
          <>
            <div className="flex items-center justify-center m-5 h-6">
              <BusinessSelect
                businesses={businessList}
                onChange={handleBusinessChange}
                value={isBusinessRoute() ? businessId || "" : ""}
              />
            </div>
            {rol === "superadmin" && (
              <div className="flex flex-col gap-1 mt-5">
                <h2 className="text-custom-textSubtitle">SUPERADMIN</h2>
                <Link href={`${routes.superadmin}/users`}>
                  <div className="flex items-center gap-2 pl-2">
                    <FiUsers />
                    <h3>Gestion Usuarios</h3>
                  </div>
                </Link>
                <Link href={`${routes.superadmin}/statistics`}>
                  <div className="flex items-center gap-2 pl-2">
                    <BiBarChart />
                    <h3>Record Suscripciones</h3>
                  </div>
                </Link>
              </div>
            )}
            <div className="flex flex-col gap-1 mt-5">
              <h2 className="text-custom-textSubtitle">GENERAL</h2>
              {businessId && (
                <Link href={`/dashboard/business/${businessId}`}>
                  <div className="flex items-center gap-2 pl-2">
                    <MdBusinessCenter />
                    <h3>Volver a Negocio</h3>
                  </div>
                </Link>
              )}
              <InventoryList />
              <Link href={routes.statistics}>
                <div className="flex items-center gap-2 pl-2">
                  <BiBarChart />
                  <h3>Estadísticas</h3>
                </div>
              </Link>
            </div>
            <div className="flex flex-col gap-1 my-5">
              <h2 className="text-custom-textSubtitle">ADMINISTRACION</h2>
              <div className="flex items-center gap-2 pl-2">
                <Link href={routes.collaborators}>
                  <div className="flex items-center gap-2">
                    <FiUsers />
                    <h3>Colaboradores</h3>
                  </div>
                </Link>
              </div>
              <div className="flex items-center gap-2 pl-2">
                <Link href={routes.configuration}>
                  <div className="flex items-center gap-2">
                    <DiAptana />
                    <h3>Configuración</h3>
                  </div>
                </Link>
              </div>
            </div>
            <div className="flex flex-col gap-2 mt-6">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <div>
                    <Link 
                      href={hasReachedBusinessLimit ? "#" : routes.createBusiness}
                      aria-disabled={hasReachedBusinessLimit}
                    >
                      <Button 
                        variant={"outline"} 
                        className="w-full"
                        disabled={hasReachedBusinessLimit}
                      >
                        Agregar Negocio
                      </Button>
                    </Link>
                  </div>
                </TooltipTrigger>
                {hasReachedBusinessLimit && (
                  <TooltipContent>
                    <p>Actualiza tu plan para agregar más negocios</p>
                  </TooltipContent>
                )}
              </Tooltip>
            </TooltipProvider>

            {/* Botón de Agregar Local - temporalmente desactivado hasta tener la data */}
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div>
                      <Button
                        variant="outline"
                        className="w-full"
                        disabled={hasReachedInventoryLimit || !businessId}
                        onClick={() => router.push(routes.createInventory)}
                      >
                        Agregar Local
                      </Button>
                    </div>
                  </TooltipTrigger>
                  {hasReachedInventoryLimit ? (
                    <TooltipContent>
                    <p>Actualiza tu plan para agregar más locales</p>
                  </TooltipContent>
                  ) : !businessId && (
                    <TooltipContent side="right">
                      <p>Primero selecciona o agrega un negocio</p>
                    </TooltipContent>
                  )}
                </Tooltip>
              </TooltipProvider>
          </div>
            <div className="flex-grow"></div>
            <div className="flex border border-foreground p-2 rounded-md my-5 gap-2 ">
              <div>
                <div>{/* <h3 className='text-sm font-bold'>Plan Básico</h3> */}</div>
                <div className="flex flex-col text-xs ">
                  <h4>Conoce sobre:</h4>
                </div>
              </div>
              <div className="flex items-center justify-center ml-auto">
                <Link href={routes.ManagePayment}>
                <button className="flex items-center bg-background text-center text-md h-6 rounded-md p-3 border border-foreground">
                  Gestionar
                </button>
                </Link>
              </div>
            </div>
          </>
        </div>
      )}
      {rol==="COLLABORATOR" && token && userId && <ChatWidget token={token} senderId={userId} />}
    </>
  );
};

export default SideBar;
