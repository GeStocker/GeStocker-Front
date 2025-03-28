import React from 'react';
import { Button } from '@/components/ui/button';
import { FiShoppingCart } from "react-icons/fi";
import StatCard from '@/components/StatCard/StatCard';
import mockProduct from '@/types/mockproduct';
import ProductTableInventory from '@/components/ProductTable/ProductTableInventory';



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
            <div>
                <ProductTableInventory />
            </div>
        </section>
    </div>
  )
}

export default InventoryView