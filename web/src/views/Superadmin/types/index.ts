export interface IUserListItem {
    id: string; 
    name: string; 
    email: string; 
    subscriptionPlan: string[]; 
    isActive: boolean; 
    businessCount: number; 
  }

  export interface IUserBusiness {
    id: string;
    name: string; 
    description: string; 
    productCount: number; 
    inventoryCount: number;
  }

  export interface IBusinessProduct {
    id: string; 
    name: string; 
    description: string;
  }

  export interface ISubscriptionMetrics {
    year: number; 
    month: number; 
    totalRevenue: number; 
    totalPayments: number;
    basicCount: number; 
    professionalCount: number;  
    businessCount: number; 
  }