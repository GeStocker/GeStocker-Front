import { jwtDecode, JwtPayload } from "jwt-decode";

interface MyJwtPayload extends JwtPayload {
  id: string; // O el tipo que uses (puede ser number)
}

export const getUserIdFromToken = () => {
  const token = useAuth(); // O donde guardes el token
  if (token) {
    try {
      const decoded = jwtDecode<MyJwtPayload>(token);
      const userId = decoded.id; // Reemplaza 'id' con la propiedad correcta según tu token
      console.log(userId);
      return userId;
    } catch (error) {
      console.error("Error al decodificar el token:", error);
    }
  } else {
    console.log("No hay token disponible");
  }
};
