"use client";

import { IBusiness, IProduct } from "@/types/interface";
import { createContext, useContext, useState, ReactNode } from "react";

interface BusinessContextType {
    businessId: string | null;
    businessList: IBusiness[];
    inventories: Array<{ id: string; name: string }>;
    inventoryId: string | null;
    productsBusiness: IProduct[];
    saveBusinessId: (businessId: string) => void;
    resetBusiness: () => void;
    setBusinessList: (businesses: IBusiness[] | ((prev: IBusiness[]) => IBusiness[])) => void;
    setInventories: (inventories: Array<{ id: string; name: string }>) => void;
    saveInventoryId: (id: string) => void;
    saveProductsBusiness: (products: IProduct[]) => void;
  }
  
  const BusinessContext = createContext<BusinessContextType | undefined>(undefined);
  
  export const BusinessProvider = ({ children }: { children: ReactNode }) => {
    const [businessId, setBusinessId] = useState<string | null>(null);
    const [businessList, setBusinessList] = useState<IBusiness[]>([]);
    const [inventories, setInventories] = useState<Array<{ id: string; name: string }>>([]);
    const [inventoryId, setInventoryId] = useState<string | null>(null);
    const [productsBusiness, setProductsBusiness] = useState<IProduct[]>([]);
  
    const saveBusinessId = (id: string) => {
      setBusinessId(id);
      localStorage.setItem("selectedBusinessId", id);
    };
  
    const resetBusiness = () => {
      setBusinessId(null);
      setProductsBusiness([]);
      localStorage.removeItem("selectedBusinessId");
    };
  
    const saveInventoryId = (id: string) => {
      setInventoryId(id);
      localStorage.setItem("selectedInventoryId", id);
    };
  
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