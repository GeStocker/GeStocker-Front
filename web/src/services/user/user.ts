import { IUser } from "../../types/interface";
import axios from "axios";

export const API = process.env.NEXT_PUBLIC_API_URL;

export const getUserById = async (
  userId: string,
  token: string
): Promise<Partial<IUser>> => {
  try {
    const user = (
      await axios.get(`${API}/users/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
    ).data;
    return user;
  } catch (error) {
    console.warn("Error al obtener usuario:", error);
    const errorMessage = (axios.isAxiosError(error) && error.response?.data?.message) || "No se pudo obtener usuario";
    throw new Error(errorMessage);
  }
};

export const updateUser = async (
  userId: string,
  token: string,
  userData: Partial<IUser>
) => {
  try {
    await axios.patch(`${API}/users/${userId}`, userData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return "SUCCES_UPDATE";
  } catch (error) {
    console.warn("Error al actualizar datos:", error);
    const errorMessage = (axios.isAxiosError(error) && error.response?.data?.message) || "No se pudo actualizar datos";
    throw new Error(errorMessage);
  }
};


export const uploadImageUser = async (
  userId: string,
  token: string,
  fileImage: File
) => {
  try {
    const file = new FormData();
    file.append("file", fileImage);
    const response = await axios.patch(`${API}/users/${userId}`, file, {
      headers: {
        Authorization: `Bearer ${token}`
      },
    });
    return response.data.url;
  } catch (error) {
    console.warn("Error al subir foto", error);
    const errorMessage = (axios.isAxiosError(error) && error.response?.data?.message) || "No se pudo subir foto";
    throw new Error(errorMessage);
  }
};
