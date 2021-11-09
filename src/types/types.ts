export interface Metadata {
  current_page: number;
  first_page: number;
  last_page: number;
  page_size: number;
  total_records: number;
}

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

export interface Review {
  id: number;
  created_at: Date;
  updated_at: Date;
  text: string;
}

export interface Rating {
  id: number;
  created_at: Date;
  updated_at: Date;
  value: number;
  user_id: number;
  product_id: number;
}

// TODO busted
export interface CartItem {
  uuid: string;
  product: Product;
  qty: number;
}

export type ProductDetailsResponse = Product & { reviews: Review[] } & {
  ratings: Rating[];
} & {
  rating_average: number;
  rating_count: number;
  review_count: number;
};
