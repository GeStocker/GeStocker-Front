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
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
    ).data;
    return user;
  } catch (error) {
    console.warn("Error al obtener usuario:", error);
    const errorMessage =
      (axios.isAxiosError(error) && error.response?.data?.message) ||
      "No se pudo obtener usuario";
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
      withCredentials: true,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return "SUCCES_UPDATE";
  } catch (error) {
    console.warn("Error al actualizar datos:", error);
    const errorMessage =
      (axios.isAxiosError(error) && error.response?.data?.message) ||
      "No se pudo actualizar datos";
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
      withCredentials: true,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data.url;
  } catch (error) {
    console.warn("Error al subir foto", error);
    const errorMessage =
      (axios.isAxiosError(error) && error.response?.data?.message) ||
      "No se pudo subir foto";
    throw new Error(errorMessage);
  }
};

export const suscripcionActive = async (
  token: string
) => {
  try {
    const response = await axios.get(`${API}/purchases/active-subscription`, {
      withCredentials: true,
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
    console.warn("Error al cargar suscripcion activa", error);
    const errorMessage =
      (axios.isAxiosError(error) && error.response?.data?.message) ||
      "Error al cargar suscripcion activa";
    throw new Error(errorMessage);
  }
};

export const cancelSubscription = async (
  subscriptionId: string,
  token: string
) => {
  try {
    console.log("Cancelando suscripción con token:", token);
    console.log("ID de suscripción en servicio:", subscriptionId);
    const response = await axios.post(`${API}/purchases/subscription/cancel`,  subscriptionId , {
      withCredentials: true,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response;
  } catch (error) {
    console.warn("Error al cancelar suscripcion:", error);
      const errorMessage =
        (axios.isAxiosError(error) && error.response?.data?.message) ||
        "No se pudo tu cancelar suscripcion";
      throw new Error(errorMessage);
  }
};
