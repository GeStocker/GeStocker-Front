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
    const { businessId} = useBusiness();
    const [products, setProducts] = useState<IProduct[]>([]);
    const [filters, setFilters] = useState({
      search: '',
      categoryIds: [],
    });
    const { token } = useAuth();

    const fetchProducts = async () => {
      if (!token || !businessId) return;
      try {
        const productsBusiness = await getAllProducts(businessId, token, filters);
        setProducts(productsBusiness);
      } catch (e) {
        console.warn("Error al traer los productos:", e);
        toast.error("Error al traer los productos");
      }
    };
    const handleSearchChange = (value: string): void => {
      setFilters({ ...filters, search: value });
    };
    
    useEffect(() => {
      fetchProducts();
    }, [filters]);

    const totalProducts = products.length;
    const outOfStockProducts = products.filter(p => p.totalStock !== null && p.totalStock <= 0).length;

  return (
    <div className="p-4 mr-16">
        <section className='flex justify-between items-center mb-10'>
                <div className='flex flex-col '>
                    <h1 className="text-4xl font-semibold text-gray-800">Negocio</h1>
                    <h3>Gestiona tus productos y controla tu stock</h3>
                </div>
                <div className='flex'>
                    <Link href={routes.createCategory}>
                        <Button variant="outline">
                            <FiShoppingCart />
                            Agregar categorías
                        </Button>
                    </Link>
                    <Link  href={routes.createProducts} >
                        <Button>+ Crear productos</Button>
                    </Link>
                </div>
        </section>
        <section className="grid grid-cols-3 gap-4 mb-6">
            <StatCard title="Total de productos" value={totalProducts} description="Cantidad total en inventario" />
            <StatCard title="Productos sin stock" value={outOfStockProducts} description="Productos agotados" />
         </section>
        <section className='border border-gray-300 rounded-md'>
            <div>
                <ProductTableBusiness products={products} onSearchChange={handleSearchChange} 
        searchValue={filters.search} />
            </div>
        </section>
    </div>
  )
}

export default BusinessView