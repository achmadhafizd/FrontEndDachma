export interface ProductParams {
  id?: string;
  _id?: string;
  name: string;
  price: number;
  category: string;
  size?: string;
  color?: string;
  gender?: string;
  material?: string;
  brand?: string;
  sku?: string;
  collection?: string;
  images?: {
    url: string;
    altText: string;
  }[];
}

export interface ProductAdminState {
  adminProducts: ProductParams[];
  loading: boolean;
  error: string | null;
}
