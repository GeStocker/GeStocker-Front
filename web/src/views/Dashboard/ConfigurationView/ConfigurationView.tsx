"use client";
import ConfigurarionBusiness from '@/components/Configuration/ConfigurarionBusiness';
import NotificationSettings from '@/components/Configuration/NotificationSettings';
import React, { useState } from 'react';

const ConfigurationView = () => {
  // Estado para manejar la pestaña activa
  const [activeTab, setActiveTab] = useState('notificaciones');

  // Función para cambiar de pestaña
const handleTabClick = (tab: 'notificaciones' | 'negocio' | 'exportacion'): void => {
    setActiveTab(tab);
};

  return (
    <div className="p-4 mr-16">
      <section className="flex justify-between items-center mb-10">
        <div className="flex flex-col">
          <h1 className="text-4xl font-semibold text-gray-800">Configuración</h1>
          <h3>Personaliza y gestiona la configuración de tu negocio</h3>
        </div>
      </section>

      {/* Pestañas */}
      <div className="mb-4">
        <ul className="flex border-b">
          <li
            className={`cursor-pointer py-2 px-4 ${activeTab === 'notificaciones' ? 'border-b-2 border-blue-500' : ''}`}
            onClick={() => handleTabClick('notificaciones')}
          >
            Notificaciones
          </li>
          <li
            className={`cursor-pointer py-2 px-4 ${activeTab === 'negocio' ? 'border-b-2 border-blue-500' : ''}`}
            onClick={() => handleTabClick('negocio')}
          >
            Negocio
          </li>
          <li
            className={`cursor-pointer py-2 px-4 ${activeTab === 'exportacion' ? 'border-b-2 border-blue-500' : ''}`}
            onClick={() => handleTabClick('exportacion')}
          >
            Exportación
          </li>
        </ul>
      </div>

      {/* Contenido de la pestaña activa */}
      <div className="mt-6">
        {activeTab === 'notificaciones' && (
          <div>
            <NotificationSettings/>
          </div>
        )}

        {activeTab === 'negocio' && (
          <div>
            <ConfigurarionBusiness/>
          </div>
        )}

        {activeTab === 'exportacion' && (
          <div>
            <h2 className="text-xl font-semibold text-gray-800">Configuración de Exportación</h2>
            <p>Aquí puedes configurar las opciones de exportación de datos.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ConfigurationView;
