
import { jwtDecode, JwtPayload } from "jwt-decode";

interface MyJwtPayload extends JwtPayload {
    roles: string[];
}

export const getRolFromToken = (token: string) => {
  if (token) {
    try {
      const decoded = jwtDecode<MyJwtPayload>(token);
      const roles = decoded.roles; 
      return roles[0];
    } catch (error) {
      console.warn("Error al decodificar el token:", error);
    }
  } else {
    console.warn("No hay token disponible");
  }
};
