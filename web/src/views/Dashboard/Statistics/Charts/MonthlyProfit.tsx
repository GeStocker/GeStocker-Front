"use client";
import { Button } from "@/components/ui/button";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { getMonthlyProfit } from "@/services/user/metrics";
import React, { useEffect, useState } from "react";
import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts";
import { toast } from "sonner";
import { months } from "../StatisticsView";


const MonthlyProfit: React.FC<{
  token: string | null;
  businessId: string | null;
}> = ({ token, businessId }) => {
  const [monthlyProfit, setMonthlyProfit] = useState<
    { month: string; ganancia: number }[]
  >([]);
  const currentYear = new Date().getFullYear();
  const yearOptions = Array.from({ length: 5 }, (_, i) => currentYear - i);
  const [selectedYear, setSelectedYear] = useState<number | null>(currentYear);
  const [loading, setLoading] = useState(true);

  const fetchMonthlyProfit = async () => {
    if (!token || !businessId) return;
    try {
      const profit = await getMonthlyProfit(
        token,
        businessId,
        String(selectedYear)
      );
      if (profit) {
        setMonthlyProfit(
          profit.map((p) => {
            return {
              month: months[p.month - 1],
              ganancia: p.profit,
            };
          })
        );
      }
    } catch (e: unknown) {
      if (e instanceof Error) {
        console.warn("Error al traer las ganancias mensuales", e.message);
        toast.error(`Error: ${e.message}`);
      } else {
        console.warn("Error al traer las ganancias mensuales", e);
        toast.error("Error al traer las ganancias mensuales");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMonthlyProfit();
  }, [token, businessId, selectedYear]);

  const chartConfig = {
    profit: {
      label: "profit",
      color: "var(--foreground)",
    },
  } satisfies ChartConfig;

  return (
    <div className=" p-4 border rounded-md my-1 bg-custom-grisClarito">
      <div className="flex justify-between">
        <div>
          <h2 className="text-xl  font-bold">Ganancia Mensual</h2>
          <h3 className="text-sm text-custom-textGris">
            Ganancia Mensual del Año Actual
          </h3>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">Año: {selectedYear}</Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            {yearOptions.map((year) => (
              <DropdownMenuItem
                key={year}
                onClick={() => setSelectedYear(year)}
                className={year === selectedYear ? "font-bold bg-accent" : ""}
              >
                {year}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <ChartContainer config={chartConfig} className="mt-4">
        {loading ? (
          <span>Cargando Metricas...</span>
        ) : monthlyProfit.length === 0 ? (
          <div className="flex h-40 items-center justify-center text-sm text-muted-foreground">
            No hay ganancias para mostrar
          </div>
        ) : (
          <LineChart
            accessibilityLayer
            data={monthlyProfit}
            margin={{
              left: 4,
              top: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => String(value).slice(0, 3)}
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickCount={4}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Line
              dataKey="ganancia"
              type="linear"
              stroke="var(--color-foreground)"
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        )}
      </ChartContainer>
    </div>
  );
};

export default MonthlyProfit;
