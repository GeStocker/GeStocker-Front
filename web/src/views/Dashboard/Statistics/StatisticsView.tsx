"use client";
import MonthlyProfit from "./Charts/MonthlyProfit";
import { useAuth } from "@/context/AuthContext";
import { useBusiness } from "@/context/BusinessContext";
import { useEffect } from "react";
import LowStock from "./Charts/LowStock";
import WithoutSales from "./Charts/WithoutSales";
import ProfitMargin from "./Charts/MarginProfit/ProfitMargin";
import AverageSales from "./Charts/AverageSales/AverageSales";

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
        <section className="w-full p-4 grid grid-cols-2 gap-4 items-start">
          {(rol === "basic" ||
            rol === "professional" ||
            rol === "business") && (
            <>
              <LowStock token={token} businessId={businessId} />
              <WithoutSales token={token} businessId={businessId} />
              <MonthlyProfit token={token} businessId={businessId} />
            </>
          )}
          {(
            rol === "professional" ||
            rol === "business") && (
            <>
          <ProfitMargin token={token} businessId={businessId} />
          <AverageSales token={token} businessId={businessId} />
          </>)}
        </section>
      )}
    </div>
  );
};

export default StatisticsView;
