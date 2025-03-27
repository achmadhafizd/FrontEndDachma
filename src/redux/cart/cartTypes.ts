import { User } from "../auth";

export interface CartIdentity {
  guestId: string;
  userId?: string;
  user?: User;
}

interface CartProduct {
  productId: string;
  name: string;
  image: string;
  price: number;
  size: string;
  color: string;
  quantity: number;
}

export interface CartData {
  products?: CartProduct[];
  productId: string;
  quantity?: number;
  size: string;
  color: string;
  guestId: string;
  userId: string;
}
