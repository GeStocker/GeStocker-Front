import { IUser } from "../../types/interface";
import axios from "axios";

export const API = process.env.NEXT_PUBLIC_API_URL;
export const registerUser = async (userData: Partial<IUser>) => {
  try {
    const response = await axios.post(`${API}/auth/signup`, userData, {
      withCredentials: true,
    });
    return response;
  } catch (error) {
    console.warn("Error al registrar el usuario:", error);
    const errorMessage =
      (axios.isAxiosError(error) && error.response?.data?.message) ||
      "No se pudo registrar el usuario";
    throw new Error(errorMessage);
  }
};

export const loginUser = async (
  userData: Partial<IUser>
): Promise<{ user: IUser; token: string, checkoutUrl: string }> => {
  try {
    const user = (await axios.post(`${API}/auth/login`, userData, {
      withCredentials: true,
    })).data;
    return user.data;
  } catch (error) {
    console.warn("Error al iniciar sesión:", error);
    const errorMessage =
      (axios.isAxiosError(error) && error.response?.data?.message) ||
      "No se pudo iniciar sesión";
    throw new Error(errorMessage);
  }
};


export const completeSubscription = async (sessionId: string) => {
  try {
    const response = await axios.post(`${API}/purchases/success/${sessionId}`);
    return response.data; // Suponemos que el backend devuelve un objeto JSON

  } catch (error: unknown) {
    if (axios.isAxiosError(error) && error.response) {
      // Si el backend responde con un error (por ejemplo, 400 o 500)
      throw new Error(error.response.data?.message || "Hubo un error al procesar tu suscripción.");
    } else {
      // Si hay un error de red
      throw new Error("Hubo un error en la conexión con el servidor.");
    }
  }
};