"use client"
import { useAuth } from '@/context/AuthContext'
import { useBusiness } from '@/context/BusinessContext'
import { getAllBusiness } from '@/services/user/business'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { BiBarChart } from 'react-icons/bi'
import { DiAptana } from 'react-icons/di'
import { FiUsers } from 'react-icons/fi'
import { LuClipboardList } from 'react-icons/lu'
import { toast } from 'sonner'
import { Button } from '../ui/button'
import { routes } from '@/routes/routes'
import BusinessSelect from '../BusinessSelect/BusinessSelect'
import { useRouter } from 'next/navigation'

const SideBar = () => {
    const { saveBusinessId } = useBusiness();
    const [businesses, setBusinesses] = useState<{ id: string; name: string }[]>([]);
    const [selectedBusinessId, setSelectedBusinessId] = useState<string>(""); // Estado para el negocio seleccionado
    const { token } = useAuth();
    const router = useRouter();

    const fetchBusiness = async () => {
        if (!token) return;
        try {
            const businessList = await getAllBusiness(token);

            // Leer el businessId almacenado en localStorage
            const storedBusinessId = localStorage.getItem("selectedBusinessId");

            // Si hay un businessId almacenado, seleccionarlo; de lo contrario, seleccionar el primero
            const initialBusinessId = storedBusinessId || businessList[0]?.id || "";

            saveBusinessId(initialBusinessId); // Guardar en el contexto
            setBusinesses(businessList); // Actualizar la lista de negocios
            setSelectedBusinessId(initialBusinessId); // Actualizar el estado del negocio seleccionado

            // Guardar el businessId seleccionado en localStorage
            localStorage.setItem("selectedBusinessId", initialBusinessId);
        } catch (e: unknown) {
            if (e instanceof Error) {
                console.warn("Error al traer los negocios:", e.message);
                toast.error(`Error: ${e.message}`);
            } else {
                console.warn("Error al traer los negocios:", e);
                toast.error("Error al traer los negocios");
            }
        }
    };

    useEffect(() => {
        fetchBusiness();
    }, [token]);

    const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedBusinessId = event.target.value;
        if (selectedBusinessId) {
            saveBusinessId(selectedBusinessId); // Guardar en el contexto
            setSelectedBusinessId(selectedBusinessId); // Actualizar el estado
            localStorage.setItem("selectedBusinessId", selectedBusinessId); // Guardar en localStorage
            router.push(`/dashboard/business/${selectedBusinessId}`); // Redirigir
        }
    };

  return (
    <div className="flex flex-col bg-gray-100 w-56 h-screen p-3">
        <div className="flex items-center justify-center m-5 h-6">
                <BusinessSelect
                    businesses={businesses}
                    onChange={handleChange}
                    value={selectedBusinessId} // Pasar el valor seleccionado
                />
            </div>
        <div className="flex flex-col gap-1 mt-5">
            <h2 className="text-gray-700">GENERAL</h2>
                <Link href="/dashboard/inventory">
                <div className="flex items-center gap-2 pl-2">
                    <LuClipboardList />
                    <h3>Inventario</h3>
                </div>
                </Link>
            <div className="flex items-center gap-2 pl-2">
                <BiBarChart />
                <h3>Estadisticas</h3>
            </div>
        </div>
        <div className="flex flex-col gap-1 my-5">
            <h2 className="text-gray-700">ADMINISTRACION</h2>
            <div className="flex items-center gap-2 pl-2">
                <FiUsers />
                <h3>Colaboradores</h3>
            </div>
            <div className="flex items-center gap-2 pl-2">
                <DiAptana />
                <h3>Configuracion</h3>
            </div>
        </div>
        <div className="flex flex-col gap-2 mt-6">
            <Link href={routes.createBusiness}>   
            <Button variant={'outline'}>Agregar Negocio</Button>
            </Link>
            <Button variant={'outline'}>Agregar inventario</Button>
        </div>
        <div className="flex-grow"></div>

        <div className="flex border border-black p-2 rounded-md my-5 gap-2 ">
            <div>
                <div>
                    <h3 className='text-sm font-bold'>Plan Básico</h3>
                </div>
                <div className='flex flex-col text-xs '>
                    <h4 >Renovación:</h4>
                    <h4>12/05/2025</h4>
                </div>
            </div>
            <div className="flex items-center justify-center ml-auto">
                <button className="flex items-center bg-white text-center text-black text-md h-6 rounded-md p-3 border border-black">Gestionar</button>
            </div>
        </div>
    </div>
  )
}

export default SideBar