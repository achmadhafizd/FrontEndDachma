export interface AdminOrderUpdateStatus {
  id: string;
  status: string;
}

export interface OrderItem {
  productId: string;
  name: string;
  color?: string;
  image: string;
  price: number;
  quantity: number;
  size?: string;
}

export interface ShippingAddress {
  address: string;
  city: string;
  postalCode: string;
  country: string;
}

interface User {
  _id: string;
  name: string;
  email: string;
}

export interface Order {
  _id: string;
  user: User; // ID pengguna yang membuat order
  orderItems: OrderItem[];
  shippingAddress: ShippingAddress;
  paymentMethod: string;
  totalPrice: number;
  isPaid: boolean;
  paidAt?: string;
  isDelivered: boolean;
  deliveredAt?: string;
  paymentStatus: "pending" | "paid" | "failed";
  status: "Processing" | "Shipped" | "Delivered" | "Cancelled";
  createdAt: string;
  updatedAt: string;
}

export interface OrderState {
  orders: Order[]; // Array dari semua pesanan
  totalOrders: number;
  totalSales: number;
  loading: boolean;
  error: string | null;
}
