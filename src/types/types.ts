export interface Role {
  id: number;
  created_at: Date;
  updated_at: Date;
  name: string;
}

export interface User {
  id: number;
  created_at: Date;
  updated_at: Date;
  first_name: string;
  last_name: string;
  email: string;
  address: string;
  is_activated: boolean;
  role: Role;
}

export interface Category {
  id: number;
  created_at: Date;
  updated_at: Date;
  name: string;
  slug: string;
}

export interface Product {
  id: number;
  created_at: Date;
  updated_at: Date;
  name: string;
  slug: string;
  description: string;
  brand: string;
  image: string;
  price: number;
  count: number;
  category_id: number;
  category?: Category;
}
