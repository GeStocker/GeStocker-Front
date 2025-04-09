import { IUser } from "@/types/interface";
import {
  IBusinessProduct,
  ISubscriptionMetrics,
  IUserBusiness,
  IUserListItem,
} from "@/views/Superadmin/types";
import axios from "axios";

export const API = process.env.NEXT_PUBLIC_API_URL;

export const loginUserCollaborator = async (
  userData: Partial<IUser>
): Promise<{ user: IUser; token: string }> => {
  try {
    const user = (
      await axios.post(`${API}/superadmin/login`, userData, {
        withCredentials: true,
      })
    ).data;
    return user;
  } catch (error) {
    console.warn("Error al iniciar sesión:", error);
    const errorMessage =
      (axios.isAxiosError(error) && error.response?.data?.message) ||
      "No se pudo iniciar sesión";
    throw new Error(errorMessage);
  }
};

export const getAllUsersList = async (
  token: string,
  isActive: boolean,
  plan?: string
): Promise<IUserListItem[]> => {
  try {
    const users = (
      await axios.get(`${API}/super-admin/users`, {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: { isActive, plan },
      })
    ).data;
    return users;
  } catch (error) {
    console.warn("Error al traer usuarios:", error);
    const errorMessage =
      (axios.isAxiosError(error) && error.response?.data?.message) ||
      "No se pudo traer los usuarios";
    throw new Error(errorMessage);
  }
};

export const getUserBusiness = async (
  token: string,
  userId: string
): Promise<IUserBusiness[]> => {
  try {
    const users = (
      await axios.get(`${API}/super-admin/users/businesses/${userId}`, {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
    ).data;
    return users;
  } catch (error) {
    console.warn("Error al traer los negocios del usuario:", error);
    const errorMessage =
      (axios.isAxiosError(error) && error.response?.data?.message) ||
      "No se pudo traer los negocios del usuario";
    throw new Error(errorMessage);
  }
};

export const getBusinessProducts = async (
  token: string,
  businessId: string
): Promise<IBusinessProduct[]> => {
  try {
    const users = (
      await axios.get(`${API}/super-admin/business/products/${businessId}`, {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
    ).data;
    return users;
  } catch (error) {
    console.warn("Error al traer los productos del negocio:", error);
    const errorMessage =
      (axios.isAxiosError(error) && error.response?.data?.message) ||
      "No se pudo traer los productos del negocio";
    throw new Error(errorMessage);
  }
};

export const getSubscriptionMetrics = async (
  token: string,
  page: number
): Promise<ISubscriptionMetrics[]> => {
  try {
    const users = (
      await axios.get(`${API}/super-admin/subscription-metrics`, {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: { page },
      })
    ).data;
    return users;
  } catch (error) {
    console.warn("Error al traer metricas de suscripciones", error);
    const errorMessage =
      (axios.isAxiosError(error) && error.response?.data?.message) ||
      "No se pudo traer metricas de suscripciones";
    throw new Error(errorMessage);
  }
};

export const banUser = async (
  token: string,
  userId: string,
  reason: string
): Promise<string> => {
  try {
    await axios.patch(`${API}/super-admin/users/ban/${userId}`, reason, {
      withCredentials: true,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return "SUCCESS_BAN";
  } catch (error) {
    console.warn("Error al banear usuario", error);
    const errorMessage =
      (axios.isAxiosError(error) && error.response?.data?.message) ||
      "No se pudo al banear usuario";
    throw new Error(errorMessage);
  }
};
export const unbanUser = async (
  token: string,
  userId: string
): Promise<string> => {
  try {
    await axios.patch(`${API}/super-admin/users/unban/${userId}`,{}, {
      withCredentials: true,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return "SUCCESS_UNBAN";
  } catch (error) {
    console.warn("Error al desbanear usuario", error);
    const errorMessage =
      (axios.isAxiosError(error) && error.response?.data?.message) ||
      "No se pudo al desbanear usuario";
    throw new Error(errorMessage);
  }
};
