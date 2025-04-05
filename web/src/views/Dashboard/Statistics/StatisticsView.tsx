"use client";
import MonthlyProfit from "./Charts/MonthlyProfit";
import { useAuth } from "@/context/AuthContext";
import { useBusiness } from "@/context/BusinessContext";
import { useEffect } from "react";
import LowStock from "./Charts/LowStock";
import WithoutSales from "./Charts/WithoutSales";

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
  const { token } = useAuth();
  const { businessId } = useBusiness();

  
  useEffect(() => {
    }, [token, businessId]);
  return (
    <div className="p-4">
      <h1 className="text-4xl font-bold">Mi perfil</h1>
      <h2 className="text-xl text-custom-textSubtitle">
        Administra tu información personal y preferencias
      </h2>
      <section className="w-full p-4 grid grid-cols-2 gap-4">
        <MonthlyProfit token={token} businessId ={businessId}/>
        <LowStock token={token} businessId ={businessId}/>
        <WithoutSales token={token} businessId ={businessId}/>
      </section>
      <section className="w-full p-4 grid grid-cols-2 gap-4">

      </section>
      {/* <section className="w-full p-4 grid grid-cols-2 gap-4">
        <div className=" p-4 border rounded-md my-8">
          <h2 className="text-xl  font-bold">
            Top 5 Productos Más Vendidos
          </h2>
          <h3 className="text-sm text-custom-textGris">
            Productos con mayor volumen de ventas
          </h3>
          <ChartContainer
            config={chartConfig2}
            className="mx-auto aspect-square max-h-[300px]"
          >
            <PieChart>
              <ChartTooltip 
                content={<ChartTooltipContent nameKey="ventas" hideLabel/>}
              />
              <Pie
                data={chartData}
                dataKey="ventas"
                label={({ payload, ...props }) => {
                  return (
                    <text
                      cx={props.cx}
                      cy={props.cy}
                      x={props.x}
                      y={props.y}
                      textAnchor={props.textAnchor}
                      dominantBaseline={props.dominantBaseline}
                      fill="var(--foreground)"
                    >
                      {payload.ventas}
                    </text>
                  );
                }}
                nameKey="mueble"
              />
              <ChartLegend
                content={<ChartLegendContent nameKey="mueble" />}
                className="-translate-y-2 flex-wrap gap-2 [&>*]:basis-1/4 [&>*]:justify-center"
              />
            </PieChart>
          </ChartContainer>
        </div> */}
      {/*  */}

      {/* <div className=" p-4 border rounded-md my-8">
          <h2 className="text-xl  font-bold">
            Tasa de Pérdida de Productos
          </h2>
          <h3 className="text-sm text-custom-textGris">
            Porcentaje de productos perdidos o dañados
          </h3>
        </div>
        <div className=" p-4 border rounded-md my-8">
          <h2 className="text-xl  font-bold">
            Productos Más Perdidos
          </h2>
          <h3 className="text-sm text-custom-textGris">
            Productos con mayor tasa de pérdida
          </h3>
        </div> */}
      {/* </section> */}
      {/* <section className="w-full p-4 flex gap-4">
        <div className=" p-4 border rounded-md my-8">
          <h2 className="text-xl  font-bold">
            Tiempo Hasta Acabar Stock
          </h2>
          <h3 className="text-sm text-custom-textGris">
            Estimación basada en la tasa de ventas actual
          </h3>
        </div>
        <div className=" p-4 border rounded-md my-8">
          <h2 className="text-xl  font-bold">
            Comparación de Rendimiento Mensual
          </h2>
          <h3 className="text-sm text-custom-textGris">
            Ingresos, gastos y ganancias por mes
          </h3>
        </div>
      </section> */}
    </div>
  );
};

export default StatisticsView;
