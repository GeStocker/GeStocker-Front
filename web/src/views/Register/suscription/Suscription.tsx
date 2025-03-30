import SuscriptionCard from '@/components/ui/SuscriptionCard'
import React from 'react'

const Suscription = () => {
  return (
    <div className='flex justify-center items-center'>
        <div className="flex flex-col lg:flex-row flex-wrap gap-4 lg:gap-16 my-2 lg:my-8">
          <div className="relative">
          <SuscriptionCard
            title="Básico"
            price="19"
            items={[
              "Prueba gratuita por 7 días",
              "Hasta 500 productos",
              "2 usuarios",
              "2 Soporte por email",
            ]}
            />
            <span className="rounded-lg px-4 border bg-green-100 absolute text-green-500 -right-8 top-1 rotate-12 font-medium text-2xl">7 dias gratuitos</span>
            </div>
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
    </div>
  )
}

export default Suscription