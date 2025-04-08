import React from "react";
import { IProductRotation } from "../../Types";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Bar, BarChart, CartesianGrid, Cell, XAxis, YAxis } from "recharts";

const RotationProduct: React.FC<{ products: IProductRotation[] }> = ({
  products,
}) => {
  const chartConfig = {
    rotationRate: {
      label: "Tasa de Rotación ",
      color: "var(--color-custom-GrisOscuro)",
    },
  } satisfies ChartConfig;
  return (
    <ChartContainer config={chartConfig}>
      {products && products.length > 0 ? (
        products.every((item) => Number(item.rotationRate) === 0) ? (
          <div className="flex h-[300px] items-center justify-center p-4 text-center">
            <p className="text-base text-muted-foreground">
              Todos los productos tienen una tasa de rotación de 0.
            </p>
          </div>
        ) : (
          <BarChart
            accessibilityLayer
            data={products}
            layout="vertical"
            barSize={24}
          >
            <CartesianGrid
              vertical
              strokeDasharray="3 3"
              stroke="var(--color-custom-GrisOscuro)"
            />
            <YAxis
              dataKey="productName"
              tickLine={false}
              type="category"
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value}
            />
            <XAxis type="number" tickLine={false} axisLine={false} />
            <Bar dataKey="rotationRate" radius={[0, 4, 4, 0]}>
              {products.map((item) => (
                <Cell
                  key={item.productName}
                  fill={Number(item.rotationRate) <= 0.2 ? "#EB5757" : Number(item.rotationRate) <= 0.5 ? "#F2C94C" : "#6FCF97" }
                />
              ))}
            </Bar>
            <ChartTooltip
              content={
                <ChartTooltipContent
                  hideLabel
                  className="w-[200px]"
                  formatter={(value, name, item) => (
                    <>
                      <div className="flex basis-full items-center text-xs font-medium text-foreground">
                        Cantidad total vendida
                        <div className="ml-auto flex items-baseline gap-0.5 font-mono font-medium tabular-nums text-foreground">
                          {Number(item.payload.soldQty).toFixed(2)}
                        </div>
                      </div>
                      <div className="mt-1 flex basis-full items-center pt-1 text-xs font-medium text-foreground">
                        Cantidad total comprada
                        <div className="ml-auto flex items-baseline gap-0.5 font-mono font-medium tabular-nums text-foreground">
                          {Number(item.payload.purchasedQty).toFixed(2)}
                        </div>
                      </div>

                      <div className="mt-1.5 flex basis-full items-center border-t pt-1.5 text-xs font-medium text-foreground">
                        Tasa de rotación
                        <div className="ml-auto flex items-baseline gap-0.5 font-mono font-medium tabular-nums text-foreground">
                          {Number(item.payload.rotationRate).toFixed(2)}
                        </div>
                      </div>
                    </>
                  )}
                />
              }
              cursor={false}
              defaultIndex={1}
            />
          </BarChart>
        )
      ) : (
        <p>No hay datos disponibles para mostrar.</p>
      )}
    </ChartContainer>
  );
};

export default RotationProduct;
