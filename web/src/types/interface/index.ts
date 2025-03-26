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
  isActive: true;
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

