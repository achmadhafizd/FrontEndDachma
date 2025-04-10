export interface OrderItem {
  productId: string;
  name: string;
  image: string;
  price: number;
  quantity: number;
}

export interface ShippingAddress {
  address: string;
  city: string;
  postalCode: string;
  country: string;
}

export interface Order {
  _id: string;
  user: string;
  orderItems: OrderItem[];
  shippingAddress: ShippingAddress[];
  paymentMethod: string;
  totalPrice: number;
  isPaid: boolean;
  paidAt: string;
  isDelivered: boolean;
  paymentStatus: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  shippingMethod?: string;
}

export interface OrderState {
  orders: Order[];
  totalOrders: number;
  orderDetails: Order | null;
  loading: boolean;
  error: string | null;
}
