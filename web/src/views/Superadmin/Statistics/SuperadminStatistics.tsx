"use client";
import React, { useEffect, useState } from "react";
import { ISubscriptionMetrics } from "../types";
import { getSubscriptionMetrics } from "@/services/user/superadmin";
import { toast } from "sonner";
import { useAuth } from "@/context/AuthContext";
import { GoArrowLeft, GoArrowRight } from "react-icons/go";

export const monthsString = [
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

const SuperadminStatistics = () => {
  const [metrics, setMetrics] = useState<ISubscriptionMetrics[]>([]);
  const [loading, setLoading] = useState(true);
  const { token } = useAuth();
  const [page, setPage] = useState(0);

  const fetchMetrics = async () => {
    if (!token) return;
    try {
      const statistics = await getSubscriptionMetrics(token, page);
      setMetrics(statistics);
    } catch (error) {
      console.warn(error);
      toast.error("No se pudo traer las metricas de suscripciones");
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchMetrics();
  }, [token, page]);
  return (
    <div className="p-4">
      <div className="flex flex-col">
        <div className="flex justify-between">
          <div className="mb-6">
            <h1 className="text-4xl font-bold mb-2">Suscripciones</h1>
            <h2 className="text-xl text-custom-textGris">
              Estadisticas de las suscripciones
            </h2>
          </div>
          <div className="flex gap-2 items-center mx-4">
              <GoArrowLeft onClick={() => setPage((prev) => prev - 1)} className="cursor-pointer" size={20}/>
              <span>{`Pagina ${page+1}`}</span>
              <GoArrowRight onClick={() => setPage((prev) => prev + 1)} className="cursor-pointer" size={20}/>
            </div>
        </div>
        <div className="grid grid-cols-6 text-lg gap-1 text-center p-2 bg-custom-grisClarito ">
          <span className="text-custom-textSubtitle border-r border-custom-GrisOscuro">
            Mes
          </span>
          <span className="text-custom-textSubtitle border-r border-custom-GrisOscuro">
            Ingresos generados
          </span>
          <span className="text-custom-textSubtitle border-r border-custom-GrisOscuro">
            Pagos realizados
          </span>
          <span className="text-custom-textSubtitle border-r border-custom-GrisOscuro">
            Suscripciones Básicas
          </span>
          <span className="text-custom-textSubtitle border-r border-custom-GrisOscuro">
            Suscripciones Profesionales
          </span>
          <span className="text-custom-textSubtitle">
            Suscripciones Empresariales
          </span>
        </div>
        {loading ? (
          <span>Cargando metricas...</span>
        ) : metrics.length > 0 ? (metrics.map((m, index) => {
              return (
                <div
                  key={index}
                  className="grid grid-cols-6 text-base gap-1 text-center p-4"
                >
                  <span className="break-words">{`${
                    monthsString[m.month - 1]
                  } - ${m.year}`}</span>
                  <span className="break-words">{`${m.totalRevenue} €`}</span>
                  <span className="break-words">{m.totalPayments}</span>
                  <span className="break-words">{m.basicCount}</span>
                  <span className="break-words">{m.professionalCount}</span>
                  <span className="break-words">{m.businessCount}</span>
                </div>
              );
            })
        ) : (
          <span className="text-center">No hay metricas para mostrar</span>
        )}
      </div>
    </div>
  );
};

export default SuperadminStatistics;
