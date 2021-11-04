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