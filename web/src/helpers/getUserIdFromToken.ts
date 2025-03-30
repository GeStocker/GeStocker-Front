
import { jwtDecode, JwtPayload } from "jwt-decode";

interface MyJwtPayload extends JwtPayload {
  id: string;
}

export const getUserIdFromToken = (token: string) => {
  if (token) {
    try {
      const decoded = jwtDecode<MyJwtPayload>(token);
      const userId = decoded.id; 
      return userId;
    } catch (error) {
      console.warn("Error al decodificar el token:", error);
    }
  } else {
    console.warn("No hay token disponible");
  }
};
