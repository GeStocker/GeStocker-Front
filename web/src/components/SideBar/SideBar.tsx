import Link from 'next/link'
import React from 'react'
import { BiBarChart } from 'react-icons/bi'
import { DiAptana } from 'react-icons/di'
import { FiUsers } from 'react-icons/fi'
import { LuClipboardList } from 'react-icons/lu'

const SideBar = () => {
  return (
    <div className="flex flex-col bg-gray-100 w-56 h-screen p-3">
        <div className="flex items-center justify-center m-5 h-6 border border-black">
            <select className=" bg-background  text-center border border-black rounded-md p-2">
                <option>Negocio Principal</option>
                <option>Sucursal 1</option>
                <option>Sucursal 2</option>
            </select>
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