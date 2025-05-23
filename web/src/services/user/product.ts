import { ICategory, IProduct } from "@/types/interface";
import axios from "axios";
import axiosInstance from "@/lib/axiosInstance"

export const API = process.env.NEXT_PUBLIC_API_URL;

export interface productDto {
  name: string;
  category: string;
  description: string;
  fileImage?: File;
}

export const getAllProducts = async (
  businessId: string,
  token: string,
  filters?: { search?: string; categoryIds?: string[] }
): Promise<IProduct[]> => {
  try {
    const products = (
      await axiosInstance.get(`${API}/products/business/${businessId}`, {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: filters,
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

export const getCategories = async (
  businessId: string,
  token: string
): Promise<ICategory[]> => {
  try {
    const category = (
      await axiosInstance.get(`${API}/categories-product/business/${businessId}`, {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
    ).data;
    return category;
  } catch (error) {
    console.warn("Error al obtener las categorias", error);
    const errorMessage =
      (axios.isAxiosError(error) && error.response?.data?.message) ||
      "Error al obtener las categorias";
    throw new Error(errorMessage);
  }
};

export const createProduct = async (
  productData: productDto,
  businessId: string,
  token: string
): Promise<string> => {
  try {
    const { name, category, description, fileImage } = productData;
    const formData = new FormData();

    formData.append("name", name);
    formData.append("category", category);
    formData.append("description", description);
    if (fileImage) {
      formData.append("file", fileImage);
    }
    await axiosInstance.post(`${API}/products/${businessId}`, formData, {
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
  productData: productDto,
  id: string,
  token: string
): Promise<string> => {
  try {
    const { name, description, category, fileImage } = productData;
    const formData = new FormData();

    if (name) formData.append("name", name);
    if (description) formData.append("description", description);
    if (category) formData.append("category", category);
    if (fileImage) formData.append("file", fileImage);

    await axiosInstance.put(`${API}/products/${id}`, formData, {
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

export const createProductExcel = async (
  file: File,
  userId: string,
  businessId: string,
  token: string
): Promise<string> => {
  try {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("userId", userId);
    formData.append("businessId", businessId);
    await axiosInstance.post(`${API}/excel-import`, formData, {
      withCredentials: true,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return "SUCCESS_CREATE_PRODUCTS";
  } catch (error) {
    console.warn("Error al crear producto", error);
    const errorMessage =
      (axios.isAxiosError(error) && error.response?.data?.message) ||
      "Error al crear producto";
    throw new Error(errorMessage);
  }
};


export const deactivateProductBusiness = async (product_id: string, token: string) => {
  const response = await axiosInstance.put(`${API}/products/deactivate/${product_id}`, {}, {
    withCredentials: true,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};