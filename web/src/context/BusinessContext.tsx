"use client"; 
import { IProduct } from "@/types/interface";
import { createContext, useContext, useState, ReactNode } from "react";

interface BusinessContextType {
    businessId: string | null,
    inventoryId: string | null,
    productsBusiness: IProduct[];
    saveBusinessId: (businessId: string) => void,
    saveInventoryId: (businessId: string) => void,
    resetBusiness: () => void,
    saveProductsBusiness: (products: IProduct[]) => void;
}

const BusinessContext = createContext<BusinessContextType | undefined>(undefined)


export const BusinessProvider = ({children} : {children: ReactNode}) => {
    const [businessId, setBusinessId] = useState<string | null>(null);
    const [productsBusiness, setProductsBusiness] = useState<IProduct[]>([]);
    const [inventoryId, setInventoryId] = useState<string | null>(null);

    const saveBusinessId = (businessId: string) => {
        setBusinessId(businessId)
    };

    const resetBusiness = () => {
        setBusinessId(null);
        setProductsBusiness([]);
    };

    const saveProductsBusiness = (products: IProduct[]) => {
        setProductsBusiness(products);
    };

    const saveInventoryId = () => {
        setInventoryId(inventoryId)
    }

    return <BusinessContext.Provider
     value={{
        businessId, 
        inventoryId,
        productsBusiness, 
        saveBusinessId, 
        saveInventoryId,
        resetBusiness, 
        saveProductsBusiness 
     }}>
        {children}
    </BusinessContext.Provider>
};

export const useBusiness = () =>{
    const context = useContext(BusinessContext);
    if (!context) {
        throw new Error ("useBusiness debe usarse dentro de un BusinessProvider")
    }
    return context;
}