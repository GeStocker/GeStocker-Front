import { BusinessDTO, IBusiness } from "@/types/interface";
import axios from "axios";

export const API = process.env.NEXT_PUBLIC_API_URL;

export const createBusiness = async (
  token: string,
  businessData: BusinessDTO
): Promise<IBusiness> => { 
  try {
    const response = await axios.post(`${API}/bussines/`, businessData, {
      withCredentials: true,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    
    return {
      id: response.data.id, 
      name: response.data.name,
      address: response.data.address,
      description: response.data.description,
      createdAt: response.data.createdAt,
      isActive: response.data.isActive || true,
      inventories: response.data.inventories || []
    };
    
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
