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
    collaboratorCredentials: { email: string; password: string }
  ): Promise<{ 
    user: ICollaborator; 
    token: string; 
    checkoutUrl?: string;
    roles: string[];
  }> => {
    try {
      const response = await axios.post(
        `${API}/collaborators/login`,
        collaboratorCredentials,
        {
          withCredentials: true,
        }
      );
  
      // Verificación doble de roles
      if (!response.data.data?.user?.roles?.includes("COLLABORATOR")) {
        throw new Error("El usuario no tiene rol de colaborador");
      }
  
      return {
        user: response.data.data.user,
        token: response.data.data.token,
        checkoutUrl: response.data.data.checkoutUrl,
        roles: response.data.data.user.roles,
      };
    } catch (error) {
      console.error("Error en login de colaborador:", error);
      
      let errorMessage = "Error al autenticar colaborador";
      if (axios.isAxiosError(error)) {
        errorMessage = error.response?.data?.message || 
                     error.message || 
                     "Error de conexión";
      }
      
      throw new Error(errorMessage);
    }
  };