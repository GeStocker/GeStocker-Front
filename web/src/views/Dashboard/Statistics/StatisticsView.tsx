"use client";
import StatCard from "@/components/StatCard/StatCard";
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import React from "react";
import { Pie, PieChart } from "recharts";

const StatisticsView = () => {
  const chartData = [
    { mueble: "silla", ventas: 187, fill: "#E9ECEF" }, // Light Gray (más claro)
    { mueble: "mesa", ventas: 120, fill: "#ADB5BD" }, // Light-Medium Gray (nuevo)
    { mueble: "sofa", ventas: 275, fill: "#6C757D" }, // Medium Gray
    { mueble: "cama", ventas: 200, fill: "#495057" }, // Dark Gray
    { mueble: "armario", ventas: 173, fill: "#343A40" }, // Charcoal
    { mueble: "otro", ventas: 90, fill: "#1f1f1f" }, // Almost Black (más oscuro)
  ];

  const chartConfig = {
    ventas: { label: "Ventas" },
    silla: { label: "Silla", color: "#E9ECEF" }, // Light Gray
    mesa: { label: "Mesa", color: "#ADB5BD" }, // Nuevo
    sofa: { label: "Sofá", color: "#6C757D" }, // Medium Gray
    cama: { label: "Cama", color: "#495057" }, // Dark Gray
    armario: { label: "Armario", color: "#343A40" }, // Charcoal
    otro: { label: "Otro", color: "#1f1f1f" }, // Almost Black
  };

  // const chartData2 = [
  //   { month: "January", cantidad: 186 },
  //   { month: "February", cantidad: 305 },
  //   { month: "March", cantidad: 237 },
  //   { month: "April", cantidad: 73 },
  //   { month: "May", cantidad: 209 },
  //   { month: "June", cantidad: 214 },
  //   { month: "July", cantidad: 192 },
  //   { month: "August", cantidad: 250 },
  //   { month: "September", cantidad: 178 },
  //   { month: "October", cantidad: 220 },
  //   { month: "November", cantidad: 195 },
  //   { month: "December", cantidad: 240 },
  // ];
  // const chartConfig2 = {
  //   cantidad: {
  //     label: "Desktop",
  //     color: "#000000",
  //   },
  // };

  const lowSellingProducts = [
    { nombre: "taburete", ultimaVenta: "2023-09-15", stock: 12 },
    { nombre: "escritorio", ultimaVenta: "2023-09-10", stock: 8 },
    { nombre: "estantería", ultimaVenta: "2023-09-05", stock: 5 },
    { nombre: "lámpara", ultimaVenta: "2023-08-30", stock: 3 },
    { nombre: "alfombra", ultimaVenta: "2023-08-25", stock: 2 },
  ];

  return (
    <div className="p-4">
      <h1 className="text-4xl font-bold">Mi perfil</h1>
      <h2 className="text-xl text-custom-textGris">
        Administra tu información personal y preferencias
      </h2>
      <section className="grid grid-cols-3 gap-4 mb-6 mt-4">
        <StatCard
          title="Total Gastado"
          value={25125}
          description="Total gastado en el ultimo periodo"
          isCurrency={true}
        />
        <StatCard
          title="Total Cobrado"
          value={37327}
          description="Total cobrado en el ultimo periodo"
          isCurrency={true}
        />
        <StatCard
          title="Ganancia Bruta"
          value={12202}
          description="Ganancia bruta en el utlimo periodo"
          isCurrency={true}
        />
      </section>
      <section className="w-full p-4 grid grid-cols-2 gap-4">
        <div className=" p-4 border rounded-md my-8">
          <h2 className="text-xl  font-bold">
            Top 5 Productos Más Vendidos
          </h2>
          <h3 className="text-sm text-custom-textGris">
            Productos con mayor volumen de ventas
          </h3>
          <ChartContainer
            config={chartConfig}
            className="mx-auto aspect-square max-h-[300px]"
          >
            <PieChart>
              <ChartTooltip
                content={<ChartTooltipContent nameKey="ventas" hideLabel />}
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
                      fill="#000000"
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
        </div>
        <div className=" p-4 border rounded-md my-8">
          <h2 className="text-xl  font-bold">
            Top 5 Productos Menos Vendidos
          </h2>
          <h3 className="text-sm text-custom-textGris">
            Productos con menor volumen de ventas
          </h3>
          <div className="grid grid-cols-3 text-center text-lg gap-1 bg-custom-grisClarito mt-4">
            <span>Producto</span>
            <span>Ultima venta</span>
            <span>Stock</span>
          </div>
        
            {lowSellingProducts.length > 0 &&
              lowSellingProducts.map((p, index) => {
                return (
                  <div key={index} className="grid grid-cols-3 text-center text-lg gap-1 mt-1">
                    <span>{p.nombre}</span>
                    <span>{p.ultimaVenta}</span>
                    <span>{p.stock}</span>
                  </div>
                );
              })}

        </div>

        <div className=" p-4 border rounded-md my-8">
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
        </div>
      </section>
      <section className="w-full p-4 flex gap-4">
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
      </section>
    </div>
  );
};

export default StatisticsView;
