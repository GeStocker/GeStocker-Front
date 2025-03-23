'use client';

import React, { useState } from 'react';
import { MdCheck } from 'react-icons/md';

interface Plan {
  title: string;
  price: string;
  features: string[];
}

const plans: Plan[] = [
  {
    title: 'Básico',
    price: '$19/mes',
    features: ['Prueba gratuita de 7 días', 'Hasta 500 productos', '2 usuarios', 'Soporte por Correo Electrónico']
  },
  {
    title: 'Profesional',
    price: '$49/mes',
    features: ['Hasta 5000 productos', '5 usuarios', 'Soporte prioritario', 'Informes avanzados']
  },
  {
    title: 'Empresarial',
    price: '$99/mes',
    features: ['Productos ilimitados', 'Usuarios ilimitados', 'Soporte 24/7', 'Chatbot con IA']
  }
];

const ProductDetailsView: React.FC = () => {
  const [selectedPlan, setSelectedPlan] = useState<Plan>(plans[0]);

  return (
    <section className="w-full flex flex-col items-center justify-center py-8 px-4">
      <h2 className="text-3xl md:text-4xl font-bold text-gray-900 text-center">Detalles del Producto</h2>
      <p className="text-lg text-gray-600 text-center mt-2 max-w-xl">
        Elige el plan que mejor se ajuste a las necesidades de tu empresa.
      </p>

      <div className="flex flex-wrap justify-center gap-6 my-6">
        {plans.map((plan) => (
          <button
            key={plan.title}
            onClick={() => setSelectedPlan(plan)}
            className={`px-6 py-2 rounded-lg border ${selectedPlan.title === plan.title ? 'bg-custom-textGris text-white hover:bg-custom-textSubtitle' : 'bg-gray-200 text-gray-900'} transition-all`}
          >
            {plan.title}
          </button>
        ))}
      </div>

      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-lg text-center">
        <h3 className="text-2xl font-semibold text-gray-900">{selectedPlan.title}</h3>
        <p className="text-xl font-bold my-2">{selectedPlan.price}</p>
        <div className="px-10">
          <ul className="text-gray-700 text-lg space-y-2">
            {selectedPlan.features.map((feature, index) => (
              <li key={index} className="flex items-center justify-left gap-2">
                <MdCheck className="text-black" />{feature}
              </li>
            ))}
          </ul>
        </div>
        <button className="mt-4 px-6 py-2 bg-custom-textGris text-white rounded-lg hover:bg-custom-textSubtitle transition-all">
          Seleccionar Plan
        </button>
      </div>
    </section>
  );
};

export default ProductDetailsView;
