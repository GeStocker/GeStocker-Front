"use client";
import MonthlyProfit from "./Charts/MonthlyProfit";
import { useAuth } from "@/context/AuthContext";
import { useBusiness } from "@/context/BusinessContext";
import { useEffect, useState } from "react";
import LowStock from "./Charts/LowStock";
import WithoutSales from "./Charts/WithoutSales";
import ProfitMargin from "./Charts/MarginProfit/ProfitMargin";
import AverageSales from "./Charts/AverageSales/AverageSales";
import InventoryEfficiency from "./Charts/InventoryEfficiency/InventoryEfficiency";
import InventoryRotation from "./Charts/InventoryRotation/InventoryRotation";
import ComparisonInventories from "./Charts/ComparisonInventories/ComparisonInventories";

export const months = [
  "Enero",
  "Febrero",
  "Marzo",
  "Abril",
  "Mayo",
  "Junio",
  "Julio",
  "Agosto",
  "Septiembre",
  "Octubre",
  "Noviembre",
  "Diciembre",
];

const StatisticsView = () => {
  const { token, getUserRol } = useAuth();
  const { businessId } = useBusiness();
  const rol = getUserRol();
  const [loading, setLoading] = useState(true)

  useEffect(() => {setLoading(false)}, [token, businessId]);
  return (
    <div className="p-4">
      <h1 className="text-4xl font-bold">Panel de Estadísticas</h1>
      <h2 className="text-xl text-custom-textSubtitle">
        Visualiza las métricas y estadísticas de tu negocio
      </h2>
      {loading ? <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div> : !businessId ? (
        <span>Selecciona un negocio</span>
      ) : !rol ? (
        <span>Cargando metricas</span>
      ) : (
        <section className="grid lg:grid-cols-2 lg:grid-rows-6 gap-2">
          {(rol === "basic" ||
            rol === "professional" ||
            rol === "business" ||
            rol === "superadmin") && (
            <>
              <div>
                <MonthlyProfit token={token} businessId={businessId} />
              </div>
              <div>
                <LowStock token={token} businessId={businessId} />
              </div>
              <div className="lg:col-start-2 lg:row-start-2 text-xl">
                <WithoutSales token={token} businessId={businessId} />
              </div>
            </>
          )}
          {(rol === "professional" ||
            rol === "business" ||
            rol === "superadmin") && (
            <>
              <div className="lg:row-span-2 lg:col-start-1 lg:row-start-2">
                <ProfitMargin token={token} businessId={businessId} />
              </div>
              <div className="lg:row-span-2 lg:col-start-2">
                <AverageSales token={token} businessId={businessId} />
              </div>
              <div className="lg:row-span-2 lg:row-start-4">
                <InventoryEfficiency token={token} businessId={businessId} />
              </div>
            </>
          )}
          {rol === "business" ||
            (rol === "superadmin" && (
              <>
                <div className="lg:row-span-2 lg:col-start-2 lg:row-start-5">
                  <InventoryRotation token={token} businessId={businessId} />
                </div>
                <div className="lg:row-start-6">
                  <ComparisonInventories
                    token={token}
                    businessId={businessId}
                  />
                </div>
              </>
            ))}
        </section>
      )}
        {/* <div className="flex flex-col items-center text-center">{rol === "basic" && (
          <div>
            <div className=" flex-grow h-px bg-custom-GrisOscuro"></div>
            <span className="text-custom-GrisOscuro">
              Amplia tu plan para ver todas las estadísticas
            </span>
            <MdLock size={20} />
            <div className=" flex-grow h-px bg-custom-GrisOscuro"></div>
          </div>
        )}
        {rol === "professional" && (
          <div>
            <div className=" flex-grow h-px bg-custom-GrisOscuro"></div>
            <span className="text-custom-GrisOscuro text-xl">
              Amplia tu plan para ver todas las estadísticas
            </span>
            <MdLock size={20} />
            <div className=" flex-grow h-px bg-custom-GrisOscuro"></div>
          </div>
        )}
        </div> */}
    </div>
  );
};

export default StatisticsView;
