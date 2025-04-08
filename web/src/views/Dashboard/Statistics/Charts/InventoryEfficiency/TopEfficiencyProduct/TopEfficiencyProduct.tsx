import React from "react";

import { Bar, BarChart, CartesianGrid, Cell, XAxis, YAxis } from "recharts";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { IProductEfficiency } from "../../../Types";

const TopEfficiencyProduct: React.FC<{ products: IProductEfficiency[] }> = ({
  products,
}) => {
  const chartConfig = {
    profitMargin: {
      label: "Margen de Ganancia",
      color: "var(--color-custom-GrisOscuro)",
    },
  } satisfies ChartConfig;
  return (
    <ChartContainer config={chartConfig}>
      {products && products.length > 0 ? (
        <BarChart
          accessibilityLayer
          data={products}
          margin={{
            top: 20,
          }}
          barSize={32}
        >
          <CartesianGrid vertical={false} />
          <XAxis
            dataKey="productName"
            tickLine={false}
            tickMargin={10}
            axisLine={true}
            tickFormatter={(value) => value}
          />
          <YAxis
            dataKey="efficiency"
            tickLine={false}
            axisLine={false}
            tickMargin={8}
            tickCount={4}
            domain={[0, 100]}
            ticks={[0, 25, 50, 75, 100]}
          />
          <ChartTooltip
            cursor={false}
            content={
              <ChartTooltipContent
                hideLabel
                className="w-[200px]"
                formatter={(value, name, item) => (
                  <>
                    <div className="flex basis-full items-center text-xs font-medium text-foreground">
                      Total Comprado
                      <div className="ml-auto flex items-baseline gap-0.5 font-mono font-medium tabular-nums text-foreground">
                        {Number(item.payload.totalPurchased).toFixed(0)}
                      </div>
                    </div>
                    <div className="mt-1 flex basis-full items-center pt-1 text-xs font-medium text-foreground">
                      Total Vendido
                      <div className="ml-auto flex items-baseline gap-0.5 font-mono font-medium tabular-nums text-foreground">
                        {Number(item.payload.totalSold).toFixed(0)}
                      </div>
                    </div>

                    <div className="mt-1.5 flex basis-full items-center border-t pt-1.5 text-xs font-medium text-foreground">
                      Eficiencia
                      <div className="ml-auto flex items-baseline gap-0.5 font-mono font-medium tabular-nums text-foreground">
                        {Number(item.payload.efficiency).toFixed(2)}
                        <span className="font-normal text-muted-foreground">
                          %
                        </span>
                      </div>
                    </div>
                  </>
                )}
              />
            }
          />
          <Bar dataKey="efficiency" radius={[8, 8, 0, 0]}>
            {products.map((item) => (
              <Cell
                key={item.productName}
                fill={item.efficiency >= 0 ? "#6FCF97" : "#EB5757"}
              />
            ))}
          </Bar>
        </BarChart>
      ) : (
        <p>No hay datos disponibles para mostrar.</p>
      )}
    </ChartContainer>
  );
};

export default TopEfficiencyProduct;
