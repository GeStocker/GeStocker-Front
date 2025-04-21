import { jwtDecode, JwtPayload } from "jwt-decode";

interface MyJwtPayload extends JwtPayload {
    inventoryId: string[];
}

export const getInventoryFromToken = (token: string) => {
  if (token) {
    try {
      const decoded = jwtDecode<MyJwtPayload>(token);
      const inventoryId = decoded.inventoryId; 
      return inventoryId;
    } catch (error) {
      console.warn("Error al decodificar el token:", error);
    }
  } else {
    console.warn("No hay token disponible");
  }
};