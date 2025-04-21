import { routes } from "@/routes/routes";
import Link from "next/link";
import React from "react";

const Cookie: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto p-6 bg-background rounded-lg mt-10">
      <div className="flex justify-end">
          <Link href={routes.home}>
            <span>Volver</span>
          </Link>
        </div>
      <h1 className="text-3xl text-center font-bold mb-4 text-custom-casiNegro">Política de Cookies</h1>
      <p className="text-custom-casiNegro mb-4">
        En <strong>GeStocker</strong>, utilizamos cookies para mejorar su experiencia en nuestro sitio web. Al continuar navegando, usted acepta el uso de cookies.
      </p>

      <h2 className="text-2xl font-semibold mt-6 mb-2 text-custom-textSubtitle">¿Qué son las cookies?</h2>
      <p className="text-custom-casiNegro mb-4">
        Las cookies son pequeños archivos de texto que los sitios web guardan en su dispositivo para recordar información sobre su visita.
      </p>

      <h2 className="text-2xl font-semibold mt-6 mb-2 text-custom-textSubtitle">¿Qué tipos de cookies utilizamos?</h2>
      <ul className="list-disc ml-6 text-custom-casiNegro mb-4">
        <li><strong>Cookies esenciales:</strong> Necesarias para el funcionamiento básico del sitio.</li>
        <li><strong>Cookies de rendimiento:</strong> Nos ayudan a mejorar la experiencia del usuario.</li>
        <li><strong>Cookies de funcionalidad:</strong> Permiten recordar preferencias y configuraciones.</li>
        <li><strong>Cookies de terceros:</strong> Utilizadas por servicios externos como Google Analytics.</li>
      </ul>

      <h2 className="text-2xl font-semibold mt-6 mb-2 text-custom-textSubtitle">¿Cómo puede gestionar las cookies?</h2>
      <p className="text-custom-casiNegro mb-4">
        Puede configurar su navegador para rechazar o eliminar cookies en cualquier momento. Sin embargo, esto puede afectar el funcionamiento del sitio.
      </p>

      <h2 className="text-2xl font-semibold mt-6 mb-2 text-custom-textSubtitle">Más información</h2>
      <p className="text-custom-casiNegro">
        Si tiene dudas sobre nuestra política de cookies, puede contactarnos en <strong>soporte@gestocker.com</strong>.
      </p>
    </div>
  );
};

export default Cookie;
