import axios from "axios";

export const API = process.env.NEXT_PUBLIC_API_URL;

export interface productDto {
  productId: string;
  quantity: number;
  sellingPrice: number;
  purchasePrice: number;
}

export const addProduct = async (
  products: productDto[],
  inventoryId: string,
  businessId: string,
  token: string
): Promise<string> => {
  try {
    await axios.post(`${API}/incoming-shipment/${businessId}/${inventoryId}`, {products}, {
      withCredentials: true,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return "SUCCESS_ADD_PRODUCT";
  } catch (error) {
    console.warn("Error al añadir producto", error);
    const errorMessage =
      (axios.isAxiosError(error) && error.response?.data?.message) ||
      "Error al añadir producto";
    throw new Error(errorMessage);
  }
};
