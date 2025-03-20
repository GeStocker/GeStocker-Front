'use client'
import { createContext, useContext, useState, ReactNode, useEffect } from "react";
import { getCookie, setCookie, deleteCookie} from 'cookies-next/client';

interface AuthContextType {
    isAuth: boolean | null,
    token: string | null,

    saveUserData: (token: string) => void,
    resetUserData: () => void,
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)


export const AuthProvider = ({children} : {children: ReactNode}) => {
    const [token, setToken] = useState<string | null>(null);
    const [isAuth, setIsAuth] = useState<boolean | null>(null);
    console.log(token)
    
    const saveUserData = (token: string) => {
        setCookie("token", token)
        setToken(token)
        setIsAuth(true)
    };
    const resetUserData = () => {
        deleteCookie("token")
        setToken(null)
        setIsAuth(false)
    };

    useEffect(()=>{
        const token = getCookie("token") ?? null
        if (!token) {
            setIsAuth(false)
            return};
        setIsAuth(true)
        setToken(token)
    },[])

    return <AuthContext.Provider value={{isAuth, saveUserData, resetUserData, token}}>
        {children}
    </AuthContext.Provider>
};

export const useAuth = () =>{
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error ("useAuth debe usarse dentro de un AuthProvider")
    }
    return context;
}