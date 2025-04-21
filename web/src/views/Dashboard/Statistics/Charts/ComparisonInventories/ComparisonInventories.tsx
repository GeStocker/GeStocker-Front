"use client";
import { getCompareInventoryPerformance } from "@/services/user/metrics";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { ICompareInventoryPerformance } from "../../Types";
import { FaLongArrowAltDown } from "react-icons/fa";

const ComparisonInventories: React.FC<{
  token: string | null;
  businessId: string | null;
}> = ({ token, businessId }) => {
  const [loading, setLoading] = useState(true);
  const [inventoriesData, setInventoriesData] =
    useState<ICompareInventoryPerformance>();
  const [selectedDays, setSelectedDays] = useState(30);
  const [sortBy, setSortBy] = useState("salesCount");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc");

  const daysOptions = [30, 60, 90, 270, 365];

  const fetchCompareInventories = async () => {
    if (!token || !businessId) return;
    try {
      const inventoryData = await getCompareInventoryPerformance(
        token,
        businessId,
        selectedDays,
        sortBy
      );
      if (inventoryData) setInventoriesData(inventoryData);
    } catch (e: unknown) {
      if (e instanceof Error) {
        console.warn("Error al traer comparativas de inventarios", e.message);
        toast.error(`Error: ${e.message}`);
      } else {
        console.warn("Error al traer comparativas de inventarios", e);
        toast.error("Error al traer comparativas de inventarios");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCompareInventories();
  }, [token, businessId, selectedDays, sortBy, sortDirection]);

  const handleSort = (value: string) => {
    if (sortBy === value) {
      setSortDirection(sortDirection === "desc" ? "asc" : "desc");
    } else {
      setSortBy(value);
      setSortDirection("desc");
    }
  };

  return (
    <div className=" p-4 border rounded-md my-1">
      <div className="flex justify-between">
        <div>
          <h2 className="text-xl  font-bold">Comparativa de los Inventarios</h2>
          <h3 className="text-sm text-custom-textGris">
            Metricas de los inventarios de tu negocio
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
        <span>Inventario</span>
        <div
          onClick={() => handleSort("salesCount")}
          className="cursor-pointer"
        >
          {sortBy === "salesCount" ? (
            <div className={`flex items-center justify-center gap-1 ${
              sortBy === "salesCount" ? "font-semibold" : ""
            }`}
          >
              <span>Total Ventas</span>
              <FaLongArrowAltDown
                className={`transition-all duration-200 ${
                  sortDirection === "asc" ? "rotate-180" : ""
                }`}
              />
            </div>
          ) : (
            <span>Total Ventas</span>
          )}
        </div>
        <div onClick={() => handleSort("lostCost")} className="cursor-pointer">
          {sortBy === "lostCost" ? (
            <div className={`flex items-center justify-center gap-1 ${
              sortBy === "lostCost" ? "font-semibold" : ""
            }`}>
              <span>Total Perdidas</span>
              <FaLongArrowAltDown
                className={`transition-all duration-200 ${
                  sortDirection === "asc" ? "rotate-180" : ""
                }`}
              />
            </div>
          ) : (
            <span>Total Perdidas</span>
          )}
        </div>
        <div
          onClick={() => handleSort("efficiency")}
          className="cursor-pointer"
        >
          {sortBy === "efficiency" ? (
            <div className={`flex items-center justify-center gap-1 ${
              sortBy === "efficiency" ? "font-semibold" : ""
            }`}>
              <span>Eficiencia</span>
              <FaLongArrowAltDown
                className={`transition-all duration-200 ${
                  sortDirection === "asc" ? "rotate-180" : ""
                }`}
              />
            </div>
          ) : (
            <span>Eficiencia</span>
          )}
        </div>
        <div
          onClick={() => handleSort("turnoverRate")}
          className="cursor-pointer"
        >
          {sortBy === "turnoverRate" ? (
            <div className={`flex items-center justify-center gap-1 ${
              sortBy === "turnoverRate" ? "font-semibold" : ""
            }`}>
              <span>Tasa Rotacion</span>
              <FaLongArrowAltDown
                className={`transition-all duration-200 ${
                  sortDirection === "asc" ? "rotate-180" : ""
                }`}
              />
            </div>
          ) : (
            <span>Tasa Rotacion</span>
          )}
        </div>
      </div>

      {loading ? (
        <span className="text-center">Cargando datos...</span>
      ) : inventoriesData && inventoriesData?.results.length > 0 ? (
        sortDirection === "desc" ? (
          inventoriesData?.results.map((inv, index) => {
            return (
              <div
                key={index}
                className="grid grid-cols-5 text-base text-center gap-1 mt-1 border-b border-custom-marronClarito"
              >
                <span>{inv.inventoryName}</span>
                <span>{inv.salesCount}</span>
                <span>{inv.lostCost}</span>
                <span>{inv.efficiency}</span>
                <span>{inv.turnoverRate}</span>
              </div>
            );
          })
        ) : (
          inventoriesData?.results
            .slice()
            .reverse()
            .map((inv, index) => {
              return (
                <div
                  key={index}
                  className="grid grid-cols-5 text-base text-center gap-1 mt-1 border-b border-custom-marronClarito"
                >
                  <span>{inv.inventoryName}</span>
                  <span>{inv.salesCount}</span>
                  <span>{inv.lostCost}</span>
                  <span>{inv.efficiency}</span>
                  <span>{inv.turnoverRate}</span>
                </div>
              );
            })
        )
      ) : (
        <span className="text-center">No hay datos para mostrar</span>
      )}
    </div>
  );
};

export default ComparisonInventories;
