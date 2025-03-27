export interface User {
  _id: string;
  name: string;
  email: string;
  role: "admin" | "customer";
}

export interface LoginUserData {
  email: string;
  password: string;
}

export interface RegisterUserData {
  name: string;
  email: string;
  password: string;
}

export interface AuthState {
  user: User | null;
  guestId: string;
  loading: boolean;
  error: string | null;
}
