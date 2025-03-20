import { routes } from '@/routes/routes'
import Link from 'next/link'
import React from 'react'

const Footer = () => {
  return (
    <footer className="border-t bg-custom-grisClarito w-full">
        <div className="w-full flex flex-col gap-6 py-4 px-4 md:px-6 md:flex-row md:items-center md:justify-between md:py-6">
          <div className="flex flex-col gap-4">
          <Link href={routes.home} className="flex items-center gap-1 font-bold">
          <img src="logo.png" alt="Logo GeStocker" className="h-9 w-9" />
          <span>GeStocker</span>
        </Link>
            <p className="text-sm text-textGris">
              © 2025 GeStocker. Todos los derechos reservados.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-8 md:gap-20 sm:grid-cols-3 md:px-20">
            <div className="flex flex-col gap-1">
              <h3 className="font-medium">Producto</h3>
              <nav className="flex flex-col gap-0.5">
                <Link href="#" className="text-sm text-textGris hover:underline">
                  Características
                </Link>
                <Link href="#" className="text-sm text-textGris hover:underline">
                  Precios
                </Link>
                <Link href="#" className="text-sm text-textGris hover:underline">
                  Integraciones
                </Link>
              </nav>
            </div>
            <div className="flex flex-col gap-1">
              <h3 className="font-medium">Empresa</h3>
              <nav className="flex flex-col gap-0.5">
                <Link href="#" className="text-sm text-textGris hover:underline">
                  Acerca de
                </Link>
                <Link href="#" className="text-sm text-textGris hover:underline">
                  Blog
                </Link>
                <Link href="#" className="text-sm text-textGris hover:underline">
                  Contacto
                </Link>
              </nav>
            </div>
            <div className="flex flex-col gap-1">
              <h3 className="font-medium">Legal</h3>
              <nav className="flex flex-col gap-0.5">
                <Link href="#" className="text-sm text-textGris hover:underline">
                  Términos
                </Link>
                <Link href="#" className="text-sm text-textGris hover:underline">
                  Privacidad
                </Link>
                <Link href="#" className="text-sm text-textGris hover:underline">
                  Cookies
                </Link>
              </nav>
            </div>
          </div>
        </div>
      </footer>
  )
}

export default Footer