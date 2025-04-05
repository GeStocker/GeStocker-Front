export interface IMonthlyProfit {
    month: number,
    profit: number
}

export interface ILowStockProduct {
  coverageDays: number | null;
  currentStock: number;
  inventoryId: string;
  inventoryName: string;
  productId: string;
  productName: string;
  requiredStock: string;
  weeklyDemand: string;
}

export interface IProductsWithoutSales {
    currentStock: number;
    daysWithoutSales: number;
    inventoryId: string;
    inventoryName: string;
    lastSaleDate: string;
    productId: string;
    productName: string;
    totalSales: string;
}


export interface ITopHighLowMargin {
    averageCost: string;
    inventoryId: string;
    inventoryName: string;
    inventoryProductId: string;
    productId: string;
    productName: string;
    profitMargin: string;
    sellingPrice: string;
}

export interface IProfitMargin {
    inventoryId: string,
    inventoryName: string,
    topHighMargin: ITopHighLowMargin[],
    topLowMargin: ITopHighLowMargin[],
}