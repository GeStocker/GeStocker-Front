import { ICollaborator } from "@/types/interface";
import axios from "axios";

export const API = process.env.NEXT_PUBLIC_API_URL;

export interface collaboratorDto {
        email: string;
        username: string;
        password: string;
        inventoryId: string;
}


export const getCollaboratorsByBusiness = async (
  token: string,
  businessId: string
): Promise<ICollaborator[]> => {
  try {
    const response = await axios.get(`${API}/collaborators/business/${businessId}`, {
      withCredentials: true,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.warn("Error al obtener colaboradores", error);
    const errorMessage =
      (axios.isAxiosError(error) && error.response?.data?.message) ||
      "Error al obtener colaboradores";
    throw new Error(errorMessage);
  }
};

export const createCollaborator =async (
    token: string,
    colaborador: collaboratorDto
  ): Promise<ICollaborator[]> => {
    try {
      const response = await axios.post(`${API}/collaborators/signup`,colaborador, {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      console.warn("Error al crear colaborador", error);
      const errorMessage =
        (axios.isAxiosError(error) && error.response?.data?.message) ||
        "Error al crear colaborador";
      throw new Error(errorMessage);
    }
  };

  export const loginUserCollaborator = async (
    userData: Partial<ICollaborator>
  ): Promise<{ user: ICollaborator; token: string }> => {
    try {
      const user = (await axios.post(`${API}/collaborators/login`, userData, {
        withCredentials: true,
      })).data;
      return user;  
    } catch (error) {
      console.warn("Error al iniciar sesión:", error);
      const errorMessage =
        (axios.isAxiosError(error) && error.response?.data?.message) ||
        "No se pudo iniciar sesión";
      throw new Error(errorMessage);
    }
  };