'use client'
import { routes } from "@/routes/routes";
import Link from "next/link";
import React from "react";

const PrivacyPolicyView = () => {
  return (
    <div className="max-w-4xl mx-auto p-6 text-gray-700">
      <div className="flex justify-end">
          <Link href={routes.home}>
            <span>Volver</span>
          </Link>
        </div>
      <h1 className="text-3xl font-bold text-center text-gray-900 mb-6">Política de Privacidad</h1>
      <p className="mb-4">
        En <strong>GeStocker</strong>, nos tomamos muy en serio la privacidad de nuestros usuarios. 
        Esta política explica cómo recopilamos, usamos y protegemos su información personal.
      </p>
      
      <h2 className="text-2xl font-semibold text-gray-800 mt-6 mb-2">1. Información Recopilada</h2>
      <p className="mb-4">Podemos recopilar información como su nombre, correo electrónico y datos de contacto cuando se registra en nuestra plataforma.</p>
      
      <h2 className="text-2xl font-semibold text-gray-800 mt-6 mb-2">2. Uso de la Información</h2>
      <p className="mb-4">La información que recopilamos se usa para mejorar nuestros servicios, gestionar su cuenta y brindarle soporte técnico.</p>
      
      <h2 className="text-2xl font-semibold text-gray-800 mt-6 mb-2">3. Protección de Datos</h2>
      <p className="mb-4">Implementamos medidas de seguridad para proteger su información personal contra accesos no autorizados.</p>
      
      <h2 className="text-2xl font-semibold text-gray-800 mt-6 mb-2">4. Cookies</h2>
      <p className="mb-4">Utilizamos cookies para mejorar su experiencia. Puede gestionar sus preferencias en la configuración de su navegador.</p>
      
      <h2 className="text-2xl font-semibold text-gray-800 mt-6 mb-2">5. Contacto</h2>
      <p className="mb-4">Si tiene preguntas sobre esta política, puede contactarnos en <strong>soporte@gestocker.com</strong>.</p>
      
      <p className="text-sm text-gray-500 text-center mt-6">Última actualización: {new Date().getFullYear()}</p>
    </div>
  );
};

export default PrivacyPolicyView;
