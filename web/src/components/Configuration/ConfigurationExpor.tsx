"use client;"
import React, { useState } from 'react'
import { Switch } from '../ui/switch';
import { Button } from '../ui/button';
import { RiExportLine } from "react-icons/ri";

const ConfigurationExpor = () => {
    const [format, setFormat] = useState("csv");

  const formats = [
    { value: "csv", label: "CSV" },
    { value: "xlsx", label: "Excel (.xlsx)" },
    { value: "pdf", label: "PDF" },
    { value: "json", label: "JSON" },
  ];

  const exportation = [
    {value: "nunca", label: "Nunca (Manual)" },
    {value: "cada semana", label: "Cada semana"},
    {value: "una vez al mes", label: "Una vez al mes"}
  ];
  return (
    <div>
        <div className='flex flex-col mb-7'>
            <h2 className="text-xl font-semibold text-custom-casiNegro">Configuración de Exportación</h2>
            <p>Configura como exportar los datos de tu negocio.</p>
        </div>
        <div className='mb-5'>
            <div className="flex flex-col w-full">
                <label htmlFor="exportFormat" className="font-semibold text-md mb-2">
                    Formato de Exportación
                </label>
                <select
                    id="exportFormat"
                    value={format}
                    onChange={(e) => setFormat(e.target.value)}
                    className="block w-full p-2 border border-custom-GrisOscuro rounded-lg bg-background"
                >
                    {formats.map((option) => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                    ))}
                </select>
            </div>
            <div className="space-y-7 my-7">
                <div className="flex justify-between items-center">
                    <div className="flex flex-col">
                        <label className="text-md">Inclur encabezados</label>
                        <span className="text-sm text-custom-textSubtitle">Recibirás una notificación cuando algún producto se quede sin existencias</span>
                    </div>
                    <Switch  />
                </div>
                <div className="flex justify-between items-center">
                    <div className="flex flex-col">
                    <label className="text-sm">Aplicar filtros actuales</label>
                    <span className="text-sm text-custom-textSubtitle">Recibirás una notificación cuando algún producto se quede sin existencias</span>
                    </div>
                    <Switch />
                </div>
            </div>
            <div className="flex flex-col w-full">
                <label htmlFor="exportFormat" className="font-semibold text-md mb-2">
                    Programar exportaciones automáticas
                </label>
                <select
                    id="exportFormat"
                    value={format}
                    onChange={(e) => setFormat(e.target.value)}
                    className="block w-full p-2 border border-custom-GrisOscuro rounded-lg bg-background"
                    >
                    {exportation.map((option) => (
                        <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                    ))}
                </select>
                <span className='text-custom-textSubtitle'>Programar exportaciones periódicas de tu negocio</span>
            </div>
            <div className="mt-6 flex justify-start space-x-2">
                <Button>  
                    <RiExportLine />
                    Exportar inventario
                </Button>
                <Button variant="outline">
                    <RiExportLine />
                    Exportar catálogo
                </Button>
                <Button variant="outline">
                    <RiExportLine />
                    Exportar proveedores
                </Button>
            </div>
        </div>
    </div>
  )
}

export default ConfigurationExpor