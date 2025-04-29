"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { routes } from "@/routes/routes";
import YouTubeEmbed from "@/components/YoutubeEmbed/YoutubeEmbed";
import { stepsVideos } from "@/helpers/ytVideosId";

const HowItWorks = () => {
  return (
    <div>
      <section className="flex flex-row gap-4 w-full items-center justify-center py-8 bg-custom-grisClarito ">
        <div className="flex flex-col gap-4">
          <h1 className="text-5xl font-bold  text-center">
            Cómo funciona GeStocker
          </h1>
          <p className="text-xl text-custom-textSubtitle text-center">
            Gestionar tu inventario nunca ha sido tan fácil. Tres simples pasos
            para optimizar tu negocio.
          </p>
        </div>
      </section>

      <section className="py-16 border-b w-full px-16">
        <div className="flex px-6">
          <div className="grid grid-cols-2 gap-12 items-center">
            <div className="flex flex-col justify-center gap-4">
              <div className="flex items-center rounded-full bg-custom-GrisOscuro px-3 py-1 text-sm font-medium w-fit">
                <span>Paso 1</span>
              </div>
              <h2 className="text-3xl font-bold">Regístrate</h2>
              <p className="text-custom-textSubtitle">
                Crear tu cuenta en GeStocker es rápido y sencillo. En menos de
                un minuto estarás listo para comenzar.
              </p>

              <ul className="space-y-2">
                <li className="flex items-start">
                  <CheckCircle2 className="mr-2 h-5 w-5  flex mt-0.5" />
                  <span>
                    Información básica: nombre, correo electrónico y contraseña
                  </span>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="mr-2 h-5 w-5  flex mt-0.5" />
                  <span>
                    Selecciona el plan que mejor se adapte a tus necesidades
                  </span>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="mr-2 h-5 w-5  flex mt-0.5" />
                  <span>Comienza con una prueba gratuita de 7 días</span>
                </li>
              </ul>

              <div className="pt-4">
                <Link href={routes.register}>
                  <Button>Crear cuenta ahora</Button>
                </Link>
              </div>
            </div>
            <div className="flex items-center justify-center overflow-hidden rounded-lg border bg-foreground shadow-lg w-[600px] aspect-video">
              <YouTubeEmbed videoId={stepsVideos.stepRegister} />
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 border-b w-full px-16">
        <div className="flex px-6">
          <div className="grid grid-cols-2 gap-12 items-center">
            <div className="flex items-center justify-center overflow-hidden rounded-lg border bg-foreground shadow-lg w-[600px] aspect-video">
              <YouTubeEmbed videoId={stepsVideos.stepAddBusiness} />
            </div>
            <div className="flex flex-col justify-center gap-4">
              <div className="flex items-center rounded-full bg-custom-GrisOscuro px-3 py-1 text-sm font-medium w-fit">
                <span>Paso 2</span>
              </div>
              <h2 className="text-3xl font-bold">Añade tu negocio</h2>
              <p className="text-custom-textSubtitle">
                Personaliza GeStocker para que se adapte perfectamente a tu
                empresa.
              </p>

              <ul className="space-y-2">
                <li className="flex items-start">
                  <CheckCircle2 className="mr-2 h-5 w-5  flex mt-0.5" />
                  <span>Configura el nombre, logo y datos de tu empresa</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="mr-2 h-5 w-5  flex mt-0.5" />
                  <span>
                    Añade múltiples tiendas o almacenes si lo necesitas
                  </span>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="mr-2 h-5 w-5  flex mt-0.5" />
                  <span>Invita a miembros de tu equipo y asigna permisos</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 border-b w-full px-16">
        <div className="flex px-6">
          <div className="grid grid-cols-2 gap-12 items-center">
            <div className="flex flex-col justify-center gap-4">
              <div className="flex items-center rounded-full bg-custom-GrisOscuro px-3 py-1 text-sm font-medium w-fit">
                <span>Paso 3</span>
              </div>
              <h2 className="text-3xl font-bold">Administra tu inventario</h2>
              <p className="text-custom-textSubtitle">
                Comienza a gestionar tu inventario de forma eficiente. Añade
                productos, controla el stock y visualiza estadísticas.
              </p>

              <ul className="space-y-2">
                <li className="flex items-start">
                  <CheckCircle2 className="mr-2 h-5 w-5  flex mt-0.5" />
                  <span>
                    Añade productos individuales o mediante importación masiva
                  </span>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="mr-2 h-5 w-5  flex mt-0.5" />
                  <span>Recibe alertas automáticas de stock bajo</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="mr-2 h-5 w-5  flex mt-0.5" />
                  <span>Genera informes y visualiza estadísticas en tiempo real</span>
                </li>
              </ul>

              <div className="pt-4">
                <Link href={routes.register}>
                  <Button>
                    Comenzar ahora
                  </Button>
                </Link>
              </div>
            </div>
            <div className="flex items-center justify-center overflow-hidden rounded-lg border bg-foreground shadow-lg w-[600px] aspect-video">
              <YouTubeEmbed videoId={stepsVideos.stepAddInventory} />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HowItWorks;
