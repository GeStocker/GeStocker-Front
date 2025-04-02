"use client";
import StatCard from "@/components/StatCard/StatCard";
import React from "react";

const StatisticsView = () => {
  return (
    <div className="p-4">
      <h1 className="text-4xl text-gray-950 font-bold">Mi perfil</h1>
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
      <section className="w-full p-4 flex gap-4">
        <div className=" p-4 border rounded-md my-8">
          <h2 className="text-xl text-gray-950 font-bold">
            Top 5 Productos Más Vendidos
          </h2>
          <h3 className="text-sm text-custom-textGris">
            Productos con mayor volumen de ventas
          </h3>
        </div>
        <div className=" p-4 border rounded-md my-8">
          <h2 className="text-xl text-gray-950 font-bold">
            Top 5 Productos Menos Vendidos
          </h2>
          <h3 className="text-sm text-custom-textGris">
            Productos con menor volumen de ventas
          </h3>
        </div>
        <div className=" p-4 border rounded-md my-8">
          <h2 className="text-xl text-gray-950 font-bold">
            Tasa de Pérdida de Productos
          </h2>
          <h3 className="text-sm text-custom-textGris">
          Porcentaje de productos perdidos o dañados
          </h3>
        </div>
        <div className=" p-4 border rounded-md my-8">
          <h2 className="text-xl text-gray-950 font-bold">
            Productos Más Perdidos
          </h2>
          <h3 className="text-sm text-custom-textGris">
          Productos con mayor tasa de pérdida
          </h3>
        </div>
      </section>
      <section className="w-full p-4 flex gap-4">
      <div className=" p-4 border rounded-md my-8">
          <h2 className="text-xl text-gray-950 font-bold">
          Tiempo Hasta Acabar Stock 
          </h2>
          <h3 className="text-sm text-custom-textGris">
          Estimación basada en la tasa de ventas actual
          </h3>
        </div>
        <div className=" p-4 border rounded-md my-8">
          <h2 className="text-xl text-gray-950 font-bold">
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
