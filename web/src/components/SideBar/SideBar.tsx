"use client";
import { useAuth } from "@/context/AuthContext";
import { useBusiness } from "@/context/BusinessContext";
import { getAllBusiness } from "@/services/user/business";
import Link from "next/link";
import React, { useEffect } from "react";
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

const SideBar = () => {
  const {
    businessId,
    businessList,
    saveBusinessId,
    setBusinessList,
    resetBusiness,
  } = useBusiness();

  const { token } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  const isBusinessRoute = () => {
    return /^\/dashboard\/(business|inventory|createInventory|collaborators|registerCollaborator|statistics|configuration)(\/[^/]+)*$/.test(
      pathname
    );
  };

  useEffect(() => {
    if (isBusinessRoute() && businessId) {
      router.push(`/dashboard/business/${businessId}`);
    }
  }, []);

  const fetchBusiness = async () => {
    if (!token) return;
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
    <div className="flex flex-col bg-custom-grisClarito w-56 h-screen p-3 shrink-0">
      <div className="flex items-center justify-center m-5 h-6">
        <BusinessSelect
          businesses={businessList}
          onChange={handleBusinessChange}
          value={isBusinessRoute() ? businessId || "" : ""}
        />
      </div>
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
          <h3>Estadisticas</h3>
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
              <h3>Configuracion</h3>
            </div>
          </Link>
        </div>
      </div>
      <div className="flex flex-col gap-2 mt-6">
        <Link href={routes.createBusiness}>
          <Button variant={"outline"} className="w-full">
            Agregar Negocio
          </Button>
        </Link>
        <Link href={routes.createInventory}>
          <Button variant={"outline"} className="w-full">
            Agregar Local
          </Button>
        </Link>
      </div>
      <div className="flex-grow"></div>

      <div className="flex border border-foreground p-2 rounded-md my-5 gap-2 ">
        <div>
          <div>{/* <h3 className='text-sm font-bold'>Plan Básico</h3> */}</div>
          <div className="flex flex-col text-xs ">
            <h4>Renovación:</h4>
            <h4>12/05/2025</h4>
          </div>
        </div>
        <div className="flex items-center justify-center ml-auto">
          <button className="flex items-center bg-background text-center text-md h-6 rounded-md p-3 border border-foreground">
            Gestionar
          </button>
        </div>
      </div>
    </div>
  );
};

export default SideBar;
