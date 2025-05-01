"use client";

import { Button } from "@/components/ui/button";
import { routes } from "@/routes/routes";
import Link from "next/link";
import React, { useState } from "react";
import { MdCheck } from "react-icons/md";

interface Plan {
  title: string;
  price: string;
  features: string[];
}

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

const ProductDetailsView: React.FC = () => {
  const [selectedPlan, setSelectedPlan] = useState<Plan>(plans[0]);

  return (
    <section className="w-full flex flex-col items-center justify-center py-8 px-4">
      <h2 className="text-3xl md:text-4xl font-bold  text-center">
        Detalles del Producto
      </h2>
      <p className="text-lg text-custom-textSubtitle text-center mt-2 max-w-xl">
        Elige el plan que mejor se ajuste a las necesidades de tu empresa.
      </p>

      <div className="flex flex-wrap justify-center gap-6 my-6">
        {plans.map((plan) => (
          <button
            key={plan.title}
            onClick={() => setSelectedPlan(plan)}
            className={`px-6 py-2 rounded-lg border ${
              selectedPlan.title === plan.title
                ? "bg-custom-GrisOscuro hover:bg-custom-casiNegro"
                : "bg-custom-grisClarito hover:bg-custom-casiNegro"
            } transition-all`}
          >
            {plan.title}
          </button>
        ))}
      </div>

      <div className="bg-custom-grisClarito shadow-lg rounded-lg p-6 w-full max-w-lg text-center">
        <h3 className="text-2xl font-semibold ">{selectedPlan.title}</h3>
        <p className="text-xl font-bold my-2">{selectedPlan.price}</p>
        <div className="px-10">
          <ul className="text-custom-textSubtitle text-lg space-y-2">
            {selectedPlan.features.map((feature, index) => (
              <li key={index} className="flex items-center text-left justify-left gap-2">
                <MdCheck />
                {feature}
              </li>
            ))}
          </ul>
        </div>
        <Link href={`${routes.register}?plan=${encodeURIComponent(mapSpanishToEnglish(selectedPlan.title))}`}>
          <Button size="lg" className="mt-4">
            Seleccionar Plan
          </Button>
        </Link>
      </div>
    </section>
  );
};

export default ProductDetailsView;
