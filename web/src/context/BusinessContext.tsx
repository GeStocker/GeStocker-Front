'use client'
import { createContext, useContext, useState, ReactNode } from "react";

interface BusinessContextType {
    businessId: string | null,
    saveBusinessId: (businessId: string) => void,
    resetBusiness: () => void,
}

const BusinessContext = createContext<BusinessContextType | undefined>(undefined)


export const BusinessProvider = ({children} : {children: ReactNode}) => {
    const [businessId, setBusinessId] = useState<string | null>(null);

    const saveBusinessId = (businessId: string) => {
        setBusinessId(businessId)
    };

    const resetBusiness = () => {
        setBusinessId(null)
    };

    return <BusinessContext.Provider value={{businessId, saveBusinessId, resetBusiness}}>
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