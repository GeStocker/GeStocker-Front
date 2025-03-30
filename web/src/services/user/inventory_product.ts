import { IStockProduct } from "@/types/interface";
import axios from "axios";

export const API = process.env.NEXT_PUBLIC_API_URL;

export interface productDto {
  productId: string;
  quantity: number;
  sellingPrice: number;
  purchasePrice: number;
}

export interface productsSellDto {
  inventoryProductId: string;
  quantity: number;
  reason?: string;
}
export interface sellDto {
  outgoingProducts: productsSellDto[];
  description?: string;
  discount: number;
  customer?: string;
}

export const addProduct = async (
  products: productDto[],
  inventoryId: string,
  businessId: string,
  token: string
): Promise<string> => {
  try {
    await axios.post(
      `${API}/incoming-shipment/${businessId}/${inventoryId}`,
      { products },
      {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return "SUCCESS_ADD_PRODUCTS";
  } catch (error) {
    console.warn("Error al añadir productos", error);
    const errorMessage =
      (axios.isAxiosError(error) && error.response?.data?.message) ||
      "Error al añadir productos";
    throw new Error(errorMessage);
  }
};

export const saveSellOrder = async (
  sellOrder: sellDto,
  inventoryId: string,
  token: string
): Promise<string> => {
  try {
    await axios.post(
      `${API}/sales-order/${inventoryId}`,
       sellOrder ,
      {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return "SUCCESS_SELL_PRODUCTS";
  } catch (error) {
    console.warn("Error al añadir venta", error);
    const errorMessage =
      (axios.isAxiosError(error) && error.response?.data?.message) ||
      "Error al añadir venta";
    throw new Error(errorMessage);
  }
};

export const getProductsByInventory = async (
  InventoryId: string, 
  token: string,
  filters: { search?: string; categoryIds?: string[] }
): Promise<IStockProduct[]> => {
  try {
      const response = await axios.get(`${API}/inventory-products/${InventoryId}`, {
          headers: {
              Authorization: `Bearer ${token}`,
          },
          params: filters
      });
      return response.data;
  } catch (error) {
      console.warn("Error al obtener productos", error);
      throw new Error("Error al obtener productos");
  }
};