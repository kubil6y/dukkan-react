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
