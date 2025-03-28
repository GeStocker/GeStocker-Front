"use client"
import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { FiShoppingCart } from "react-icons/fi";
import StatCard from '@/components/StatCard/StatCard';
import ProductTableBusiness from '@/components/ProductTable/ProductTableBusiness';
import { useBusiness } from '@/context/BusinessContext';
import { useAuth } from '@/context/AuthContext';
import Link from 'next/link';
import { routes } from '@/routes/routes';
import { getAllProducts } from '@/services/user/product';
import { toast } from 'sonner';
import { IProduct } from '@/types/interface';



const BusinessView = () => {
    const { businessId } = useBusiness();
    const [products, setProducts] = useState<IProduct[]>([]);
    const { token } = useAuth(); 

    const fetchProducts = async () => {
        if (!token) return;
        try {
            if (!businessId) return;
            const productsBusiness = await getAllProducts(businessId, token);
            console.log("Productos:", productsBusiness);
            setProducts(productsBusiness);
        } catch (e: unknown) {
          if (e instanceof Error) {
            console.warn("Error al traer los productos:", e.message);
    
            toast.error(`Error: ${e.message}`);
          } else {
            console.warn("Error al traer los productos:", e);
            toast.error("Error al traer los productos");
          }
        }
      };
    
    useEffect(() => {
        fetchProducts();
    }, [businessId, token]);

    const totalProducts = products.length;

  return (
    <div className="p-4 mr-16">
        <section className='flex justify-between items-center mb-10'>
                <div className='flex flex-col '>
                    <h1 className="text-4xl font-semibold text-gray-800">Negocio</h1>
                    <h3>Gestiona tus productos y controla tu stock</h3>
                </div>
                <div className='flex gap-2'>
                    <Link href={routes.createCategory}>
                        <Button variant={'outline'} size="lg">
                            <FiShoppingCart />
                            Agregar categorías
                        </Button>
                    </Link>
                    <Link  href={routes.createProducts} >
                        <Button size="lg">+ Crear productos</Button>
                    </Link>
                </div>
        </section>
        <section className="grid grid-cols-3 gap-4 mb-6">
            <StatCard title="Total de productos" value={totalProducts} description="Cantidad total en inventario" />
         </section>
        <section className='border border-gray-300 rounded-md'>
            <div>
                <ProductTableBusiness products={products} />
            </div>
        </section>
    </div>
  )
}

export default BusinessView