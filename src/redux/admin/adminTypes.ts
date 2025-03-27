export interface UserAdmin {
  _id?: string;
  name: string;
  email: string;
  password?: string;
  role?: "admin" | "customer";
}

export interface AdminState {
  users: UserAdmin[];
  loading: boolean;
  error: string | null;
}
