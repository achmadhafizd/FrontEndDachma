export interface ProductFilterParams {
  collection?: string;
  size?: string;
  color?: string;
  gender?: string;
  minPrice?: string;
  maxPrice?: string;
  sortBy?: string;
  search?: string;
  category?: string;
  material?: string;
  brand?: string;
  limit?: string;
  image?: {
    url: string;
    altText: string;
  }[];
}
export interface UpdateProductParams {
  id: string;
  productData: ProductFilterParams;
}

interface Product {
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
  collection?: string;
  images?: {
    url: string;
    altText: string;
  }[];
  sku?: string;
  collections?: string[];

  // EXCLUDE API
  description?: string;
  countInStock?: number;
  sizes?: string[];
  colors?: string[];
}

interface Filters {
  category: string;
  size: string;
  color: string;
  gender: string;
  minPrice: string;
  maxPrice: string;
  sortBy: string;
  search: string;
  material: string;
  brand: string;
  collection: string;
}

export interface ProductsState {
  products: Product[];
  selectedProduct: Product | null;
  similarProducts: Product[];
  loading: boolean;
  error: string | null;
  filters: Filters;
}
