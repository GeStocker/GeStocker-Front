import axios from "axios";
import axiosInstance from "@/lib/axiosInstance"

export const API = process.env.NEXT_PUBLIC_API_URL;

export const createInventory = async ({
  token,
  inventoryData,
  businessId,
}: {
  token: string;
  inventoryData: {
    name: string;
    address: string;
    description: string;
  };
  businessId: string;
}) => {
  try {
    const response = await axiosInstance.post(
      `${API}/inventory/${businessId}`,
      inventoryData,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.warn(
        "Error al crear el inventario:",
        error.response?.data || error.message
      );
      throw new Error(
        error.response?.data?.message || "Error al crear el inventario"
      );
    } else {
      console.warn("Error desconocido al crear el inventario:", error);
      throw new Error("Error desconocido al crear el inventario");
    }
  }
};

export const getAllInventory = async (token: string, businessId: string) => {
  try {
    if (!businessId) {
      throw new Error("El ID del negocio es requerido.");
    }
    const response = await axiosInstance.get(`${API}/inventory/${businessId}`, {
      withCredentials: true,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.warn("Error al obtener inventario", error);
    const errorMessage =
      (axios.isAxiosError(error) && error.response?.data?.message) ||
      "Error al obtener inventario";
    throw new Error(errorMessage);
  }
};
