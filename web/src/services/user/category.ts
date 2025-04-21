import { ICategory } from "@/types/interface";
import axios from "axios";
import axiosInstance from "@/lib/axiosInstance"

export const API = process.env.NEXT_PUBLIC_API_URL;

export interface categoryDto {
  name: string
}

export const getAllCategories = async (
  businessId: string,
  token: string
): Promise<ICategory[]> => {
  try {
    const categories = (
      await axiosInstance.get(`${API}/categories-product/business/${businessId}`, {
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

export const createCategory = async (
  categoryData: categoryDto,
  businessId: string,
  token: string
): Promise<string> => {
  try {
      await axiosInstance.post(`${API}/categories-product/${businessId}`, categoryData, {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
    

    return "SUCCESS_CREATE_CATEGORY";
  } catch (error) {
    console.warn("Error al crear categoria", error);
    const errorMessage =
      (axios.isAxiosError(error) && error.response?.data?.message) ||
      "Error al crear categoria";
    throw new Error(errorMessage);
  }
};

export const updateCategory = async (
  categoryData: categoryDto,
  businessId: string,
  id: string,
  token: string
): Promise<string> => {
  try {
      await axiosInstance.patch(`${API}/categories-product/${businessId}/${id}`, categoryData, {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
    

    return "SUCCESS_UPDATE_CATEGORY";
  } catch (error) {
    console.warn("Error al actualizar la categoria", error);
    const errorMessage =
      (axios.isAxiosError(error) && error.response?.data?.message) ||
      "Error al actualizar la categoria";
    throw new Error(errorMessage);
  }
};
