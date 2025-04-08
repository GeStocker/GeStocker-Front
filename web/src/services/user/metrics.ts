import { IAverageSales, ICompareInventoryPerformance, IInventoryEfficiency, IInventoryRotationRate, ILowStockProduct, IMonthlyProfit, IProductsWithoutSales, IProfitMargin } from "@/views/Dashboard/Statistics/Types";
import axios from "axios";

export const API = process.env.NEXT_PUBLIC_API_URL;

export const getMonthlyProfit = async (
  token: string,
  businessId: string,
  year?: string
): Promise<IMonthlyProfit[]> => { 
  try {
    const res = await axios.get(`${API}/metrics/profit/${businessId}`, {
      withCredentials: true,
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: {year},
    });
    return res.data
  } catch (error) {
    console.warn("Error al traer las ganancias mensuales", error);
    const errorMessage =    
      (axios.isAxiosError(error) && error.response?.data?.message) ||
      "Error al traer las ganancias mensuales";
    throw new Error(errorMessage);
  }
};


export const getLowStockMetrics = async (
  token: string,
  businessId: string,
): Promise<ILowStockProduct[]> => { 
  try {
    const res = await axios.get(`${API}/metrics/low-stock/${businessId}`, {
      withCredentials: true,
      headers: {
        Authorization: `Bearer ${token}`,
      }
    });
    return res.data
  } catch (error) {
    console.warn("Error al traer los productos bajos de stock", error);
    const errorMessage =    
      (axios.isAxiosError(error) && error.response?.data?.message) ||
      "Error al traer los productos bajos de stock";
    throw new Error(errorMessage);
  }
};


export const getProductsWithoutSales = async (
  token: string,
  businessId: string,
  days?: number
): Promise<IProductsWithoutSales[]> => {
  try {
    const res = await axios.get(`${API}/metrics/obsolete-product/${businessId}`, {
      withCredentials: true,
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: {days}
    });
    return res.data
  } catch (error) {
    console.warn("Error al traer los productos sin ventas", error);
    const errorMessage =    
      (axios.isAxiosError(error) && error.response?.data?.message) ||
      "Error al traer los productos sin ventas";
    throw new Error(errorMessage);
  }
};

export const getProfitMargin = async (
  token: string,
  businessId: string,
  category?: string,
  expand?: boolean
): Promise<IProfitMargin[]> => {
  try {
    const res = await axios.get(`${API}/metrics/profit-margin/${businessId}`, {
      withCredentials: true,
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: {category, expand}
    });
    return res.data
  } catch (error) {
    console.warn("Error al traer el margen de ganancia", error);
    const errorMessage =    
      (axios.isAxiosError(error) && error.response?.data?.message) ||
      "Error al traer el margen de ganancia";
    throw new Error(errorMessage);
  }
};

export const getAverageSales = async (
  token: string,
  businessId: string,
  sortBy: 'daily' | 'monthly',
  category?: string,
  expand?: boolean
): Promise<IAverageSales[]> => {
  try {
    const res = await axios.get(`${API}/metrics/avg-sales/${businessId}`, {
      withCredentials: true,
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: {sortBy, category, expand}
    });
    return res.data
  } catch (error) {
    console.warn("Error al traer ventas promedio", error);
    const errorMessage =    
      (axios.isAxiosError(error) && error.response?.data?.message) ||
      "Error al traer ventas promedio";
    throw new Error(errorMessage);
  }
};

export const getInventoryEficiency = async (
  token: string,
  businessId: string,
  days: number,
  category?: string,
  expand?: boolean
): Promise<IInventoryEfficiency[]> => {
  try {
    const res = await axios.get(`${API}/metrics/efficiency/${businessId}`, {
      withCredentials: true,
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: {days, category, expand}
    });
    return res.data
  } catch (error) {
    console.warn("Error al traer metricas de eficiencia", error);
    const errorMessage =    
      (axios.isAxiosError(error) && error.response?.data?.message) ||
      "Error al traer metricas de eficiencia";
    throw new Error(errorMessage);
  }
};
export const getInventoryRotation = async (
  token: string,
  businessId: string,
  days: number,
  category?: string,
  expand?: boolean
): Promise<IInventoryRotationRate[]> => {
  try {
    const res = await axios.get(`${API}/metrics/rotation/${businessId}`, {
      withCredentials: true,
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: {days, category, expand}
    });
    return res.data
  } catch (error) {
    console.warn("Error al traer metricas de rotacion de productos", error);
    const errorMessage =    
      (axios.isAxiosError(error) && error.response?.data?.message) ||
      "Error al traer metricas de rotacion de productos";
    throw new Error(errorMessage);
  }
};


export const getCompareInventoryPerformance = async (
  token: string,
  businessId: string,
  range: number,
  sortBy: string
): Promise<ICompareInventoryPerformance> => {
  try {
    const res = await axios.get(`${API}/metrics/comparison/${businessId}`, {
      withCredentials: true,
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: {range, sortBy}
    });
    return res.data
  } catch (error) {
    console.warn("Error al traer comparativas de inventarios", error);
    const errorMessage =    
      (axios.isAxiosError(error) && error.response?.data?.message) ||
      "Error al traer comparativas de inventarios";
    throw new Error(errorMessage);
  }
};