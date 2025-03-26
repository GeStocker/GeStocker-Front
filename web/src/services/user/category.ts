import { ICategory } from "@/types/interface";
import axios from "axios";

export const API = process.env.NEXT_PUBLIC_API_URL;

export const getAllCategories = async (
  businessId: string,
  token: string
): Promise<ICategory[]> => {
  try {
    console.log(token)
    const categories = (
      await axios.get(`${API}/categories-product/business/${businessId}`, {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
    ).data;

    return categories;
  } catch (error) {
    console.warn("Error al traer categorias", error);
    const errorMessage =
      (axios.isAxiosError(error) && error.response?.data?.message) ||
      "Error al traer categorias";
    throw new Error(errorMessage);
  }
};
