import React from 'react'

import { Bar, BarChart, CartesianGrid, Cell, XAxis, YAxis } from "recharts";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { ITopHighLowMargin } from '../../../Types';

const TopMarginProduct:React.FC<{products: ITopHighLowMargin[]}> = ({products}) => {

    const chartConfig = {
        profitMargin: {
          label: "Margen de Ganancia",
          color: "var(--color-custom-GrisOscuro)",
        },
      } satisfies ChartConfig;
  return (
    <ChartContainer config={chartConfig} >
          {products &&
          products.length > 0 ? products.every(item => Number(item.profitMargin) === 0) ? (
            <div className="flex h-[300px] items-center justify-center p-4 text-center"> 
              <p className="text-base text-muted-foreground">
                Todos los productos tienen margen de ganancia 0. <br />
                Revisa los costos o precios de venta.
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
              <XAxis type="number" tickLine={false} axisLine={false}/>  
              <Bar dataKey="profitMargin" radius={[0, 4, 4, 0]}>
                {products.map((item) => (
                  <Cell
                    key={item.productName}
                    fill={
                      parseInt(item.profitMargin) >= 0 ? "#6FCF97" : "#EB5757"
                    }
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
                          Costo Promedio
                          <div className="ml-auto flex items-baseline gap-0.5 font-mono font-medium tabular-nums text-foreground">
                            <span className="font-normal text-muted-foreground">
                              $
                            </span>
                            {Number(item.payload.averageCost).toFixed(2)}
                          </div>
                        </div>
                        <div className="mt-1 flex basis-full items-center pt-1 text-xs font-medium text-foreground">
                          Precio de Venta
                          <div className="ml-auto flex items-baseline gap-0.5 font-mono font-medium tabular-nums text-foreground">
                            <span className="font-normal text-muted-foreground">
                              $
                            </span>
                            {Number(item.payload.sellingPrice).toFixed(2)}
                          </div>
                        </div>

                        <div className="mt-1.5 flex basis-full items-center border-t pt-1.5 text-xs font-medium text-foreground">
                          Margen de Ganancia
                          <div className="ml-auto flex items-baseline gap-0.5 font-mono font-medium tabular-nums text-foreground">
                            <span className="font-normal text-muted-foreground">
                              $
                            </span>
                            {Number(item.payload.profitMargin).toFixed(2)}
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
          ) : (
            <p>No hay datos disponibles para mostrar.</p>
          )}
        </ChartContainer>
  )
}

export default TopMarginProduct