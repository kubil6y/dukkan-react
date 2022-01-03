export interface RegisterDTO {
  first_name: string;
  last_name: string;
  email: string;
  address: string;
  password: string;
  password_confirm: string;
}

export interface CreateAuthenticationTokenDTO {
  email: string;
  password: string;
}

export interface EditProfileDTO {
  first_name?: string;
  last_name?: string;
  email?: string;
  address?: string;
  password?: string;
  password_confirm?: string;
}

export interface ReviewDTO {
  text: string;
}

export interface ActivateAccountDTO {
  code: string;
}

interface OrderItemDTO {
  product_id: number;
  quantity: number;
}

export interface CreateOrderDTO {
  payment_method: string;
  order_items: OrderItemDTO[];
}
