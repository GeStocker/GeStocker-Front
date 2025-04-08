import { jwtDecode, JwtPayload } from "jwt-decode";

interface MyJwtPayload extends JwtPayload {
    businessId: string;
}

export const getBusinessFromToken = (token: string) => {
  if (token) {
    try {
      const decoded = jwtDecode<MyJwtPayload>(token);
      const businessId = decoded.businessId; 
      return businessId;
    } catch (error) {
      console.warn("Error al decodificar el token:", error);
    }
  } else {
    console.warn("No hay token disponible");
  }
};