import { LucideIcon } from 'lucide-react';

export interface Auth {
    user: User;
}

export interface BreadcrumbItem {
    title: string;
    href: string;
}

export interface NavGroup {
    title: string;
    items: NavItem[];
}

export interface TableHeaderData {
    title: string;
    items: NavItem[];
}

export interface NavItem {
    title: string;
    url: string;
    icon?: LucideIcon | null;
    isActive?: boolean;
}
export interface DropDownItem {
    title: string;
    url: string;
    icon?: LucideIcon | null;
    isActive?: boolean;
    method?: any | null;
}

export interface SharedData {
    name: string;
    quote: { message: string; author: string };
    auth: Auth;
    [key: string]: unknown;
}

export interface User {
    id: number;
    name: string;
    email: string;
    avatar?: string;
    email_verified_at: string | null;
    created_at: string;
    updated_at: string;
    [key: string]: unknown; // This allows for additional properties...
}

export type PaginatedData<T = any> = { data: []; links: Record<string, string> };

export type Shop = {
    id: number;
    name: string;
    address: string;
    email: string | null;
    phone: string | null;
    created_at: string;
    updated_at: string;
};

export type Brand = {
    id: number;
    name: string;
    description: string;
    created_at: string;
    updated_at: string;
};

export type Category = {
    id: number;
    name: string;
    description: string;
    products: [];
    created_at: string;
    updated_at: string;
};

export type Unit = {
    id: number;
    name: string;
    type: string;
    symbol: string;
    created_at: string;
    updated_at: string;
};

export type Product = {
    id: number;
    name: string;
    description: string;
    price: number;
    isActive: boolean;
    image: string | null;
    inventory: Inventory;
    created_at: string;
    updated_at: string;
    barcode: string;
    brand: Brand;
    cost: number;
    shop: [];
    category: [];
    unit: Unit;
    cases: number;
    units: number;
    quantity: number;
};

export type Inventory = {
    id: number;
    product_id: number;
    shop_id: number;
    quantity: number | null;
    cases: number | null;
    units: number | null;
    image: string;
    created_at: string;
    updated_at: string;
};
