"use client";
import React from 'react';
import PaymentHistory from '@/components/ManagePayment/PaymentHistory';
import Suscription from '@/components/ManagePayment/Suscription';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';


const ManagePayment = () => {

  return (
    <div className="p-4 md:mr-16">
      <section className="flex justify-between items-center">
        <div className="flex flex-col">
          <h1 className="text-4xl font-semibold text-custom-casiNegro">Gestión de plan</h1>
          <h3>Información sobre tu suscripción e historial de pago.</h3>
        </div>
      </section>
      <Tabs defaultValue="suscripcion" className="w-full md:p-8">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="suscripcion">
              Suscripción
            </TabsTrigger>
            <TabsTrigger value="HistorialdePago">
                Historial de Pago
            </TabsTrigger>
          </TabsList>
        <TabsContent value="suscripcion">
            <Suscription/>
        </TabsContent>
        <TabsContent value="HistorialdePago">
            <PaymentHistory/>
        </TabsContent>

    </Tabs>
    </div>
  )
}

export default ManagePayment