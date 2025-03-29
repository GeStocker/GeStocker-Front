export enum UserRole {
  BASIC = "basic",
  PROFESIONAL = "profesional",
  BUSINESS = "business",
  SUPERADMIN = "superadmin",
}

export interface IUser {
  id: number;
  name: string;
  email: string;
  address: string;
  phone: string;
  city: string;
  country: string;
  createdAt: string;
  img: string;
  roles: UserRole[];
}

export interface IBusiness {
  id: string;
  name: string;
  address: string;
  description: string;
  createdAt: string;
  isActive: boolean;
  inventories: []; //ARREGLO DE INVENTARIOS HACER INTERFACE Y ACOMODARLA
}

export interface BusinessDTO {
  name: string;
  address: string;
  description: string;
}

export interface ICategory {
  id: string;
  name: string;
}

export interface IProduct {
  product_id: string;
  product_name: string;
  product_description: string;
  product_img: string;
  product_isActive: boolean;
  product_createAt: string;
  product_businessId: string;
  category_name: string;
  inventoryProduct_stock: number | null
  inventoryProduct_price: number | null
}

export interface IProduct2 {
    id: string;
    name: string;
    description: string;
    img: string;
    isActive: boolean;
    createdAt: string;
    category: {
      id: string;
      name: string;
    }
    
  }
  
  export interface IStockProduct {
    id: string;
    price: string; 
    stock: number;
    addedAt: string;
    product: IProduct2;
  }
