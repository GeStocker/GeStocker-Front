import { IUser } from "../../types/interface";
import axios from "axios";

export const API = process.env.NEXT_PUBLIC_API_URL;
export const registerUser = async (userData: Partial<IUser>) => {
  try {
    await axios.post(`${API}/auth/signup`, userData, {
      withCredentials: true,
    });
    return "SUCCESS_REGISTER";
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
): Promise<{ user: IUser; token: string }> => {
  try {
    const user = await axios.post(`${API}/auth/login`, userData, {
      withCredentials: true,
    });
    return user.data;
  } catch (error) {
    console.warn("Error al iniciar sesión:", error);
    const errorMessage =
      (axios.isAxiosError(error) && error.response?.data?.message) ||
      "No se pudo iniciar sesión";
    throw new Error(errorMessage);
  }
};
