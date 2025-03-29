import { BusinessDTO, IBusiness } from "@/types/interface";
import axios from "axios";

export const API = process.env.NEXT_PUBLIC_API_URL;

export const createBusiness = async (
  token: string,
  businessData: BusinessDTO
): Promise<string> => {
  try {
    await axios.post(`${API}/bussines/`, businessData, {
      withCredentials: true,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return "SUCCESS_BUSINESS_CREATE";
  } catch (error) {
    console.warn("Error al crear negocio", error);
    const errorMessage =
      (axios.isAxiosError(error) && error.response?.data?.message) ||
      "Error al crear negocio";
    throw new Error(errorMessage);
  }
};

export const getAllBusiness = async (token: string): Promise<IBusiness[]> => {
  try {
    const business = (
      await axios.get(`${API}/bussines/`, {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
    ).data;
    return business;
  } catch (error) {
    console.warn("Error al obtener negocios", error);
    const errorMessage =
      (axios.isAxiosError(error) && error.response?.data?.message) ||
      "Error al obtener negocios";
    throw new Error(errorMessage);
  }
};
