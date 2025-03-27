import { IProduct } from "@/types/interface";
import axios from "axios";

export const API = process.env.NEXT_PUBLIC_API_URL;

export interface productDto {
  name: string;
  category: string;
  description: string;
  file?: File;
}

export const getAllProducts = async (
  businessId: string,
  token: string
): Promise<IProduct[]> => {
  try {
    const products = (
      await axios.get(`${API}/products/business/${businessId}`, {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
    ).data;
    return products;
  } catch (error) {
    console.warn("Error al obtener los productos", error);
    const errorMessage =
      (axios.isAxiosError(error) && error.response?.data?.message) ||
      "Error al obtener los productos";
    throw new Error(errorMessage);
  }
};

export const createProduct = async (
  productData: productDto,
  businessId: string,
  token: string
): Promise<string> => {
  try {
    await axios.post(`${API}/products/${businessId}`, productData, {
      withCredentials: true,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return "SUCCESS_CREATE_PRODUCT";
  } catch (error) {
    console.warn("Error al crear producto", error);
    const errorMessage =
      (axios.isAxiosError(error) && error.response?.data?.message) ||
      "Error al crear producto";
    throw new Error(errorMessage);
  }
};

export const updateProduct = async (
  productData: Partial<productDto>,
  id: string,
  token: string
): Promise<string> => {
  try {
    await axios.put(`${API}/products/${id}`, productData, {
      withCredentials: true,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return "SUCCESS_UPDATE_PRODUCT";
  } catch (error) {
    console.warn("Error al actualizar el producto", error);
    const errorMessage =
      (axios.isAxiosError(error) && error.response?.data?.message) ||
      "Error al actualizar el producto";
    throw new Error(errorMessage);
  }
};
