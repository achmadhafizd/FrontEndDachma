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
}

export interface CheckoutData {
  checkoutItems: CartItem[];
  shippingAddress: FormCheckout;
  paymentMethod: string;
  totalPrice: number;
}
