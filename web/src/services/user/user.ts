import { IUser } from "../../types/interface";
import axios from "axios";

export const API = process.env.NEXT_PUBLIC_API_URL;

export const registerUser = async (userData: Partial<IUser>) => {
  try {
    await axios.post(`${API}/auth/signup`, userData);
    return "SUCCESS_REGISTER";
  } catch (error) {
    console.log(error);
    throw new Error("Error al registrar el usuario");
  }
};

export const loginUser = async (
  userData: Partial<IUser>
): Promise<{ user: IUser; token: string }> => {
  try {
    const user = await axios.post(`${API}/auth/login`, userData);
    return user.data;
  } catch (error) {
    console.warn("Error al iniciar sesión:", error);
    throw new Error("Error al iniciar sesión");
  }
};

export const getUserById = async (userId: string, token: string): Promise<Partial<IUser>> => {
  try {
    const user = (await axios.get(`${API}/users/${userId}`,{
      headers: {
        Authorization: `Bearer ${token}`
      }
    })).data
    return user;
  } catch (error) {
    console.warn("Error al obtener usuario:", error);
    throw new Error("Error al obtener usuario");
  }
};

export const updateUser = async (userId: string, userData: Partial<IUser>) => {
  try {
    await axios.put(`${API}/users/${userId}`, userData);
    return "SUCCES_UPDATE";
  } catch (error) {
    console.log(error);
    throw new Error("Error al registrar el usuario");
  }
};

export const getImageUser = () => {
  return null;
}