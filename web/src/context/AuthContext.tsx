"use client";
import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import { getCookie, setCookie, deleteCookie } from "cookies-next/client";
import { getUserIdFromToken } from "@/helpers/getUserIdFromToken";
import { useRouter } from "next/navigation";

interface AuthContextType {
  isAuth: boolean | null;
  token: string | null;
  userPicture: string | null;
  saveUserPicture: (picture: string) => void;
  saveUserData: (token: string, roles?: string[]) => void;
  resetUserData: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [token, setToken] = useState<string | null>(null);
  const [isAuth, setIsAuth] = useState<boolean | null>(null);
  const [userPicture, setUserPicture] = useState<string | null>(null);

  const router = useRouter();


  const saveUserData = (token: string) => {
    if (!token) return;
    try {
      const userId = getUserIdFromToken(token);
      if (!userId) {
        console.warn("Token no válido, no es un token enviado del backend");
        return;
      }
      const existingToken = getCookie("token");
      if (existingToken !== token) {
        setCookie("token", token, {
          path: "/", 
          secure: true, 
          sameSite: "strict",
        });
        setToken(token);
        setIsAuth(true);
        router.replace("/dashboard/perfil");
      }
    } catch (error) {
      console.warn("Error al decodificar el token:", error);
    }
  };

  const saveUserPicture = (picture: string) => {
    setUserPicture(picture);
    setCookie("userPicture", picture);
  };

  const resetUserData = () => {
    deleteCookie("token", { path: "/" });
    deleteCookie("token", { path: "/", domain: ".ge-stocker.vercel.app" });
    deleteCookie("token", { path: "/", domain: "ge-stocker.vercel.app" });

    localStorage.clear();

    setToken(null);
    setIsAuth(false);
    deleteCookie("userPicture");
  };
    

  useEffect(() => {
    const token = getCookie("token") ?? null;
    if (!token) {
      setIsAuth(false);
      return;
    }
    try {
      const userId = getUserIdFromToken(token);
      if (!userId) {
        console.warn("Token no válido, no es un token enviado del backend");
        return;
      }
      const existingToken = getCookie("token");
      if (existingToken !== token) {
        setCookie("token", token, {
          path: "/", // Asegura que sea accesible en toda la app
          secure: true, // Solo para HTTPS
          sameSite: "strict", // Evita problemas con requests cruzadas
        });
      }
      setToken(token);
      setIsAuth(true);
    } catch (error) {
      console.warn("Error al decodificar el token:", error);
    }
    const picture = getCookie("userPicture") ?? null;
    setUserPicture(picture);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isAuth,
        saveUserData,
        resetUserData,
        token,
        userPicture,
        saveUserPicture,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth debe usarse dentro de un AuthProvider");
  }
  return context;
};
