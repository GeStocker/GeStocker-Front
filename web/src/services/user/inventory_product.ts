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
    console.log(products)
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


export const getProductsByInventory = async (InventoryId: string, token: string) => {
  try {
      const response = await axios.get(`${API}/inventory-products/${InventoryId}`, {
          headers: {
              Authorization: `Bearer ${token}`
          }
      });
      console.log("productos del inventario", response)
      return response.data;
  } catch (error) {
      console.error("Error al obtener productos", error);
      throw new Error("Error al obtener productos");
  }
};



