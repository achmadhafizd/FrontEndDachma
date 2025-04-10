interface FormCheckout {
  firstName: string;
  lastName: string;
  address: string;
  city: string;
  country: string;
  postalCode: string;
  phone: string;
}

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  color?: string;
  size?: string;
  image: string;
}

export interface CheckoutData {
  checkoutItems: CartItem[];
  shippingAddress: FormCheckout;
  paymentMethod: string;
  totalPrice: number;
}

export interface CheckoutDataType {
  _id: string;
  checkoutItems: CartItem[];
  shippingAddress: FormCheckout;
  address: string;
  city: string;
  postalCode: string;
  country: string;
  paymentMethod: string;
  totalPrice: number;
  createdAt: string;
  updatedAt: string;
}

export interface CheckoutProps {
  checkout: CheckoutDataType | null;
  loading: boolean;
  error: string | null;
}
