"use client";

import { Button } from "@/components/ui/button";
import { routes } from "@/routes/routes";
import Link from "next/link";
import React from "react";
import { MdCheck, MdStar } from "react-icons/md";

interface Plan {
  title: string;
  price: string;
  features: string[];
  recommended?: boolean;
}

const PricingDetails = () => {
  const plans: Plan[] = [
    {
      title: "Básico",
      price: "20€/mes",
      features: [
        "Prueba gratuita de 7 días",
        "Hasta 500 productos",
        "2 usuarios",
        "Soporte por Correo Electrónico",
      ],
    },
    {
      title: "Profesional",
      price: "50€/mes",
      features: [
        "Hasta 5000 productos",
        "5 usuarios",
        "Soporte prioritario",
        "Informes avanzados",
      ],
      recommended: true,
    },
    {
      title: "Empresarial",
      price: "99,99€/mes",
      features: [
        "Productos ilimitados",
        "Usuarios ilimitados",
        "Soporte 24/7",
        "Chat entre colaboradores",
      ],
    },
  ];
  const mapSpanishToEnglish = (spanish: string) => {
    switch (spanish) {
      case "Básico":
        return "basic";
      case "Profesional":
        return "professional";
      case "Empresarial":
        return "business";
      default:
        return spanish; 
    }
  };

  return (
    <section className="w-full py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold">
            Planes a Medida para tu Negocio
          </h1>
          <p className="mt-2 text-xl text-custom-textSubtitle max-w-2xl mx-auto">
            Escoge el plan perfecto que impulse el crecimiento de tu empresa
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
          {plans.map((plan, index) => {
            const planInEnglish = mapSpanishToEnglish(plan.title);
            return (
            <div
              key={index}
              className={`relative rounded-xl border-2 overflow-hidden transition-all duration-300  ${
                plan.recommended
                  ? "border-custom-casiNegro shadow-lg scale-105"
                  : "border-custom-GrisOscuro"
              }`}
            >
              {plan.recommended && (
                <div className="absolute top-0 right-0 bg-custom-casiNegro text-background px-4 py-1 text-sm font-bold flex items-center">
                  <MdStar className="mr-1" /> RECOMENDADO
                </div>
              )}
              
              <div className={`p-6 ${plan.recommended ? "bg-custom-casiNegro" : ""}`}>
                <h3 className={`text-2xl font-bold ${plan.recommended ? "text-background" : "text-custom-casiNegro"}`}>
                  {plan.title}
                </h3>
                <p className={`text-3xl font-extrabold mt-2 ${plan.recommended ? "text-background" : "text-custom-casiNegro"}`}>
                  {plan.price}
                </p>
                {plan.recommended && (
                  <p className="text-background opacity-90 mt-1">Ahorra 20% con un plan anual</p>
                )}
              </div>

              <div className="p-6 ">
                <ul className="space-y-3">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start">
                      <MdCheck className={`h-5 w-5 mr-2 flex-shrink-0 ${plan.recommended ? "text-custom-casiNegro" : "text-custom-GrisOscuro"}`} />
                      <span className="text-custom-textSubtitle">{feature}</span>
                    </li>
                  ))}
                </ul>
                <Link href={`${routes.register}?plan=${encodeURIComponent(planInEnglish)}`} className="block mt-8">
                  <Button
                    size="lg"
                    className={`w-full ${plan.recommended ? "bg-custom-casiNegro" : "bg-custom-GrisOscuro hover:bg-custom-casiNegro text-foreground hover:text-background"}`}
                  >
                    {plan.recommended ? "Comenzar Ahora" : "Seleccionar"}
                  </Button>
                </Link>
                
              </div>
            </div>
          )}
          )}
        </div>
      </div>
    </section>
  );
};

export default PricingDetails;