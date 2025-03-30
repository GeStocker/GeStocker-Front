"use client"; // <-- Esto es lo que necesitas agregar

import { IBusiness, IProduct } from "@/types/interface";
import { createContext, useContext, useState, ReactNode } from "react";

interface BusinessContextType {
    // Estados de Negocio
    businessId: string | null;
    businessList: IBusiness[];
    // Estados de Inventario
    inventories: Array<{ id: string; name: string }>;
    inventoryId: string | null;
    // Estados de Productos
    productsBusiness: IProduct[];
    
    // Funciones de Negocio
    saveBusinessId: (businessId: string) => void;
    resetBusiness: () => void;
    setBusinessList: (businesses: IBusiness[] | ((prev: IBusiness[]) => IBusiness[])) => void;
    
    // Funciones de Inventario
    setInventories: (inventories: Array<{ id: string; name: string }>) => void;
    saveInventoryId: (id: string) => void;
    
    // Funciones de Productos
    saveProductsBusiness: (products: IProduct[]) => void;
  }
  
  const BusinessContext = createContext<BusinessContextType | undefined>(undefined);
  
  export const BusinessProvider = ({ children }: { children: ReactNode }) => {
    // Estados de Negocio
    const [businessId, setBusinessId] = useState<string | null>(null);
    const [businessList, setBusinessList] = useState<IBusiness[]>([]);
    
    // Estados de Inventario
    const [inventories, setInventories] = useState<Array<{ id: string; name: string }>>([]);
    const [inventoryId, setInventoryId] = useState<string | null>(null);
    
    // Estados de Productos
    const [productsBusiness, setProductsBusiness] = useState<IProduct[]>([]);
  
    // Funciones de Negocio
    const saveBusinessId = (id: string) => {
      setBusinessId(id);
      localStorage.setItem("selectedBusinessId", id);
    };
  
    const resetBusiness = () => {
      setBusinessId(null);
      setProductsBusiness([]);
      localStorage.removeItem("selectedBusinessId");
    };
  
    // Funciones de Inventario
    const saveInventoryId = (id: string) => {
      setInventoryId(id);
      localStorage.setItem("selectedInventoryId", id);
    };
  
    // Funciones de Productos
    const saveProductsBusiness = (products: IProduct[]) => {
      setProductsBusiness(products);
    };

  return (
    <BusinessContext.Provider
      value={{
        businessId,
        inventoryId,
        businessList,
        productsBusiness,
        inventories,
        saveBusinessId,
        setInventories,
        saveInventoryId,
        resetBusiness,
        saveProductsBusiness,
        setBusinessList
      }}
    >
      {children}
    </BusinessContext.Provider>
  );
};

export const useBusiness = () => {
  const context = useContext(BusinessContext);
  if (!context) {
    throw new Error("useBusiness debe usarse dentro de un BusinessProvider");
  }
  return context;
};