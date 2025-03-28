import React from 'react';
import { Button } from '@/components/ui/button';
import { FiShoppingCart } from "react-icons/fi";
import { HiOutlineMagnifyingGlass } from "react-icons/hi2";
import { CiFilter } from "react-icons/ci";
import ProductTable from '@/components/ProductTable/ProductTable';
import StatCard from '@/components/StatCard/StatCard';
import mockProduct from '@/types/mockproduct';



const InventoryView = () => {
    const products = mockProduct(); 

    const totalProducts = products.length;
    const outOfStock = products.filter((p) => p.stock === 0).length;
    const inventoryValue = products.reduce((acc, p) => acc + p.precio * p.stock, 0);

  return (
    <div className="p-4 mr-16">
        <section className='flex justify-between items-center mb-10'>
                <div className='flex flex-col '>
                    <h1 className="text-4xl font-semibold text-gray-800">Inventorio</h1>
                    <h3>Gestiona tus productos y controla tu stock</h3>
                </div>
                <div className='flex'>
                    <Button className='bg-white text-gray-800 border border-gray-300 mr-2'>
                        <FiShoppingCart />
                        Registrar venta
                    </Button>
                    <Button>+ Añadir producto</Button>
                </div>
        </section>
        <section className="grid grid-cols-3 gap-4 mb-6">
            <StatCard title="Total de productos" value={totalProducts} description="Cantidad total en inventario" />
            <StatCard title="Productos sin stock" value={outOfStock} description="Productos agotados" />
            <StatCard title="Valor del inventario" value={inventoryValue.toFixed(2)} description="Valor total del stock" isCurrency />
         </section>
        <section className='border border-gray-300 rounded-md'>
            <div className='flex items-center mx-6 p-3'>
                <div className='flex items-center h-7'>
                    <HiOutlineMagnifyingGlass className='mx-3'/>
                    <input type='text' placeholder='Buscar producto' className='border rounded-md p-1  h-7' />
                </div>
                <div className='flex items-center border border-gray-300 rounded-md p-1 h-7 mx-4'>
                    <CiFilter />
                    <select>
                        <option>Filtrar por</option>
                        <option>Categoría</option>
                        <option>Precio</option>
                        <option>Estado de stock</option>
                    </select>
                </div>
            </div>
            <div>
                <ProductTable />
            </div>
        </section>
    </div>
  )
}

export default InventoryView