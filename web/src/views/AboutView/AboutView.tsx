'use client';

import { routes } from '@/routes/routes';
import Link from 'next/link';
import React from 'react';

const AboutView = () => {
  return (
    <div className="max-w-4xl mx-auto p-6 text-custom-casiNegro">
        <div className="flex justify-end">
          <Link href={routes.home}>
            <span>Volver</span>
          </Link>
        </div>
      <h1 className="text-3xl font-bold text-center mb-6">Acerca de GeStocker</h1>
      <p className="text-lg mb-4">
        GeStocker es un potente gestor de inventario diseñado para facilitar la administración de productos,
        optimizar procesos y mejorar la eficiencia operativa de empresas y negocios de cualquier tamaño.
      </p>
      <p className="text-lg mb-4">
        Nuestro objetivo es proporcionar una solución intuitiva y eficiente para que puedas mantener el control de
        tu inventario en tiempo real, reduciendo errores y aumentando la productividad.
      </p>
      <h2 className="text-2xl font-semibold mt-6">¿Por qué elegir GeStocker?</h2>
      <ul className="list-disc pl-6 mt-2 space-y-2">
        <li>Interfaz sencilla y fácil de usar.</li>
        <li>Gestión de inventario en tiempo real.</li>
        <li>Reportes detallados y estadísticas.</li>
        <li>Seguridad y confiabilidad en el manejo de datos.</li>
      </ul>
      <p className="text-lg mt-6">
        En GeStocker, estamos comprometidos con la mejora continua y la innovación para ofrecerte la mejor
        experiencia en la gestión de inventarios. ¡Gracias por confiar en nosotros!
      </p>
    </div>
  );
};

export default AboutView;
