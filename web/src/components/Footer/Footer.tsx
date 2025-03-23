import { routes } from "@/routes/routes";
import Link from "next/link";
import React from "react";
import ModalContacto from "../ModalContact/ModalContact";

const Footer = () => {
  return (
    <footer className="border-t bg-custom-grisClarito w-full">
      <div className="w-full flex flex-col gap-6 py-1 px-4 md:px-6 md:flex-row md:items-center md:justify-between lg:py-6">
        <div className="flex flex-col gap-1 lg:gap-4">
          <Link
            href={routes.home}
            className="flex items-center gap-1 font-bold"
          >
            <img src="/logo.png" alt="Logo GeStocker" className="h-9 w-9" />
            <span>GeStocker</span>
          </Link>
          <p className="text-sm text-custom-textGris">
            © 2025 GeStocker. Todos los derechos reservados.
          </p>
        </div>
        <div className="grid grid-cols-1 gap-4 md:gap-8 lg:gap-20 sm:grid-cols-3 lg:px-20 mt-1 lg:mt-0">
          <div className="flex flex-col gap-1">
            <h3 className="font-medium">Producto</h3>
            <nav className="flex flex-col gap-0.5">
              <Link
                href={routes.productDetails}
                className="text-sm text-custom-textSubtitle hover:underline"
              >
                Detalles del producto
              </Link>
            </nav>
          </div>
          <div className="flex flex-col gap-1">
            <h3 className="font-medium">Empresa</h3>
            <nav className="flex flex-col gap-0.5">
              <Link
                href={routes.about}
                className="text-sm text-custom-textSubtitle hover:underline"
              >
                Acerca de
              </Link>
              <ModalContacto type="text" text="Contacto" />
            </nav>
          </div>
          <div className="flex flex-col gap-1">
            <h3 className="font-medium">Legal</h3>
            <nav className="flex flex-col gap-0.5">
              <Link
                href={routes.privacyPolicy}
                className="text-sm text-custom-textSubtitle hover:underline"
              >
                Política de privacidad
              </Link>
              <Link
                href={routes.cookiePolicy}
                className="text-sm text-custom-textSubtitle hover:underline"
              >
                Uso de cookies
              </Link>
            </nav>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
