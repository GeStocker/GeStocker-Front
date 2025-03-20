import BenefitCard from "@/components/ui/BenefitCard";
import { Button } from "@/components/ui/button";
import StepCard from "@/components/ui/StepCard";
import SuscriptionCard from "@/components/ui/SuscriptionCard";
import { routes } from "@/routes/routes";
import Link from "next/link";
import React from "react";

const LandingPage = () => {
  return (
    <div>
      <section className="flex flex-col-reverse lg:flex-row gap-4 w-full items-center justify-center my-4 lg:my-12 px-2 lg:px-16">
        <div className="flex flex-col gap-4">
          <h1 className="text-2xl lg:text-5xl font-bold text-gray-950 text-center lg:text-left">
            Gestiona tu inventario de forma simple y eficiente
          </h1>
          <p className="text-base lg:text-xl text-textSubtitle text-center lg:text-left">
            GeStocker te ayuda a controlar tu stock, realizar seguimiento de
            productos y optimizar tu negocio.
          </p>
          <div className="flex gap-4 justify-center lg:justify-normal">
            <Link href={routes.register}>
              <Button size="lg">Comenzar ahora</Button>
            </Link>
            <Link href="#">
              <Button size="lg" variant="outline">
                Cómo funciona
              </Button>
            </Link>
          </div>
        </div>
        <img
          src="hero.webp"
          alt="Hero imagen"
          className="w-full lg:w-1/2 rounded-md"
        />
      </section>
      <section className="w-full bg-miGris flex items-center flex-col justify-center my-2 lg:my-8 p-4 gap-1">
        <h2 className="text-xl lg:text-4xl font-bold text-gray-950 text-center">
          Comienza en 3 simples pasos
        </h2>
        <p className="text-base lg:text-xl text-textSubtitle max-w-[30rem] text-center">
          Gestionar tu inventario nunca ha sido tan fácil
        </p>
        <div className="flex flex-col lg:flex-row gap-4 my-2 lg:gap-16 lg:my-8 wrap">
          <StepCard
            icon="icons/agregar.png"
            title="1. Registrate"
            description="Crea tu cuenta en menos de un minuto y accede a todas las funcionalidades."
          />
          <StepCard
            icon="icons/tiendita.png"
            title="2. Añade tu negocio"
            description="Configura los detalles de tu empresa y personaliza tu espacio de trabajo."
          />
          <StepCard
            icon="icons/libreta.png"
            title="3. Administra tu inventario"
            description="Comienza a gestionar productos, controlar stock y generar informes al instante."
          />
        </div>
        <Link href={routes.register}>
          <Button size="lg">Comenzar ahora</Button>
        </Link>
      </section>

      <section className="w-full bg-white flex items-center flex-col justify-center my-2 lg:my-8 p-4 gap-1">
        <h2
          className="font-bold text-gray-950 text-xl lg:text-4xl text-center"
        >
          Características principales
        </h2>
        <p className="text-base lg:text-xl text-textSubtitle max-w-[30rem] text-center">
          Todo lo que necesitas para gestionar tu inventario de manera eficiente
        </p>
        <div className="flex flex-col lg:flex-row gap-4 my-2 lg:gap-5 lg:my-8 flex-wrap items-center justify-center">
          <BenefitCard
            title="Control de stock en tiempo real"
            description="Monitorea tus niveles de inventario en tiempo real y recibe alertas cuando sea necesario reabastecer."
          />
          <BenefitCard
            title="Gestión de proveedores"
            description="Mantén organizada la información de tus proveedores y optimiza el proceso de compra."
          />
          <BenefitCard
            title="Informes y análisis"
            description="Genera informes detallados para tomar decisiones basadas en datos concretos."
          />
          <BenefitCard
            title="Códigos de barras"
            description="Escanea y genera códigos de barras para agilizar la gestión de productos."
          />
          <BenefitCard
            title="Múltiples ubicaciones"
            description="Administra el inventario de múltiples tiendas o almacenes desde una sola plataforma."
          />
          <BenefitCard
            title="Aplicación móvil"
            description="Accede a tu inventario desde cualquier lugar con nuestra aplicación móvil."
          />
        </div>
      </section>
      <section className="w-full bg-miGris flex items-center flex-col justify-center my-2 lg:my-8 p-4 gap-1">
        <h2 className="text-xl lg:text-4xl text-center font-bold text-gray-950 ">
          Planes que se adaptan a tu negocio
        </h2>
        <p className="text-base lg:text-xl text-textSubtitle max-w-[30rem] text-center">
          Elige el plan que mejor se ajuste a las necesidades de tu empresa
        </p>
        <div className="flex flex-col lg:flex-row flex-wrap gap-4 lg:gap-16 my-2 lg:my-8">
          <SuscriptionCard
            title="Básico"
            price="19"
            items={["Hasta 500 productos", "2 usuarios", "2 Soporte por email"]}
          />
          <SuscriptionCard
            title="Profesional"
            price="49"
            items={[
              "Hasta 5000 productos",
              "5 usuarios",
              "Soporte prioritario",
              "Informes avanzados",
            ]}
          />
          <SuscriptionCard
            title="Empresarial"
            price="99"
            items={[
              "Productos ilimitados",
              " Usuarios ilimitados",
              "Soporte 24/7",
              "Chatbot con IA",
            ]}
          />
        </div>
      </section>
      <section className="flex flex-col-reverse lg:flex-row gap-4 w-full items-center justify-center my-4 lg:my-12 px-2 lg:px-16">
        <div className="flex flex-col gap-4">
          <h1 className="text-2xl lg:text-5xl font-bold text-gray-950 text-center lg:text-left">
            ¿Listo para optimizar tu inventario?
          </h1>
          <p className="text-base lg:text-xl text-textSubtitle text-center lg:text-left">
            Únete a miles de empresas que ya confían en GeStocker para gestionar
            su inventario.
          </p>
          <div className="flex gap-4 justify-center lg:justify-normal">
            <Link href={routes.register}>
              <Button size="lg">Comenzar gratis</Button>
            </Link>
            <Link href="#">
              <Button size="lg" variant="outline">
                Contactar ventas
              </Button>
            </Link>
          </div>
        </div>
        <img src="hero2.webp" alt="Hero imagen" className="w-full lg:w-1/2 rounded-md" />
      </section>
    </div>
  );
};

export default LandingPage;
