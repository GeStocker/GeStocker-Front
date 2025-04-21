export interface IMonthlyProfit {
  month: number;
  profit: number;
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
  inventoryId: string;
  inventoryName: string;
  topHighMargin: ITopHighLowMargin[];
  topLowMargin: ITopHighLowMargin[];
}

export interface IAverageSales {
  inventoryId: string;
  inventoryName: string;
  topHighAvgSales: IProductSales[];
  topLowAvgSales: IProductSales[];
}

export interface IProductSales {
  inventoryProductId: string;
  inventoryId: string;
  inventoryName: string;
  productId: string;
  productName: string;
  avgDailySales?: number;
  avgMonthlySales?: number;
}

export interface IInventoryEfficiency {
  inventoryId: string;
  inventoryName: string;
  topHighEfficiency: IProductEfficiency[];
  topLowEfficiency: IProductEfficiency[];
}

export interface IProductEfficiency {
  inventoryProductId: string;
  inventoryId: string;
  inventoryName: string;
  productId: string;
  productName: string;
  totalSold: number;
  totalPurchased: number;
  efficiency: number;
}

export interface IInventoryRotationRate {
  inventoryId: string;
  inventoryName: string;
  topHighRotation: IProductRotation[];
  topLowRotation: IProductRotation[];
}

export interface IProductRotation {
  inventoryProductId: string;
  inventoryId: string;
  inventoryName: string;
  productId: string;
  productName: string;
  soldQty: number; 
  purchasedQty: number; 
  rotationRate: number; 
}

export interface ICompareInventoryPerformance {
  orderedBy: 'salesCount' | 'lostCost' | 'turnoverRate' | 'efficiency';
  results: IInventoryPerformance[];
}

export interface IInventoryPerformance {
  inventoryId: string;
  inventoryName: string; 
  salesCount: number; 
  lostCost: number; 
  efficiency: number;
  turnoverRate: number; 
}