"use client";
import MonthlyProfit from "./Charts/MonthlyProfit";
import { useAuth } from "@/context/AuthContext";
import { useBusiness } from "@/context/BusinessContext";
import { useEffect } from "react";
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

  useEffect(() => {}, [token, businessId]);
  return (
    <div className="p-4">
      <h1 className="text-4xl font-bold">Panel de Estadísticas</h1>
      <h2 className="text-xl text-custom-textSubtitle">
        Visualiza las métricas y estadísticas de tu negocio
      </h2>
      {!rol ? (
        <span>Cargando metricas</span>
      ) : (
        <section className="grid grid-cols-2 grid-rows-6 gap-2">
          {(rol === "basic" ||
            rol === "professional" ||
            rol === "business") && (
            <>
              <div>
                <MonthlyProfit token={token} businessId={businessId} />
              </div>
              <div>
                <LowStock token={token} businessId={businessId} />
              </div>
              <div className="col-start-2 row-start-2">
                <WithoutSales token={token} businessId={businessId} />
              </div>
            </>
          )}
          {(rol === "professional" || rol === "business") && (
            <>
              <div className="row-span-2 col-start-1 row-start-2">
                <ProfitMargin token={token} businessId={businessId} />
              </div>
              <div className="row-span-2 col-start-2">
                <AverageSales token={token} businessId={businessId} />
              </div>
              <div className="row-span-2 row-start-4">
                <InventoryEfficiency token={token} businessId={businessId} />
              </div>
            </>
          )}
          {rol === "business" && (
            <>
              <div className="row-span-2 col-start-2 row-start-5">
                <InventoryRotation token={token} businessId={businessId} />
              </div>
              <div className="row-start-6">
                <ComparisonInventories token={token} businessId={businessId} />
              </div>
            </>
          )}
        </section>
      )}
    </div>
  );
};

export default StatisticsView;
