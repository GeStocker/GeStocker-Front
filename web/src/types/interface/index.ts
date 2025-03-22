export enum UserRole {
    BASIC = 'basic',
    PROFESIONAL = 'profesional',
    BUSINESS = 'business',
    SUPERADMIN = 'superadmin'
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
    roles: UserRole[];
}